
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
    fontHorAddrGroup = null/**
     * @type {HTMLElement}
     */
    fontVerAddrGroup = null

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
        let resTextAlign = textAlign
        if(textAlign === 'start'){
            resTextAlign = 'end'
        }else if(textAlign === 'end'){
            resTextAlign = 'start'
        }
        this.contentComponent.clickCell.textAlign = resTextAlign
        this.core.freshContent()
    }

    /**
     * @param {string} textBaseline
     */
    cellFontTextBaseLineChange(textBaseline){
        let resTextBaseline = textBaseline
        if(textBaseline === 'top'){
            resTextBaseline = 'bottom'
        }else if(textBaseline === 'bottom'){
            resTextBaseline = 'top'
        }
        this.contentComponent.clickCell.textBaseline = resTextBaseline
        this.core.freshContent()
    }

    /**
     * @param {object} attr
     */
    setCellAttrInHeader(attr){
        this.fontHorAddrGroup.setAttribute('value',attr.textAlign)
        this.fontVerAddrGroup.setAttribute('value',attr.textBaseline)
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

        const fxInputDom = h('input',{
            attr:{
                className:'fx-input',
                oninput:evt=>{
                    // console.log('fxInputDom----oninput')
                    // console.log('evt',evt.target.value)
                    this.core.plugins.InputPlugin.inputDom.value = evt.target.value
                    this.contentComponent.clickCell.text = evt.target.value
                },
                onfocus:_=>{
                    // console.log('fxInputDom----onfocus')
                    if(!this.contentComponent.clickCell){
                        return
                    }
                    this.core.plugins.InputPlugin.showInput(this.contentComponent.clickCell)
                },
                onblur:_=>{
                    // console.log('fxInputDom----onblur')
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
                    value:'start'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'hor',
                        position:'start'
                    }
                })
            ]),
            h('e-sheet-radio-button',{
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
                attribute:{
                    label:'右对齐',
                    value:'end'
                },
            },[
                h('e-sheet-icon-svg',{
                    attribute:{
                        category:'hor',
                        position:'end'
                    }
                })
            ])
        ])
        this.fontHorAddrGroup = fontHorAddrGroup
        fontHorAddrGroup.addEventListener('e-sheet-radio-group-onchange',evt=>{
            // console.log('evt',evt)
            this.cellFontTextAlignChange(evt.detail)
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
        })

        const settingTopDom = h('div',{
            attr:{
                className:'e-sheet-setting-layout'
            }
        })
        settingTopDom.appendChild(fontHorAddrGroup)
        settingTopDom.appendChild(fontVerAddrGroup)
        this.selectorDom.insertBefore(settingTopDom,settingDom)

    }

}
