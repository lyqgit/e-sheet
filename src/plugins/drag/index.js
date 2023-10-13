
export default class DragPlugin{

    dragShowDis = 6

    dragCell = null

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.options = options
        this.layer = layer
        this.core = core
        this.registerDragEvent()
    }

    expandWidth(col,dis){
        // console.log('dis',dis)
        const { contentGroup } = this.contentComponent
        const { cellHeight } = this.options

        // console.log('this.dragCell.width>=cellHeight',this.dragCell.width<cellHeight)

        if(this.dragCell.width<cellHeight && dis<0){
            return;
        }

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]

            if(tempRect.col === col){
                tempRect.width += dis


                // console.log('dis',dis)
            }else if(tempRect.col>col){
                tempRect.x += dis
                tempRect.ltX += dis

            }
            if(tempRect.col === col && tempRect.row === 1){
                this.core.sheetWidth += dis
            }

            if(tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label){
                tempRect.mergeWidth += dis
            }
        }
        this.core.freshScrollBar()
        this.core.fresh()
    }

    registerDragEvent(){

        this.canvasDom.addEventListener('mousedown',evtA=>{

            // console.log('开始拖拽',this.core.dragSign)

            if(!this.dragCell || !this.core.dragSign){
                return
            }
            let dragEndX = 0
            let dragStartX = evtA.pageX
            this.canvasDom.onmousemove = evtB=>{
                dragEndX = evtB.pageX
                this.expandWidth(this.dragCell.col,dragEndX-dragStartX)
                dragStartX = dragEndX
            }

        })

        this.canvasDom.addEventListener('mousemove',event=>{
            // 横向
            const { headerRectGroup } = this.headerComponent
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            const { cellHeight } = this.options
            const { dragShowDis } = this
            const x = event.offsetX + offsetX

            if(this.dragCell && ((x<this.dragCell.ltX+this.dragCell.width - dragShowDis)||(x>this.dragCell.ltX + this.dragCell.width + dragShowDis + 1))){
                // console.log('离开拖拽')
                this.core.dragSign = false
            }

            // console.log('col',event.offsetX)
            if(event.offsetY <= cellHeight){
                for(let i=0;i<headerRectGroup.length;i++){
                    const tempHeader = headerRectGroup[i]

                    if((x>tempHeader.ltX + tempHeader.width - dragShowDis) && (x<tempHeader.ltX + tempHeader.width + dragShowDis + 1)){
                        // console.log('鼠标在拖拽之上',this.core.dragSign)
                        if(!this.core.dragSign){
                            this.dragCell = tempHeader
                        }
                        this.layer.setCursor('col-resize')
                        this.core.dragSign = true

                        // console.log('拖拽标识',this.core.dragSign)
                    }
                }
            }


        })
    }

}