import base64Img from '../../image/base64Img.js'

export default class ContentComponent{

    /**
     * @type {HTMLElement}
     */
    selectedCellTopBorderDom = null
    /**
     * @type {HTMLElement}
     */
    selectedCellBottomBorderDom = null
    /**
     * @type {HTMLElement}
     */
    selectedCellLeftBorderDom = null
    /**
     * @type {HTMLElement}
     */
    selectedCellRightBorderDom = null

    selectedCellWidth=0
    selectedCellHeight=0

    /**
     * @type {HTMLElement}
     */
    canvasDom = null

    options = {};

    offsetX = 0;
    offsetY = 0;

    clickRectShow = false

    // 鼠标松开后的当前选中框
    moveClickCell = null



    clickCell = null

    secondClickCell = null

    isColSelect = false
    isRowSelect = false

    moreSelectedCell = []
    mergeSelectedCell = []

    startAndEndRect = null
    attrFirst = null
    attrSecond = null

    /**
     * @type {Canvas}
     */
    layer = null;

    contentGroup = []

    constructor(layer,options={},core) {

        this.options = options;
        this.layer = layer;
        this.core = core;
        this.canvasDom = core.canvasDom
        this.selectorDom = core.selectorDom
        this.canvasWrapperDom = core.canvasWrapperDom
        const sheetBook = this.core.eSheetWorkBook[this.core.currentSheetIndex]
        this.registrySelectedCellDom()
        this.registryCellPainterDom()
        this.installContentDataByData(sheetBook.sheet)
        this.showClickRect(sheetBook.clickCell)
        // console.log('this.core.sheetWidth',this.core.sheetWidth)
        // console.log('this.core.sheetHeight',this.core.sheetHeight)
        // this.initDraw()
        this.trendsDraw(0,0)

    }


    // Load Data
    installContentDataByName(sheetName='Sheet1'){
        const sheetIndex = this.core.eSheetWorkBook.findIndex(item=>item.label === sheetName)
        this.contentGroup = this.core.eSheetWorkBook[sheetIndex].sheet
        // console.log('sheetName',this.contentGroup)
    }

    installContentDataByData(sheet){
        this.contentGroup = sheet
        // console.log('sheetName',this.contentGroup)
    }

    changeContentGroupByRectArr(selectedArr){
        const firstCell = selectedArr[0]
    }

    showClickRect(attr,col=false,row=false){
        this.clickCell = attr
        this.clickRectShow = true
        this.isColSelect = col
        this.isRowSelect = row
    }

    setSecondClickCell(attr){
        this.secondClickCell = attr
    }

    hideClickRect(){
        this.clickRectShow = false
        this.isColSelect = false
        this.isRowSelect = false
        this.secondClickCell = null
        this.clickCell = null
        this.moreSelectedCell = []
        this.hideSelectedCellDom()
    }

    drawMulPersonSelected(offsetX = 0,offsetY = 0){

        const { cellHeight } = this.options

        this.core.mulPersonSelected.forEach(item=>{

            if(item.type === 1){

                const clickCell = item.command

                // console.log('item',item)

                if(clickCell.isMerge){
                    const {mergeWidth,mergeHeight} = clickCell
                    // console.log('多个选中框',this.clickCell)
                    this.layer.drawStrokeRect(clickCell.x+cellHeight-offsetX,clickCell.y-offsetY+cellHeight,mergeWidth,mergeHeight,item.userColor,'destination-over',2)
                }else{
                    // console.log('单个选中框',this.clickCell)
                    this.layer.drawStrokeRect(clickCell.x+cellHeight-offsetX,clickCell.y-offsetY+cellHeight,clickCell.width,clickCell.height,item.userColor,'destination-over',2)
                }
                this.layer.drawText(clickCell.x+cellHeight-offsetX+6,clickCell.y-offsetY+cellHeight-16,item.userName,clickCell.width,20,'destination-over','#ffffff','left',{fontSize:clickCell.fontSize,fontFamily:clickCell.fontFamily,fontWeight:clickCell.fontWeight,fontItalic:clickCell.fontItalic},'top')
                this.layer.drawFillRect(clickCell.x+cellHeight-offsetX,clickCell.y-offsetY+cellHeight-20,clickCell.width,20,item.userColor,'destination-over')
            }


        })

    }

    // draw canvas
    initDraw(){
        const col = this.options.col
        const row = this.options.row
        const cellWidth = this.options.cellWidth
        const cellHeight = this.options.cellHeight
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                const label = String.fromCharCode(65 + j)
                // console.log('label+i',label+i)
                // const tempRect = new Konva.Rect({
                //     x: j*cellWidth+40,
                //     y: i*cellHeight+40,
                //     width: cellWidth,
                //     height: cellHeight,
                //     attrs:{
                //         exCell:true,
                //         row:i,
                //         col:j,
                //         v:sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
                //         k:label+(i+1),
                //     },
                //     name:label+(i+1),
                // });

                const tempRectBack = new Konva.Rect({
                    x: j*cellWidth+40,
                    y: i*cellHeight+40,
                    width: cellWidth,
                    height: cellHeight,
                    stroke: '#dcdfe6',
                    strokeWidth: 1,
                    listening: false,
                    attrs:{
                        row:i,
                        col:j,
                        name:label+(i+1),
                    }
                });

                // const tempBackBorder = new Konva.Line({
                //     points: [j*cellWidth+40,cellHeight+i*cellHeight,j*cellWidth+40,(row+1)*cellHeight],
                //     stroke: '#dcdfe6',
                //     strokeWidth: 1,
                //     lineCap: 'round',
                //     lineJoin: 'round',
                //     attrs:{
                //         row:i,
                //         col:j,
                //         name:label+(i+1),
                //     }
                // })

                const tempText = new Konva.Text({
                    x: j*cellWidth+40,
                    y: i*cellHeight+40,
                    // text: sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
                    width:cellWidth,
                    height: cellHeight,
                    align:'center',
                    verticalAlign:'middle',
                    padding:6,
                    ellipsis:true,
                    fontSize: 12,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    attrs:{
                        row:i,
                        col:j,
                        name:label+(i+1),
                    }
                })

                tempRectBack.hide()
                tempText.hide()
                this.contentBackGroup.add(tempRectBack);
                this.contentTextGroup.add(tempText);

            }
        }

        const tempHandlerRectBack = new Konva.Rect({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
        this.contentBorderGroup.add(tempHandlerRectBack);
    }

    showSelectedCellDom(x,y,width,height){

        width = width??this.selectedCellWidth
        height = height??this.selectedCellHeight

        this.selectedCellWidth = width
        this.selectedCellHeight = height

        // top
        this.selectedCellTopBorderDom.style.display = 'block'
        this.selectedCellTopBorderDom.style.left = x+'px'
        this.selectedCellTopBorderDom.style.top = y+'px'
        this.selectedCellTopBorderDom.style.width = width+'px'

        // bottom
        this.selectedCellBottomBorderDom.style.display = 'block'
        this.selectedCellBottomBorderDom.style.left = x+'px'
        this.selectedCellBottomBorderDom.style.top = y+height-4+'px'
        this.selectedCellBottomBorderDom.style.width = width+'px'

        // left
        this.selectedCellLeftBorderDom.style.display = 'block'
        this.selectedCellLeftBorderDom.style.left = x+'px'
        this.selectedCellLeftBorderDom.style.top = y+'px'
        this.selectedCellLeftBorderDom.style.height = height+'px'

        // right
        this.selectedCellRightBorderDom.style.display = 'block'
        this.selectedCellRightBorderDom.style.left = x+width-4+'px'
        this.selectedCellRightBorderDom.style.top = y+'px'
        this.selectedCellRightBorderDom.style.height = height+'px'

        // dot
        this.showSelectedCellPainterDom(x+width,y+height)
    }

    setSelectedCellBorderDomBgColor(color){

        const { selectedBorderBgColor } = this.core

        const tempColor = color??selectedBorderBgColor

        this.selectedCellTopBorderDom.style.backgroundColor = tempColor
        this.selectedCellBottomBorderDom.style.backgroundColor = tempColor
        this.selectedCellLeftBorderDom.style.backgroundColor = tempColor
        this.selectedCellRightBorderDom.style.backgroundColor = tempColor
    }

    hideSelectedCellDom(){
        this.selectedCellTopBorderDom.style.display = 'none'
        this.selectedCellBottomBorderDom.style.display = 'none'
        this.selectedCellLeftBorderDom.style.display = 'none'
        this.selectedCellRightBorderDom.style.display = 'none'

        this.cellPainterDom.style.display = 'none'
    }


    initMoreSelectedCell(){
        const { moreSelectedCell,clickCell } = this
        if(moreSelectedCell.length > 0 ){
            moreSelectedCell.forEach(item=>{
                item.text = ''
                item.fontColor = ''
                item.bgColor = ''
                item.font = ''
                item.textAlign = ''
                item.mergeWidth = 0
                item.mergeHeight = 0
                item.mergeRow = 1
                item.mergeCol = 1
                item.isMerge = false
                item.fontSize = 12
                item.fontFamily = ''
            })
        }else{
            if(clickCell.isMerge){
                // 是单个合并的单元格

                let ni = clickCell.row+clickCell.mergeRow
                let nj = clickCell.col+clickCell.mergeCol

                for(let i=clickCell.row;i<ni;i++){
                    for(let j=clickCell.col;j<nj;j++){
                        const oriRect = this.searchRectByColAndRow(j,i)
                        oriRect.text = ''
                        oriRect.fontSize = 12
                        oriRect.fontFamily = ''
                        oriRect.fontColor = ''
                        oriRect.bgColor = ''
                        oriRect.font = ''
                        oriRect.textAlign = ''
                        oriRect.mergeWidth = 0
                        oriRect.mergeHeight = 0
                        oriRect.mergeRow = 1
                        oriRect.mergeCol = 1
                        oriRect.isMerge = false
                    }
                }

            }else{
                clickCell.text = ''
                clickCell.fontColor = ''
                clickCell.bgColor = ''
                clickCell.font = ''
                clickCell.textAlign = ''
                clickCell.mergeWidth = 0
                clickCell.mergeHeight = 0
                clickCell.mergeRow = 1
                clickCell.mergeCol = 1
                clickCell.isMerge = false
                clickCell.fontSize = 12
                clickCell.fontFamily = ''
            }

        }

    }

    moveSelectedCellDom(){
        this.setSelectedCellBorderDomBgColor()
        this.canvasDom.onmousemove = event=>{
            this.moveCell(event)
        }
        this.canvasWrapperDom.onmouseup = event=>{
            // console.log('测试',this.moveClickCell,this.clickCell)
            this.setSelectedCellBorderDomBgColor('transparent')
            if(!this.moveClickCell || this.moveClickCell.isMerge){
                return
            }
            const { SelectPlugin } = this.core.plugins
            const tableDomStr = SelectPlugin.transformCanvasCellToTableDomStr()
            // 初始化原来的表格
            this.initMoreSelectedCell()
            // console.log('this.moveClickCell',this.moveClickCell)
            SelectPlugin.transformTableDomStrToCanvasCell(tableDomStr,this.moveClickCell)
            this.moveClickCell = null
            this.canvasWrapperDom.onmousemove = null
            this.canvasWrapperDom.onmouseup = null
        }
    }

    registrySelectedCellDom(){

        const { h,canvasWrapperDom } = this.core

        const cellBorderAttrEvent = {
            onmousedown:_=>{
                this.moveSelectedCellDom()
            },
            oncontextmenu:e=>{
                e.preventDefault()
            }
        }

        const cellBorderStyle = {
            left:0,
            top:0,
            display:'none'
        }

        const cellTopBorderDom = h('div',{
            attr:{
                className:'e-sheet-hor-cell-border',
                ...cellBorderAttrEvent
            },
            style:{
                ...cellBorderStyle,
                width:0,
            }
        })

        const cellBottomBorderDom = h('div',{
            attr:{
                className:'e-sheet-hor-cell-border',
                ...cellBorderAttrEvent
            },
            style:{
                ...cellBorderStyle,
                width:0
            }
        })

        const cellLeftBorderDom = h('div',{
            attr:{
                className:'e-sheet-ver-cell-border',
                ...cellBorderAttrEvent
            },
            style:{
                ...cellBorderStyle,
                height:0
            }
        })

        const cellRightBorderDom = h('div',{
            attr:{
                className:'e-sheet-ver-cell-border',
                ...cellBorderAttrEvent
            },
            style:{
                ...cellBorderStyle,
                height:0
            }
        })

        this.selectedCellTopBorderDom = cellTopBorderDom
        this.selectedCellBottomBorderDom = cellBottomBorderDom
        this.selectedCellLeftBorderDom = cellLeftBorderDom
        this.selectedCellRightBorderDom = cellRightBorderDom
        canvasWrapperDom.appendChild(cellTopBorderDom)
        canvasWrapperDom.appendChild(cellBottomBorderDom)
        canvasWrapperDom.appendChild(cellLeftBorderDom)
        canvasWrapperDom.appendChild(cellRightBorderDom)
    }

    /**
     * @param {MouseEvent} event
     */
    moveCell=(event)=>{
        // console.log('event',event)
        const { cellHeight } = this.options
        const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
        const curCell = this.core.plugins.SelectPlugin.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
        this.moveClickCell = curCell;
        // console.log('this.moveClickCell',this.moveClickCell)
        this.showSelectedCellDom(curCell.x+cellHeight-offsetX,curCell.y-offsetY+cellHeight,curCell.isMerge?curCell.mergeWidth:curCell.width,curCell.isMerge?curCell.mergeHeight:curCell.height)
    }

    /**
     * @type {HTMLElement}
     */
    cellPainterDom = null
    /**
     * @type {HTMLElement}
     */
    cellPainterTopBorderDom = null
    /**
     * @type {HTMLElement}
     */
    cellPainterBottomBorderDom = null
    /**
     * @type {HTMLElement}
     */
    cellPainterLeftBorderDom = null
    /**
     * @type {HTMLElement}
     */
    cellPainterRightBorderDom = null

    registryCellPainterDom(){
        const { h,canvasWrapperDom } = this.core
        this.cellPainterDom = h('div',{
            attr:{
                className:'e-sheet-cell-painter',
                onmouseup:_=>{
                    this.canvasDom.onmousemove = null
                }
            }

        })

        this.cellPainterTopBorderDom = h('div',{
            attr:{
                className:'e-sheet-cell-painter-border',
                onmouseup:_=>{
                    this.canvasDom.onmousemove = null
                }
            },
            style:{
                height:'4px',
                display:'none'
            }
        })

        this.cellPainterBottomBorderDom = h('div',{
            attr:{
                className:'e-sheet-cell-painter-border',
                onmouseup:_=>{
                    this.canvasDom.onmousemove = null
                }
            },
            style:{
                height:'4px',
                display:'none'
            }
        })

        this.cellPainterLeftBorderDom = h('div',{
            attr:{
                className:'e-sheet-cell-painter-border',
                onmouseup:_=>{
                    this.canvasDom.onmousemove = null
                }
            },
            style:{
                width:'4px',
                display:'none'
            }
        })

        this.cellPainterRightBorderDom = h('div',{
            attr:{
                className:'e-sheet-cell-painter-border',
                onmouseup:_=>{
                    this.canvasDom.onmousemove = null
                }
            },
            style:{
                width:'4px',
                display:'none'
            }
        })

        canvasWrapperDom.appendChild(this.cellPainterTopBorderDom)
        canvasWrapperDom.appendChild(this.cellPainterBottomBorderDom)
        canvasWrapperDom.appendChild(this.cellPainterLeftBorderDom)
        canvasWrapperDom.appendChild(this.cellPainterRightBorderDom)

        this.cellPainterDom.oncontextmenu = evt=>{
            evt.preventDefault()
        }

        this.cellPainterDom.onmousedown = evt=>{
            evt.stopImmediatePropagation()
            const painterDomLeft = parseInt(this.cellPainterDom.style.left)
            const painterDomTop = parseInt(this.cellPainterDom.style.top)

            let diffCol = 0
            let diffRow = 0

            let diffWidth = 0
            let diffHeight = 0

            let nColMultiple = 0
            let nRowMultiple = 0

            let finalColRect = null
            let finalRowRect = null
            let finalRect = null

            let director = ''

            this.canvasDom.onmousemove = event=>{
                const { cellHeight } = this.options
                const { clickCell,moreSelectedCell } = this
                const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
                const curCell = this.core.plugins.SelectPlugin.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                const absX = Math.abs(event.offsetX-painterDomLeft)
                const absY = Math.abs(event.offsetY-painterDomTop)

                if(moreSelectedCell.length > 0){

                    const curRowRectArr = moreSelectedCell.filter(item=>item.row === clickCell.row)
                    finalRowRect = curRowRectArr[curRowRectArr.length - 1]
                    diffCol = finalRowRect.col - clickCell.col + 1
                    diffWidth = finalRowRect.x - clickCell.x + finalRowRect.width

                    const curColRectArr = moreSelectedCell.filter(item=>item.col === clickCell.col)
                    // console.log('curColRectArr.length',curColRectArr)
                    // console.log('clickCell',clickCell)
                    finalColRect = curColRectArr[curColRectArr.length - 1]
                    // console.log('finalColRect',finalColRect)

                    diffRow = finalColRect.row - clickCell.row + 1
                    diffHeight = finalColRect.y - clickCell.y + finalColRect.height
                    finalRect = moreSelectedCell[moreSelectedCell.length - 1]
                }else{
                    if(clickCell.isMerge){
                        finalRowRect = this.searchRectByColAndRow(clickCell.col + clickCell.mergeCol - 1,clickCell.row)
                        finalColRect = this.searchRectByColAndRow(clickCell.col,clickCell.row + clickCell.mergeRow - 1)
                        finalRect = this.searchRectByLabel(clickCell.mergeEndLabel)
                        diffWidth = clickCell.mergeWidth
                        diffHeight = clickCell.mergeHeight
                    }else{
                        finalRect = finalRowRect = finalColRect = clickCell
                        diffWidth = clickCell.width
                        diffHeight = clickCell.height
                    }
                    diffCol = clickCell.mergeCol
                    diffRow = clickCell.mergeRow
                }


                // 如果mouseCell在选中区域中，则不显示格式刷框
                if(event.offsetX>=clickCell.ltX-offsetX && event.offsetX<=(clickCell.ltX-offsetX+diffWidth) && event.offsetY>=clickCell.ltY-offsetY && event.offsetY <= (clickCell.ltY-offsetY+diffHeight)){
                    this.hidePainterBorderDom()
                    director = null
                    // console.log('如果mouseCell在选中区域中，则不显示格式刷框',event.offsetY,clickCell.ltY-offsetY,clickCell.ltY-offsetY+diffHeight)
                    this.canvasWrapperDom.onmouseup = null
                    this.canvasDom.onmouseup = null
                    return
                }



                if(absX>absY){
                    // 在左右方向
                    const mouseCell = this.searchRectByColAndRow(curCell.col,clickCell.row)
                    if(event.offsetX>painterDomLeft){
                        // 右侧，以右侧第一个为起点
                        director = 'right'
                        nColMultiple = Math.ceil(Math.abs(mouseCell.col - finalRowRect.col)/diffCol)
                        // console.log('nColMultiple',nColMultiple)
                        this.showPainterBorderDom(clickCell.ltX+diffWidth - offsetX,clickCell.ltY - offsetY,diffWidth*nColMultiple,diffHeight)
                    }else if(event.offsetX<painterDomLeft){
                        director = 'left'
                        nColMultiple = Math.ceil(Math.abs(mouseCell.col - clickCell.col)/diffCol)
                        this.showPainterBorderDom(clickCell.ltX - diffWidth*nColMultiple - offsetX,clickCell.ltY - offsetY,diffWidth*nColMultiple,diffHeight)
                    }
                }else{
                    const mouseCell = this.searchRectByColAndRow(clickCell.col,curCell.row)
                    if(event.offsetY>painterDomTop){
                        // 下方
                        director = 'bottom'
                        nRowMultiple = Math.ceil(Math.abs(mouseCell.row - finalColRect.row)/diffRow)
                        this.showPainterBorderDom(clickCell.ltX,clickCell.ltY+diffHeight - offsetY,diffWidth,diffHeight*nRowMultiple)
                    }else if(event.offsetY<painterDomTop){
                        // 上方
                        director = 'top'
                        nRowMultiple = Math.ceil(Math.abs(mouseCell.row - clickCell.row)/diffRow)
                        this.showPainterBorderDom(clickCell.ltX,clickCell.ltY-diffHeight*nRowMultiple - offsetY,diffWidth,diffHeight*nRowMultiple)
                    }
                }


                this.canvasWrapperDom.onmouseup = evt=>{
                    evt.stopImmediatePropagation()
                    if(director === null){
                        return
                    }
                    const { SelectPlugin } = this.core.plugins
                    const tableDomStr = SelectPlugin.transformCanvasCellToTableDomStr()
                    // 查找格式刷后的第一个cell
                    const startCellArr = []
                    if(director === 'right'){
                        // 右侧
                        for(let i=1;i<=nColMultiple;i++){
                            startCellArr.push(this.searchRectByColAndRow(clickCell.col+i*diffCol,clickCell.row))
                        }
                    }else if(director === 'left'){
                        // 左侧
                        for(let i=1;i<=nColMultiple;i++){
                            startCellArr.push(this.searchRectByColAndRow(clickCell.col-i*diffCol,clickCell.row))
                        }
                    }else if(director === 'bottom'){
                        // 下侧
                        for(let i=1;i<=nRowMultiple;i++){
                            startCellArr.push(this.searchRectByColAndRow(clickCell.col,clickCell.row+i*diffRow))
                        }
                    }else if(director === 'top'){
                        // 下侧
                        for(let i=1;i<=nRowMultiple;i++){
                            startCellArr.push(this.searchRectByColAndRow(clickCell.col,clickCell.row-i*diffRow))
                        }
                    }

                    // console.log('tableDomStr',tableDomStr)
                    // console.log('startCellArr',startCellArr)

                    startCellArr.forEach(item=>{
                        SelectPlugin.transformTableDomStrToCanvasCell(tableDomStr,item)
                    })
                    this.canvasDom.onmousemove = null
                    this.canvasWrapperDom.onmouseup = null
                    this.hidePainterBorderDom()
                }

            }



        }



        canvasWrapperDom.appendChild(this.cellPainterDom)

    }

    hidePainterBorderDom(){
        this.cellPainterTopBorderDom.style.display = 'none'
        this.cellPainterBottomBorderDom.style.display = 'none'
        this.cellPainterLeftBorderDom.style.display = 'none'
        this.cellPainterRightBorderDom.style.display = 'none'
    }

    showPainterBorderDom(x,y,width,height){

        // console.log('xy',x,y,width,height)

        // top
        this.cellPainterTopBorderDom.style.left = x+'px'
        this.cellPainterTopBorderDom.style.top = y+'px'
        this.cellPainterTopBorderDom.style.width = width+'px'
        this.cellPainterTopBorderDom.style.display = 'block'

        // bottom
        this.cellPainterBottomBorderDom.style.left = x+'px'
        this.cellPainterBottomBorderDom.style.top = y+height-4+'px'
        this.cellPainterBottomBorderDom.style.width = width+'px'
        this.cellPainterBottomBorderDom.style.display = 'block'

        // left
        this.cellPainterLeftBorderDom.style.left = x+'px'
        this.cellPainterLeftBorderDom.style.top = y+'px'
        this.cellPainterLeftBorderDom.style.height = height+'px'
        this.cellPainterLeftBorderDom.style.display = 'block'

        // right
        this.cellPainterRightBorderDom.style.left = x+width - 4 +'px'
        this.cellPainterRightBorderDom.style.top = y+'px'
        this.cellPainterRightBorderDom.style.height = height+'px'
        this.cellPainterRightBorderDom.style.display = 'block'
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    showSelectedCellPainterDom(x,y){
        this.cellPainterDom.style.display = 'block'
        this.cellPainterDom.style.left = x-3+'px'
        this.cellPainterDom.style.top = y-3+'px'
        this.cellPainterDom.style.cursor = `url(${base64Img['crosshair']}) 18 18, crosshair`
    }

    /**
     * @param {number} offsetX
     * @param {number} offsetY
     */
    trendsDraw(offsetX = 0,offsetY = 0){

        const { width,height,cellHeight,cellWidth } = this.options

        const { nonSelectBgColor,selectedBorderBgColor,borderColor,selectedBgColor,copyKey } = this.core

        const lt = this.searchScreenAddr(offsetX,offsetY)
        const rb = this.searchScreenAddr(offsetX+width-cellHeight,offsetY+height-cellHeight)
        // console.log('start1',lt)
        // console.log('start2',rb)


        // const startCol = parseInt((offsetX/cellWidth).toFixed(1))
        // const endCol = parseInt(((width - cellHeight +offsetX)/cellWidth).toFixed(1))
        //
        // const startRow = parseInt((offsetY/cellHeight).toFixed(1))
        // const endRow = parseInt(((height - cellHeight + offsetY)/cellHeight).toFixed(1))

        this.layer.clearRect(cellHeight,cellHeight,width,height)

        // for(let i=startRow;i<=endRow;i++){
        //     for(let j=startCol;j<=endCol;j++){
        //         this.layer.drawStrokeRect(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,cellWidth,cellHeight)
        //         this.layer.drawText(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,'111',cellWidth,cellHeight)
        //     }
        // }

        const { copyCellDash } = this.core

        if(copyKey){
            // 绘制复制选中的范围
            if(copyCellDash.length>1){
                // 多选
                const dashFirst = copyCellDash[0]
                const dashLast = copyCellDash[copyCellDash.length-1]
                this.layer.drawDashStrokeRect(dashFirst.ltX-offsetX+2,dashFirst.ltY-offsetY+2,dashLast.ltX-dashFirst.ltX+dashLast.width-4,dashLast.ltY-dashFirst.ltY+dashLast.height-4,selectedBorderBgColor,'destination-over')
            }else if(copyCellDash.length === 1){
                // 单选
                const dashCell = copyCellDash[0]
                if(dashCell.isMerge){
                    this.layer.drawDashStrokeRect(dashCell.ltX-offsetX+2,dashCell.ltY-offsetY+2,dashCell.mergeWidth-4,dashCell.mergeHeight-4,selectedBorderBgColor,'destination-over')
                }else{
                    this.layer.drawDashStrokeRect(dashCell.ltX-offsetX+2,dashCell.ltY-offsetY+2,dashCell.width-4,dashCell.height-4,selectedBorderBgColor,'destination-over')
                }
            }

        }


        let attrFirst = null
        let attrSecond = null

        let startAndEndRect = null

        if(this.secondClickCell){
            attrFirst = this.clickCell
            attrSecond = this.secondClickCell

            let isRight = attrSecond.x>attrFirst.x
            let isBottom = attrSecond.y>attrFirst.y

            if(isRight && !isBottom){
                // 第二个在右上角
                startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrSecond.y,attrSecond.x,attrFirst.y,attrFirst,attrSecond)
            }else if(isRight && isBottom){
                // 第二个在右下角
                startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrFirst.y,attrSecond.x,attrSecond.y,attrFirst,attrSecond)
            }else if(!isRight && isBottom){
                // 第二个在左下角
                startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrFirst.y,attrFirst.x,attrSecond.y,attrFirst,attrSecond)
            }else{
                // 第二个在左上角
                startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrSecond.y,attrFirst.x,attrFirst.y,attrFirst,attrSecond)
            }

            this.startAndEndRect = startAndEndRect

            if(startAndEndRect) {

                const startRect = []
                const endRect = []

                startAndEndRect.forEach(item=>{
                    startRect.push(this.searchRectByLabel(item.mergeStartLabel))
                    endRect.push(this.searchRectByLabel(item.mergeEndLabel))
                })

                const startArr = startRect.concat([attrFirst, attrSecond])
                const endArr = endRect.concat([attrFirst, attrSecond])


                const startCol = startArr.sort((a, b) => a.x - b.x)[0].col
                const startRow = startArr.sort((a, b) => a.y - b.y)[0].row
                const endCol = endArr.sort((a, b) => a.x - b.x)[endArr.length - 1].col
                const endRow = endArr.sort((a, b) => a.y - b.y)[endArr.length - 1].row

                // console.log('startAndEndRect', startAndEndRect)

                // console.log('startCol,startRow', startCol, startRow, endCol, endRow)

                attrFirst = this.searchRectByColAndRow(startCol, startRow)
                attrSecond = this.searchRectByColAndRow(endCol, endRow)


                this.attrFirst = attrFirst
                this.attrSecond = attrSecond
                // console.log('attrFirst+attrSecond', attrFirst, attrSecond)


            }
        }

        // const lt = this.searchScreenAddr(offsetX,offsetY)
        // const rb = this.searchScreenAddr(offsetX+width-cellHeight,offsetY+height-cellHeight)
        // console.log('start1',lt)
        // console.log('start2',rb)


        const startCol = lt.col
        const endCol = rb.col

        const startRow = lt.row
        const endRow = rb.row

        const { contentGroup } = this
        // 选中绘制
        if(this.clickRectShow){
            if(this.isColSelect && !this.isRowSelect){
                // 竖向整个选中
                // console.log('-offsetY+cellHeight',-offsetY+cellHeight,this.core.offsetYLock)
                this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,cellHeight,this.clickCell.width,this.core.isScrollBottomBound?height-cellHeight:height,selectedBorderBgColor,'destination-over',2)
            }else if(this.isRowSelect && !this.isColSelect){
                // 横向整个选中
                this.layer.drawStrokeRect(cellHeight,this.clickCell.y-offsetY+cellHeight,this.core.isScrollRightBound?width-cellHeight:width,cellHeight,selectedBorderBgColor,'destination-over',2)
            }else if(this.isRowSelect && this.isColSelect){
                // 整个选中
                this.layer.drawStrokeRect(cellHeight,cellHeight,this.core.isScrollRightBound?width-cellHeight:width,this.core.isScrollBottomBound?height-cellHeight:height,selectedBorderBgColor,'destination-over',2)
            }else{
                // console.log('secondClickCell',this.secondClickCell)
                if(!this.secondClickCell){
                    if(this.clickCell.isMerge){
                        const {mergeWidth,mergeHeight} = this.clickCell
                        // console.log('多个选中框',this.clickCell)
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBorderBgColor,'destination-over',2)
                        this.showSelectedCellDom(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,mergeWidth,mergeHeight)
                    }else{
                        // console.log('单个选中框',this.clickCell)
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,this.clickCell.width,this.clickCell.height,selectedBorderBgColor,'destination-over',2)
                        this.showSelectedCellDom(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,this.clickCell.width,this.clickCell.height)
                    }

                }else if(!startAndEndRect){
                    if(this.secondClickCell.x >= this.clickCell.x){
                        // 最后一个在右边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.secondClickCell.x-this.clickCell.x+this.secondClickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                        this.showSelectedCellDom(this.clickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.secondClickCell.x-this.clickCell.x+this.secondClickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height)
                    }else{
                        // 最后一个在左边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.secondClickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.clickCell.x-this.secondClickCell.x+this.clickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                        this.showSelectedCellDom(this.secondClickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.clickCell.x-this.secondClickCell.x+this.clickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height)
                    }
                }else if(startAndEndRect){
                    this.layer.drawStrokeRect(attrFirst.x+cellHeight-offsetX,attrFirst.y-offsetY+cellHeight,attrSecond.x-attrFirst.x+attrSecond.width,attrSecond.y-attrFirst.y+attrSecond.height,selectedBorderBgColor,'destination-over',2)
                    this.showSelectedCellDom(attrFirst.x+cellHeight-offsetX,attrFirst.y-offsetY+cellHeight,attrSecond.x-attrFirst.x+attrSecond.width,attrSecond.y-attrFirst.y+attrSecond.height)
                }


            }
        }

        // 多人协作绘制选中
        this.drawMulPersonSelected(offsetX,offsetY)


        this.moreSelectedCell = []
        this.mergeSelectedCell = []

        // console.log('x,y,x,y',ltCol,ltRow,rbCol,rbRow)

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]
            const {row,col,text,x,y,width,height} = tempRect

            if((col>=startCol && col<=endCol) && (row>=startRow && row<=endRow)){
                // 多个选中除了第一个之外的渲染
                // 合并渲染从左上角开始
                if(tempRect.isMerge){
                    if(tempRect.label === tempRect.mergeStartLabel){
                        const {mergeWidth,mergeHeight} = tempRect
                        // console.log('背景色',tempRect)
                        this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,mergeWidth,mergeHeight,borderColor,'destination-over',1)
                        this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,mergeWidth,mergeHeight,'destination-over',tempRect.fontColor,tempRect.textAlign,{fontSize:tempRect.fontsize,fontFamily:tempRect.fontFamily,fontWeight:tempRect.fontWeight,fontItalic:tempRect.fontItalic},tempRect.textBaseline)
                        this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,mergeWidth,mergeHeight,tempRect.bgColor?tempRect.bgColor:nonSelectBgColor,'destination-over',1)
                    }else{
                        // 如果左上角不在屏幕内，渲染左上角
                        const tempMergeStartRect = this.searchRectByLabel(tempRect.mergeStartLabel)
                        if(!((tempMergeStartRect.col>=startCol && tempMergeStartRect.col<=endCol) && (tempMergeStartRect.row>=startRow && tempMergeStartRect.row<=endRow))){
                            this.layer.drawStrokeRect(tempMergeStartRect.x-offsetX+cellHeight,tempMergeStartRect.y-offsetY+cellHeight,tempMergeStartRect.mergeWidth,tempMergeStartRect.mergeHeight,borderColor,'destination-over',1)
                            this.layer.drawText(tempMergeStartRect.x-offsetX+cellHeight,tempMergeStartRect.y-offsetY+cellHeight,tempMergeStartRect.text,tempMergeStartRect.mergeWidth,tempMergeStartRect.mergeHeight,'destination-over',tempMergeStartRect.fontColor,tempMergeStartRect.textAlign,{fontsize:tempMergeStartRect.fontSize,fontFamily:tempMergeStartRect.fontFamily,fontWeight:tempMergeStartRect.fontWeight,fontItalic:tempMergeStartRect.fontItalic},tempMergeStartRect.textBaseline)
                            this.layer.drawFillRect(tempMergeStartRect.x-offsetX+cellHeight,tempMergeStartRect.y-offsetY+cellHeight,tempMergeStartRect.mergeWidth,tempMergeStartRect.mergeHeight,tempMergeStartRect.bgColor?tempMergeStartRect.bgColor:nonSelectBgColor,'destination-over',1)
                        }
                    }

                }else if(!tempRect.isMerge){
                    this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,borderColor,'destination-over',1)
                    this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,width,height,'destination-over',tempRect.fontColor,tempRect.textAlign,{fontSize:tempRect.fontSize,fontFamily:tempRect.fontFamily,fontWeight:tempRect.fontWeight,fontItalic:tempRect.fontItalic},tempRect.textBaseline)
                    this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,tempRect.bgColor?tempRect.bgColor:nonSelectBgColor,'destination-over',1)
                }
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'#EBF4FF','destination-over',1)
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'red','destination-over')
            }


            if(this.secondClickCell){

                const ltCol= startAndEndRect?(attrSecond.col>attrFirst.col?attrFirst.col:attrSecond.col):(this.secondClickCell.col>this.clickCell.col?this.clickCell.col:this.secondClickCell.col)
                const ltRow= startAndEndRect?(attrSecond.row>attrFirst.row?attrFirst.row:attrSecond.row):(this.secondClickCell.row>this.clickCell.row?this.clickCell.row:this.secondClickCell.row)
                const rbCol= startAndEndRect?(attrSecond.col>attrFirst.col?attrSecond.col:attrFirst.col):(this.secondClickCell.col>this.clickCell.col?this.secondClickCell.col:this.clickCell.col)
                const rbRow= startAndEndRect?(attrSecond.row>attrFirst.row?attrSecond.row:attrFirst.row):(this.secondClickCell.row>this.clickCell.row?this.secondClickCell.row:this.clickCell.row)
                if((col>=ltCol && col<=rbCol) && (row>=ltRow && row<=rbRow)){
                    // console.log('x+cellHeight-offsetX',x+cellHeight-offsetX)
                    // this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
                    this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
                    if(!(tempRect.col === this.clickCell.col && tempRect.row === this.clickCell.row)){
                        this.mergeSelectedCell.push(tempRect)
                    }
                    this.moreSelectedCell.push(tempRect)
                }

            }
            // else if(this.secondClickCell && this.secondClickCell.isMerge){
            //     // 选中的是合并的单元格
            //     const {mergeWidth,mergeHeight} = this.countMergeWidthAndHeight(tempRect)
            //     this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBgColor,'destination-over')
            // }
            if(this.isRowSelect && this.isColSelect){
                this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
            }
        }




    }

    searchScreenAddr(offsetX = 0,offsetY = 0){

        const currentTime = performance.now();

        const { contentGroup } = this

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;



        for(let i=0;i<contentGroup.length;i++){
            const tempContentSin = contentGroup[i]
            startX = tempContentSin.x
            endX = startX+tempContentSin.width

            startY = tempContentSin.y
            endY = startY+tempContentSin.height

            if((startX<=offsetX && offsetX<=endX) && (startY<=offsetY && offsetY<=endY)){
                const endTime = performance.now();

                // console.log('endTime - currentTime',endTime - currentTime)
                return tempContentSin
            }
        }



    }

    countMergeWidthAndHeight(tempRect){
        let mergeWidth = tempRect.width
        let mergeHeight = tempRect.height

        tempRect.mergeLabelGroup.forEach(item=>{
            if(tempRect.row === item.row){
                mergeWidth += item.width
            }
            if(tempRect.col === item.col){
                mergeHeight += item.height
            }
        })
        return {mergeWidth,mergeHeight}
    }


    searchRectIsMerge(startX,startY,endX,endY,attrFirst,attrSecond){
        const { contentGroup } = this

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        const res = contentGroup.filter(item=>
            (
                (item.x>=startX && item.x<=endX) && (item.y>=startY && item.y<=endY) && item.isMerge)
                &&
                ([attrFirst.row,attrSecond.row].includes(item.row) || [attrFirst.col,attrSecond.col].includes(item.col))
            )
        // console.log('res',res)
        if(res.length > 0){
            return res
        }else {
            return null
        }

    }

    searchRectByLabel(label){
        const { contentGroup } = this
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.label === label)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectByColAndRow(col,row){
        const { contentGroup } = this
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.col === col && item.row === row)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectIndexByColAndRow(col,row){
        const { contentGroup } = this
        // console.log('col',col)
        return  contentGroup.findIndex(item=>item.col === col && item.row === row)
    }

    changeRectTextByLabel(attr){
        const rect = this.searchRectByLabel(attr.label)
        if(rect){
            rect.text = attr.text
        }
    }

    /**
     * @param {number} col
     * @returns {*[]}
     */
    searchRectArrByCol(col){
        const { contentGroup } = this
        return contentGroup.filter(item=>item.col === col)
    }

    /**
     * @param {number} row
     * @returns {*[]}
     */
    searchRectArrByRow(row){
        const { contentGroup } = this
        return contentGroup.filter(item=>item.row === row)
    }

    isHasMergerInRectArrByCol(col){
        return this.searchRectArrByCol(col).some(item=>item.isMerge)
    }

    isHasMergerInRectArrByRow(row){
        return this.searchRectArrByRow(row).some(item=>item.isMerge)
    }

    initContentGroupRowAndColByCol(startCol,num){
        const { contentGroup } = this
        const { cellHeight } = this.options
        this.core.col += num
        const { col } = this.core


        let curRow = 0
        let curCol = 1

        // console.log('col',col)

        let countSheetWidth = 0;

        for(let i=0,n=contentGroup.length;i<n;i++){

            const tempRect = contentGroup[i]

            if((i+1)%col === 1){
                curCol = 1
                curRow += 1
                countSheetWidth = 0
            }
            // console.log('curRow',curRow)
            if(tempRect.col >= startCol){
                // console.log('curCol',curCol)
                tempRect.col = curCol
                tempRect.x = countSheetWidth
                tempRect.ltX = countSheetWidth+cellHeight

                if(tempRect.col >= 27){
                    tempRect.label = String.fromCharCode(65+tempRect.col-27)+String.fromCharCode(65 + tempRect.col-27)+tempRect.row
                }else{
                    tempRect.label = String.fromCharCode(65 + tempRect.col - 1)+tempRect.row
                }
                if(tempRect.isMerge){

                    let oriStartCol = 0
                    let oriEndCol = 0
                    let startLabel = tempRect.mergeStartLabel.replace(/[0-9]/,'')
                    let endLabel = tempRect.mergeEndLabel.replace(/[0-9]/,'')
                    let startLabelRow = tempRect.mergeStartLabel.replace(/[A-Z]/,'')
                    let endLabelRow = tempRect.mergeEndLabel.replace(/[A-Z]/,'')
                    // console.log('----',startLabel,endLabel)
                    // console.log('----',startLabelRow,endLabelRow)
                    for(let s=0;s<startLabel.length;s++){
                        oriStartCol += tempRect.mergeStartLabel.charCodeAt(s) - 65 + num
                    }
                    for(let s=0;s<endLabel.length;s++){
                        oriEndCol += tempRect.mergeEndLabel.charCodeAt(s) - 65 + num
                    }

                    if(oriStartCol >= 27){
                        tempRect.mergeStartLabel = String.fromCharCode(65+oriStartCol-26)+String.fromCharCode(65 + oriStartCol-26)+startLabelRow
                        tempRect.mergeEndLabel = String.fromCharCode(65+oriEndCol-26)+String.fromCharCode(65 + oriEndCol-26)+endLabelRow
                    }else{
                        tempRect.mergeStartLabel = String.fromCharCode(65+oriStartCol)+startLabelRow
                        tempRect.mergeEndLabel = String.fromCharCode(65+oriEndCol)+endLabelRow
                    }

                }
            }

            curCol += 1
            countSheetWidth += tempRect.width
        }

    }

    initContentGroupRowAndColByRow(startRow,num){
        const { contentGroup } = this
        const { cellHeight } = this.options
        this.core.row += num
        const { col } = this.core


        let curRow = 0
        let curCol = 1

        // console.log('startRow',startRow)

        let countSheetHeight = 0;
        let countSheetWidth = 0;

        for(let i=0,n=contentGroup.length;i<n;i++){

            const tempRect = contentGroup[i]

            if((i+1)%col === 1){
                curCol = 1
                curRow += 1
                if(curRow > 1){
                    countSheetHeight += tempRect.height
                }
                countSheetWidth = 0
            }
            // console.log('curRow',curRow)
            if(tempRect.row >= startRow){
                // console.log('curRow',curRow)
                tempRect.row = curRow
                tempRect.y = countSheetHeight
                tempRect.ltY = countSheetHeight+cellHeight
                tempRect.x = countSheetWidth
                tempRect.ltX = countSheetWidth+cellHeight

                if(tempRect.label === 'insert'){
                    if(tempRect.col >= 27){
                        tempRect.label = String.fromCharCode(65+tempRect.col-27)+String.fromCharCode(65 + tempRect.col-27)+tempRect.row
                    }else{
                        tempRect.label = String.fromCharCode(65 + tempRect.col - 1)+tempRect.row
                    }
                }else{
                    tempRect.label = tempRect.label.replace(/[0-9]/,curRow)
                }

                // if(tempRect.col >= 27){
                //     tempRect.label = String.fromCharCode(65+tempRect.col-27)+String.fromCharCode(65 + tempRect.col-27)+tempRect.row
                // }else{
                //     tempRect.label = String.fromCharCode(65 + tempRect.col - 1)+tempRect.row
                // }
                if(tempRect.isMerge){

                    let startLabel = tempRect.mergeStartLabel.replace(/[0-9]/,'')
                    let endLabel = tempRect.mergeEndLabel.replace(/[0-9]/,'')
                    let startLabelRow = parseInt(tempRect.mergeStartLabel.replace(/[A-Z]/,''))
                    let endLabelRow = parseInt(tempRect.mergeEndLabel.replace(/[A-Z]/,''))
                    // console.log('----',startLabel,endLabel)
                    // console.log('----',startLabelRow,endLabelRow)
                    tempRect.mergeStartLabel = startLabel+(startLabelRow+num)
                    tempRect.mergeEndLabel = endLabel+(endLabelRow+num)

                }
            }

            curCol += 1
            countSheetWidth += tempRect.width
        }

    }

}