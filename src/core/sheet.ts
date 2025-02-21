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

  spWidth:Map<string,number>; // 记录更改了长度的单元格列数
  spHeight:Map<string,number>; // 记录更改了高度的单元格行数

  mergeCell:Map<string,Array<string>>;

  // 装载空数据
  initEmptyData():void{
    // console.log('layer',store.canvas.dom)
    this.contMap = new Map<string,ICell>();
    let abY = 0;
    for(let i=0;i<this.row;i++){
      let abX = 0;
      for(let j=0;j<this.col;j++){
        const label = getExcelHeaderName(j+1)+(i+1)
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

  draw(left:number,top:number): void {
    // 绘制之前需要判断data的范围是否超过默认的col和row
    const [
      leftCol,
      rightCol,
      topRow,
      bottomRow
    ] = this.getBoundMap(left,top);

    for(let i=topRow;i<=bottomRow;i++){
      for(let j=leftCol;j<=rightCol;j++){
        const cell = this.contMap.get(getExcelHeaderName(j)+i)
        store.canvas.ctx.drawStrokeRect({
          x:cell.x,
          y:cell.y,
          width:cell.width,
          height:cell.height,
          lineWidth:1,
          globalCompositeOperation:'destination-over',
          color:'#ECEDEE'
        })
      }
    }

    this.scrollLeft = left
    this.scrollTop = top
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
    const ld = left;
    const rd = left + parseInt(store.canvas.dom.css('width'))

    const td = top
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