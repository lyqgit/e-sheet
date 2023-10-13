
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


    registryContextMenu(){
        const containerDom = this.core.h('div')
        const mergeBtn = this.core.h('div')

        mergeBtn.innerText='合并'
        mergeBtn.onclick = event=>{
            const { clickCell,moreSelectedCell } = this.contentComponent
            if(moreSelectedCell.some(item=>item.isMerge)){
                return
            }
            let mergeWidth = clickCell.width
            let mergeHeight = clickCell.height
            clickCell.mergeLabelGroup = moreSelectedCell
            clickCell.mergeEndLabel = moreSelectedCell[moreSelectedCell.length - 1].label
            clickCell.mergeStartLabel = clickCell.label
            clickCell.isMerge = true
            clickCell.mergeRow = 1
            clickCell.mergeCol = 1
            moreSelectedCell.forEach(item=> {
                item.isMerge = true
                item.mergeStartLabel = clickCell.label
                item.mergeEndLabel = moreSelectedCell[moreSelectedCell.length - 1].label
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
            console.log('合并完成',clickCell)
            this.core.freshContent()

        }

        containerDom.appendChild(mergeBtn)
        this.selectorDom.appendChild(containerDom)
    }

}