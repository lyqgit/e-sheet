import { ICanvas, IPlugin } from '@/types'
import { Cash } from "cash-dom";

interface IExcelConfig{
  borderColor:string
  cellWidth:number
  cellHeight:number
  excelWidth:number
  excelHeight:number
  defaultCol:number
  defaultRow:number
  col:number
  row:number
  scale:number
  lock:boolean,
  plugins:Record<string,IPlugin>
}

interface IStoreCanvas{
  dom:Cash,
  ctx:ICanvas,
  eventDom:Cash
}

export interface IStore{
  canvas:IStoreCanvas
  config:IExcelConfig
}

export default {
  canvas:{
    dom:null,
    ctx:null,
    eventDom:null
  },
  config:{
    borderColor:'#ECEDEE',
    defaultCol:60,
    defaultRow:40
  }
} as IStore