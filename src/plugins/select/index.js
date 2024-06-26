
export default class SelectPlugin{

    options = {}

    core = null


    selectorDom = null
    contentComponent = null
    headerComponent = null
    sideBorderLine = null

    clickContext = null
    inputDom = null

    copyKey = ['text','mergeWidth','mergeHeight','mergeRow','mergeCol','isMerge','bgColor','fontColor']

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.settingPlugin = core.plugins.SettingPlugin
        this.options = options
        this.layer = layer
        this.core = core
        this.showClickHandler()
        this.moreSelect()
        this.displayColTextRegister()
    }

    /**
     * @param {Object} firstRect
     * @param {Object} finalRect
     * @returns {Boolean}
     */
    searchRectIsMergeInTwoCell(firstRect,finalRect){
        const { contentGroup } = this.contentComponent

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)
        if(finalRect === null){
            return firstRect.isMerge
        }
        // console.log('res',res)
        return contentGroup.filter(item => item.col >= firstRect.col && item.row >= firstRect.row && item.col <= finalRect.col && item.row <= finalRect.row).some(item => item.isMerge)

    }

    displayAllTextByCol(col,width){

        const { cellHeight } = this.options

        const { contentGroup } = this.contentComponent

        const allCol = contentGroup.filter(item=>item.col === col)
        const allColTextWidth = allCol.map(item=>this.layer.ctx.measureText(item.text).width+cellHeight)
        allColTextWidth.push(width)

        const maxWidth = allColTextWidth.sort((a,b)=>a-b)[allColTextWidth.length-1]
        // console.log('maxWidth',maxWidth)
        this.core.plugins.DragPlugin.expandWidthNoDrag(col,maxWidth-width)
    }

    displayColTextRegister(){
        this.canvasDom.addEventListener('dblclick',evt=>{

            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const x = evt.offsetX + offsetX

            if(evt.offsetY<=cellHeight){
                let clickHeaderRect = null

                const { headerRectGroup } = this.headerComponent
                for(let i=0;i<headerRectGroup.length;i++){
                    const tempHeader = headerRectGroup[i]
                    if(x>tempHeader.ltX && x<(tempHeader.ltX+tempHeader.width)){
                        clickHeaderRect = tempHeader
                        break
                    }
                }
                // console.log('clickHeaderRect',clickHeaderRect)
                this.displayAllTextByCol(clickHeaderRect.col,clickHeaderRect.width)

            }
        })
    }


    copyText(text){
        if(navigator.clipboard){
            navigator.clipboard.writeText(text)
        }
    }

    searchMergeArr(startCol,startRow,endCol,endRow){
        const resArr = []
        const { contentGroup } = this.contentComponent
        contentGroup.forEach(item=>{
            if(item.col>=startCol && item.col <= endCol && item.row>=startRow && item.row<=endRow){
                resArr.push(item)
            }
        })
        return resArr.splice(1,resArr.length)
    }

    copyRect(clickCell,json){
        let mergeWidth = clickCell.width
        let mergeHeight = clickCell.height
        const mergerGroup = this.searchMergeArr(clickCell.col, clickCell.row, clickCell.col + json.mergeCol - 1, clickCell.row + json.mergeRow - 1)
        // console.log('mergerGroup',mergerGroup)
        // clickCell.mergeLabelGroup = mergerGroup
        clickCell.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label
        clickCell.mergeStartLabel = clickCell.label
        clickCell.isMerge = true
        // clickCell.mergeRow = 1
        // clickCell.mergeCol = 1
        mergerGroup.forEach(item=> {
            item.isMerge = true
            item.mergeStartLabel = clickCell.label
            item.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label
            if(clickCell.row === item.row && clickCell.label !== item.label){
                mergeWidth+=item.width
                // clickCell.mergeCol += 1
            }
            if(clickCell.col === item.col && clickCell.label !== item.label){
                mergeHeight+=item.height
                // clickCell.mergeRow += 1
            }
        })
        clickCell.mergeWidth = mergeWidth
        clickCell.mergeHeight = mergeHeight
    }

    /**
     * @param {Object} cell
     * @param {Object} attr
     * @param {Array<string>} notInclude
     */
    setCellAttr(cell,attr,notInclude=['row','col','x','y','ltX','ltY','mergeStartLabel','mergeEndLabel','label','isFromExcel','width','height']){
        for(let k in attr){
            if(!notInclude.includes(k)){
                cell[k] = attr[k]
            }
        }
        if(attr['isMerge']){
            cell['mergeStartLabel'] = String.fromCharCode(65 + cell.col - 1)+(cell.row)
            cell['mergeEndLabel'] = String.fromCharCode(65 + cell.col+cell.mergeCol - 2)+(cell.row+cell.mergeRow-1)
            // console.log('cell',cell)
        }
    }

    /**
     * @param {Object} cell
     * @param {Object} attr
     *
     */
    copyCellAttr(cell,attr){
        for(let k in attr){
            cell[k] = attr[k]
        }
    }


    /**
     * @param {HTMLElement} table
     */
    tableDomToArr(table){
        const tableArr = []
        const trs = table.querySelectorAll('tr')
        for(let i=0;i<trs.length;i++){
            tableArr[i] = []
            const tds = trs[i].querySelectorAll('td')
            for(let j=0;j<tds.length;j++){
                tableArr[i].push(tds[j])
            }
        }
        return tableArr
    }

    /**
     * @param {string} tableDomStr
     * @returns {Array<HTMLTableCellElement> | null}
     */
    transformTableDomStrToDom(tableDomStr){
        const { h } = this.core

        const domParser = new DOMParser();
        const html = domParser.parseFromString(tableDomStr,'text/html')
        const css = html.querySelector('style')?html.querySelector('style').sheet.cssRules:[]
        // console.log('table',html.querySelector('style'))
        // console.log('html-table',html.querySelector('table'))
        const table = html.querySelector('table')
        if(!table){
            return null
        }

        const tableArr = this.tableDomToArr(table)

        // console.log('tableArr',tableArr)

        const tdDom = h('td')

        for(let i=0;i<tableArr.length;i++){
            const tds = tableArr[i]
            // console.log('tds.length',tds.length)
            for(let j=0;j<tds.length;j++){
                const tempTdDom = tds[j]

                if(!tempTdDom){
                    tableArr[i].push(tdDom.cloneNode())
                }

                if(tempTdDom.rowSpan > 1){
                    for(let k=1,kn=tempTdDom.rowSpan;k<kn;k++){
                        tableArr[i+k].splice(j,0,tdDom.cloneNode())
                    }
                }

                if(tempTdDom.colSpan > 1){
                    (new Array(tempTdDom.colSpan-1)).fill(0).forEach(_=>{
                        tableArr[i].splice(j+1,0,tdDom.cloneNode())
                    })
                }


            }
            // console.log('tableArr--td-arr',tableArr[i])
        }
        return tableArr;
    }

    /**
     * @param {string} tableDomStr
     * @param {Object} clickCell
     * @param {Boolean} changeClickCell
     */
    transformTableDomStrToCanvasCell(tableDomStr,clickCell,changeClickCell = true){

        const { h } = this.core

        const domParser = new DOMParser();
        const html = domParser.parseFromString(tableDomStr,'text/html')
        const css = html.querySelector('style')?html.querySelector('style').sheet.cssRules:[]
        // console.log('table',html.querySelector('style'))
        // console.log('html-table',html.querySelector('table'))
        const table = html.querySelector('table')
        if(!table){
            return
        }

        const trs = table.querySelectorAll('tr')

        const tableArr = this.tableDomToArr(table)

        // console.log('tableArr',tableArr)

        const tdDom = h('td')

        for(let i=0;i<tableArr.length;i++){
            const tds = tableArr[i]
            // console.log('tds.length',tds.length)
            for(let j=0;j<tds.length;j++){
                const tempTdDom = tds[j]

                if(!tempTdDom){
                    tableArr[i].push(tdDom.cloneNode())
                }

                if(tempTdDom.rowSpan > 1){
                    for(let k=1,kn=tempTdDom.rowSpan;k<kn;k++){
                        tableArr[i+k].splice(j,0,tdDom.cloneNode())
                    }
                }

                if(tempTdDom.colSpan > 1){
                    (new Array(tempTdDom.colSpan-1)).fill(0).forEach(_=>{
                        tableArr[i].splice(j+1,0,tdDom.cloneNode())
                    })
                }


            }
            // console.log('tableArr--td-arr',tableArr[i])
        }
        // console.log('tableArr',tableArr)

        const tdCount = tableArr.length
        let endSearchRect = null
        for(let i=0;i<tableArr.length;i++){
            const tds = tableArr[i]
            for(let j=0;j<tds.length;j++){

                const tempTdDom = tds[j]

                // console.log(tempTdDom.rowSpan,'tempTdDom.rowSpan')
                // console.log(tempTdDom.colSpan,'tempTdDom.colSpan')

                let tempTd = {}

                if(tds[j].getAttribute('data-json')){
                    tempTd = JSON.parse(tds[j].getAttribute('data-json'))
                }else{

                    let bgColor = ''
                    let fontColor = ''
                    let textAlign = ''
                    let font = ''
                    let fontSize = null
                    let fontFamily = ''

                    for(let ci=0,cn=css.length;ci<cn;ci++){
                        if(tempTdDom.className === css[ci].selectorText.replace('.','')){
                            bgColor = css[ci].style.backgroundColor!==''?css[ci].style.backgroundColor:null
                            fontColor = css[ci].style.color!==''?css[ci].style.color:null
                            textAlign = css[ci].style.textAlign!==''?css[ci].style.textAlign:'center'
                            fontSize = css[ci].style.fontSize!==''?css[ci].style.fontSize.replace('pt',''):12
                            fontFamily = css[ci].style.fontFamily!==''?css[ci].style.fontFamily:null
                        }
                    }

                    font = fontSize+' '+fontFamily

                    tempTd = {
                        mergeRow:tempTdDom.rowSpan>1?tempTdDom.rowSpan:(tempTdDom.colSpan>1?1:0),
                        mergeCol:tempTdDom.colSpan>1?tempTdDom.colSpan:(tempTdDom.rowSpan>1?1:0),
                        isMerge:((tempTdDom.colSpan && tempTdDom.colSpan>1)||(tempTdDom.rowSpan && tempTdDom.rowSpan>1)),
                        text:tempTdDom.innerText,
                        isFromExcel:true,
                        bgColor,
                        fontColor,
                        font,
                        fontSize:fontSize??12,
                        fontFamily
                    }
                }
                // console.log('tempTd',tempTd)

                const tempSearchRect = this.searchRectByColAndRow(clickCell.col+j,clickCell.row+i)
                if(i===trs.length-1 && j===tds.length-1){
                    endSearchRect = tempSearchRect
                }
                if(tempTd.isMerge){
                    // console.log('tempTd',tempTd)
                    const rowLen = tempSearchRect.row+tempTd.mergeRow
                    const colLen = tempSearchRect.col+tempTd.mergeCol
                    // console.log('rowLen',rowLen)
                    // console.log('colLen',colLen)
                    // console.log('tempSearchRect.row',tempSearchRect.row)
                    // console.log('tempSearchRect.col',tempSearchRect.col)
                    // console.log('tempSearchRect',tempSearchRect)
                    for(let i=tempSearchRect.row;i<rowLen;i++){
                        for(let j=tempSearchRect.col;j<colLen;j++){
                            // console.log('合并',this.searchRectByColAndRow(j,i))
                            if(i===tempSearchRect.row&&j===tempSearchRect.col){
                                this.setCellAttr(tempSearchRect,tempTd)
                                if(tempTd.isFromExcel){
                                    tempSearchRect.mergeWidth = tempSearchRect.width
                                    tempSearchRect.mergeHeight = tempSearchRect.height
                                }
                            }else{
                                const tempMergeRect = this.searchRectByColAndRow(j,i)
                                tempMergeRect.isMerge = true
                                tempMergeRect.mergeStartLabel = tempSearchRect.mergeStartLabel
                                tempMergeRect.mergeEndLabel = tempSearchRect.mergeEndLabel
                                if(tempTd.isFromExcel){
                                    if(tempMergeRect.col === tempSearchRect.col){
                                        tempSearchRect.mergeHeight += tempMergeRect.height
                                    }
                                    if(tempMergeRect.row === tempSearchRect.row){
                                        tempSearchRect.mergeWidth += tempMergeRect.width
                                    }
                                }
                                // console.log('tempMergeRect',tempMergeRect)
                                // console.log('tempMergeRect.isMerge',tempMergeRect.isMerge)
                            }
                        }
                    }
                    // console.log('有合并----')
                    // console.log('tempSearchRect',tempSearchRect)
                }else{
                    // console.log('没合并····')
                    // console.log('tempSearchRect',tempSearchRect)
                    // console.log('clickCell',clickCell)
                    // console.log('tempTd',tempTd)
                    // console.log('colDiff',colDiff)
                    // console.log('rowDiff',rowDiff)
                    // console.log('tempTd',tempTd.isMerge)
                    if(!tempSearchRect.isMerge){
                        // 目标不是合并单元格
                        this.setCellAttr(tempSearchRect,tempTd)
                    }
                }

            }
        }
        if(tdCount === 0){
            endSearchRect = null
        }
        // console.log('endSearchRect',endSearchRect)
        changeClickCell && this.contentComponent.showClickRect(clickCell)
        // this.contentComponent.setSecondClickCell(endSearchRect)
        this.core.fresh()
    }

    transformCanvasCellToTableDomStr(){
        const { clickCell,secondClickCell,clickRectShow,moreSelectedCell } = this.contentComponent
        const { h } = this.core
        if(clickRectShow){
            // 一个框
            // console.log('moreSelectedCell',moreSelectedCell)

            const table = h('table')

            const oriTr = h('tr')
            const oriTd = h('td')

            if(clickCell && !secondClickCell){

                if(clickCell.isMerge){
                    const finalRow = clickCell.row+clickCell.mergeRow
                    for(let i=clickCell.row;i<finalRow;i++){
                        const tr = oriTr.cloneNode()
                        if(i === clickCell.row){
                            const td = oriTd.cloneNode()
                            this.setTdAttrs(td,clickCell)
                            tr.appendChild(td)
                            // console.log('td',td)
                        }

                        table.appendChild(tr)
                    }
                    // console.log('clickCell',clickCell)
                }else{
                    const tr = oriTr.cloneNode()
                    const td = oriTd.cloneNode()
                    this.setTdAttrs(td,clickCell)
                    tr.appendChild(td)
                    table.appendChild(tr)
                    // console.log('table',table.outerHTML)
                }
                // console.log('clickCell',clickCell)
            }else if(secondClickCell){
                let tempRow = 0
                let tr = null
                for(let i=0;i<moreSelectedCell.length;i++){
                    const tempRect = moreSelectedCell[i]
                    if(tempRow !== tempRect.row){
                        tempRow = tempRect.row
                        tr = oriTr.cloneNode()
                        table.appendChild(tr)
                    }

                    if((tempRect.isMerge && tempRect.label === tempRect.mergeStartLabel) || !tempRect.isMerge){
                        const td = oriTd.cloneNode()
                        this.setTdAttrs(td,tempRect)
                        tr.appendChild(td)
                    }
                }
                // 复制多个
                // console.log('复制moreSelectedCell',moreSelectedCell)
            }
            // console.log('复制的table',table)
            const tableDomStr = table.outerHTML

            oriTr.remove()
            oriTd.remove()
            return tableDomStr
            // this.copyText('<html><body><table><tr><td style="color:red">测试</td></tr></table></body></html>')
        }
    }

    /**
     * @description 根据传入参数转化为dom-string clickCell与moreSelectedCell在一块
     * @param {Object} clickCell
     * @param {Object} secondClickCell
     * @param {Boolean} clickRectShow
     * @param {Array} moreSelectedCell
     * @returns {string}
     */
    transformCanvasCellToTableDomStrByParams(clickCell,secondClickCell,clickRectShow,moreSelectedCell){
        const { h } = this.core
        if(clickRectShow){
            // 一个框
            // console.log('moreSelectedCell',moreSelectedCell)

            const table = h('table')

            const oriTr = h('tr')
            const oriTd = h('td')

            if(clickCell && !secondClickCell){

                if(clickCell.isMerge){
                    const finalRow = clickCell.row+clickCell.mergeRow
                    for(let i=clickCell.row;i<finalRow;i++){
                        const tr = oriTr.cloneNode()
                        if(i === clickCell.row){
                            const td = oriTd.cloneNode()
                            this.setTdAttrs(td,clickCell)
                            tr.appendChild(td)
                            // console.log('td',td)
                        }

                        table.appendChild(tr)
                    }
                    // console.log('clickCell',clickCell)
                }else{
                    const tr = oriTr.cloneNode()
                    const td = oriTd.cloneNode()
                    this.setTdAttrs(td,clickCell)
                    tr.appendChild(td)
                    table.appendChild(tr)
                    // console.log('table',table.outerHTML)
                }
                // console.log('clickCell',clickCell)
            }else if(secondClickCell){
                let tempRow = 0
                let tr = null
                for(let i=0;i<moreSelectedCell.length;i++){
                    const tempRect = moreSelectedCell[i]
                    if(tempRow !== tempRect.row){
                        tempRow = tempRect.row
                        tr = oriTr.cloneNode()
                        table.appendChild(tr)
                    }

                    if((tempRect.isMerge && tempRect.label === tempRect.mergeStartLabel) || !tempRect.isMerge){
                        const td = oriTd.cloneNode()
                        this.setTdAttrs(td,tempRect)
                        tr.appendChild(td)
                    }
                }
                // 复制多个
                // console.log('复制moreSelectedCell',moreSelectedCell)
            }
            // console.log('复制的table',table)
            const tableDomStr = table.outerHTML

            oriTr.remove()
            oriTd.remove()
            return tableDomStr
            // this.copyText('<html><body><table><tr><td style="color:red">测试</td></tr></table></body></html>')
        }
    }

    /**
     * @param {number} diffCol
     * @param {number} diffRow
     * @param {Object} clickCell
     * @returns {Array}
     */
    searchPastePositionCells(diffCol,diffRow,clickCell){
        const moreCells = []
        const finalCol = diffCol+clickCell.col
        const finalRow = diffRow+clickCell.row
        for(let i=clickCell.row;i<=finalRow;i++){
            for(let j=clickCell.col;j<=finalCol;j++){
                moreCells.push(this.contentComponent.searchRectByColAndRow(j,i))
            }
        }
        return moreCells
    }

    /**
     * @description 强制更改cell
     * @param {Array} moreCells
     */
    forcePasteCellToNewCell(moreCells){
        moreCells.forEach(item=>{
            const tempRect = this.contentComponent.searchRectByLabel(item.label)
            this.copyCellAttr(tempRect,item)
        })
    }

    /**
     * @description 通过目标cell强制更改
     * @param {Array} moreCells
     * @param {Object} targetCell
     */
    forcePasteCellToNewCellByTargetCell(moreCells,targetCell){
        const firstCell = moreCells[0]
        moreCells.forEach(item=>{
            const tempRect = this.contentComponent.searchRectByColAndRow(item.col - firstCell.col+targetCell.col,item.row-firstCell.row+targetCell.row)
            this.copyCellAttr(tempRect,item)
        })
    }

    clearCopyDash(){
        this.copyText('')
        this.core.copyKey = false
        this.core.copyCellDash = []
        this.core.freshContent()
    }

    moreSelect(){

        document.addEventListener('paste',event=>{
            const { clickRectShow,clickCell } = this.contentComponent

            // 判断是否是从其他的表格复制的数据
            const pasteStr = event.clipboardData.getData('text/html')
            const tableDom = this.transformTableDomStrToDom(pasteStr)
            // console.log('tableDom',tableDom)
            if(Array.isArray(tableDom) && !tableDom[0][0].getAttribute('data-json')){
                // 不在本表格复制
                let beforePasteStr = ''
                const rowDiff = tableDom.length
                const colDiff = tableDom[0].length
                beforePasteStr = JSON.stringify(this.searchPastePositionCells(colDiff-1,rowDiff-1,clickCell))

                // 一个框
                this.core.plugins.SettingPlugin.changeStepArr({
                    type:15,
                    pre:{
                        label:clickCell.label,
                        pasteStr:beforePasteStr
                    },
                    next:{
                        label:clickCell.label,
                        pasteStr
                    }
                })
                this.core.ws.wsSend(15,{pasteStr,label:clickCell.label})
                this.transformTableDomStrToCanvasCell(pasteStr,clickCell)
                this.contentComponent.setSecondClickCell(null)
                return;
            }



            if(this.core.copyCellDash.length === 1){
                if(this.searchRectIsMergeInTwoCell(clickCell,null)){
                    this.settingPlugin.showDialog('提示','合并的单元格无法粘贴内容')
                    return
                }
                const finalDashCell = this.core.copyCellDash[0];
                // 粘贴板中是合并单元格，覆盖了选中的单元格附近的合并单元格则不能粘贴
                if(finalDashCell.isMerge){
                    const finalRect = this.contentComponent.searchRectByColAndRow(clickCell.col+finalDashCell.mergeCol-1,clickCell.row+finalDashCell.mergeRow - 1)
                    if(this.searchRectIsMergeInTwoCell(clickCell,finalRect)){
                        this.settingPlugin.showDialog('提示','合并的单元格无法粘贴内容')
                        return
                    }
                }
            }else if(this.core.copyCellDash.length > 1){
                const firstCell = this.core.copyCellDash[0]
                const finalCell = this.core.copyCellDash[this.core.copyCellDash.length - 1]
                const finalRect = this.contentComponent.searchRectByColAndRow(clickCell.col+finalCell.col-firstCell.col,clickCell.row+finalCell.row-firstCell.row)
                if(this.searchRectIsMergeInTwoCell(clickCell,finalRect)){
                    this.settingPlugin.showDialog('提示','合并的单元格无法粘贴内容')
                    return
                }
            }

            if(clickRectShow && this.core.copyCellDash.length>0){
                let beforePasteStr = ''
                const firstCell = this.core.copyCellDash[0]
                const finalCell = this.core.copyCellDash[this.core.copyCellDash.length - 1]
                if(this.core.copyCellDash.length === 1){
                    beforePasteStr = JSON.stringify(this.searchPastePositionCells(firstCell.mergeCol-1,firstCell.mergeRow-1,clickCell))
                }else{
                    beforePasteStr = JSON.stringify(this.searchPastePositionCells(finalCell.col-firstCell.col,finalCell.row-firstCell.row,clickCell))
                }

                // 一个框
                this.core.plugins.SettingPlugin.changeStepArr({
                    type:15,
                    pre:{
                        label:clickCell.label,
                        pasteStr:beforePasteStr
                    },
                    next:{
                        label:clickCell.label,
                        pasteStr
                    }
                })
                this.core.ws.wsSend(15,{pasteStr,label:clickCell.label})
                this.transformTableDomStrToCanvasCell(pasteStr,clickCell)
                // this.core.plugins.SettingPlugin.convenientGroupChangeStepArr(clickCell.label)
                this.contentComponent.setSecondClickCell(null)
                // console.log('event-html',event.clipboardData.getData('text/html'))
                // console.log('event-text',event.clipboardData.getData('text/plain'))
            }
        })

        document.addEventListener('copy',event=>{
            // console.log('copy')
            event.preventDefault()
            // clear clipboardData
            this.core.copyCellDash = []
            const str = this.transformCanvasCellToTableDomStr()
            event.clipboardData.setData('text/html', str);
            const { clickCell,moreSelectedCell } = this.contentComponent
            this.core.copyKey = true
            if(moreSelectedCell.length > 0){
                // 多选
                this.core.copyCellDash = moreSelectedCell
            }else if(clickCell){
                // 单选
                this.core.copyCellDash = [clickCell]
            }else{
                return
            }
            // this.core.copyRect
            this.core.freshContent()
        })

        document.addEventListener('keydown',event=>{
            // console.log('event',event.code)
            // console.log('event.shiftKey',event.shiftKey)
            // console.log('event.ctrlKey',event.ctrlKey)
            this.core.shiftKey = event.shiftKey
            this.core.ctrlKey = event.ctrlKey

            if(event.code === 'Escape'){
                this.clearCopyDash()
            }else if(event.code === 'Delete'){
                // 删除选中的单元格中的内容
                let cells = []
                if(this.contentComponent.secondClickCell){
                    // 多个
                    cells = this.contentComponent.moreSelectedCell.map(item=>{
                        return {
                            row:item.row,
                            col:item.col,
                            text:item.text,
                            label:item.label,
                        }
                    })
                    this.contentComponent.moreSelectedCell.forEach(item=>{
                        item.text = ''
                    })
                    this.core.freshContent();
                }else if(this.contentComponent.clickCell){
                    // 单个
                    cells.push({
                        row:this.contentComponent.clickCell.row,
                        col:this.contentComponent.clickCell.col,
                        text:this.contentComponent.clickCell.text,
                        label:this.contentComponent.clickCell.label,
                    })
                    this.contentComponent.clickCell.text = ''
                    this.core.freshContent();
                }
                this.core.plugins.SettingPlugin.changeStepArr({
                    type:20,
                    cells
                })
                this.core.ws.wsSend(20,{
                    cells
                })
            }
        })
        //
        document.addEventListener('keyup',event=>{
            // console.log('event',event)
            this.core.shiftKey = event.shiftKey
            this.core.ctrlKey = event.ctrlKey
        })
        this.canvasDom.addEventListener('mousedown',this.moreShiftSelectClick)
    }

    setTdAttrs(td,clickCell){
        if(clickCell.isMerge){
            td.rowSpan = clickCell.mergeRow
            td.colSpan = clickCell.mergeCol
        }
        td.innerText = clickCell.text
        td.style.backgroundColor = clickCell.bgColor
        td.style.color = clickCell.fontColor
        td.style.width = clickCell.width+'px'
        td.style.height = clickCell.height+'px'
        td.style.textAlign = clickCell.textAlign
        // td.setAttribute('data-row',clickCell.row)
        // td.setAttribute('data-col',clickCell.col)
        // td.setAttribute('data-merge-row',clickCell.mergeRow)
        // td.setAttribute('data-merge-col',clickCell.mergeCol)
        // td.setAttribute('data-bg-color',clickCell.bgColor)
        // td.setAttribute('data-font-color',clickCell.fontColor)
        // td.setAttribute('data-is-merge',clickCell.isMerge)
        td.setAttribute('data-json',JSON.stringify(clickCell))
    }

    moreShiftSelectClick=event=>{
        // console.log('this.core',this.core)
        if(this.core.shiftKey){
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            const { clickCell } = this.contentComponent

            let attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
            if(attrSecond.isMerge){
                let isRight = attrSecond.x>clickCell.x
                let isBottom = attrSecond.y>clickCell.y

                if(isRight && !isBottom){
                    // 第二个在右上角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row)
                }else if(isRight && isBottom){
                    // 第二个在右下角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row+attrSecond.mergeRow - 1)
                }else if(!isRight && isBottom){
                    // 第二个在左下角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col,attrSecond.row+attrSecond.mergeRow - 1)
                }
            }
            this.contentComponent.setSecondClickCell(attrSecond)
            this.core.fresh()
        }

    }

    moreCtrlSelectClick=event=>{
        // console.log('this.core',this.core)
        if(this.core.shiftKey){
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
            this.contentComponent.setSecondClickCell(attrSecond)
            this.core.fresh()
        }

    }


    showClickHandler(){

        this.canvasDom.addEventListener('mousedown',event=>{

            // 如果输入框没关闭则
            // if(this.core.plugins.InputPlugin.inputDom.style.display !== 'none'){
            //     this.core.plugins.InputPlugin.setCellText()
            // }
            // console.log('选中',this.core.dragSign)
            // console.log('event.button',event.button)
            if(event.button === 2 && this.contentComponent.secondClickCell){
                return;
            }
            this.core.plugins.ContextmenuPlugin.hideContextMenu()
            this.core.plugins.BookPlugin.hideContextMenu()
            if(this.core.shiftKey || this.core.ctrlKey || this.core.dragSign){
                return
            }
            const { cellHeight,cellWidth } = this.options
            const { offsetX,offsetY,topDis,barVerContainerDom,barHorContainerDom } = this.core.plugins.ScrollPlugin

            // let moveTimeId = null
            //
            // barVerContainerDom.onmouseover = ()=>{
            //     moveTimeId = setInterval(()=>{
            //         this.core.plugins.ScrollPlugin.customMove(cellWidth)
            //     },500)
            // }
            //
            // barVerContainerDom.onmouseout = ()=>{
            //     clearInterval(moveTimeId)
            //     moveTimeId = null
            // }
            //
            // barHorContainerDom.onmouseover = ()=>{
            //     moveTimeId = setInterval(()=>{
            //         this.core.plugins.ScrollPlugin.customMove(0,cellHeight)
            //     },500)
            // }
            //
            // barHorContainerDom.onmouseout = ()=>{
            //     clearInterval(moveTimeId)
            //     moveTimeId = null
            // }

            const { config:{ freezeType,freezeRow } } = this.core.getCurrentSheet()

            if(event.offsetY<=cellHeight && event.offsetX<=cellHeight){
                // 左上角
                this.contentComponent.setSecondClickCell(null)
                this.contentComponent.showClickRect({},true,true)
                this.contentComponent.hideSelectedCellDom()
            }else if(event.offsetY<=cellHeight && event.offsetX>cellHeight){
                // 顶部
                const attr = this.searchHeaderRectAddr(event.offsetX+offsetX-cellHeight)
                if(attr){
                    this.contentComponent.setSecondClickCell(null)
                    this.contentComponent.showClickRect(attr,true)
                }
                this.contentComponent.hideSelectedCellDom()
            }else if(event.offsetY>cellHeight && event.offsetX<=cellHeight){
                // 左侧
                const attr = this.searchSideRectAddr(event.offsetY+offsetY-cellHeight)
                // console.log('测试',attr)
                if(attr){
                    this.contentComponent.setSecondClickCell(null)
                    this.contentComponent.showClickRect(attr,false,true)
                }
                this.contentComponent.hideSelectedCellDom()
            }else{


                if(freezeType === 1){
                    const relativeRect = this.searchRectByColAndRow(1,freezeRow)
                    if(relativeRect.ltY+relativeRect.height > event.offsetY){
                        // 在冻结行
                        // console.log('在冻结行',relativeRect,event.offsetY)
                        let attrFirst = this.searchRectAddr(event.offsetX - cellHeight,event.offsetY - cellHeight)
                        // console.log('x,y',attrFirst,event.offsetX - cellHeight,event.offsetY - cellHeight)
                        if(attrFirst){

                            this.contentComponent.showClickRect(attrFirst)

                            this.core.plugins.SettingPlugin.setCellAttrInHeader(attrFirst)

                            this.contentComponent.setSecondClickCell(null)

                            this.canvasDom.onmousemove = event=>{
                                let attrSecond = this.searchRectAddr(event.offsetX - cellHeight,event.offsetY - cellHeight)
                                // console.log('attr',attrSecond)
                                if(attrSecond && attrFirst.label === attrSecond.label){
                                    this.contentComponent.setSecondClickCell(null)
                                } else if(attrSecond && attrSecond.label !== this.contentComponent.secondClickCell?.label ){

                                    let isRight = attrSecond.x>attrFirst.x
                                    let isBottom = attrSecond.y>attrFirst.y

                                    // attrSecond是合并单元格

                                    if(attrSecond.isMerge){
                                        if(isRight && !isBottom){
                                            // 第二个在右上角
                                            attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row)
                                        }else if(isRight && isBottom){
                                            // 第二个在右下角
                                            attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row+attrSecond.mergeRow - 1)
                                        }else if(!isRight && isBottom){
                                            // 第二个在左下角
                                            attrSecond = this.searchRectByColAndRow(attrSecond.col,attrSecond.row+attrSecond.mergeRow - 1)
                                        }
                                    }

                                    this.contentComponent.setSecondClickCell(attrSecond)
                                    // console.log('attrSecond',attrSecond)

                                    this.core.fresh()
                                }
                            }
                        }
                        this.core.fresh()
                        return;
                    }

                }
                console.log('不是冻结行')
                let attrFirst = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                // console.log('x,y',attrFirst)
                // console.log('offsetY',offsetY)
                // console.log('event.offsetY',event.offsetY)
                if(attrFirst){

                    this.contentComponent.showClickRect(attrFirst)

                    this.core.plugins.SettingPlugin.setCellAttrInHeader(attrFirst)

                    this.contentComponent.setSecondClickCell(null)

                    this.canvasDom.onmousemove = event=>{
                        const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
                        let attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                        // console.log('attr',attrSecond)
                        if(attrSecond && attrFirst.label === attrSecond.label){
                            this.contentComponent.setSecondClickCell(null)
                        } else if(attrSecond && attrSecond.label !== this.contentComponent.secondClickCell?.label ){

                            let isRight = attrSecond.x>attrFirst.x
                            let isBottom = attrSecond.y>attrFirst.y

                            // attrSecond是合并单元格

                            if(attrSecond.isMerge){
                                if(isRight && !isBottom){
                                    // 第二个在右上角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row)
                                }else if(isRight && isBottom){
                                    // 第二个在右下角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row+attrSecond.mergeRow - 1)
                                }else if(!isRight && isBottom){
                                    // 第二个在左下角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col,attrSecond.row+attrSecond.mergeRow - 1)
                                }
                            }else{

                                // attrSecond跨过合并单元格 在content渲染处更改左上角起点位置(要放到content的渲染函数处）
                                // let startAndEndRect = null
                                //
                                // if(isRight && !isBottom){
                                //     // 第二个在右上角
                                //     startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrSecond.y,attrSecond.x,attrFirst.y)
                                // }else if(isRight && isBottom){
                                //     // 第二个在右下角
                                //     startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrFirst.y,attrSecond.x,attrSecond.y)
                                // }else if(!isRight && isBottom){
                                //     // 第二个在左下角
                                //     startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrFirst.y,attrFirst.x,attrSecond.y)
                                // }else{
                                //     // 第二个在左上角
                                //     startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrSecond.y,attrFirst.x,attrFirst.y)
                                // }
                                //
                                // if(startAndEndRect){
                                //
                                //     const { startRect,endRect } = startAndEndRect
                                //
                                //     const startArr = [startRect,attrFirst,attrSecond]
                                //     const endArr = [endRect,attrFirst,attrSecond]
                                //
                                //
                                //
                                //     const startCol = startArr.sort((a,b)=>a.x-b.x)[0].col
                                //     const startRow = startArr.sort((a,b)=>a.y-b.y)[0].row
                                //     const endCol = endArr.sort((a,b)=>a.x-b.x)[endArr.length-1].col
                                //     const endRow = endArr.sort((a,b)=>a.y-b.y)[endArr.length-1].row
                                //
                                //     console.log('startAndEndRect',startAndEndRect)
                                //
                                //     console.log('startCol,startRow',startCol,startRow,endCol,endRow)
                                //
                                //     attrFirst = this.searchRectByColAndRow(startCol,startRow)
                                //     attrSecond = this.searchRectByColAndRow(endCol,endRow)
                                //
                                //     console.log('attrFirst+attrSecond',attrFirst,attrSecond)
                                //     this.contentComponent.showClickRect(attrFirst)
                                // }

                            }



                            this.contentComponent.setSecondClickCell(attrSecond)
                            // console.log('attrSecond',attrSecond)

                            this.core.fresh()
                        }
                    }
                }
            }



            this.core.fresh()
            // this.core.plugins.InputPlugin.hideInput()

        })

    }


    searchRectIsMerge(startX,startY,endX,endY){
        const { contentGroup } = this.contentComponent

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        const res = contentGroup.find(item=>(item.x>=startX && item.x<=endX) && (item.y>=startY && item.y<=endY) && item.isMerge)
        // console.log('res',res)
        if(res){
            return {
                startRect: this.searchRectByLabel(res.mergeStartLabel),
                endRect: this.searchRectByLabel(res.mergeEndLabel)
            }
        }else{
            return null
        }

    }

    searchRectByLabel(label){
        const { contentGroup } = this.contentComponent
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.label === label)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectByColAndRow(col,row){
        const { contentGroup } = this.contentComponent
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.col === col && item.row === row)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectAddr(oriX,oriY){

        // console.log('oriX',oriX)

        const { contentGroup } = this.contentComponent

        for(let i=0;i<contentGroup.length;i++){
            const tempContentRect = contentGroup[i]
            if((oriX>=tempContentRect.x && oriX<=tempContentRect.x+tempContentRect.width) && (oriY>=tempContentRect.y && oriY<=tempContentRect.y+tempContentRect.height)){
                // console.log('tempContentRect',tempContentRect)
                if(tempContentRect.isMerge){
                    if(tempContentRect.label === tempContentRect.mergeStartLabel){
                        return tempContentRect
                    }else{
                        const index = contentGroup.findIndex(item=>item.label === tempContentRect.mergeStartLabel)
                        // console.log('索引',index,tempContentRect)
                        return contentGroup[index]
                    }
                }else{
                    return tempContentRect
                }
            }
        }
    }

    searchHeaderRectAddr(oriX){

        // console.log('oriX',oriX)

        const { headerRectGroup } = this.headerComponent

        for(let i=0;i<headerRectGroup.length;i++){
            const tempContentRect = headerRectGroup[i]
            if(oriX>=tempContentRect.x && oriX<=tempContentRect.x+tempContentRect.width){
                // console.log('tempContentRect',tempContentRect)
                return tempContentRect
            }
        }
    }

    searchSideRectAddr(oriY){

        // console.log('oriY',oriY)

        const { sideRectGroup } = this.sideComponent

        for(let i=0;i<sideRectGroup.length;i++){
            const tempContentRect = sideRectGroup[i]
            if(oriY>=tempContentRect.y && oriY<=tempContentRect.y+tempContentRect.height){
                // console.log('tempContentRect',tempContentRect)
                return tempContentRect
            }
        }
    }
}
