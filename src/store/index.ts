import { ICanvas } from '@/types'
import { Cash } from "cash-dom";

interface IStoreCanvas{
  dom:Cash,
  ctx:ICanvas
}

export interface IStore{
  canvas:IStoreCanvas
}

export default {
  canvas:{
    dom:null,
    ctx:null
  }
} as IStore