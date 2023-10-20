
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


    expandWidthNoDrag(col,dis){
        const { contentGroup } = this.contentComponent

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]

            if(tempRect.col < col){
                continue;
            }

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

            if(tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.col===col){
                tempRect.mergeWidth += dis
            }

            if(tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.col===col){
                const mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel)
                if(mergeStartRect.row === tempRect.row){
                    mergeStartRect.mergeWidth += dis
                }
            }
        }
        this.core.freshScrollBar()
        this.core.fresh()
    }

    expandWidth(col,dis){
        // console.log('dis',dis)
        const { contentGroup } = this.contentComponent
        const { cellHeight } = this.options
        // console.log('col',col)
        this.layer.setCursor('col-resize')
        // console.log('this.dragCell.width>=cellHeight',this.dragCell.width<cellHeight)

        if(!this.dragCell || ((this.dragCell.width+dis)<cellHeight && dis<0)){
            this.dragCell = null
            return;
        }

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]

            if(tempRect.col < col){
                continue;
            }

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

            if(tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.col===col){
                tempRect.mergeWidth += dis
            }

            if(tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.col===col){
                const mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel)
                if(mergeStartRect.row === tempRect.row){
                    mergeStartRect.mergeWidth += dis
                }
            }
        }
        this.core.freshScrollBar()
        this.core.fresh()
    }

    expandHeight(row,dis){
        // console.log('dis',dis)
        const { contentGroup } = this.contentComponent
        const { cellHeight } = this.options

        this.layer.setCursor('col-resize')
        // console.log('this.dragCell.width>=cellHeight',this.dragCell.width<cellHeight)

        if(!this.dragCell || ((this.dragCell.height+dis)<cellHeight && dis<0)){
            this.dragCell = null
            return;
        }

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]

            if(tempRect.row === row){
                tempRect.height += dis


                // console.log('dis',dis)
            }else if(tempRect.row>row){
                tempRect.y += dis
                tempRect.ltY += dis

            }
            if(tempRect.row === row && tempRect.col === 1){
                this.core.sheetHeight += dis
            }

            if(tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.row===row){
                tempRect.mergeHeight += dis
            }

            if(tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.row===row){
                const mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel)
                if(mergeStartRect.col === tempRect.col){
                    mergeStartRect.mergeHeight += dis
                }
            }
        }
        this.core.freshScrollBar()
        this.core.fresh()
    }

    registerDragEvent(){

        this.canvasDom.addEventListener('mousedown',evtA=>{

            // console.log('开始拖拽',this.core.dragSign)

            this.core.lockDrag = true

            if(!this.dragCell || !this.core.dragSign){
                return
            }
            let dragEndX = 0
            let dragStartX = evtA.pageX
            let dragEndY = 0
            let dragStartY = evtA.pageY
            this.canvasDom.onmousemove = evtB=>{
                if(!this.dragCell){
                    return false
                }
                if(this.core.dragSignDirectionIsHor){
                    dragEndX = evtB.pageX
                    this.expandWidth(this.dragCell.col,dragEndX-dragStartX)
                    dragStartX = dragEndX
                }else{
                    dragEndY = evtB.pageY
                    this.expandHeight(this.dragCell.row,dragEndY-dragStartY)
                    dragStartY = dragEndY
                }

            }

        })

        this.canvasDom.addEventListener('mousemove',event=>{
            // 横向
            const { headerRectGroup } = this.headerComponent
            const { sideRectGroup } = this.sideComponent
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            const { cellHeight } = this.options
            const { dragShowDis } = this
            const x = event.offsetX + offsetX
            const y = event.offsetY + offsetY

            if(this.dragCell && ((x<this.dragCell.ltX+this.dragCell.width - dragShowDis)||(x>this.dragCell.ltX + this.dragCell.width + dragShowDis + 1))){
                // console.log('离开拖拽')
                this.core.dragSign = false
            }

            if(this.dragCell && ((y<this.dragCell.ltY+this.dragCell.height - dragShowDis)||(x>this.dragCell.ltY + this.dragCell.height + dragShowDis + 1))){
                // console.log('离开拖拽')
                this.core.dragSign = false
            }

            if(this.core.lockDrag){
                return
            }
            // console.log('col',event.offsetX)
            if(event.offsetY <= cellHeight){
                if(event.offsetX > cellHeight){
                    this.layer.setCursor('s-resize')
                }
                // 横向
                for(let i=0;i<headerRectGroup.length;i++){
                    const tempHeader = headerRectGroup[i]

                    if((x>tempHeader.ltX + tempHeader.width - dragShowDis) && (x<tempHeader.ltX + tempHeader.width + dragShowDis + 1)){
                        // console.log('鼠标在拖拽之上',this.core.dragSign)
                        if(!this.core.dragSign){
                            this.dragCell = tempHeader
                        }
                        this.layer.setCursor('col-resize')
                        this.core.dragSign = true
                        this.core.dragSignDirectionIsHor = true

                        // console.log('拖拽标识',this.core.dragSign)
                    }
                }
            }

            if(event.offsetX <= cellHeight){
                if(event.offsetY > cellHeight){
                    this.layer.setCursor('e-resize')
                }
                // 纵向
                for(let i=0;i<sideRectGroup.length;i++){
                    const tempSide = sideRectGroup[i]

                    if((y>tempSide.ltY + tempSide.height - dragShowDis) && (y<tempSide.ltY + tempSide.height + dragShowDis + 1)){
                        // console.log('鼠标在拖拽之上',this.core.dragSign)
                        if(!this.core.dragSign){
                            this.dragCell = tempSide
                        }
                        this.layer.setCursor('row-resize')
                        this.core.dragSign = true
                        this.core.dragSignDirectionIsHor = false

                        // console.log('拖拽标识',this.core.dragSign)
                    }
                }
            }


        })
    }

}