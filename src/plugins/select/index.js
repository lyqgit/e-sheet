
export default class SelectPlugin{

    options = {}

    core = null


    selectorDom = null
    contentComponent = null
    headerComponent = null
    sideBorderLine = null

    clickContext = null
    inputDom = null

    copyKey = ['text','mergeWidth','mergeHeight','mergeRow','mergeCol','isMerge','bgColor','fontColor']

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


    copyText(text){
        navigator.clipboard.writeText(text)
    }

    searchMergeArr(startCol,startRow,endCol,endRow){
        const resArr = []
        const { contentGroup } = this.contentComponent
        contentGroup.forEach(item=>{
            if(item.col>=startCol && item.col <= endCol && item.row>=startRow && item.row<=endRow){
                resArr.push(item)
            }
        })
        return resArr.splice(1,resArr.length)
    }

    copyRect(clickCell,json){
        let mergeWidth = clickCell.width
        let mergeHeight = clickCell.height
        const mergerGroup = this.searchMergeArr(clickCell.col, clickCell.row, clickCell.col + json.mergeCol - 1, clickCell.row + json.mergeRow - 1)
        // console.log('mergerGroup',mergerGroup)
        // clickCell.mergeLabelGroup = mergerGroup
        clickCell.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label
        clickCell.mergeStartLabel = clickCell.label
        clickCell.isMerge = true
        // clickCell.mergeRow = 1
        // clickCell.mergeCol = 1
        mergerGroup.forEach(item=> {
            item.isMerge = true
            item.mergeStartLabel = clickCell.label
            item.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label
            if(clickCell.row === item.row && clickCell.label !== item.label){
                mergeWidth+=item.width
                // clickCell.mergeCol += 1
            }
            if(clickCell.col === item.col && clickCell.label !== item.label){
                mergeHeight+=item.height
                // clickCell.mergeRow += 1
            }
        })
        clickCell.mergeWidth = mergeWidth
        clickCell.mergeHeight = mergeHeight
    }

    moreSelect(){

        document.addEventListener('paste',event=>{
            const { clickCell,secondClickCell,clickRectShow,contentGroup } = this.contentComponent
            const domParser = new DOMParser();
            const table = domParser.parseFromString(event.clipboardData.getData('text/html'),'text/html')
            console.log('table',table.querySelector('table'))
            console.log('event-html',event.clipboardData.getData('text/html'))
            console.log('event-text',event.clipboardData.getData('text/plain'))
            const json = JSON.parse(event.clipboardData.getData('text/plain'))
            if(clickRectShow){
                // 一个框
                    // 打印
                // console.log('json',json)
                if(Array.isArray(json)){

                    const oriStartRect = json[0]

                    // 复制了多个
                    for(let j=0;j<json.length;j++){
                        const item = json[j]
                        const curRect = this.searchRectByColAndRow(clickCell.col+(item.col - oriStartRect.col),clickCell.row+(item.row - oriStartRect.row))
                        if(!curRect){
                            break;
                        }

                        for(let i in item){
                            // 只更改样式和内容，不复制width和height
                            if(this.copyKey.includes(i)){
                                curRect[i] = item[i]
                            }
                        }

                        if(item['mergeLabelGroup'].length > 0 && item['isMerge']){
                            // 合并
                            this.copyRect(curRect,item)
                        }
                    }
                }else{
                    // 复制单个，json是对象
                    // console.log('json',json)
                    for(let i in json){
                        // 只更改样式和内容，不复制width和height
                        if(this.copyKey.includes(i)){
                            clickCell[i] = json[i]
                        }
                    }

                    if(json['mergeLabelGroup'].length > 0 && json['isMerge']){
                        // 合并
                        this.copyRect(clickCell,json)
                    }

                }
                this.core.fresh()
            }
        })

        document.addEventListener('copy',event=>{
            // console.log('copy')
            event.preventDefault()
            const { clickCell,secondClickCell,clickRectShow,moreSelectedCell } = this.contentComponent
            if(clickRectShow){
                // 一个框
                // console.log('moreSelectedCell',moreSelectedCell)
                if(clickCell && !secondClickCell){

                    const table = this.core.h('table')

                    if(clickCell.isMerge){

                    }else{
                        const tr = this.core.h('tr')
                        const td = this.core.h('td')
                        td.innerText = clickCell.text
                        td.style.backgroundColor = clickCell.bgColor
                        tr.appendChild(td)
                        table.appendChild(tr)
                        // console.log('table',table.outerHTML)
                        event.clipboardData.setData('text/html', table.outerHTML);
                    }
                    // console.log('clickCell',clickCell)
                    // this.copyText(JSON.stringify(clickCell))
                    // event.clipboardData.setData('text/plain', JSON.stringify(clickCell));
                    // event.clipboardData.setData('text/html', '<b>Hello, world!</b>');
                }else if(secondClickCell){
                    // 复制多个
                    // console.log('复制moreSelectedCell',moreSelectedCell)
                    // this.copyText(JSON.stringify(moreSelectedCell))
                }
                // this.copyText('<html><body><table><tr><td style="color:red">测试</td></tr></table></body></html>')
            }

        })

        // document.addEventListener('keydown',event=>{
        //     // console.log('event',event)
        //     // this.core.shiftKey = event.shiftKey
        //     // this.core.ctrlKey = event.ctrlKey
        // })
        //
        // document.addEventListener('keyup',event=>{
        //     // console.log('event',event)
        //     this.core.shiftKey = event.shiftKey
        //     this.core.ctrlKey = event.ctrlKey
        // })
        this.canvasDom.addEventListener('mousedown',this.moreShiftSelectClick)
    }

    moreShiftSelectClick=event=>{
        // console.log('this.core',this.core)
        if(this.core.shiftKey){
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            const { clickCell } = this.contentComponent

            let attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
            if(attrSecond.isMerge){
                let isRight = attrSecond.x>clickCell.x
                let isBottom = attrSecond.y>clickCell.y

                if(isRight && !isBottom){
                    // 第二个在右上角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row)
                }else if(isRight && isBottom){
                    // 第二个在右下角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row+attrSecond.mergeRow - 1)
                }else if(!isRight && isBottom){
                    // 第二个在左下角
                    attrSecond = this.searchRectByColAndRow(attrSecond.col,attrSecond.row+attrSecond.mergeRow - 1)
                }
            }
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
            // console.log('选中',this.core.dragSign)
            if(this.core.shiftKey || this.core.ctrlKey || this.core.dragSign){
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
                let attrFirst = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                // console.log('x,y',attrFirst)
                // console.log('offsetY',offsetY)
                // console.log('event.offsetY',event.offsetY)
                if(attrFirst){
                    this.contentComponent.showClickRect(attrFirst)

                    this.contentComponent.setSecondClickCell(null)

                    this.canvasDom.onmousemove = event=>{
                        const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
                        let attrSecond = this.searchRectAddr(event.offsetX+offsetX - cellHeight,event.offsetY+offsetY - cellHeight)
                        // console.log('attr',attrSecond)
                        if(attrSecond && attrFirst.label === attrSecond.label){
                            this.contentComponent.setSecondClickCell(null)
                        } else if(attrSecond && attrSecond.label !== this.contentComponent.secondClickCell?.label ){

                            let isRight = attrSecond.x>attrFirst.x
                            let isBottom = attrSecond.y>attrFirst.y

                            // attrSecond是合并单元格

                            if(attrSecond.isMerge){
                                if(isRight && !isBottom){
                                    // 第二个在右上角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row)
                                }else if(isRight && isBottom){
                                    // 第二个在右下角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col+attrSecond.mergeCol - 1,attrSecond.row+attrSecond.mergeRow - 1)
                                }else if(!isRight && isBottom){
                                    // 第二个在左下角
                                    attrSecond = this.searchRectByColAndRow(attrSecond.col,attrSecond.row+attrSecond.mergeRow - 1)
                                }
                            }else{

                                // attrSecond跨过合并单元格 在content渲染处更改左上角起点位置(要放到content的渲染函数处）
                                // let startAndEndRect = null
                                //
                                // if(isRight && !isBottom){
                                //     // 第二个在右上角
                                //     startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrSecond.y,attrSecond.x,attrFirst.y)
                                // }else if(isRight && isBottom){
                                //     // 第二个在右下角
                                //     startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrFirst.y,attrSecond.x,attrSecond.y)
                                // }else if(!isRight && isBottom){
                                //     // 第二个在左下角
                                //     startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrFirst.y,attrFirst.x,attrSecond.y)
                                // }else{
                                //     // 第二个在左上角
                                //     startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrSecond.y,attrFirst.x,attrFirst.y)
                                // }
                                //
                                // if(startAndEndRect){
                                //
                                //     const { startRect,endRect } = startAndEndRect
                                //
                                //     const startArr = [startRect,attrFirst,attrSecond]
                                //     const endArr = [endRect,attrFirst,attrSecond]
                                //
                                //
                                //
                                //     const startCol = startArr.sort((a,b)=>a.x-b.x)[0].col
                                //     const startRow = startArr.sort((a,b)=>a.y-b.y)[0].row
                                //     const endCol = endArr.sort((a,b)=>a.x-b.x)[endArr.length-1].col
                                //     const endRow = endArr.sort((a,b)=>a.y-b.y)[endArr.length-1].row
                                //
                                //     console.log('startAndEndRect',startAndEndRect)
                                //
                                //     console.log('startCol,startRow',startCol,startRow,endCol,endRow)
                                //
                                //     attrFirst = this.searchRectByColAndRow(startCol,startRow)
                                //     attrSecond = this.searchRectByColAndRow(endCol,endRow)
                                //
                                //     console.log('attrFirst+attrSecond',attrFirst,attrSecond)
                                //     this.contentComponent.showClickRect(attrFirst)
                                // }

                            }



                            this.contentComponent.setSecondClickCell(attrSecond)
                            // console.log('attrSecond',attrSecond)
                            this.core.fresh()
                        }
                    }
                }
            }
            this.core.fresh()
            this.core.plugins.InputPlugin.hideInput()

        })

    }


    searchRectIsMerge(startX,startY,endX,endY){
        const { contentGroup } = this.contentComponent

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        const res = contentGroup.find(item=>(item.x>=startX && item.x<=endX) && (item.y>=startY && item.y<=endY) && item.isMerge)
        // console.log('res',res)
        if(res){
            return {
                startRect: this.searchRectByLabel(res.mergeStartLabel),
                endRect: this.searchRectByLabel(res.mergeEndLabel)
            }
        }else{
            return null
        }

    }

    searchRectByLabel(label){
        const { contentGroup } = this.contentComponent
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.label === label)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectByColAndRow(col,row){
        const { contentGroup } = this.contentComponent
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.col === col && item.row === row)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectAddr(oriX,oriY){

        // console.log('oriX',oriX)

        const { contentGroup } = this.contentComponent

        for(let i=0;i<contentGroup.length;i++){
            const tempContentRect = contentGroup[i]
            if((oriX>=tempContentRect.x && oriX<=tempContentRect.x+tempContentRect.width) && (oriY>=tempContentRect.y && oriY<=tempContentRect.y+tempContentRect.height)){
                // console.log('tempContentRect',tempContentRect)
                if(tempContentRect.isMerge){
                    if(tempContentRect.label === tempContentRect.mergeStartLabel){
                        return tempContentRect
                    }else{
                        const index = contentGroup.findIndex(item=>item.label === tempContentRect.mergeStartLabel)
                        // console.log('索引',index,tempContentRect)
                        return contentGroup[index]
                    }
                }else{
                    return tempContentRect
                }
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
