
export default class SelectPlugin{

    options = {}

    core = null


    selectorDom = null
    contentComponent = null
    headerComponent = null
    sideBorderLine = null

    clickContext = null
    inputDom = null

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.options = options
        this.layer = layer
        this.core = core
        this.showClickHandler()
        this.moreSelect()
    }


    moreSelect(){
        document.addEventListener('keydown',event=>{
            // console.log('event',event)
            this.core.shiftKey = event.shiftKey
            this.core.ctrlKey = event.ctrlKey
        })
        document.addEventListener('keyup',event=>{
            // console.log('event',event)
            this.core.shiftKey = event.shiftKey
            this.core.ctrlKey = event.ctrlKey
        })
        this.canvasDom.addEventListener('mousedown',this.moreShiftSelectClick)
    }

    moreShiftSelectClick=event=>{
        // console.log('this.core',this.core)
        if(this.core.shiftKey){
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
            this.contentComponent.setSecondClickCell(attrSecond)
            this.core.fresh()
        }

    }

    moreCtrlSelectClick=event=>{
        // console.log('this.core',this.core)
        if(this.core.shiftKey){
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin

            const attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
            this.contentComponent.setSecondClickCell(attrSecond)
            this.core.fresh()
        }

    }


    showClickHandler(){

        this.canvasDom.addEventListener('mousedown',event=>{
            // console.log('测试',event)
            if(this.core.shiftKey || this.core.ctrlKey){
                return
            }
            const { cellHeight,cellWidth } = this.options
            const { offsetX,offsetY,topDis,barVerContainerDom,barHorContainerDom } = this.core.plugins.ScrollPlugin

            // let moveTimeId = null
            //
            // barVerContainerDom.onmouseover = ()=>{
            //     moveTimeId = setInterval(()=>{
            //         this.core.plugins.ScrollPlugin.customMove(cellWidth)
            //     },500)
            // }
            //
            // barVerContainerDom.onmouseout = ()=>{
            //     clearInterval(moveTimeId)
            //     moveTimeId = null
            // }
            //
            // barHorContainerDom.onmouseover = ()=>{
            //     moveTimeId = setInterval(()=>{
            //         this.core.plugins.ScrollPlugin.customMove(0,cellHeight)
            //     },500)
            // }
            //
            // barHorContainerDom.onmouseout = ()=>{
            //     clearInterval(moveTimeId)
            //     moveTimeId = null
            // }

            if(event.offsetY<=cellHeight && event.offsetX<=cellHeight){
                // 左上角
                this.contentComponent.setSecondClickCell(null)
                this.contentComponent.showClickRect({},true,true)
            }else if(event.offsetY<=cellHeight && event.offsetX>cellHeight){
                // 顶部
                const attr = this.searchHeaderRectAddr(event.offsetX-cellHeight)
                if(attr){
                    this.contentComponent.setSecondClickCell(null)
                    this.contentComponent.showClickRect(attr,true)
                }
            }else if(event.offsetY>cellHeight && event.offsetX<=cellHeight){
                // 左侧
                const attr = this.searchSideRectAddr(event.offsetY-cellHeight)
                // console.log('测试',attr)
                if(attr){
                    this.contentComponent.setSecondClickCell(null)
                    this.contentComponent.showClickRect(attr,false,true)
                }
            }else{
                const attrFirst = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                // console.log('x,y',attr)
                // console.log('offsetY',offsetY)
                // console.log('event.offsetY',event.offsetY)
                if(attrFirst){
                    this.contentComponent.showClickRect(attrFirst)

                    this.contentComponent.setSecondClickCell(null)

                    this.canvasDom.onmousemove = event=>{
                        const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
                        const attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                        // console.log('attr',attrSecond)
                        if(attrSecond && attrFirst.label === attrSecond.label){
                            this.contentComponent.setSecondClickCell(null)
                        } else if(attrSecond && attrSecond.label !== this.contentComponent.secondClickCell?.label ){
                            this.contentComponent.setSecondClickCell(attrSecond)
                            this.core.fresh()
                        }
                    }
                }
            }
            this.core.fresh()
            this.core.plugins.InputPlugin.hideInput()

        })

    }

    searchRectAddr(oriX,oriY){

        // console.log('oriX',oriX)

        const { contentGroup } = this.contentComponent

        for(let i=0;i<contentGroup.length;i++){
            const tempContentRect = contentGroup[i]
            if((oriX>=tempContentRect.x && oriX<=tempContentRect.x+tempContentRect.width) && (oriY>=tempContentRect.y && oriY<=tempContentRect.y+tempContentRect.height)){
                // console.log('tempContentRect',tempContentRect)
                return tempContentRect
            }
        }
    }

    searchHeaderRectAddr(oriX){

        // console.log('oriX',oriX)

        const { headerRectGroup } = this.headerComponent

        for(let i=0;i<headerRectGroup.length;i++){
            const tempContentRect = headerRectGroup[i]
            if(oriX>=tempContentRect.x && oriX<=tempContentRect.x+tempContentRect.width){
                // console.log('tempContentRect',tempContentRect)
                return tempContentRect
            }
        }
    }

    searchSideRectAddr(oriY){

        console.log('oriY',oriY)

        const { sideRectGroup } = this.sideComponent

        for(let i=0;i<sideRectGroup.length;i++){
            const tempContentRect = sideRectGroup[i]
            if(oriY>=tempContentRect.y && oriY<=tempContentRect.y+tempContentRect.height){
                // console.log('tempContentRect',tempContentRect)
                return tempContentRect
            }
        }
    }
}
