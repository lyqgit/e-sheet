import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import { getExcelHeaderName } from "@/utils";
import u, { Cash } from 'cash-dom'

export class DragPlugin implements IPlugin {
  excel: IExcel;
  store: IStore;
  register(): void {
    this.registryDom()
    this.eventListen()
  }
  unregister(): void {
  }
  docMouseUp(evt: MouseEvent): void {
  }

  constructor(excel: IExcel, store: IStore) {
    this.excel = excel
    this.store = store
  }

  
  diffDis:number = 6;

  moveRectWidth:number = 0;

  colLineOom:Cash;
  rowLineOom:Cash;

  expandDirect:string = '';
  expandLabel:string = '';

  expandStartX:number = 0;
  expandStartY:number = 0;

  registryDom(){
    const { gestureEventDom } = this.store.canvas
    const colLineOom = u('<div>').css({
      position:'absolute',
      width:this.moveRectWidth,
      height:this.store.config.excelHeight - 118,
      left:0,
      top:0,
      zIndex:60,
      display:'flex',
      justifyContent:'center',
      border:'1px dashed rgb(201, 201, 201)'
    }).hide()
    this.colLineOom = colLineOom

    const rowLineOom = u('<div>').css({
      position:'absolute',
      width:this.store.config.excelWidth - 10,
      height:this.moveRectWidth,
      left:0,
      top:0,
      zIndex:60,
      display:'flex',
      alignItems:'center',
      border:'1px dashed rgb(201, 201, 201)'
    }).hide()
    this.rowLineOom = rowLineOom

    gestureEventDom.append(colLineOom)
    gestureEventDom.append(rowLineOom)
  }

  eventListen(){
    const { gestureEventDom } = this.store.canvas

    gestureEventDom.get(0).addEventListener('mousedown',(evt:MouseEvent)=>{
      
      const targetDom = u(evt.target as HTMLElement)
      const targetDomCol = targetDom.data('col')
      const targetDomRow = targetDom.data('row')

      if(targetDomCol > 0 && targetDomRow === 0 && ((targetDom.width() - evt.offsetX <= this.diffDis && targetDomCol === 1) || (targetDomCol > 1 && (targetDom.width() - evt.offsetX <= this.diffDis || evt.offsetX <= this.diffDis)))){
        // console.log('鼠标按下',targetDom.data('label'))
        evt.stopPropagation()
        evt.stopImmediatePropagation()
        if(evt.offsetX <= this.diffDis){
          this.expandLabel = 'col'+(parseInt(targetDom.data('col'))-1)
        }else{
          this.expandLabel = 'col'+targetDom.data('col')
        }
        this.expandDirect = 'col'
        this.store.config.expandLock = true
        this.expandStartX = evt.pageX
        this.colLineOom.show().css('left',targetDom.position().left+evt.offsetX - this.moveRectWidth/2)
        gestureEventDom.on('mousemove',this.mouseMoveChange)

      }else if(targetDomCol === 0 && targetDomRow > 0 && ((targetDom.height() - evt.offsetY <= this.diffDis && targetDomRow === 1) || (targetDomRow > 1 && (targetDom.height() - evt.offsetY <= this.diffDis || evt.offsetY <= this.diffDis)))){
        evt.stopPropagation()
        evt.stopImmediatePropagation()
        if(evt.offsetY <= this.diffDis){
          this.expandLabel = 'row'+(parseInt(targetDom.data('row'))-1)
        }else{
          this.expandLabel = 'row'+targetDom.data('row')
        }
        
        this.expandDirect = 'row'
        this.store.config.expandLock = true
        this.expandStartY = evt.pageY
        this.rowLineOom.show().css('top',targetDom.position().top+evt.offsetY - this.moveRectWidth/2)
        gestureEventDom.on('mousemove',this.mouseMoveChange)
      }

    },true)

    gestureEventDom.on('mouseup',evt=>{
      // console.log('鼠标松开',this.expandLock)
      if(this.expandDirect){
        let diffDis = 0
        if(this.expandDirect === 'col'){
          diffDis = evt.pageX - this.expandStartX
          this.expandWidth(this.expandLabel,diffDis)
        }else if(this.expandDirect === 'row'){
          diffDis = evt.pageY - this.expandStartY
          this.expandHeight(this.expandLabel,diffDis)
        }
        // console.log('diffDis',diffDis,this.expandLabel)
        evt.stopPropagation()
        this.expandDirect = ''
        this.store.config.expandLock = false
        this.colLineOom.hide()
        this.rowLineOom.hide()
        gestureEventDom.off('mousemove',this.mouseMoveChange)
        this.excel.resize()
      }
    })
  }

  mouseMoveChange=(evt:MouseEvent)=>{
    if(this.expandDirect){
      if(this.expandDirect === 'col'){
        this.moveWidth(evt)
      }
      if(this.expandDirect === 'row'){
        this.moveHeight(evt)
      }
    }
  }

  moveWidth(evt:MouseEvent){
    // console.log('move',evt)
    const targetDom = u(evt.target as HTMLElement)
    // console.log('targetDom.position().left',targetDom.position().left)
    // console.log('evt.offsetX',evt.offsetX,evt.pageX)
    // console.log('-----------------------------------',targetDom)
    this.colLineOom.css('left',targetDom.position().left+evt.offsetX - this.moveRectWidth/2)
  }

  moveHeight(evt:MouseEvent){
    const targetDom = u(evt.target as HTMLElement)
    this.rowLineOom.css('top',targetDom.position().top+evt.offsetY - this.moveRectWidth/2)
  }

  expandWidth(label:string,diffDis:number){
    // console.log('label',label)
   
    const curSheet = this.excel.getCurSheet();
    const curCell = curSheet.colMap.get(label)
    
    const { row,col } = curSheet

    let tempWidth = 0
    if(diffDis<0 && Math.abs(diffDis) > curCell.width){
      tempWidth = 10 - curCell.width
    }else{
      tempWidth = diffDis
    }

    for(let i=0;i<row;i++){
      for(let j=curCell.col;j<=col;j++){
        if(j === curCell.col){
          
          if(i===0){
            curCell.width += tempWidth
          }

          const tempCell = curSheet.contMap.get(`${getExcelHeaderName(j)}${i+1}`)
          tempCell.width += tempWidth
          
          
        }else{
          if(i === 0){
            const tempCell = curSheet.colMap.get(`col${j}`)
            tempCell.x += tempWidth
          }
          
          const tempCell = curSheet.contMap.get(`${getExcelHeaderName(j)}${i+1}`)
          tempCell.x += tempWidth
        }
      }
    }

    curSheet.forceUpdateAll()

  }

  expandHeight(label:string,diffDis:number){
    const curSheet = this.excel.getCurSheet();
    const curCell = curSheet.rowMap.get(label)
    
    const { row,col } = curSheet

    let tempWidth = 0
    if(diffDis<0 && Math.abs(diffDis) > curCell.height){
      tempWidth = 10 - curCell.height
    }else{
      tempWidth = diffDis
    }

    for(let i=curCell.row;i<=row;i++){
      for(let j=0;j<col;j++){
        if(i === curCell.row){
          
          if(j===0){
            curCell.height += tempWidth
          }
          const tempCell = curSheet.contMap.get(`${getExcelHeaderName(j+1)}${i}`)
          tempCell.height += tempWidth
          
          
        }else{
          if(j === 0){
            const tempCell = curSheet.rowMap.get(`row${i}`)
            tempCell.y += tempWidth
          }
          
          const tempCell = curSheet.contMap.get(`${getExcelHeaderName(j+1)}${i}`)
          tempCell.y += tempWidth
          
        }
      }
    }

    curSheet.forceUpdateAll()
  }

}