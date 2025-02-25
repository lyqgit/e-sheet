import { Sheet } from '@/core'
import { IBaseExcel } from './base'
import { ISheet } from './sheet'
import { Cash } from 'cash-dom'
import { IPlugin } from './plugin'

export interface IExcelOptions{
  width?:number,
  height?:number,
  col?:number,
  row?:number,
  cellWidth?:number,
  cellHeight?:number,
  data?:Array<ISheet>,
  lock?:boolean,
  plugins?:Record<string,IPlugin>
}

export interface IExcel{
  sheetArr:Array<Sheet>
  curSheet:number
  excelDom:Cash
  canvasWrapperDom:Cash
  getCurSheet():Sheet
  resize():void
  resizeCallback:Array<Function>
  addResizeCallback:(callback:Function)=>void
}