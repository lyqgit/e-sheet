use std::{env};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::collections::HashMap;
use log::info;
use futures_util::{StreamExt, FutureExt};
use tokio::net::{TcpListener, TcpStream};
use once_cell::sync::Lazy;
use tokio::sync::{mpsc, RwLock};
use tokio_stream::wrappers::UnboundedReceiverStream;
use tokio_tungstenite::{tungstenite::{protocol::Message,Error}};

type Users = RwLock<HashMap<usize, mpsc::UnboundedSender<Result<Message, Error>>>>;

static NEXT_USER_ID: AtomicUsize = AtomicUsize::new(1);
static ONLINE_USERS: Lazy<Users> = Lazy::new(Users::default);

#[tokio::main]
async fn main() -> Result<(), Error> {
    let addr = env::args().nth(1).unwrap_or_else(|| "127.0.0.1:8091".to_string());

    // Create the event loop and TCP listener we'll accept connections on.
    let try_socket = TcpListener::bind(&addr).await;
    let listener = try_socket.expect("Failed to bind");
    info!("Listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(accept_connection(stream));
    }

    Ok(())
}

async fn accept_connection(stream: TcpStream) {

    let my_id = NEXT_USER_ID.fetch_add(1, Ordering::Relaxed);

    let addr = stream.peer_addr().expect("connected streams should have a peer address");
    info!("Peer address: {}", addr);
    println!("Peer address: {}", addr);

    let ws_stream = tokio_tungstenite::accept_async(stream)
        .await
        .expect("Error during the websocket handshake occurred");

    info!("New WebSocket connection: {}", addr);

    let (user_ws_tx, mut user_ws_rx) = ws_stream.split();

    // Use an unbounded channel to handle buffering and flushing of messages
    // to the websocket...
    let (tx, rx) = mpsc::unbounded_channel();
    let rx = UnboundedReceiverStream::new(rx);
    let fut = rx.forward(user_ws_tx).map(|result| {
        if let Err(e) = result {
            println!("websocket send error---{:?}",e);
        }
    });
    tokio::task::spawn(fut);
    let fut = async move {
        ONLINE_USERS.write().await.insert(my_id, tx);

        while let Some(result) = user_ws_rx.next().await {
            let msg = match result {
                Ok(msg) => msg,
                Err(e) => {
                    eprintln!("websocket error(uid={my_id}): {e}");
                    break;
                }
            };
            user_message(my_id, msg).await;
        }

        user_disconnected(my_id).await;
    };
    tokio::task::spawn(fut);
}


async fn user_message(my_id: usize, msg: Message) {

    let mut rx_str:String;

    match msg {
        Message::Text(data)=>{rx_str=data}
        _=>{return;}
    }

    let new_msg = serde_json::to_string(&rx_str).unwrap();

    // New message from this user, send it to everyone else (except same uid)...
    for (&uid, tx) in ONLINE_USERS.read().await.iter() {
        if my_id != uid {
            if let Err(_disconnected) = tx.send(Ok(Message::text(new_msg.clone()))) {
                // The tx is disconnected, our `user_disconnected` code
                // should be happening in another task, nothing more to
                // do here.
            }
        }
    }
}

async fn user_disconnected(my_id: usize) {
    eprintln!("good bye user: {my_id}");
    // Stream closed up, so remove from the user list
    ONLINE_USERS.write().await.remove(&my_id);
}