import { ISheet,ISheetOption,ICell } from '@/types'
import { Cell } from './cell'
import { getExcelHeaderName } from '@/utils'
import store from '@/store'
import u from 'cash-dom'

export class Sheet implements ISheet{
  data: Array<ICell>;
  constructor(option:ISheetOption){ 
    this.lock = option.lock
    this.data = option.data
    this.initEmptyData();
    this.init();
  }

  private init(){
    // 
  }

  // 记录偏移距离
  scrollTop: number = 0;
  scrollLeft: number = 0;
  contMap:Map<string,Cell>;

  colMap:Map<string,Cell>;
  rowMap:Map<string,Cell>;

  totalCell:Cell;

  spWidth:Map<string,number>; // 记录更改了长度的单元格列数
  spHeight:Map<string,number>; // 记录更改了高度的单元格行数

  mergeCell:Map<string,Array<string>>;

  // 装载空数据
  initEmptyData():void{
    // console.log('layer',store.canvas.dom)
    this.contMap = new Map<string,Cell>();
    this.colMap = new Map<string,Cell>();
    this.rowMap = new Map<string,Cell>();

    const { row,col,cellWidth,cellHeight } = store.config

    let abY = 0;
    for(let i=0;i<row;i++){
      let abX = 0;

      this.rowMap.set(
        'row'+(i+1),
        new Cell({
          row:i+1,
          col:0,
          x:abX,
          y:abY,
          width:cellWidth,
          height:cellHeight,
          fontSize:'12px',
          fontWeight:'500',
          fontItalic:'',
          fontFamily:'',
          textAlign:'left',
          textBaseline:'top',
          strikethrough:false,
          underline:false,
          label:(i+1).toString(),
          img:[]
        })
      ) 

      for(let j=0;j<col;j++){
        const headerName = getExcelHeaderName(j+1)
        const rowNum = i+1
        const label = headerName+rowNum

        if(i===0){
          // 顶部行
          this.colMap.set(
            'col'+headerName,
            new Cell({
              row:0,
              col:j+1,
              x:abX,
              y:0,
              width:cellWidth,
              height:cellHeight,
              fontSize:'12px',
              fontWeight:'500',
              fontItalic:'',
              fontFamily:'',
              textAlign:'left',
              textBaseline:'top',
              strikethrough:false,
              underline:false,
              label:headerName,
              img:[]
            })
          )
        }
        

        // 内容区域
        this.contMap.set(
          label,
          new Cell({
            row:i+1,
            col:j+1,
            x:abX,
            y:abY,
            width:cellWidth,
            height:cellHeight,
            fontSize:'12px',
            fontWeight:'500',
            fontItalic:'',
            fontFamily:'',
            textAlign:'left',
            textBaseline:'top',
            strikethrough:false,
            underline:false,
            label,
            img:[]
          })
        )
        abX += cellWidth
      }
      abY += cellHeight
    }
  };

  drawTotalRect(){

    const { cellHeight } = store.config

    this.totalCell = new Cell({
      row:0,
      col:0,
      x:0,
      y:0,
      width:cellHeight,
      height:cellHeight,
      fontSize:'12px',
      fontWeight:'500',
      fontItalic:'',
      fontFamily:'',
      textAlign:'left',
      textBaseline:'top',
      strikethrough:false,
      underline:false,
      label:'total',
      img:[]
    })

    this.totalCell.drawTotalRect()
  }

  draw(left:number,top:number,forceLeft?:boolean,forceTop?:boolean): void {

    const [
      leftCol,
      rightCol,
      topRow,
      bottomRow
    ] = this.getBoundMap(left,top);

    const { cellHeight,excelWidth,excelHeight } = store.config

    const isLeft = left === this.scrollLeft || forceLeft
    const isTop = top === this.scrollTop || forceTop

    if(isLeft && isTop){
      this.clearCanvas(0,0,excelWidth,excelHeight)
    }else if(isTop){
      this.clearCanvas(0,cellHeight,excelWidth,excelHeight)
    }else if(isLeft){
      this.clearCanvas(cellHeight,0,excelWidth,excelHeight)
    }

    if(forceLeft && forceTop){
      // 绘制左上角的cell
      this.drawTotalRect()
    }

    for(let i=topRow;i<=bottomRow;i++){
      if(left === this.scrollLeft || forceLeft){
        const rowCell = this.rowMap.get('row'+i)
        rowCell.drawHeaderRowStrokeRect(cellHeight - top)
      }
      for(let j=leftCol;j<=rightCol;j++){
        const headerName = getExcelHeaderName(j)
        if(top === this.scrollTop || forceTop){
          if(i===topRow){
            const headerCell = this.colMap.get('col'+headerName)
            headerCell.drawHeaderColStrokeRect(cellHeight - left)
          }
        }
        const contCell = this.contMap.get(headerName+i)
        contCell.drawStrokeRect(cellHeight - left,cellHeight - top)
      }
      
    }
    this.scrollLeft = left
    this.scrollTop = top
  }


  clearCanvas(startX:number,startY:number,endX:number,endY:number){
    store.canvas.ctx.clearRect(startX,startY,endX,endY)
    const { eventDom } = store.canvas;
    eventDom.children().each((_,item)=>{
      if(startX > 0){
        const tempDom = u(item)
        const label = tempDom.data('label') as string
        if(label.includes('row') || label.includes('total')){

        }else{
          tempDom.remove()
        }
      }

      if(startY > 0){
        const tempDom = u(item)
        const label = tempDom.data('label') as string
        if(label.includes('col') || label.includes('total')){

        }else{
          tempDom.remove()
        }
      }
    })
  }

  searchCol(dis:number,grat:boolean):number{

    const { cellWidth } = store.config

    // console.log('dis',dis)
    const floor = grat?Math.ceil:Math.floor;
    let tempCol = floor(dis/cellWidth)
    // console.log('tempLN',tempCol,floor(dis/this.cellWidth))
    const tempLabel = getExcelHeaderName(tempCol)
    // console.log('tempL',tempLabel)
    if(tempLabel === ''){
      // 在最左侧
      return 1
    }else{
      let cell:Cell = this.contMap.get(tempLabel+1)
      // console.log('cell.x',cell,(tempLabel+1),grat,tempCol)
      if(grat){
        while(cell.x < dis) {
          tempCol++
          cell = this.contMap.get(getExcelHeaderName(tempCol)+1)
        }
      }else{
        while(cell.x > dis) {
          tempCol--
          cell = this.contMap.get(getExcelHeaderName(tempCol)+1)
        }
      }
     
      return cell.col
    }
  }

  searchRow(dis:number,grat:boolean):number{

    const { cellHeight } = store.config

    const floor = grat?Math.ceil:Math.floor;
    let tempRow = floor(dis/cellHeight)
    if(tempRow<1){
      return 1
    }else{
      let cell:Cell = this.contMap.get('A'+tempRow)
      if(grat){
        while(cell.y < dis) {
          tempRow++
          cell = this.contMap.get('A'+tempRow)
        }
      }else{
        while(cell.y > dis) {
          tempRow--
          cell = this.contMap.get('A'+tempRow)
        }
      }
      return cell.row
    }
  }

  // 获取展示内容的四个角
  getBoundMap(left:number,top:number):Array<number>{

    const { cellHeight } = store.config

    const ld = left + cellHeight;
    const rd = left + parseInt(store.canvas.dom.css('width'))

    const td = top + cellHeight
    const bd = top + parseInt(store.canvas.dom.css('height'))
    const leftCol = this.searchCol(ld,false)
    const rightCol = this.searchCol(rd,true)

    const topRow = this.searchRow(td,false)
    const bottomRow = this.searchRow(bd,true)
    return [
      leftCol,
      rightCol,
      topRow,
      bottomRow
    ]
  }

  name: String;
  lock: Boolean;
}