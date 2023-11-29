
export default class setting{

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
    cellMergerBtnDom = null
    /**
     * @type {HTMLElement}
     */
    cellSplitBtnDom = null

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
    }

    setLabelCon(label){
        this.labelInputDom.value = label
    }

    setCellCon(value){
        this.fxInputDom.value = value
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
        this.core.stepCallbackArr.forEach(item=>{
            item(JSON.parse(obj))
        })
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
    }


    forwardSetSheet(){

        const { core,contentComponent } = this

        const curSheet = core.getCurrentSheet()

        // console.log('curSheet',curSheet)

        if(curSheet.stepNum === curSheet.stepArr.length-1){
            return;
        }

        const fObj = curSheet.stepArr[curSheet.stepNum + 1]

        curSheet.sheet = JSON.parse(fObj.sheet)
        contentComponent.installContentDataByName(curSheet.label)
        const selectedCell = contentComponent.searchRectByLabel(fObj.label)
        contentComponent.showClickRect(selectedCell)

        core.fresh()
        // console.log('步骤减1')
        curSheet.stepNum += 1
    }


    fallbackSetSheet(){

        const { core,contentComponent } = this

        const curSheet = core.getCurrentSheet()

        // console.log('curSheet',curSheet)

        if(curSheet.stepNum === 0){
            return;
        }
        const fObj = curSheet.stepArr[curSheet.stepNum-1]
        curSheet.sheet = JSON.parse(fObj.sheet)

        contentComponent.installContentDataByName(curSheet.label)
        const selectedCell = contentComponent.searchRectByLabel(fObj.label)
        contentComponent.showClickRect(selectedCell)

        core.fresh()
        // console.log('步骤减1')
        curSheet.stepNum -= 1
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
                    if(!this.core.plugins.InputPlugin.inputDom.value){
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

            this.cellFontTextAlignChange(evt.detail)
            this.convenientGroupChangeStepArr()
        })

        // 操作文字纵向对齐
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

            this.cellFontTextBaseLineChange(evt.detail)
            this.convenientGroupChangeStepArr()
        })

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
        fontPositionDom.appendChild(fontVerAddrGroup)
        fontPositionDom.appendChild(fontHorAddrGroup)


        // 字体大小设置

        const fontSizeSelectDom = h('e-sheet-select',{})

        fontSizeSelectDom.addEventListener('e-sheet-select-onchange',evt=>{

            this.cellFontSizeChange(evt.detail)
            this.convenientGroupChangeStepArr()
        })
        fontSizeSelectDom.setAttribute('label','字号')

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

        this.fontSizeSelectDom = fontSizeSelectDom

        fontSizeAndFamilyLayoutDom.appendChild(fontSizeSelectDom)


        // 字体粗体和斜体设置

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

                this.cellFontWeightChange(evt.detail)
                this.convenientGroupChangeStepArr()
            }else{
                fontWeightBtnDom.setAttribute('current','')

                this.cellFontWeightChange('')
                this.convenientGroupChangeStepArr()
            }
        })

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

                this.cellFontItalicChange(evt.detail)
                this.convenientGroupChangeStepArr()
            }else{
                fontItalicBtnDom.setAttribute('current','')

                this.cellFontItalicChange('')
                this.convenientGroupChangeStepArr()
            }


        })

        const fontStyleGroupDom = h('div',{
            attr:{
                className:'e-sheet-font-style-layout'
            }
        },[
            fontWeightBtnDom,
            fontItalicBtnDom
        ])

        fontSizeAndFamilyLayoutDom.appendChild(fontStyleGroupDom)


        // 字体颜色设置
        const fontColorSelectDom = h('e-sheet-icon-color-svg',{
            attribute:{
                category:'font-color'
            }
        })

        fontColorSelectDom.addEventListener('e-sheet-icon-color-svg-onchange',evt=>{

            this.cellFontColorChange(evt.detail)
            this.convenientGroupChangeStepArr()
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


        fontColorAndBgColorDom.appendChild(fontColorSelectTipConDom)


        // 背景颜色设置
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

            this.cellBgColorChange(evt.detail)
            this.convenientGroupChangeStepArr()
        })

        fontColorAndBgColorDom.appendChild(bgColorSelectTipConDom)

        const divideLine = h('div',{
            attr:{
                className:'e-sheet-divide-line'
            }
        })


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

        const cellMergeAndSplitLayoutDom = h('div',{
            attr:{
                className:'font-position-layout'
            }
        })

        cellMergerBtnDom.onclick=_=>{
            const { clickCell,mergeSelectedCell } = this.contentComponent
            const stepObj = {
                type:9,
                label:clickCell.label
            }
            const tempGroupCell = [clickCell,...mergeSelectedCell].sort((a,b)=>{return (a.row - b.row)+(a.col - b.col) })

            this.core.plugins.ContextmenuPlugin.mergeCell(tempGroupCell[0],tempGroupCell.slice(0))
            // stepObj.pre = tempGroupCell[0].label
            // stepObj.next = tempGroupCell.map(item=>item.label)
            // this.changeStepArr(stepObj)
            this.convenientGroupChangeStepArr()
            // if(mergeSelectedCell.some(item=>item.isMerge) || mergeSelectedCell.length === 0){
            //     return
            // }
            cellMergerBtnDom.style.display = 'none'
            cellSplitBtnDom.style.display = 'flex'
        }
        cellSplitBtnDom.onclick=_=>{
            const { clickCell } = this.contentComponent
            // this.changeStepArr({
            //     type:10,
            //     label:clickCell.label,
            //     pre:{
            //         row:clickCell.row,
            //         col:clickCell.col,
            //         mergeRow:clickCell.mergeRow,
            //         mergeCol:clickCell.mergeCol,
            //         mergeStartLabel:clickCell.mergeStartLabel,
            //         mergeEndLabel:clickCell.mergeEndLabel,
            //         isMerge:true,
            //     },
            //     next:{
            //         row:clickCell.row,
            //         col:clickCell.col,
            //         mergeRow:clickCell.mergeRow,
            //         mergeCol:clickCell.mergeCol,
            //         mergeStartLabel:clickCell.mergeStartLabel,
            //         mergeEndLabel:clickCell.mergeEndLabel,
            //         isMerge:false,
            //     }
            // })
            this.core.plugins.ContextmenuPlugin.splitCell(clickCell)
            this.convenientGroupChangeStepArr()
            cellMergerBtnDom.style.display = 'flex'
            cellSplitBtnDom.style.display = 'none'
        }

        this.cellMergerBtnDom = cellMergerBtnDom
        this.cellSplitBtnDom = cellSplitBtnDom

        cellMergeAndSplitLayoutDom.appendChild(cellMergerBtnDom)
        cellMergeAndSplitLayoutDom.appendChild(cellSplitBtnDom)
        cellMergeAndSplitLayoutDom.appendChild(h('div',{
            attr:{
                innerText:'单元格',
                className:'e-sheet-font-style-layout e-sheet-cell-font'
            },
            style:{
                justifyContent:'center'
            }
        }))

        // 撤销和重做

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

        settingTopDom.appendChild(stepLayout)
        settingTopDom.appendChild(divideLine.cloneNode())

        settingTopDom.appendChild(fontPositionDom)
        settingTopDom.appendChild(divideLine.cloneNode())

        settingTopDom.appendChild(fontSizeAndFamilyLayoutDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(fontColorAndBgColorDom)
        settingTopDom.appendChild(divideLine.cloneNode())
        settingTopDom.appendChild(cellMergeAndSplitLayoutDom)

        this.selectorDom.insertBefore(settingTopDom,settingDom)




    }

}
