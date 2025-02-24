import { ICanvas } from '@/types'
import { Cash } from "cash-dom";

interface IExcelConfig{
  borderColor:string
  cellWidth:number
  cellHeight:number
  excelWidth:number
  excelHeight:number
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
    borderColor:'#ECEDEE'
  }
} as IStore