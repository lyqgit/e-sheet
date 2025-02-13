import { ISheet,ISheetOption } from '@/types'
import { Cell } from './cell'

export class Sheet implements ISheet{
  data: Array<Cell>;
  constructor(option:ISheetOption){ 
    this.col = option.col
    this.row = option.row
    this.cellWidth = option.cellWidth
    this.cellHeight = option.cellHeight
    this.lock = option.lock
    this.data = option.data
  }
  scrollTop: number = 0;
  scrollLeft: number = 0;
  draw(): void {
    // 绘制之前需要判断data的范围是否超过默认的col和row
    
  }
  name: String;
  col: Number;
  row: Number;
  cellWidth: Number;
  cellHeight: Number;
  lock: Boolean;
}