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

    wsMsgCallbackType9(data){

        if(data.command.undo){
            // 拆分单元格
            const mergeStartCell = this.contentComponent.searchRectByLabel(data.command.label)
            this.core.plugins.ContextmenuPlugin.splitCell(mergeStartCell,false)
        }else{
            // 合并单元格
            const mergeSelectedCell = []
            for(let i=1;i<data.command.length;i++){
                mergeSelectedCell.push(this.contentComponent.searchRectByLabel(data.command[i]))
            }
            const firstCell = this.contentComponent.searchRectByLabel(data.command[0])
            this.core.plugins.ContextmenuPlugin.mergeCell(firstCell,mergeSelectedCell,false)
        }

    }

    wsMsgCallbackType10(data){
        if(data.command.undo){
            const mergeSelectedCell = []
            for(let i=0;i<data.command.mergeRow;i++){
                for(let j=0;j<data.command.mergeCol;j++){
                    if(i===0&&j===0){
                        continue
                    }
                    mergeSelectedCell.push(this.contentComponent.searchRectByColAndRow(data.command.col+j,data.command.row+i))
                }
            }
            const firstCell = this.contentComponent.searchRectByLabel(data.command.mergeStartLabel)
            this.core.plugins.ContextmenuPlugin.mergeCell(firstCell,mergeSelectedCell,false)
        }else{
            // 拆分单元格
            const mergeStartCell = this.contentComponent.searchRectByColAndRow(data.command.col,data.command.row)
            this.core.plugins.ContextmenuPlugin.splitCell(mergeStartCell,false)
        }
    }

    wsMsgCallbackType11(data){
        // 拉伸宽度
        const selectedCell = this.contentComponent.searchRectByLabel(data.command.label)
        this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,data.command.dis)
    }

    wsMsgCallbackType12(data){
        // 拉伸高度
        const selectedCell = this.contentComponent.searchRectByLabel(data.command.label)
        this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,data.command.dis)
    }

    wsMsgCallbackType13(data){

        const fObj = data.command
        if(fObj.undo){
            // 删除行
            this.core.plugins.ContextmenuPlugin.removeCol(fObj.col,fObj.num,fObj.isLeft)
        }else{
            // 左右插入列
            this.core.plugins.ContextmenuPlugin.insertCol(fObj.col,fObj.num,fObj.isLeft)
        }

    }

    wsMsgCallbackType14(data){
        const fObj = data.command
        if(fObj.undo){
            // 删除行
            this.core.plugins.ContextmenuPlugin.removeRow(fObj.row,fObj.num,fObj.isTop)
        }else{
            // 上下插入行
            this.core.plugins.ContextmenuPlugin.insertRow(fObj.row,fObj.num,fObj.isTop)
        }

    }

    wsMsgCallbackType15(data){
        // 复制粘贴
        if(data.command.undo){
            // 回退
            this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(data.command.pasteStr))
        }else{
            const clickCell = this.contentComponent.searchRectByLabel(data.command.label)
            this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(data.command.pasteStr,clickCell,false)
        }
    }

    wsMsgCallbackType16(data){
        // 单元格边框拖拽
        const fObj = data.command
        // 还原拖拽源头
        this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(fObj.pre))
        // 还原拖拽目标
        const targetCell = this.contentComponent.searchRectByLabel(fObj.label)
        if(fObj.undo){
            this.core.plugins.SelectPlugin.forcePasteCellToNewCellByTargetCell(JSON.parse(fObj.next),targetCell)
        }else{
            this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(fObj.next,targetCell,false)
        }
        this.contentComponent.setSecondClickCell(null)
    }

    wsMsgCallbackType17(data){
        // 单元格格式刷
        const fObj = data.command
        if(fObj.undo){
            fObj.pre.forEach(item=>{
                this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(item))
            })
        }else{
            fObj.next.forEach(item=>{
                const cell = this.contentComponent.searchRectByLabel(item.label)
                this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(item.tableDomStr,cell,false)
            })
        }


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
            console.log('evt---onmessage-data',JSON.parse(evt.data))

            const { DragPlugin } = this.core.plugins
            const { ContentComponent } = this.core.components

            const { clickCell } = ContentComponent

            const curClickCell = JSON.stringify(clickCell)

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
                case 9:
                    this.wsMsgCallbackType9(data)
                    break
                case 10:
                    this.wsMsgCallbackType10(data)
                    break
                case 11:
                    this.wsMsgCallbackType11(data)
                    break
                case 12:
                    this.wsMsgCallbackType12(data)
                    break
                case 13:
                    this.wsMsgCallbackType13(data)
                    break
                case 14:
                    this.wsMsgCallbackType14(data)
                    break
                case 15:
                    this.wsMsgCallbackType15(data)
                    break
                case 16:
                    this.wsMsgCallbackType16(data)
                    break
                case 17:
                    this.wsMsgCallbackType17(data)
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