
export default class setting{

    /**
     * @type {HTMLElement}
     */
    labelInputDom = null
    /**
     * @type {HTMLElement}
     */
    fxInputDom = null

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

    changeFirstSelectedCell(label){

        const attrFirst = this.contentComponent.searchRectByLabel(label)

        if(!attrFirst){
            return
        }

        this.contentComponent.showClickRect(attrFirst)

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

    }

}
