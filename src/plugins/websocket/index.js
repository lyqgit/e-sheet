export default class WebsocketPlugin {

    /**
     * @type {WebSocket}
     */
    ws



    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.mulPersonSelected = core.mulPersonSelected
        this.options = options
        this.layer = layer
        this.core = core
    }

    /**
     * @param {string} addr
     */
    connect(addr){

        this.ws = new WebSocket(addr)

        this.wsOpenCallback()

        this.wsCloseCallback()

        this.wsMsgCallback()

    }

    wsOpenCallback(){
        this.ws.onopen = evt=>{
            console.log('evt---onopen',evt)
        }
    }

    wsCloseCallback(){
        this.ws.onclose = evt=>{
            console.log('evt---onclose',evt)
            this.ws = null
        }
    }

    wsMsgCallbackType1(data){
        // 更改单元格内容
        this.contentComponent.changeRectTextByLabel(data.command)
    }

    wsMsgCallbackType2(data){
        // 文字大小
        this.contentComponent.changeRectAttrByLabel(data.command,'fontSize')
    }

    wsMsgCallbackType3(data){
        // 文字垂直方向
        this.contentComponent.changeRectAttrByLabel(data.command,'textBaseline')
    }

    wsMsgCallbackType4(data){
        // 文字水平方向
        this.contentComponent.changeRectAttrByLabel(data.command,'textAlign')
    }

    wsMsgCallbackType5(data){
        // 文字粗体
        this.contentComponent.changeRectAttrByLabel(data.command,'fontWeight')
    }

    wsMsgCallbackType6(data){
        // 文字斜体
        this.contentComponent.changeRectAttrByLabel(data.command,'fontItalic')
    }

    wsMsgCallbackType7(data){
        // 文字颜色
        this.contentComponent.changeRectAttrByLabel(data.command,'fontColor')
    }

    wsMsgCallbackType8(data){
        // 背景颜色
        this.contentComponent.changeRectAttrByLabel(data.command,'bgColor')
    }

    changeUserShow(data){
        const index = this.mulPersonSelected.findIndex(item=>item.userId === data.userId)
        data.command = this.contentComponent.searchRectByLabel(data.command.label)
        if(index === -1){
            this.mulPersonSelected.push(data)
        }else{
            this.mulPersonSelected[index] = data
        }
    }

    wsMsgCallback(){
        this.ws.onmessage = evt=>{
            console.log('evt---onmessage',evt)

            const { DragPlugin } = this.core.plugins
            const { ContentComponent } = this.core.components

            /**
             * delete
             * 0.同步数据
             * 1.选中改变
             * 2.单元格内容改变
             * 3.横向距离改变
             * 4.纵向距离改变
             */

            /**
             * 0.同步数据
             * 1.更改单元格内容
             * 2.文字大小
             * 3.文字垂直方向位置
             * 4.文字水平方向位置
             * 5.文字粗体
             * 6.文字斜体
             * 7.文字颜色
             * 8.背景颜色
             * 9.合并单元格
             * 10.拆分单元格
             * 11.拉伸宽度
             * 12.拉伸高度
             * 13.左右插入列
             * 14.上下插入行
             * 15.复制粘贴
             * 16.单元格边框拖拽
             * 17.单元格格式刷
             */

            const data = JSON.parse(evt.data)
            switch (data.type) {
                case 999:
                    ContentComponent.contentGroup = data.command
                    this.mulPersonSelected.forEach(item=>{
                        item.command = ContentComponent.searchRectByLabel(item.command.label)
                    })
                    break
                case 0:
                    this.changeUserShow(data)
                    break
                case 1:
                    this.wsMsgCallbackType1(data)
                    break
                case 2:
                    this.wsMsgCallbackType2(data)
                    break
                case 3:
                    this.wsMsgCallbackType3(data)
                    break
                case 4:
                    this.wsMsgCallbackType4(data)
                    break
                case 5:
                    this.wsMsgCallbackType5(data)
                    break
                case 6:
                    this.wsMsgCallbackType6(data)
                    break
                case 7:
                    this.wsMsgCallbackType7(data)
                    break
                case 8:
                    this.wsMsgCallbackType8(data)
                    break
            }


            // if(data.type === 3){
            //     const oriRect = ContentComponent.searchRectByLabel(data.command.label)
            //     DragPlugin.expandWidthNoDrag(data.command.col,data.command.width - oriRect.width)
            // }



            this.core.fresh()
        }
    }

    wsSend(type,data){
        if(this.ws){
            this.ws.send(JSON.stringify({
                type,
                command:data,
                userId:this.core.userId,
                userName:this.core.userName,
                userColor:this.core.userColor
            }))
        }
    }

    syncData(){
        this.wsSend(0,this.core.components.ContentComponent.contentGroup)
    }

}