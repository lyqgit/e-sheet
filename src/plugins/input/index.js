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
    }

    appendInput(){

        const inputDom = document.createElement('input')
        this.inputDom = inputDom
        inputDom.style.display = 'none' //'inline-block'
        inputDom.style.position = 'absolute'
        inputDom.style.outline = 'none'
        inputDom.style.border = '2px solid blue'
        inputDom.style.boxSizing = 'border-box'

        this.selectorDom.appendChild(inputDom)

        this.canvasDom.addEventListener('dblclick',evt=>{

            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const attrs = this.core.plugins.SelectPlugin.searchRectAddr(evt.offsetX+offsetX - cellHeight,evt.offsetY+offsetY - cellHeight)
            const {x,y,width,height,text} = attrs
            this.contentComponent.hideClickRect()
            this.core.fresh()

            inputDom.style.top = y+cellHeight-offsetY+'px'
            inputDom.style.left = x+cellHeight-offsetX+'px'
            inputDom.style.display = 'inline-block'
            inputDom.style.textAlign = 'center'
            inputDom.style.width = width+'px'
            inputDom.style.height = height+'px'
            inputDom.style.borderRadius = '6px'
            inputDom.value = text
            inputDom.focus()
            inputDom.onblur = ()=>{
                attrs.text = inputDom.value
                console.log('attrs.text',typeof attrs.text,inputDom.value)
                this.core.fresh()
                this.hideInput()
            }
        })
    }
}