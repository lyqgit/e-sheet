import { Sheet } from '@/core'
import { IBaseExcel } from './base'
import { ISheet } from './sheet'

export interface IExcelOptions{
  width?:number,
  height?:number,
  col?:number,
  row?:number,
  cellWidth?:number,
  cellHeight?:number,
  data?:Array<ISheet>,
  lock?:Boolean
}

export interface IExcel extends IBaseExcel{
  width:number,
  height:number,
  sheetArr:Array<Sheet>,
  scale:number,
  curSheet:number
}