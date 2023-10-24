
export default class ContextmenuPlugin{

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.options = options
        this.layer = layer
        this.core = core

        this.registryContextMenu()
    }

    containerDom = null

    hideContextMenu=()=>{
        this.containerDom.style.display = 'none'
    }

    registryContextMenu(){
        const containerDom = this.core.h('div',{
            style:{
                display:'none',
            },
            attr:{
                className:'contextmenu-layout'
            }
        })

        this.containerDom = containerDom

        this.canvasDom.addEventListener('contextmenu',evt=>{
            console.log('evt---contextmenu',evt)
            evt.preventDefault()
            const { clickCell } = this.contentComponent
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            if(clickCell){
                // show contextmenu
                containerDom.style.display = 'flex'
                containerDom.style.left = clickCell.ltX-offsetX+cellHeight+'px'
                containerDom.style.top = clickCell.ltY-offsetY+'px'
            }
        })

        const mergeBtn = this.core.h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'合并单元格'
            }
        })

        mergeBtn.onclick = _=>{
            const { clickCell,mergeSelectedCell } = this.contentComponent
            if(mergeSelectedCell.some(item=>item.isMerge)){
                return
            }
            let mergeWidth = clickCell.width
            let mergeHeight = clickCell.height
            // clickCell.mergeLabelGroup = mergeSelectedCell
            clickCell.mergeEndLabel = mergeSelectedCell[mergeSelectedCell.length - 1].label
            clickCell.mergeStartLabel = clickCell.label
            clickCell.isMerge = true
            clickCell.mergeRow = 1
            clickCell.mergeCol = 1
            mergeSelectedCell.forEach(item=> {
                item.isMerge = true
                item.mergeStartLabel = clickCell.label
                item.mergeEndLabel = mergeSelectedCell[mergeSelectedCell.length - 1].label
                if(clickCell.row === item.row && clickCell.label !== item.label){
                    mergeWidth+=item.width
                    clickCell.mergeCol += 1
                }
                if(clickCell.col === item.col && clickCell.label !== item.label){
                    mergeHeight+=item.height
                    clickCell.mergeRow += 1
                }

            })
            clickCell.mergeWidth = mergeWidth
            clickCell.mergeHeight = mergeHeight
            // console.log('合并完成',clickCell)
            this.contentComponent.setSecondClickCell(null)
            this.core.freshContent()
            this.hideContextMenu()
        }

        containerDom.appendChild(mergeBtn)
        this.selectorDom.appendChild(containerDom)
    }

}