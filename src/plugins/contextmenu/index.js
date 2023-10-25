
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

    splitCell=()=>{
        const { clickCell } = this.contentComponent
        if(!clickCell.isMerge){
            return
        }

        clickCell.mergeEndLabel = ''
        clickCell.mergeStartLabel = ''
        clickCell.isMerge = false

        for(let i=clickCell.row,ni=clickCell.row+clickCell.mergeRow;i<ni;i++){
            for(let j=clickCell.col,nj=clickCell.col+clickCell.mergeCol;j<nj;j++){
                // console.log('clickCell.col',i,j)
                if(i===clickCell.row && j===clickCell.col){

                }else{
                    const tempRect = this.contentComponent.searchRectByColAndRow(j,i)
                    tempRect.mergeEndLabel = ''
                    tempRect.mergeStartLabel = ''
                    tempRect.isMerge = false
                }
            }
        }

        clickCell.mergeRow = 1
        clickCell.mergeCol = 1
        this.contentComponent.showClickRect(clickCell)
        this.core.fresh()
        this.hideContextMenu()
    }

    mergeCell=()=>{
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

    registryContextMenu(){
        const containerDom = this.core.h('div',{
            style:{
                display:'none',
            },
            attr:{
                className:'contextmenu-layout'
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

        const splitBtn = this.core.h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'拆分单元格'
            }
        })

        this.containerDom = containerDom

        this.canvasDom.addEventListener('contextmenu',evt=>{
            // console.log('evt---contextmenu',evt)
            evt.preventDefault()
            const { clickCell } = this.contentComponent
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            if(clickCell){
                // show contextmenu
                containerDom.style.display = 'flex'
                containerDom.style.left = evt.offsetX+'px'//clickCell.ltX-offsetX+cellHeight+'px'
                containerDom.style.top = evt.offsetY+'px'//clickCell.ltY-offsetY+'px'
                if(clickCell.isMerge){
                    mergeBtn.style.display='none'
                    splitBtn.style.display='block'
                }else{
                    splitBtn.style.display='none'
                    mergeBtn.style.display='block'

                }
            }
        })



        mergeBtn.onclick = _=>{
            this.mergeCell()
        }

        splitBtn.onclick = _=>{
            this.splitCell()
        }

        containerDom.appendChild(mergeBtn)
        containerDom.appendChild(splitBtn)
        this.selectorDom.appendChild(containerDom)
    }

}