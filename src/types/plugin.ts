import { IStore } from "@/store"
import { IExcel } from "./excel"

export interface IPlugin{
  excel:IExcel
  store:IStore
  register():void;
  unregister():void;
}

export interface IScrollPlugin extends IPlugin{
  barHeight:number
  registryHorScroll():void // 注册横向滚动条
  registryVerScroll():void // 注册纵向滚动条
  barDomColor:string
  barDomActiveColor:string
}