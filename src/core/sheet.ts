import { ISheet,ISheetOption,ICell } from '@/types'
import { Cell } from './cell'
import { getExcelHeaderName } from '@/utils'
import store from '@/store'

export class Sheet implements ISheet{
  data: Array<ICell>;
  constructor(option:ISheetOption){ 
    this.col = option.col
    this.row = option.row
    this.cellWidth = option.cellWidth
    this.cellHeight = option.cellHeight
    this.lock = option.lock
    this.data = option.data
    this.initEmptyData();
  }
  // 记录偏移距离
  scrollTop: number = 0;
  scrollLeft: number = 0;
  contMap:Map<string,ICell>;

  colMap:Map<string,ICell>;
  rowMap:Map<string,ICell>;

  spWidth:Map<string,number>; // 记录更改了长度的单元格列数
  spHeight:Map<string,number>; // 记录更改了高度的单元格行数

  mergeCell:Map<string,Array<string>>;

  // 装载空数据
  initEmptyData():void{
    // console.log('layer',store.canvas.dom)
    this.contMap = new Map<string,ICell>();
    this.colMap = new Map<string,ICell>();
    this.rowMap = new Map<string,ICell>();
    let abY = 0;
    for(let i=0;i<this.row;i++){
      let abX = 0;

      this.rowMap.set(
        'row'+(i+1),
        new Cell({
          row:i+1,
          col:0,
          x:abX,
          y:abY,
          width:this.cellWidth,
          height:this.cellHeight,
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

      for(let j=0;j<this.col;j++){
        const headerName = getExcelHeaderName(j+1)
        const rowNum = i+1
        const label = headerName+rowNum

        if(i===0){
          // 顶部行
          this.colMap.set(
            headerName,
            new Cell({
              row:0,
              col:j+1,
              x:abX,
              y:0,
              width:this.cellWidth,
              height:this.cellHeight,
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
            width:this.cellWidth,
            height:this.cellHeight,
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
        abX += this.cellWidth
      }
      abY += this.cellHeight
    }
  };

  drawTotalRect(){

    const { cellHeight } = store.config

    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:0,
      width:cellHeight,
      height:cellHeight,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawTriangleRect({x:cellHeight-6,y:6},{x:cellHeight-6,y:cellHeight-6},{x:6,y:cellHeight-6}
      ,'#DCDCDC')
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
    
    if(forceLeft && forceTop){
      // 绘制左上角的cell
      this.drawTotalRect()
    }

    if(isLeft){
      this.clearCanvas(cellHeight,0,excelWidth,excelHeight)
    }else if(isTop){
      this.clearCanvas(0,cellHeight,excelWidth,excelHeight)
    }

    for(let i=topRow;i<=bottomRow;i++){
      if(left === this.scrollLeft || forceLeft){
        const rowCell = this.rowMap.get('row'+i)
        rowCell.drawHeaderRowStrokeRect(cellHeight)
      }
      for(let j=leftCol;j<=rightCol;j++){
        const headerName = getExcelHeaderName(j)
        if(top === this.scrollTop || forceTop){
          if(i===topRow){
            const headerCell = this.colMap.get(headerName)
            headerCell.drawHeaderColStrokeRect(cellHeight)
          }
        }
        const contCell = this.contMap.get(headerName+i)
        contCell.drawStrokeRect(cellHeight,cellHeight)
      }
      
    }
    this.scrollLeft = left
    this.scrollTop = top
  }


  clearCanvas(startX:number,startY:number,endX:number,endY:number){
    store.canvas.ctx.clearRect(startX,startY,endX,endY)
  }

  searchCol(dis:number,grat:boolean):number{
    // console.log('dis',dis)
    const floor = grat?Math.ceil:Math.floor;
    let tempCol = floor(dis/this.cellWidth)
    // console.log('tempLN',tempCol,floor(dis/this.cellWidth))
    const tempLabel = getExcelHeaderName(tempCol)
    // console.log('tempL',tempLabel)
    if(tempLabel === ''){
      // 在最左侧
      return 1
    }else{
      let cell:Cell = this.contMap.get(tempLabel+1)
      console.log('cell.x',cell,(tempLabel+1),grat,tempCol)
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
    const floor = grat?Math.ceil:Math.floor;
    let tempRow = floor(dis/this.cellWidth)
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
  col: number;
  row: number;
  cellWidth: number;
  cellHeight: number;
  lock: Boolean;
}