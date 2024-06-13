import { loadMoreImagePromise,loadMoreNetImgPromise } from '../../util/canvas.js'

export default class setting{

    /**
     * @type {HTMLElement}
     */
    filterFuncDom = null

    /**
     * @type {HTMLElement}
     */
    freezeFuncDom = null

    /**
     * @type {HTMLElement}
     */
    uploadCellImgInputDom = null

    /**
     * @type {HTMLElement}
     */
    uploadCellImgDom = null

    /**
     * @type {HTMLElement}
     */
    textWrapGroup = null

    /**
     * @type {HTMLElement}
     */
    labelInputDom = null
    /**
     * @type {HTMLElement}
     */
    fxInputDom = null
    /**
     * @type {HTMLElement}
     */
    fontHorAddrGroup = null
    /**
     * @type {HTMLElement}
     */
    fontVerAddrGroup = null
    /**
     * @type {HTMLElement}
     */
    fontSizeSelectDom = null
    /**
     * @type {HTMLElement}
     */
    fontColorSelectDom = null
    /**
     * @type {HTMLElement}
     */
    bgColorSelectDom = null
    /**
     * @type {HTMLElement}
     */
    fontItalicBtnDom = null
    /**
     * @type {HTMLElement}
     */
    fontWeightBtnDom = null
    /**
     * @type {HTMLElement}
     */
    fontStrikethroughBtnDom = null
    /**
     * @type {HTMLElement}
     */
    fontUnderlineBtnDom = null
    /**
     * @type {HTMLElement}
     */
    cellMergerBtnDom = null
    /**
     * @type {HTMLElement}
     */
    cellSplitBtnDom = null
    /**
     * @type {HTMLElement}
     */
    warnDialogDom = null

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.options = options
        this.layer = layer
        this.core = core

        this.registrySettingDom()
        this.registryWarnDialogDom()
    }

    registryWarnDialogDom(){
        const { h } = this.core
        this.warnDialogDom = h('e-sheet-warn-dialog-tip',{
            attribute:{
                show:false,
            }
        })
        this.selectorDom.appendChild(this.warnDialogDom)
    }

    /**
     * @param {string} title
     * @param {string} content
     */
    showDialog(title,content){
        this.warnDialogDom.setAttribute('t',title)
        this.warnDialogDom.setAttribute('content',content)
        this.warnDialogDom.setAttribute('show',true)
    }

    setLabelCon(label){
        this.labelInputDom.value = label
    }

    setCellCon(value){
        this.fxInputDom.value = value
    }

    /**
     * @param {string} type
     */
    setTextWrapChange(type){
        const currentSheet = this.core.getCurrentSheet();
        currentSheet.config.textWrapType = type
        this.core.freshContent()
    }

    /**
     * @param {Array<string>} src
     */
    cellImgChange(src){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.img = this.contentComponent.clickCell.img.concat(src)
        this.core.fresh()
    }

    /**
     * @param {string} textAlign
     */
    cellFontTextAlignChange(textAlign){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.textAlign = textAlign
        this.core.freshContent()
    }

    /**
     * @param {string} textBaseline
     */
    cellFontTextBaseLineChange(textBaseline){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.textBaseline = textBaseline
        this.core.freshContent()
    }

    /**
     * @param {string} fontSize
     */
    cellFontSizeChange(fontSize){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.fontSize = fontSize
        this.core.freshContent()
    }

    /**
     * @param {string} fontColor
     */
    cellFontColorChange(fontColor){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.fontColor = fontColor
        this.core.freshContent()
    }

    /**
     * @param {string} bgColor
     */
    cellBgColorChange(bgColor){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.bgColor = bgColor
        this.core.freshContent()
    }

    /**
     * @param {string} fontWeight
     */
    cellFontWeightChange(fontWeight){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.fontWeight = fontWeight
        this.core.freshContent()
    }

    /**
     * @param {string} underline
     */
    cellUnderlineChange(underline){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.underline = underline
        this.core.freshContent()
    }

    /**
     * @param {string} strikethrough
     */
    cellStrikethroughChange(strikethrough){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.strikethrough = strikethrough
        this.core.freshContent()
    }

    /**
     * @param {string} fontItalic
     */
    cellFontItalicChange(fontItalic){
        if(!this.contentComponent.clickCell){
            return
        }
        this.contentComponent.clickCell.fontItalic = fontItalic
        this.core.freshContent()
    }

    /**
     * @param {object} attr
     */
    setCellAttrInHeader(attr){
        this.fontHorAddrGroup.setAttribute('value',attr.textAlign)
        this.fontVerAddrGroup.setAttribute('value',attr.textBaseline)
        this.fontSizeSelectDom.setAttribute('value',attr.fontSize)
        this.fontWeightBtnDom.setAttribute('current',attr.fontWeight)
        this.fontStrikethroughBtnDom.setAttribute('current',attr.strikethrough)
        this.fontUnderlineBtnDom.setAttribute('current',attr.underline)
        this.fontItalicBtnDom.setAttribute('current',attr.fontItalic)
        if(attr.isMerge){
            this.cellMergerBtnDom.style.display = 'none'
            this.cellSplitBtnDom.style.display = 'flex'
        }else{
            this.cellMergerBtnDom.style.display = 'flex'
            this.cellSplitBtnDom.style.display = 'none'
        }
        // this.fontColorSelectDom.setAttribute('color',attr.fontColor)
        // this.bgColorSelectDom.setAttribute('color',attr.bgColor)
        this.setLabelCon(attr.label)
        this.setCellCon(attr.text)
    }

    changeFirstSelectedCell(label){

        const attrFirst = this.contentComponent.searchRectByLabel(label)

        if(!attrFirst){
            return
        }

        this.contentComponent.showClickRect(attrFirst)

        this.setCellAttrInHeader(attrFirst)

        this.setCellCon(attrFirst.text)

        this.contentComponent.setSecondClickCell(null)
        this.core.fresh()
    }

    convenientChangeStepArr(type,attr,nextValue){
        const { clickCell } = this.contentComponent
        this.changeStepArr({
            type,
            label:clickCell.label,
            pre:clickCell[attr],
            next:nextValue
        })
    }

    convenientGroupChangeStepArr(label){
        const { clickCell,contentGroup } = this.contentComponent
        this.changeStepArr({
            label:label??clickCell.label,
            sheet:JSON.stringify(contentGroup)
        })
    }

    changeStepArr(obj){
        const curSheet = this.core.getCurrentSheet()
        if(curSheet.stepNum !== curSheet.stepArr.length-1){
            if(curSheet.stepNum === -1){
                curSheet.stepArr.splice(curSheet.stepNum+1,curSheet.stepArr.length,obj)
            }else{
                curSheet.stepArr.splice(curSheet.stepNum+1,curSheet.stepArr.length - 1 - curSheet.stepNum,obj)
            }
        }else{
            curSheet.stepArr.push(obj)
        }

        curSheet.stepNum += 1
        this.core.afterHandle()
    }


    forwardSetSheet(){

        const { core,contentComponent } = this

        const curSheet = core.getCurrentSheet()

        const { ws } = core

        // console.log('curSheet',curSheet)

        if(curSheet.stepNum === curSheet.stepArr.length-1){
            return;
        }

        const fObj = curSheet.stepArr[curSheet.stepNum + 1]

        const selectedCell = contentComponent.searchRectByLabel(fObj.label)

        switch (fObj.type){
            case 1:// 更改单元格内容
                selectedCell.text = fObj.next
                contentComponent.showClickRect(selectedCell)
                if(fObj.widthDis !== undefined && fObj.widthDis !== 0){
                    this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,fObj.widthDis,false)
                }
                if(fObj.heightDis !== undefined && fObj.heightDis !== 0){
                    this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,fObj.heightDis,false)
                }
                ws.wsSend(1, {...selectedCell,widthDis:fObj.widthDis,heightDis:fObj.heightDis})
                break;
            case 2: // 文字大小
                selectedCell.fontSize = fObj.next
                break;
            case 3: // 文字垂直方向位置
                selectedCell.textAlign = fObj.next
                break
            case 4: // 文字水平方向位置
                selectedCell.textBaseline = fObj.next
                break
            case 5: // 文字粗体
                selectedCell.fontWeight = fObj.next
                break
            case 6: // 文字斜体
                selectedCell.fontItalic = fObj.next
                break
            case 7: // 文字颜色
                selectedCell.fontColor = fObj.next
                break
            case 8: // 背景颜色
                selectedCell.bgColor = fObj.next
                break
            case 9: // 合并单元格
                const mergeSelectedCell = []
                for(let i=1;i<fObj.next.length;i++){
                    mergeSelectedCell.push(contentComponent.searchRectByLabel(fObj.next[i]))
                }
                const firstCell = contentComponent.searchRectByLabel(fObj.next[0])
                this.wsSendInfoByTypeAndData(9,fObj.next)
                this.core.plugins.ContextmenuPlugin.mergeCell(firstCell,mergeSelectedCell)
                break
            case 10: // 拆分单元格
                const mergeStartCell = contentComponent.searchRectByColAndRow(fObj.next.col,fObj.next.row)
                this.wsSendInfoByTypeAndData(10, {...fObj.next})
                this.core.plugins.ContextmenuPlugin.splitCell(mergeStartCell)
                break
            case 11: // 拉伸宽度
                this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,fObj.next.width - fObj.pre.width)
                this.core.ws.wsSend(11, {dis:(fObj.next.width - fObj.pre.width),...fObj})
                break
            case 12: // 拉伸高度
                this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,fObj.next.height - fObj.pre.height)
                this.core.ws.wsSend(12, {dis:(fObj.next.height - fObj.pre.height),...fObj})
                break
            case 13: // 左右插入列
                this.core.ws.wsSend(13,{
                    ...fObj.next
                })
                this.core.plugins.ContextmenuPlugin.insertCol(fObj.next.col,fObj.next.num,fObj.next.isLeft)
                break
            case 14: // 上下插入行
                this.core.ws.wsSend(14,{
                    ...fObj.next
                })
                this.core.plugins.ContextmenuPlugin.insertRow(fObj.next.row,fObj.next.num,fObj.next.isTop)
                break
            case 15: // 复制粘贴
                const clickCell = this.contentComponent.searchRectByLabel(fObj.next.label)
                this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(fObj.next.pasteStr,clickCell)
                break
            case 16: // 单元格边框拖拽
                // 还原拖拽源头
                this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(fObj.pre.lastStr))
                // 还原拖拽目标
                const targetCell = this.contentComponent.searchRectByLabel(fObj.next.label)
                this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(fObj.next.lastStr,targetCell)
                this.contentComponent.setSecondClickCell(null)
                this.core.ws.wsSend(16,{pre:fObj.pre.lastStr,next:fObj.next.lastStr,label:fObj.next.label})
                break
            case 17: // 单元格格式刷
                fObj.next.forEach(item=>{
                    const cell = this.contentComponent.searchRectByLabel(item.label)
                    this.core.plugins.SelectPlugin.transformTableDomStrToCanvasCell(item.tableDomStr,cell)
                })
                this.core.ws.wsSend(17,{next:fObj.next})
                break
            case 18: // 文字删除线
                selectedCell.strikethrough = fObj.next
                break
            case 19: // 文字下划线
                selectedCell.underline = fObj.next
                break
            case 20: // 删除内容
                fObj.cells.forEach(item=>{
                    const cell = contentComponent.searchRectByLabel(item.label)
                    cell.text = ''
                })
                this.core.ws.wsSend(20,{cells:fObj.cells})
                break
            case 21: // 文字溢出或换行
                this.setTextWrapChange(fObj.next)
                this.setTextWrapInHeader(fObj.next)
                this.core.ws.wsSend(21,{textWrapType:fObj.next})
                break
            case 22: // 图片
                selectedCell.img = JSON.parse(fObj.next)
                this.core.ws.wsSend(22, fObj)
                break
        }

        // redo
        if([1,2,3,4,5,6,7,8,18,19].includes(fObj.type)){
            this.wsSendCellAttrByTypeAndData(fObj.type)
        }

        core.fresh()
        // console.log('步骤减1')
        curSheet.stepNum += 1

        this.core.afterHandle()
    }


    fallbackSetSheet(){

        const { core,contentComponent } = this

        const curSheet = core.getCurrentSheet()

        const { ws } = core

        // console.log('curSheet',curSheet)

        if(curSheet.stepNum === -1){
            return;
        }
        const fObj = curSheet.stepArr[curSheet.stepNum]

        const selectedCell = contentComponent.searchRectByLabel(fObj.label)

        switch (fObj.type){
            case 1:
                // 1.更改单元格内容
                selectedCell.text = fObj.pre
                contentComponent.showClickRect(selectedCell)
                if(fObj.widthDis !== undefined && fObj.widthDis !== 0){
                    this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,-fObj.widthDis,false)
                }
                if(fObj.heightDis !== undefined && fObj.heightDis !== 0){
                    this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,-fObj.heightDis,false)
                }
                ws.wsSend(1, {undo:true,...selectedCell,widthDis:fObj.widthDis,heightDis:fObj.heightDis})
                break;
            case 2: // 文字大小
                selectedCell.fontSize = fObj.pre
                break;
            case 3: // 文字垂直方向位置
                selectedCell.textAlign = fObj.pre
                break
            case 4: // 文字水平方向位置
                selectedCell.textBaseline = fObj.pre
                break
            case 5: // 文字粗体
                selectedCell.fontWeight = fObj.pre
                break
            case 6: // 文字斜体
                selectedCell.fontItalic = fObj.pre
                break
            case 7: // 文字颜色
                selectedCell.fontColor = fObj.pre
                break
            case 8: // 背景颜色
                selectedCell.bgColor = fObj.pre
                break
            case 9: // 合并单元格
                const mergeStartCell = contentComponent.searchRectByLabel(fObj.pre)
                this.wsSendInfoByTypeAndData(9, {label:fObj.pre,undo:true})
                this.core.plugins.ContextmenuPlugin.splitCell(mergeStartCell)
                break
            case 10: // 拆分单元格
                const mergeSelectedCell = []
                for(let i=0;i<fObj.pre.mergeRow;i++){
                    for(let j=0;j<fObj.pre.mergeCol;j++){
                        if(i===0&&j===0){
                            continue
                        }
                        mergeSelectedCell.push(contentComponent.searchRectByColAndRow(fObj.pre.col+j,fObj.pre.row+i))
                    }
                }
                const firstCell = contentComponent.searchRectByLabel(fObj.pre.mergeStartLabel)
                this.wsSendInfoByTypeAndData(10, {...fObj.pre,undo:true})
                this.core.plugins.ContextmenuPlugin.mergeCell(firstCell,mergeSelectedCell)
                break
            case 11: // 拉伸宽度
                this.core.plugins.DragPlugin.expandWidthNoDrag(selectedCell.col,fObj.pre.width - fObj.next.width)
                this.core.ws.wsSend(11, {dis:(fObj.pre.width - fObj.next.width),...fObj})
                break
            case 12: // 拉伸高度
                this.core.plugins.DragPlugin.expandHeightNoDrag(selectedCell.row,fObj.pre.height - fObj.next.height)
                this.core.ws.wsSend(12, {dis:(fObj.pre.height - fObj.next.height),...fObj})
                break
            case 13: // 左右插入列
                this.core.ws.wsSend(13,{
                    ...fObj.pre,
                    undo:true
                })
                this.core.plugins.ContextmenuPlugin.removeCol(fObj.pre.col,fObj.pre.num,fObj.pre.isLeft)
                break
            case 14: // 上下插入行
                this.core.ws.wsSend(14,{
                    ...fObj.pre,
                    undo:true
                })
                this.core.plugins.ContextmenuPlugin.removeRow(fObj.pre.row,fObj.pre.num,fObj.pre.isTop)
                break
            case 15: // 复制粘贴
                this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(fObj.pre.pasteStr))
                this.core.ws.wsSend(15,{undo:true,pasteStr:fObj.pre.pasteStr})
                break
            case 16: // 单元格边框拖拽
                // 还原拖拽源头
                this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(fObj.pre.beforeStr))
                // 还原拖拽目标
                const targetCell = this.contentComponent.searchRectByLabel(fObj.next.label)
                // console.log('JSON.parse(fObj.next.beforeStr)',JSON.parse(fObj.next.beforeStr))
                this.core.plugins.SelectPlugin.forcePasteCellToNewCellByTargetCell(JSON.parse(fObj.next.beforeStr),targetCell)
                this.core.ws.wsSend(16,{undo:true,pre:fObj.pre.beforeStr,next:fObj.next.beforeStr,label:fObj.next.label})
                this.contentComponent.setSecondClickCell(null)
                break
            case 17: // 单元格格式刷
                fObj.pre.forEach(item=>{
                    this.core.plugins.SelectPlugin.forcePasteCellToNewCell(JSON.parse(item))
                })
                this.core.ws.wsSend(17,{undo:true,pre:fObj.pre})
                break
            case 18: // 文字删除线
                selectedCell.strikethrough = fObj.pre
                break
            case 19: // 文字下线
                selectedCell.underline = fObj.pre
                break
            case 20: // 还原删除内容
                fObj.cells.forEach(item=>{
                    const cell = contentComponent.searchRectByLabel(item.label)
                    cell.text = item.text
                })
                this.core.ws.wsSend(20,{undo:true,cells:fObj.cells})
                break
            case 21: // 文字溢出或换行
                this.setTextWrapChange(fObj.pre)
                this.setTextWrapInHeader(fObj.pre)
                this.core.ws.wsSend(21,{textWrapType:fObj.pre})
                break
            case 22: // 图片
                selectedCell.img = JSON.parse(fObj.pre)
                this.core.ws.wsSend(22, {undo:true,...fObj})
                break
        }

        // undo
        if([2,3,4,5,6,7,8,18,19].includes(fObj.type)){
            this.wsSendCellAttrByTypeAndData(fObj.type)
        }

        core.fresh()
        // console.log('步骤减1')
        curSheet.stepNum -= 1

        this.core.afterHandle()
    }

    wsSendCellAttrByTypeAndData(type){
        const { clickCell } = this.contentComponent
        this.core.ws.wsSend(type,clickCell)
    }

    wsSendInfoByTypeAndData(type,data){
        this.core.ws.wsSend(type,data)
    }

    registrySettingDom(){
        const { h } = this.core

        const labelInputDom = h('input',{
            attr:{
                className:'cell-label-input',
                onblur:_=>{
                    this.changeFirstSelectedCell(this.labelInputDom.value)
                },
                onkeydown:evt=>{
                    if(evt.key==='Enter'){
                        this.changeFirstSelectedCell(this.labelInputDom.value)
                    }
                }
            }
        })

        this.labelInputDom = labelInputDom

        let fxInputCellLabel = 'A1'

        const fxInputDom = h('input',{
            attr:{
                className:'fx-input',
                oninput:evt=>{
                    // console.log('fxInputDom----oninput')
                    // console.log('evt',evt.target.value)
                    this.core.plugins.InputPlugin.inputDom.value = evt.target.value
                    // this.contentComponent.clickCell.text = evt.target.value

                },
                onfocus:_=>{
                    // console.log('fxInputDom----onfocus',this.contentComponent.clickCell)
                    if(!this.contentComponent.clickCell){
                        return
                    }
                    fxInputCellLabel = this.contentComponent.clickCell.label
                    this.core.plugins.InputPlugin.showInput(this.contentComponent.clickCell)
                },
                onblur:_=>{
                    // console.log('fxInputDom----onblur',fxInputDom.value,evt)
                    if(this.core.plugins.InputPlugin.inputDom.value === undefined || this.core.plugins.InputPlugin.inputDom.value === null){
                        this.core.plugins.InputPlugin.hideInput()
                        return
                    }
                    this.changeStepArr({
                        type:1,
                        label:fxInputCellLabel,
                        pre:this.contentComponent.clickCell.text,
                        next:this.core.plugins.InputPlugin.inputDom.value
                    })

                    const focusClickCell = this.contentComponent.searchRectByLabel(fxInputCellLabel)

                    focusClickCell.text = this.core.plugins.InputPlugin.inputDom.value
                    this.core.freshContent()
                    this.core.plugins.InputPlugin.hideInput()
                }
            }
        })

        this.fxInputDom = fxInputDom

        const settingDom = h('div',{
            attr:{
                className:'e-sheet-setting-input-bar-layout'
            }
        },[
            h('div',{
                attr:{
                    className:'left-input-layout'
                }
            },[
                labelInputDom
              ]
            ),
            h('div',{
                attr:{
                    className:'right-input-layout'
                }
            },[
                h('span',{
                    attr:{
                        innerText:'fx',
                        className:'prefix-label'
                    }
                }),
                fxInputDom
            ]),
        ])

        this.selectorDom.insertBefore(settingDom,this.canvasWrapperDom)


        // 操作文字横向对齐
        this.createFontHorAddrGroup();

        // 操作文字纵向对齐
        this.createFontVerAddrGroup();

        const settingTopDom = h('div',{
            attr:{
                className:'e-sheet-setting-layout'
            }
        })
        const fontPositionDom = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })
        fontPositionDom.appendChild(this.fontVerAddrGroup)
        fontPositionDom.appendChild(this.fontHorAddrGroup)


        // 字体大小设置
        this.createFontSizeSelectDom()

        const fontSizeAndFamilyLayoutDom = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })

        const fontColorAndBgColorDom = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })



        fontSizeAndFamilyLayoutDom.appendChild(this.fontSizeSelectDom)


        // 字体粗体
        this.createFontWeightBtnDom()
        // 斜体字
        this.createFontItalicBtnDom()
        // 下划线
        this.createFontUnderlineBtnDom()
        // 删除线
        this.createFontStrikethroughBtnDom()

        const fontStyleGroupDom = h('div',{
            attr:{
                className:'e-sheet-font-style-layout'
            }
        },[
            this.fontWeightBtnDom,
            this.fontItalicBtnDom,
            this.fontUnderlineBtnDom,
            this.fontStrikethroughBtnDom
        ])

        fontSizeAndFamilyLayoutDom.appendChild(fontStyleGroupDom)


        // 字体颜色设置
        fontColorAndBgColorDom.appendChild(this.createFontColorSelectDom())


        // 背景颜色设置
        fontColorAndBgColorDom.appendChild(this.createBgColorSelectDom())

        const divideLine = h('div',{
            attr:{
                className:'e-sheet-divide-line'
            }
        })

        // 合并按钮
        this.createCellMergerBtnDom()
        // 拆分按钮
        this.createCellSplitBtnDom()
        this.createTextWrapBtnDom()
        this.createExtraFuncDom()
        // this.createFilterFuncDom()
        this.createFreezeFuncDom()

        const cellMergeAndSplitLayoutDom = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })
        cellMergeAndSplitLayoutDom.appendChild(this.cellMergerBtnDom)
        cellMergeAndSplitLayoutDom.appendChild(this.cellSplitBtnDom)
        cellMergeAndSplitLayoutDom.appendChild(this.textWrapGroup)

        // 撤销和重做

        settingTopDom.appendChild(this.createStepDom())
        settingTopDom.appendChild(divideLine.cloneNode())

        settingTopDom.appendChild(fontPositionDom)
        settingTopDom.appendChild(divideLine.cloneNode())

        settingTopDom.appendChild(fontSizeAndFamilyLayoutDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(fontColorAndBgColorDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(cellMergeAndSplitLayoutDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(this.uploadCellImgDom)
        // settingTopDom.appendChild(divideLine.cloneNode())
        // settingTopDom.appendChild(this.filterFuncDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(this.freezeFuncDom)

        this.selectorDom.insertBefore(settingTopDom,settingDom)

    }


    createStepDom(){
        const { h } = this.core
        const stepForwardDom =
            h('e-sheet-radio-button',{
                attribute:{
                    label:'撤销(Ctrl+Z)',
                    value:'fallback',
                    top:24,
                    left:-24
                },
                attr:{
                    onclick:_=>{
                        this.fallbackSetSheet()
                    }
                }
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'step',
                        position:'fallback'
                    }
                })
            ])

        const stepFallbackDom =
            h('e-sheet-radio-button',{
                attribute:{
                    label:'重做(Ctrl+Y)',
                    value:'forward',
                    top:24,
                    left:-24
                },
                attr:{
                    onclick:_=>{
                        this.forwardSetSheet()
                    }
                }
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'step',
                        position:'forward'
                    }
                })
            ])

        document.addEventListener('keydown',evt=>{
            // console.log('evt',evt)
            if(evt.ctrlKey && evt.key === 'z'){
                this.fallbackSetSheet()
            }
            if(evt.ctrlKey && evt.key === 'y'){
                this.forwardSetSheet()
            }
        })

        const stepLayout = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })
        stepLayout.appendChild(stepForwardDom)
        stepLayout.appendChild(stepFallbackDom)
        return stepLayout
    }

    createCellSplitBtnDom(){
        const { h } = this.core
        const cellSplitBtnDom = h('e-sheet-tip',{
            style:{
                display:'none'
            }
        },[
            h('div',{
                attr:{
                    className:'e-sheet-font-style-layout e-sheet-cell-hover'
                },
                style:{
                    cursor:'pointer',
                    padding:'2px'
                }
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'cell',
                        position:'split'
                    }
                }),
                h('div',{
                    attr:{
                        innerText: '拆分单元格',
                        className:'e-sheet-cell-font'
                    }
                })
            ])
        ])




        cellSplitBtnDom.onclick=_=>{
            const { clickCell } = this.contentComponent
            const next = {
                row:clickCell.row,
                col:clickCell.col,
                mergeRow:clickCell.mergeRow,
                mergeCol:clickCell.mergeCol,
                mergeStartLabel:clickCell.mergeStartLabel,
                mergeEndLabel:clickCell.mergeEndLabel,
                isMerge:false,
            }
            this.changeStepArr({
                type:10,
                label:clickCell.label,
                pre:{
                    row:clickCell.row,
                    col:clickCell.col,
                    mergeRow:clickCell.mergeRow,
                    mergeCol:clickCell.mergeCol,
                    mergeStartLabel:clickCell.mergeStartLabel,
                    mergeEndLabel:clickCell.mergeEndLabel,
                    isMerge:true,
                },
                next
            })
            this.wsSendInfoByTypeAndData(10,next)
            if(this.core.plugins.ContextmenuPlugin.splitCell(clickCell)){
                this.cellMergerBtnDom.style.display = 'flex'
                cellSplitBtnDom.style.display = 'none'
            }

            // this.convenientGroupChangeStepArr()

        }

        this.cellSplitBtnDom = cellSplitBtnDom
    }

    createCellMergerBtnDom(){
        const { h } = this.core
        const cellMergerBtnDom = h('e-sheet-tip',{
            attribute:{
                'tip-label':'合并单元格',
                left:4,
                top:24,
            }
        },[
            h('div',{
                attr:{
                    className:'e-sheet-font-style-layout e-sheet-cell-hover'
                },
                style:{
                    padding:'2px',
                    userSelect:'none'
                }
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'cell',
                        position:'merge'
                    }
                }),
                h('div',{
                    attr:{
                        innerText: '合并单元格',
                        className:'e-sheet-cell-font'
                    }
                })
            ])
        ])

        cellMergerBtnDom.onclick=_=>{
            const { clickCell,mergeSelectedCell } = this.contentComponent
            const stepObj = {
                type:9,
                label:clickCell.label
            }
            const tempGroupCell = [clickCell,...mergeSelectedCell].sort((a,b)=>{return (a.row - b.row)+(a.col - b.col) })

            stepObj.pre = tempGroupCell[0].label
            stepObj.next = tempGroupCell.map(item=>item.label)
            this.changeStepArr(stepObj)
            this.wsSendInfoByTypeAndData(9,stepObj.next)
            if(this.core.plugins.ContextmenuPlugin.mergeCell(tempGroupCell[0],tempGroupCell.slice(0))){
                cellMergerBtnDom.style.display = 'none'
                this.cellSplitBtnDom.style.display = 'flex'
            }

            // if(mergeSelectedCell.some(item=>item.isMerge) || mergeSelectedCell.length === 0){
            //     return
            // }

        }

        this.cellMergerBtnDom = cellMergerBtnDom

    }

    createBgColorSelectDom(){
        const { h } = this.core
        const bgColorSelectTipConDom = h('e-sheet-tip',{
            attribute:{
                'tip-label':'背景颜色',
                'left':-10,
                'top':22,
            }
        })

        const bgColorSelectDom = h('e-sheet-icon-color-svg',{
            attribute:{
                category:'bg-color'
            }
        })

        this.bgColorSelectDom = bgColorSelectDom

        bgColorSelectTipConDom.appendChild(bgColorSelectDom)

        bgColorSelectDom.addEventListener('e-sheet-icon-color-svg-onchange',evt=>{
            this.convenientChangeStepArr(8,'bgColor',evt.detail)
            this.cellBgColorChange(evt.detail)
            this.wsSendCellAttrByTypeAndData(8)
        })

        return bgColorSelectTipConDom
    }

    createFontColorSelectDom(){
        const { h } = this.core
        const fontColorSelectDom = h('e-sheet-icon-color-svg',{
            attribute:{
                category:'font-color'
            }
        })

        fontColorSelectDom.addEventListener('e-sheet-icon-color-svg-onchange',evt=>{
            this.convenientChangeStepArr(7,'fontColor',evt.detail)
            this.cellFontColorChange(evt.detail)
            this.wsSendCellAttrByTypeAndData(7)
        })

        const fontColorSelectTipConDom = h('e-sheet-tip',{
            attribute:{
                'tip-label':'字体颜色',
                'left':-10,
                'top':22,
            }
        })

        fontColorSelectTipConDom.appendChild(fontColorSelectDom)
        this.fontColorSelectDom = fontColorSelectDom
        return fontColorSelectTipConDom
    }

    createFontHorAddrGroup(){
        const { h } = this.core
        const fontHorAddrGroup = h('e-sheet-radio-group',{},[
            h('e-sheet-radio-button',{
                attribute:{
                    label:'左对齐',
                    value:'left'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'hor',
                        position:'left'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'居中对齐',
                    value:'center'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'hor',
                        position:'center'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'右对齐',
                    value:'right'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'hor',
                        position:'right'
                    }
                })
            ])
        ])
        this.fontHorAddrGroup = fontHorAddrGroup
        fontHorAddrGroup.addEventListener('e-sheet-radio-group-onchange',evt=>{
            // console.log('evt',evt)
            this.convenientChangeStepArr(4,'textAlign',evt.detail)

            this.cellFontTextAlignChange(evt.detail)
            this.wsSendCellAttrByTypeAndData(4)
        })
    }

    createFontVerAddrGroup(){
        const { h } = this.core
        const fontVerAddrGroup = h('e-sheet-radio-group',{},[
            h('e-sheet-radio-button',{
                attribute:{
                    label:'顶部对齐',
                    value:'top'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'ver',
                        position:'top'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'垂直居中',
                    value:'middle'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'ver',
                        position:'middle'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'底部对齐',
                    value:'bottom'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'ver',
                        position:'bottom'
                    }
                })
            ])
        ])

        this.fontVerAddrGroup = fontVerAddrGroup
        fontVerAddrGroup.addEventListener('e-sheet-radio-group-onchange',evt=>{
            // console.log('evt',evt)
            this.convenientChangeStepArr(3,'textBaseLine',evt.detail)
            this.cellFontTextBaseLineChange(evt.detail)
            this.wsSendCellAttrByTypeAndData(3)
        })
    }

    createFontSizeSelectDom(){
        const { h } = this.core
        const fontSizeSelectDom = h('e-sheet-select',{})

        fontSizeSelectDom.addEventListener('e-sheet-select-onchange',evt=>{

            this.convenientChangeStepArr(2,'fontSize',parseInt(evt.detail))
            this.cellFontSizeChange(evt.detail)
            this.wsSendCellAttrByTypeAndData(2)
        })
        fontSizeSelectDom.setAttribute('label','字号')
        this.fontSizeSelectDom = fontSizeSelectDom
    }

    createFontWeightBtnDom(){
        // 粗体
        const { h } = this.core
        const fontWeightBtnDom =
            h('e-sheet-radio-button',{
                attribute:{
                    label:'粗体',
                    value:'bold'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'font',
                        position:'weight'
                    }
                })
            ])

        this.fontWeightBtnDom = fontWeightBtnDom
        fontWeightBtnDom.addEventListener('e-sheet-radio-group-change',evt=>{
            // console.log('evt',evt)
            if(fontWeightBtnDom.getAttribute('current') === ''){
                fontWeightBtnDom.setAttribute('current',evt.detail)
                this.convenientChangeStepArr(5,'fontWeight',evt.detail)
                this.cellFontWeightChange(evt.detail)
            }else{
                fontWeightBtnDom.setAttribute('current','')
                this.convenientChangeStepArr(5,'fontWeight','')
                this.cellFontWeightChange('')
            }
            this.wsSendCellAttrByTypeAndData(5)
        })
    }

    createFontItalicBtnDom(){
        const { h } = this.core
        const fontItalicBtnDom = h('e-sheet-radio-button',{
            style:{
                marginLeft:'6px'
            },
            attribute:{
                label:'斜体',
                value:'italic'
            },
        },[
            h('e-sheet-icon-svg',{
                attribute:{
                    category:'font',
                    position:'italic'
                }
            })
        ])

        this.fontItalicBtnDom = fontItalicBtnDom

        fontItalicBtnDom.addEventListener('e-sheet-radio-group-change',evt=>{
            // console.log('evt',evt)
            if(fontItalicBtnDom.getAttribute('current') === ''){
                fontItalicBtnDom.setAttribute('current',evt.detail)
                this.convenientChangeStepArr(6,'fontItalic',evt.detail)
                this.cellFontItalicChange(evt.detail)
            }else{
                fontItalicBtnDom.setAttribute('current','')
                this.convenientChangeStepArr(6,'fontItalic','')
                this.cellFontItalicChange('')
            }
            this.wsSendCellAttrByTypeAndData(6)

        })
    }

    createFontStrikethroughBtnDom(){
        const { h } = this.core
        // 删除线
        const fontStrikethroughBtnDom =
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'删除线',
                    value:'true'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'font',
                        position:'strikethrough'
                    }
                })
            ])

        this.fontStrikethroughBtnDom = fontStrikethroughBtnDom
        fontStrikethroughBtnDom.addEventListener('e-sheet-radio-group-change',evt=>{
            // console.log('evt',evt)
            if(fontStrikethroughBtnDom.getAttribute('current') === ''){
                fontStrikethroughBtnDom.setAttribute('current',evt.detail)
                this.convenientChangeStepArr(18,'strikethrough',evt.detail)
                this.cellStrikethroughChange('true')
            }else{
                fontStrikethroughBtnDom.setAttribute('current','')
                this.convenientChangeStepArr(18,'strikethrough','')
                this.cellStrikethroughChange('')
            }
            this.wsSendCellAttrByTypeAndData(18)
        })
    }

    createFontUnderlineBtnDom(){
        const { h } = this.core
        const fontUnderlineBtnDom = h('e-sheet-radio-button', {
            style: {
                marginLeft: '6px'
            },
            attribute: {
                label: '下划线',
                value: 'true'
            },
        }, [
            h('e-sheet-icon-svg', {
                attribute: {
                    category: 'font',
                    position: 'underline'
                }
            })
        ])
        this.fontUnderlineBtnDom = fontUnderlineBtnDom
        fontUnderlineBtnDom.addEventListener('e-sheet-radio-group-change',evt=>{
            // console.log('evt',evt)
            if(fontUnderlineBtnDom.getAttribute('current') === ''){
                fontUnderlineBtnDom.setAttribute('current',evt.detail)
                this.convenientChangeStepArr(19,'underline',evt.detail)
                this.cellUnderlineChange('true')
            }else{
                fontUnderlineBtnDom.setAttribute('current','')
                this.convenientChangeStepArr(19,'underline','')
                this.cellUnderlineChange('')
            }
            this.wsSendCellAttrByTypeAndData(19)
        })
    }

    createTextWrapBtnDom(){
        const { h } = this.core
        const textWrapGroup = h('e-sheet-radio-group',{},[
            h('e-sheet-radio-button',{
                attribute:{
                    label:'截断',
                    value:'cut'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'text',
                        position:'cut'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
                style:{
                    marginLeft:'6px'
                },
                attribute:{
                    label:'换行',
                    value:'wrap'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'text',
                        position:'wrap'
                    }
                })
            ])
        ])
        this.textWrapGroup = textWrapGroup
        textWrapGroup.addEventListener('e-sheet-radio-group-onchange',evt=>{
            // console.log('evt',evt)
            const currentSheet = this.core.getCurrentSheet();
            this.changeStepArr({
                type:21,
                pre:currentSheet.config.textWrapType,
                next:evt.detail
            })
            this.core.ws.wsSend(21,{textWrapType:evt.detail})
            this.setTextWrapChange(evt.detail)
        })
    }

    setTextWrapInHeader(type){
        this.textWrapGroup.setAttribute('value',type??'cut')
    }

    /**
     * @description 冻结状态dom
     * @type {HTMLElement}
     */
    freezeStatusDom = null

    /**
     * @description 设置顶部冻结状态
     * @param type {number}
     */
    setFreezeInHeader(type){
        this.freezeStatusDom.setAttribute('current',type===1)
    }

    /**
     * @description 插入图片
     */
    createExtraFuncDom(){
        const { h } = this.core

        this.uploadCellImgInputDom = h('input',{
            style:{
                width:0,
                height:0,
                padding:0,
                border:'none'
            },
            attr:{
                type:'file',
                multiple:true
            }
        })

        const uploadCellImgDom = h('div',{
            style:{
                display:'flex',
                alignItems:'center',
                height:'52px'
            }
        },[

            h('div',{
                style:{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }
            },[
                h('e-sheet-tip', {
                    attribute: {
                        'tip-label': '插入单元格图片',
                        'left': -40,
                        'top': 22,
                    }
                }, [
                    h('e-sheet-icon-svg', {
                        attribute: {
                            category: 'extra',
                            position: 'cell-img'
                        }
                    })
                ]),
                h('div',{
                    attr:{
                        innerText:'图片',
                        className:'e-sheet-cell-font'
                    },
                    style:{
                        marginTop:'6px'
                    }
                })
            ]),
            this.uploadCellImgInputDom
        ])

        this.uploadCellImgInputDom.addEventListener('input',evt=>{
            // console.log('上传图片',evt.target.value)
            const { clickCell } = this.contentComponent
            if(this.core.options.uploadImg){
                this.core.options.uploadImg(evt.target.files).then(res=>{
                    // console.log('上传图片res',res)
                    loadMoreNetImgPromise(res).then(resA=>{
                        const imgIds = [];
                        let imgWidth = 0
                        let imgHeight = 0
                        resA.forEach(item=>{
                            imgIds.push(item.url)
                            this.core.imgCanvasElMap[item.url] = item.imgEl
                            imgWidth += item.imgEl.width
                            imgHeight += item.imgEl.height
                        })
                        if(imgWidth > clickCell.width){
                            this.core.plugins.DragPlugin.expandWidthNoDrag(clickCell.col,imgWidth,false)
                        }
                        if(imgHeight > clickCell.height){
                            this.core.plugins.DragPlugin.expandHeightNoDrag(clickCell.row,imgHeight,false)
                        }
                        this.changeStepArr({
                            type:22,
                            label:clickCell.label,
                            pre:JSON.stringify(clickCell.img),
                            next:JSON.stringify(clickCell.img.concat(imgIds))
                        })
                        this.cellImgChange(imgIds)
                    })
                })
            }else{
                loadMoreImagePromise(evt.target.files).then(res=>{
                    const imgIds = [];
                    let imgWidth = 0
                    res.forEach(item=>{
                        imgIds.push(item.url)
                        this.core.imgCanvasElMap[item.url] = item.imgEl
                        imgWidth += item.imgEl.width
                    })
                    if(imgWidth > clickCell.width){
                        this.core.plugins.DragPlugin.expandWidthNoDrag(clickCell.col,imgWidth-clickCell.width,false)
                    }
                    const imgHeight = Math.max(...res.map(item=>item.imgEl.height))
                    if(imgHeight > clickCell.height){
                        this.core.plugins.DragPlugin.expandHeightNoDrag(clickCell.row,imgHeight-clickCell.height,false)
                    }
                    this.cellImgChange(imgIds)
                })
            }
        })

        uploadCellImgDom.addEventListener('click',_=>{
            // console.log('this.uploadCellImgInputDom',this.uploadCellImgInputDom)
            this.uploadCellImgInputDom.click()
        })

        this.uploadCellImgDom = uploadCellImgDom

    }


    /**
     * @description 筛选
     */
    createFilterFuncDom(){
        const { h } = this.core
        const filterFuncRadioDom = h('e-sheet-radio-button', {
            attribute: {
                label: '筛选',
                value: 'true'
            },
        }, [
            h('e-sheet-icon-svg', {
                attribute: {
                    category: 'filter',
                    position: '1'
                }
            })
        ])

        const filterFuncDom = h('div',{
            style:{
                display:'flex',
                alignItems:'center',
                height:'52px'
            }
        },[
            h('div',{
                style:{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }
            },[
                filterFuncRadioDom,
                h('div',{
                    attr:{
                        innerText:'筛选',
                        className:'e-sheet-cell-font'
                    },
                    style:{
                        marginTop:'6px'
                    }
                })
            ])
        ])

        this.filterFuncDom = filterFuncDom
        filterFuncRadioDom.addEventListener('e-sheet-radio-group-change',evt=>{
            const { config } = this.core.getCurrentSheet()
            // console.log('evt',evt)
            if(!filterFuncRadioDom.getAttribute('current')){
                // 判断当前的选择是否能筛选
                if(this.judgeCanFilter()){
                    filterFuncRadioDom.setAttribute('current',evt.detail)
                    const { moreSelectedCell,clickCell,contentGroup } = this.contentComponent
                    // 获取可以筛选的头部单元格
                    this.contentComponent.filterCellHeader = moreSelectedCell.filter(item=>item.row === clickCell.row && contentGroup.some(itemA=>item.col === itemA.col && !!itemA.text))
                    config.filterType = 1
                }else{
                    this.showDialog('提示','指定区域无法筛选')
                }

            }else{
                // 关闭筛选后，重置filterCellHeader
                this.contentComponent.filterCellHeader = []
                filterFuncRadioDom.setAttribute('current','')
                config.filterType = 0
            }
            // this.wsSendCellAttrByTypeAndData(19)
        })
    }

    /**
     * @description 冻结行
     */
    createFreezeFuncDom(){
        const { h } = this.core
        const funcRadioDom = h('e-sheet-radio-button', {
            attribute: {
                label: '冻结',
                value: 'true'
            },
        }, [
            h('e-sheet-icon-svg', {
                attribute: {
                    category: 'freeze',
                    position: '1'
                }
            })
        ])

        const freezeFuncDom = h('div',{
            style:{
                display:'flex',
                alignItems:'center',
                height:'52px'
            }
        },[
            h('div',{
                style:{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }
            },[
                funcRadioDom,
                h('div',{
                    attr:{
                        innerText:'冻结',
                        className:'e-sheet-cell-font'
                    },
                    style:{
                        marginTop:'6px'
                    }
                })
            ])
        ])

        this.freezeFuncDom = freezeFuncDom
        funcRadioDom.addEventListener('e-sheet-radio-group-change',evt=>{
            const { config } = this.core.getCurrentSheet()
            // console.log('evt',evt)
            if(!funcRadioDom.getAttribute('current')){
                const { clickCell,secondClickCell } = this.contentComponent
                if(secondClickCell){
                    // 选中多个，以最后一个的行数为基准
                    config.freezeRow = secondClickCell.row
                    config.freezeType = 1
                    funcRadioDom.setAttribute('current',evt.detail)
                }else if(clickCell){
                    config.freezeRow = clickCell.row
                    config.freezeType = 1
                    funcRadioDom.setAttribute('current',evt.detail)
                }
                // 当滚动条滚动后才冻结，需要刷新一下
                this.core.fresh();
            }else{
                funcRadioDom.setAttribute('current','')
                config.freezeType = 0
                config.freezeRow = 0
            }
            // this.wsSendCellAttrByTypeAndData(19)
        })
        this.freezeStatusDom = funcRadioDom
    }

    /**
     * @description 判断是否可以筛选
     * @returns {boolean}
     */
    judgeCanFilter(){
        const { moreSelectedCell,clickCell,contentGroup } = this.contentComponent
        if(moreSelectedCell.length > 0){
            // 选中多个
            const firstRowCells = moreSelectedCell.filter(item=>item.row === clickCell.row).map(item=>item.col)
            contentGroup.some(item=> {
                return !!item.text && firstRowCells.includes(item.col)
            })
        }else{
            return !!clickCell.text
        }
    }
}
