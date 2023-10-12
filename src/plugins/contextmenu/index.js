
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
            clickCell.mergeLabelGroup = moreSelectedCell
            clickCell.mergeEndLabel = moreSelectedCell[moreSelectedCell.length - 1].label
            clickCell.mergeStartLabel = clickCell.label
            clickCell.isMerge = true
            moreSelectedCell.forEach(item=> {
                item.isMerge = true
                item.mergeStartLabel = clickCell.label
                item.mergeEndLabel = moreSelectedCell[moreSelectedCell.length - 1].label
            })
            console.log('合并完成')
            this.core.freshContent()

        }

        containerDom.appendChild(mergeBtn)
        this.selectorDom.appendChild(containerDom)
    }

}