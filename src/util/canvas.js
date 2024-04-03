/**
 * @param {File} file
 * @returns {Promise<unknown>}
 */
export function loadImagePromise(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = (event)=>{
            const imgId = (new Date()).valueOf();
            const blob = new Blob([event.target.result], { type: file.type });
            const url = URL.createObjectURL(blob)
            const imgEl = new Image()
            imgEl.src = url
            imgEl.onload = ()=>{
                resolve({url:imgId,imgEl})
            }
            imgEl.onerror = (err)=>{
                reject(err)
            }
        };
        reader.onerror = (err)=>{
            reject(err)
        }
        reader.readAsArrayBuffer(file);
    })
}


/**
 * @param {Array<File>} files
 * @returns {Promise<Array>}
 */
export function loadMoreImagePromise(files) {
    const imgPromises = [];
    for(let i=0;i<files.length;i++){
        imgPromises.push(loadImagePromise(files[i]))
    }
    return Promise.all(imgPromises)
}

/**
 * @param {string} imgSrc
 * @returns {Promise<unknown>}
 */
export function loadNetImgPromise(imgSrc){
    return new Promise((resolve, reject)=>{
        const imgEl = new Image()
        imgEl.src = res
        imgEl.onload = ()=>{
            resolve({url:imgSrc,imgEl})
        }
    })
}

/**
 * @param {Array<string>} imgSrcs
 * @returns {Promise<Array>}
 */
export function loadMoreNetImgPromise(imgSrcs){
    const imgPromises = [];
    for(let i=0;i<imgSrcs.length;i++){
        imgPromises.push(loadNetImgPromise(imgSrcs[i]))
    }
    return Promise.all(imgPromises)
}