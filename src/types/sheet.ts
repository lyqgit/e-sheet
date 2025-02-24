import { ICell } from './cell'
import { IBaseExcel } from './base'

export interface ISheet extends IBaseExcel{
  name:String,
  data:Array<ICell>
  draw(left:number,top:number,forceLeft?:boolean,forceTop?:boolean):void
  scrollTop:number
  scrollLeft:number
}

export interface ISheetOption extends IBaseExcel{
  name:String,
  data:Array<ICell>
}