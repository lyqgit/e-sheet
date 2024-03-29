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
        const fObj = data.command
        const selectedCell = this.contentComponent.searchRectByLabel(data.command.label)
        if(fObj.widthDis !== undefined && fObj.widthDis !== 0){
            this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,fObj.undo?-fObj.widthDis:fObj.widthDis,false)
        }
        if(fObj.heightDis !== undefined && fObj.heightDis !== 0){
            this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,fObj.undo?-fObj.heightDis:fObj.heightDis,false)
        }
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

    wsMsgCallbackType18(data){
        // 删除线
        this.contentComponent.changeRectAttrByLabel(data.command,'strikethrough')
    }

    wsMsgCallbackType19(data){
        // 下划线
        this.contentComponent.changeRectAttrByLabel(data.command,'underline')
    }

    wsMsgCallbackType20(data){
        // 删除内容
        const fObj = data.command
        if(fObj.undo){
            // 还原
            fObj.cells.forEach(item=>{
                const cell = this.contentComponent.searchRectByLabel(item.label)
                cell.text = item.text
            })
        }else{
            fObj.cells.forEach(item=>{
                const cell = this.contentComponent.searchRectByLabel(item.label)
                cell.text = ''
            })
        }
    }

    wsMsgCallbackType21(data){
        // 文字溢出或换行
        this.core.plugins.SettingPlugin.setTextWrapChange(data.command.textWrapType)
        this.core.plugins.SettingPlugin.setTextWrapInHeader(data.command.textWrapType)
    }

    wsMsgCallbackType998(data){
        // 创建新的sheet
        // console.log('data创建新的sheet',data)
        this.core.plugins.BookPlugin.addSheetThenFresh(data.command)
    }

    changeUserShow(data){
        const index = this.mulPersonSelected.findIndex(item=>item.userId === data.userId)
        // data.command = this.contentComponent.searchRectByLabel(data.command.label)
        if(index === -1){
            this.mulPersonSelected.push(data)
        }else{
            this.mulPersonSelected[index] = data
        }
    }

    wsMsgCallback(){
        this.ws.onmessage = evt=>{
            console.log('evt---onmessage-data',JSON.parse(evt.data))
            const { ContentComponent } = this.core.components

            /**
             * 999.同步整体数据
             * 998.添加sheet并刷新页面
             * 0.同步用户显示
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
             * 18.单元格删除线
             * 19.单元格下划线
             * 20.删除内容
             * 21.文字溢出或换行
             */

            const data = JSON.parse(evt.data)
            // 获取当前sheet
            const curSheet = this.core.getCurrentSheet();
            // const tempSheetIndex = this.core.eSheetWorkBook.findIndex(item=>item.id === data.sheetId)

            // 查询sheetId和当前book中是否匹配，不匹配则不更新
            // if(tempSheetIndex !== -1){
            //     const updateSheet = this.core.eSheetWorkBook[tempSheetIndex];
            //     // 变更sheet
            //     this.contentComponent.installContentDataByData(updateSheet.sheet)
            // }else{
            //     return
            // }

            if(data.type === 0){
                this.changeUserShow(data)
            }

            // 不是当前sheet的操作
            switch (data.type) {
                case 998:
                    this.wsMsgCallbackType998(data)
                return;
            }

            // 只更新当前的sheet
            if(curSheet.id !== data.sheetId){
                // 如果不是当前sheet只更新数据
                const changeSheet = this.core.getSheetById(data.sheetId)
                if(changeSheet){
                    changeSheet.sheet = data.wholeSheet.sheet
                    if(data.wholeSheet.config){
                        changeSheet.config = data.wholeSheet.config
                    }
                }
                return;
            }

            // 可撤回的操作
            switch (data.type) {
                case 999:
                    ContentComponent.contentGroup = data.command
                    this.mulPersonSelected.forEach(item=>{
                        item.command = ContentComponent.searchRectByLabel(item.command.label)
                    })
                    break
                // case 0:
                //     this.changeUserShow(data)
                //     break
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
                case 18:
                    this.wsMsgCallbackType18(data)
                    break
                case 19:
                    this.wsMsgCallbackType19(data)
                    break
                case 20:
                    this.wsMsgCallbackType20(data)
                    break
                case 21:
                    this.wsMsgCallbackType21(data)
                    break

            }
            // 还原sheet主体
            // this.contentComponent.installContentDataByData(curSheet.sheet)

            // if(data.type === 3){
            //     const oriRect = ContentComponent.searchRectByLabel(data.command.label)
            //     DragPlugin.expandWidthNoDrag(data.command.col,data.command.width - oriRect.width)
            // }
            if(![19].includes(data.type)){
                this.core.fresh()
            }
        }
    }

    wsSend(type,data){
        if(this.ws){
            const curSheet = this.core.getCurrentSheet();
            this.ws.send(JSON.stringify({
                type,
                command:data,
                sheetId:curSheet.id,
                userId:this.core.userId,
                userName:this.core.userName,
                userColor:this.core.userColor,
                wholeSheet:curSheet
            }))
        }
    }

    syncData(){
        this.wsSend(0,this.core.components.ContentComponent.contentGroup)
    }

}