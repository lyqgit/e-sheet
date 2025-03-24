import { ICanvas, IPlugin } from '@/types'
import { Cash } from "cash-dom";

interface IExcelConfig{
  selectedBgColor:string
  selectedBorderBgColor:string
  nonSelectBgColor:string
  borderCellBgColor:string
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
  expandLock:boolean
}

interface IStoreCanvas{
  dom:Cash,
  ctx:ICanvas,
  eventDom:Cash,
  gestureEventDom:Cash,
}

export interface IStore{
  canvas:IStoreCanvas
  config:IExcelConfig
}

export default {
  canvas:{
    dom:null,
    ctx:null,
    eventDom:null,
    gestureEventDom:null
  },
  config:{
    defaultCol:60,
    defaultRow:40,
    borderCellBgColor:'#F9FBFD',
    nonSelectBgColor:'#FFFFFF',
    selectedBorderBgColor:'#0089FF',
    selectedBgColor:'#EBF4FF',
    borderColor:'#ECEDEE',
    scale:1,
    expandLock:false
  }
} as IStore