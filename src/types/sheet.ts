import { ICell } from './cell'

export interface ISheet{
  name:String,
  data:Array<ICell>
  draw(left:number,top:number,forceLeft?:boolean,forceTop?:boolean):void
  scrollTop:number
  scrollLeft:number
}

export interface ISheetOption{
  name:String,
  data:Array<ICell>
  lock:boolean
}