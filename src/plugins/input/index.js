export default class InputPlugin{
    options = {}
    core = null

    selectorDom = null
    contentComponent = null
    headerComponent = null
    sideBorderLine = null

    dblClickContext = null
    clickContext = null
    inputDom = null
    rectContext = null
    headerBorderLine = null

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.wholeComponent = components.WholeComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.options = options
        this.layer = layer
        this.core = core
        this.appendInput()
        core.plugins.ScrollPlugin.horBarDom.addEventListener('mousedown',()=>{
            this.inputDom.style.display = 'none'
        })
        core.plugins.ScrollPlugin.verBarDom.addEventListener('mousedown',()=>{
            this.inputDom.style.display = 'none'
        })
    }


    hideInput(){
        this.inputDom.style.display = 'none'
        this.inputDom.value = ''
        this.inputDom.oninput = null
    }

    setCellText(){

        const { clickCell } = this.contentComponent

        clickCell.text = this.inputDom.value

    }

    /**
     * @param {object} attrs
     */
    showInput(attrs){
        const { inputDom } = this
        const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
        const { cellHeight } = this.options

        const {x,y,width,height,text,isMerge,mergeWidth,mergeHeight,bgColor,fontColor} = attrs

        const textWidth = text.length*this.core.fontSize

        const inputWidth = isMerge?mergeWidth:width
        
        inputDom.style.opacity = 1
        inputDom.style.top = y+cellHeight-offsetY+'px'
        inputDom.style.left = x+cellHeight-offsetX+'px'
        inputDom.style.display = 'inline-block'
        inputDom.style.textAlign = 'center'
        inputDom.style.width = (inputWidth>textWidth?inputWidth:textWidth)+'px'
        inputDom.style.height = (isMerge?mergeHeight:height)+'px'
        inputDom.style.borderRadius = '6px'
        inputDom.style.backgroundColor = bgColor??''
        inputDom.style.color = fontColor??''
        // console.log('attrs',attrs)
        inputDom.value = text
        inputDom.oninput=evt=>{
            this.core.plugins.SettingPlugin.setCellCon(evt.target.value)
        }
        this.contentComponent.hideCellPainterDom()
    }

    appendInput(){

        const inputDom = document.createElement('textarea')
        this.inputDom = inputDom
        inputDom.style.display = 'none' //'inline-block'
        inputDom.style.position = 'absolute'
        inputDom.style.outline = 'none'
        inputDom.style.border = '2px solid '+this.core.selectedBorderBgColor
        inputDom.style.boxSizing = 'border-box'

        this.canvasWrapperDom.appendChild(inputDom)

        this.canvasDom.addEventListener('dblclick',evt=>{

            this.contentComponent.hideSelectedCellDom()

            const { cellHeight } = this.options

            if(evt.offsetX<=cellHeight || evt.offsetY<=cellHeight){
                return
            }

            this.core.plugins.SelectPlugin.clearCopyDash()

            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const { clickCell } = this.contentComponent

            // const attrs = this.core.plugins.SelectPlugin.searchRectAddr(evt.offsetX+offsetX - cellHeight,evt.offsetY+offsetY - cellHeight)
            const {x,y,width,height,text,isMerge,mergeWidth,mergeHeight,bgColor,fontColor} = clickCell
            // this.contentComponent.hideClickRect()
            this.core.fresh()
            // console.log('attrs',attrs)

            let inputWidth = isMerge?mergeWidth:width

            const textWidth = text.length*this.core.fontSize
            const { config:{ freezeType } } = this.core.getCurrentSheet()
            inputDom.style.opacity = 1
            inputDom.style.top = y+cellHeight-(freezeType===1?0:offsetY)+'px'
            inputDom.style.left = x+cellHeight-offsetX+'px'
            inputDom.style.display = 'inline-block'
            inputDom.style.textAlign = 'center'
            inputDom.style.width = (inputWidth>textWidth?inputWidth:textWidth)+'px'
            inputDom.style.height = (isMerge?mergeHeight:height)+'px'
            inputDom.style.borderRadius = '6px'
            inputDom.style.backgroundColor = bgColor??''
            inputDom.style.color = fontColor??''
            // console.log('attrs',attrs)
            inputDom.value = text
            inputDom.focus()
            inputDom.onblur = evt=>{
                // console.log('测试onblur',clickCell,inputDom.value,evt.target.value)
                // console.log('测试inputDom.value',inputDom.value)
                // console.log('测试onblur-----evt.target',evt,clickCell)
                if(inputDom.value === undefined || inputDom.value === null){
                    this.hideInput()
                    return
                }

                let widthDis = 0
                let heightDis = 0

                if(!(evt.relatedTarget && this.selectorDom.contains(evt.relatedTarget))){
                    const currentSheet = this.core.getCurrentSheet();
                    const txt = inputDom.value
                    if(txt.includes('\n') && currentSheet.config.textWrapType === 'wrap'){
                        const txtArr = txt.split('\n')
                        const txtArrHeight = txtArr.length*clickCell.fontSize
                        if(txtArrHeight>clickCell.height){
                            // 拉伸高度
                            heightDis = txtArrHeight - clickCell.height
                            this.core.plugins.DragPlugin.expandHeightNoDrag(clickCell.row,heightDis,false)
                        }
                        const txtArrWidth = Math.max(...txtArr.map(item=>item.length))*clickCell.fontSize
                        if(txtArrWidth>clickCell.width){
                            // 拉伸宽度
                            widthDis = txtArrWidth - clickCell.width
                            this.core.plugins.DragPlugin.expandWidthNoDrag(clickCell.col,widthDis,false)
                        }
                    }

                    this.core.plugins.SettingPlugin.changeStepArr({
                        type:1,
                        label:clickCell.label,
                        pre:clickCell.text,
                        next:inputDom.value,
                        widthDis,
                        heightDis
                    })
                }
                clickCell.text = inputDom.value

                this.core.fresh()
                this.core.ws.wsSend(1, {...clickCell,widthDis,heightDis})
                this.inputDom.value = ''
                this.hideInput()
                // console.log('inputDom---onblur结束')
            }
            inputDom.oninput=evt=>{
                // console.log('测试',evt.target.value,clickCell)
                this.core.plugins.SettingPlugin.setCellCon(evt.target.value)
                // clickCell.text = inputDom.value
            }
            this.contentComponent.hideCellPainterDom()
        })
    }
}