import {loadMoreImagePromise, loadMoreNetImgPromise} from "../../util/canvas.js";

export default class ContextmenuPlugin{

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.settingPlugin = core.plugins.SettingPlugin
        this.options = options
        this.layer = layer
        this.core = core

        this.registryContextMenu()
    }

    containerDom = null

    hideContextMenu=()=>{
        this.containerDom.style.display = 'none'
    }

    insertRow=(row,num,isTop = true)=>{
        // console.log('当前选中的row',row)
        if(!num){
            return
        }
        const { col } = this.core
        const { cellWidth,cellHeight } = this.options
        const { contentGroup } = this.contentComponent
        this.core.sheetHeight += num*cellHeight
        const index = this.contentComponent.searchRectIndexByColAndRow(1,isTop?row:(row+1));
        for(let i = 1;i<=num;i++){
            const tempRect = contentGroup[index];
            // console.log('index',index);
            (new Array(col)).fill(undefined).forEach((_,ind)=>{
                contentGroup.splice(index,0,{
                    row,
                    col:col - ind,
                    text:'',
                    width:cellWidth,
                    height:cellHeight,
                    x:tempRect.x,
                    y:tempRect.y,
                    ltX:tempRect.ltX,
                    ltY:tempRect.ltY,
                    mergeWidth:0,
                    mergeHeight:0,
                    mergeRow:1,
                    mergeCol:1,
                    mergeStartLabel:'',
                    mergeEndLabel:'',
                    mergeLabelGroup:[],
                    isMerge:false,
                    bgColor:null,
                    fontColor:'#000000',
                    font:null,
                    fontSize:12,
                    fontWeight:'',
                    fontItalic:'',
                    fontFamily:'Calibre',
                    textAlign:'center',
                    textBaseline:'middle',
                    label:'insert'
                })

            });

        }
        this.contentComponent.initContentGroupRowAndColByRow(row,num)
        // this.contentComponent.hideClickRect()
        this.core.fresh()
        this.core.plugins.ScrollPlugin.changeVerBarHeight()
    }

    insertCol=(col,num,isLeft = true)=>{
        // console.log('当前选中的col',col)
        if(!num){
            return
        }
        const { row } = this.core
        const { cellWidth,cellHeight } = this.options
        const { contentGroup } = this.contentComponent
        this.core.sheetWidth += num*cellWidth
        for(let i = 1;i<=row;i++){
            const index = this.contentComponent.searchRectIndexByColAndRow(col,i);
            const tempRect = contentGroup[index];
            // console.log('index',index);
            (new Array(num)).fill(undefined).forEach(_=>{
                contentGroup.splice(isLeft?index:index+1,0,{
                    row:i,
                    col,
                    text:'',
                    width:cellWidth,
                    height:cellHeight,
                    x:tempRect.x,
                    y:tempRect.y,
                    ltX:tempRect.ltX,
                    ltY:tempRect.ltY,
                    mergeWidth:0,
                    mergeHeight:0,
                    mergeRow:1,
                    mergeCol:1,
                    mergeStartLabel:'',
                    mergeEndLabel:'',
                    mergeLabelGroup:[],
                    isMerge:false,
                    bgColor:null,
                    fontColor:'#000000',
                    font:null,
                    fontSize:12,
                    fontWeight:'',
                    fontItalic:'',
                    fontFamily:'Calibre',
                    textAlign:'center',
                    textBaseline:'middle',
                    label:'insert'
                })

            });

        }
        // console.log('contentGroup',contentGroup)
        this.contentComponent.initContentGroupRowAndColByCol(col,num)
        // this.contentComponent.hideClickRect()
        this.core.fresh()
        this.core.plugins.ScrollPlugin.changeHorBarWidth()
    }

    removeCol=(col,num,isLeft = true)=>{
        // console.log('当前选中的col',col)
        if(!num){
            return
        }
        const { row } = this.core
        const { cellWidth,cellHeight } = this.options
        const { contentGroup } = this.contentComponent
        this.core.sheetWidth -= num*cellWidth
        // console.log('remove-col',col)
        // console.log('remove-num',num)
        // console.log('isLeft?col+num:col+1+num',isLeft?(col+num):(col+1+num))
        for(let i = 1;i<=row;i++){
            for(let n=0;n<num;n++){
                const index = this.contentComponent.searchRectIndexByColAndRow(isLeft?(col+n):(col+1+n),i);
                contentGroup.splice(index,1)
            }
            // console.log('index',index);
        }
        // console.log('contentGroup',contentGroup)
        this.contentComponent.initContentGroupRowAndColByCol(col,num,false)
        // console.log('contentGroup',contentGroup)
        // this.contentComponent.hideClickRect()
        this.core.fresh()
        this.core.plugins.ScrollPlugin.changeHorBarWidth()
    }
    removeRow=(row,num,isTop = true)=>{
        // console.log('当前选中的row',row)
        if(!num){
            return
        }
        const { col } = this.core
        const { cellWidth,cellHeight } = this.options
        const { contentGroup } = this.contentComponent
        this.core.sheetHeight -= num*cellHeight
        const index = this.contentComponent.searchRectIndexByColAndRow(1,isTop?row:(row+1));
        for(let i = 1;i<=num;i++){
            contentGroup.splice(index,col)
        }
        this.contentComponent.initContentGroupRowAndColByRow(row,num,false)
        // this.contentComponent.hideClickRect()
        this.core.fresh()
        this.core.plugins.ScrollPlugin.changeVerBarHeight()
    }

    /**
     * @param {Object} clickCell
     * @param {boolean} changeClickCell
     * @returns {boolean}
     */
    splitCell=(clickCell,changeClickCell = true)=>{
        if(!clickCell.isMerge){
            this.settingPlugin.showDialog('提示','当前选中的单元格不是合并的单元格无法拆解')
            return false
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
        changeClickCell && this.contentComponent.showClickRect(clickCell)
        this.core.fresh()
        this.hideContextMenu()
        return true
    }

    /**
     * @param {Object} clickCell
     * @param {Array} mergeSelectedCell
     * @param {boolean} changeClickCell
     * @returns {boolean}
     */
    mergeCell=(clickCell,mergeSelectedCell,changeClickCell = true)=>{
        if(mergeSelectedCell.length === 1 && mergeSelectedCell[0].label === clickCell.label){
            this.settingPlugin.showDialog('提示','单个单元格无法合并')
            return false
        }
        if(mergeSelectedCell.some(item=>item.isMerge) || mergeSelectedCell.length === 0){
            this.settingPlugin.showDialog('提示','当前选中的单元格中有合并的单元格，无法合并')
            return false
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
        changeClickCell && this.contentComponent.showClickRect(clickCell)
        this.core.freshContent()
        this.hideContextMenu()
        return true
    }

    eventInsertCol=(num,isLeft = true)=>{
        const { clickCell } = this.contentComponent
        if(!this.contentComponent.isHasMergerInRectArrByCol(clickCell.col)){
            this.core.plugins.SettingPlugin.changeStepArr({
                type:13,
                pre:{
                    col:clickCell.col,
                    num,
                    isLeft
                },
                next:{
                    col:clickCell.col,
                    num,
                    isLeft
                }
            })
            this.core.ws.wsSend(13,{
                col:clickCell.col,
                num,
                isLeft
            })
            this.insertCol(clickCell.col,num,isLeft)
        }

        this.hideContextMenu()
    }

    eventInsertRow=(num,isTop = true)=>{
        const { clickCell } = this.contentComponent
        if(!this.contentComponent.isHasMergerInRectArrByRow(clickCell.row)){
            this.core.plugins.SettingPlugin.changeStepArr({
                type:14,
                pre:{
                    row:clickCell.row,
                    num,
                    isTop
                },
                next:{
                    row:clickCell.row,
                    num,
                    isTop
                }
            })
            this.core.ws.wsSend(14,{
                row:clickCell.row,
                num,
                isTop
            })
            this.insertRow(clickCell.row,num,isTop)
        }

        this.hideContextMenu()
    }

    /**
     * @description 清空当前选中的单元格中的图片
     */
    clearImg=()=>{
        const { clickCell } = this.contentComponent
        this.core.plugins.SettingPlugin.changeStepArr({
            type:22,
            label:clickCell.label,
            pre:JSON.stringify(clickCell.img),
            next:JSON.stringify([])
        })
        clickCell.img = []
        this.hideContextMenu()
        this.core.fresh()
    }

    registryContextMenu(){

        const { h } = this.core

        const containerDom = h('div',{
            style:{
                display:'none',
            },
            attr:{
                className:'e-sheet-contextmenu-layout'
            }
        })

        const mergeBtn = h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'合并单元格',
                className: 'item-btn'
            }
        })

        const splitBtn = h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'拆分单元格',
                className: 'item-btn'
            }
        })

        const clearImgBtn = h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'清空图片',
                className: 'item-btn'
            }
        })

        const addImgBtn = h('div',{
            style:{
                cursor:'pointer'
            },
            attr:{
                innerText:'插入图片',
                className: 'item-btn'
            }
        })

        const insertLeftColBtn = h('div',{
            attr:{
                className: 'item-input-btn item-top-border'
            }
        },[
            h('span',{
                attr:{
                    innerText:'左侧插入',
                    onclick:evt=>{
                        this.eventInsertCol(evt.target.nextElementSibling.valueAsNumber)
                    }
                }
            }),
            h('input',{
                attr:{
                    type:'number',
                    placeholder:'请输入列数',
                    className:'input-con',
                    value:1,
                    onkeydown:event=>{
                        // console.log('event',event)
                        if(event.key==='Enter'){
                            this.eventInsertCol(event.target.valueAsNumber)
                            event.target.value = 1
                        }

                    }
                }
            }),
            h('span',{
                attr:{
                    innerText:'列'
                }
            })
        ])

        const insertRightColBtn = h('div',{
            attr:{
                className: 'item-input-btn item-top-border'
            }
        },[
            h('span',{
                attr:{
                    innerText:'右侧插入',
                    onclick:evt=>{
                        this.eventInsertCol(evt.target.nextElementSibling.valueAsNumber,false)
                    }
                }
            }),
            h('input',{
                attr:{
                    type:'number',
                    placeholder:'请输入列数',
                    className:'input-con',
                    value:1,
                    onkeydown:event=>{
                        // console.log('event',event)
                        if(event.key==='Enter'){
                            this.eventInsertCol(event.target.valueAsNumber,false)
                            event.target.value = 1
                        }

                    }
                }
            }),
            h('span',{
                attr:{
                    innerText:'列'
                }
            })
        ])

        const insertTopRowBtn = h('div',{
            attr:{
                className: 'item-input-btn item-top-border'
            }
        },[
            h('span',{
                attr:{
                    innerText:'上侧插入',
                    onclick:evt=>{
                        this.eventInsertRow(evt.target.nextElementSibling.valueAsNumber)
                    }
                }
            }),
            h('input',{
                attr:{
                    type:'number',
                    placeholder:'请输入行数',
                    className:'input-con',
                    value:1,
                    onkeydown:event=>{
                        // console.log('event',event)
                        if(event.key==='Enter'){
                            this.eventInsertRow(event.target.valueAsNumber)
                            event.target.value = 1
                        }

                    }
                }
            }),
            h('span',{
                attr:{
                    innerText:'行'
                }
            })
        ])


        const insertBottomRowBtn = h('div',{
            attr:{
                className: 'item-input-btn item-top-border'
            }
        },[
            h('span',{
                attr:{
                    innerText:'下侧插入',
                    onclick:evt=>{
                        this.eventInsertRow(evt.target.nextElementSibling.valueAsNumber,false)
                    }
                }
            }),
            h('input',{
                attr:{
                    type:'number',
                    placeholder:'请输入行数',
                    className:'input-con',
                    value:1,
                    onkeydown:event=>{
                        // console.log('event',event)
                        if(event.key==='Enter'){
                            const { clickCell } = this.contentComponent
                            this.eventInsertRow(event.target.valueAsNumber,false)
                            event.target.value = 1
                        }

                    }
                }
            }),
            h('span',{
                attr:{
                    innerText:'行'
                }
            })
        ])


        this.containerDom = containerDom

        this.canvasDom.addEventListener('contextmenu',evt=>{
            // console.log('evt---contextmenu',evt)
            evt.preventDefault()
            const { clickCell } = this.contentComponent
            const { cellHeight } = this.options
            const { offsetX,offsetY } = this.core.plugins.ScrollPlugin
            if(evt.offsetX <= cellHeight || evt.offsetY <= cellHeight){
                return
            }
            if(clickCell){
                // show contextmenu
                containerDom.style.display = 'block'
                containerDom.style.left = evt.offsetX+'px'//clickCell.ltX-offsetX+cellHeight+'px'
                containerDom.style.top = evt.offsetY+'px'//clickCell.ltY-offsetY+'px'
                if(clickCell.isMerge){
                    mergeBtn.style.display='none'
                    splitBtn.style.display='flex'
                }else{
                    splitBtn.style.display='none'
                    mergeBtn.style.display='flex'

                }
            }
        })

        mergeBtn.onclick = _=>{
            const { clickCell,mergeSelectedCell } = this.contentComponent
            const stepObj = {
                type:9,
                label:clickCell.label
            }
            const tempGroupCell = [clickCell,...mergeSelectedCell].sort((a,b)=>{return (a.row - b.row)+(a.col - b.col) })

            stepObj.pre = tempGroupCell[0].label
            stepObj.next = tempGroupCell.map(item=>item.label)
            this.core.plugins.SettingPlugin.changeStepArr(stepObj)
            this.core.plugins.SettingPlugin.wsSendInfoByTypeAndData(9,stepObj.next)
            this.mergeCell(tempGroupCell[0],tempGroupCell.slice(0))
            // this.core.ws.wsSend(9,stepObj.next)
        }

        splitBtn.onclick = _=>{
            const { clickCell } = this.contentComponent
            const next = {
                row:clickCell.row,
                col:clickCell.col,
                mergeRow:clickCell.mergeRow,
                mergeCol:clickCell.mergeCol,
                mergeStartLabel:clickCell.mergeStartLabel,
                mergeEndLabel:clickCell.mergeEndLabel,
                isMerge:false,
            }
            this.core.plugins.SettingPlugin.changeStepArr({
                type:10,
                label:clickCell.label,
                pre:{
                    row:clickCell.row,
                    col:clickCell.col,
                    mergeRow:clickCell.mergeRow,
                    mergeCol:clickCell.mergeCol,
                    mergeStartLabel:clickCell.mergeStartLabel,
                    mergeEndLabel:clickCell.mergeEndLabel,
                    isMerge:true,
                },
                next
            })
            this.core.plugins.SettingPlugin.wsSendInfoByTypeAndData(10,next)
            this.splitCell(clickCell)
        }

        addImgBtn.onclick = _=>{
            this.core.plugins.SettingPlugin.uploadCellImgInputDom.click()
            this.hideContextMenu()
        }

        clearImgBtn.onclick = _=>{
            this.clearImg()
            this.hideContextMenu()
        }

        containerDom.appendChild(mergeBtn)
        containerDom.appendChild(splitBtn)
        containerDom.appendChild(addImgBtn)
        containerDom.appendChild(clearImgBtn)
        containerDom.appendChild(insertLeftColBtn)
        containerDom.appendChild(insertRightColBtn)
        containerDom.appendChild(insertTopRowBtn)
        containerDom.appendChild(insertBottomRowBtn)
        this.canvasWrapperDom.appendChild(containerDom)
    }

}