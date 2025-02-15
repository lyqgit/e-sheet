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
        const label = getExcelHeaderName(i)+j
        this.contMap.set(
          label,
          new Cell({
            row:i,
            col:j,
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
    this.getBoundMap(left,top);
    return


    for(let [_,itemCell] of this.contMap){
      store.canvas.ctx.drawStrokeRect({
        x:itemCell.x,
        y:itemCell.y,
        width:itemCell.width,
        height:itemCell.height,
        globalCompositeOperation:'source-over'
      })
    }

    this.scrollLeft = left
    this.scrollTop = top
  }

  // 获取展示内容的四个角
  getBoundMap(left:number,top:number){
    console.log('left','top',left,top)
    const ld = left;
    const rd = left + parseInt(store.canvas.dom.css('width'))

    const td = top
    const bd = top + store.canvas.dom.css('height')

    let leftLabel = ''
    let tempLN = ld%this.cellWidth
    console.log('tempLN',tempLN)
    console.log('this.cellWidth',this.cellWidth)
    const tempL = getExcelHeaderName(tempLN)
    console.log('tempL',tempL)
    if(tempL === ''){
      // 在最左侧
      leftLabel = 'A'
    }else{
      let cell:Cell = this.contMap.get(tempL)
      // while(cell.x < ld) {
      //   cell = this.contMap.get(getExcelHeaderName(tempLN-1))
      // }
      leftLabel = cell.label
    }
    console.log('leftLabel',leftLabel)


    // const tempR = getExcelHeaderName(rd%this.cellWidth)
    // const cell:Cell = this.contMap.get(tempR)
    // if(cell.x < ld){
    //   leftLabel = cell.label
    // }

  }

  name: String;
  col: number;
  row: number;
  cellWidth: number;
  cellHeight: number;
  lock: Boolean;
}