import { Cell } from '@/core'
import { IBaseExcel } from './base'

export interface ISheet extends IBaseExcel{
  name:String,
  data:Array<Cell>
  draw():void
  scrollTop:number
  scrollLeft:number
}

export interface ISheetOption extends IBaseExcel{
  name:String,
  data:Array<Cell>
}