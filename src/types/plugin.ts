import { IStore } from "@/store"
import { IExcel } from "./excel"
import { Cash } from "cash-dom";

export interface IPlugin{
  excel:IExcel
  store:IStore
  register():void;
  unregister():void;
  docMouseUp(evt:MouseEvent):void;
}

export interface IScrollPlugin extends IPlugin{
  verBoundDiff:number
  wheelStep:number
  defaultBarWidth:number
  registryHorScroll():void // 注册横向滚动条
  registryVerScroll():void // 注册纵向滚动条
  resize():void; // 监听尺寸变化的回调
  barDomColor:string
  barDomActiveColor:string
  horBarDom:Cash
  verBarDom:Cash
}