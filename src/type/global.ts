import { Options } from './options'
import {SheetCell, WorkBook} from './sheet'

export interface GlobalSheet{
    (options:Options):void;
    tt:(s:string)=>String
}

export declare class GlobalComponent{
    constructor(options?:Options)
    loadData: (data:Array<SheetCell>) => void // 重新装载数据
    workBoob:Array<WorkBook> // book sheet
    installComponent:()=>void // 安装组件
    installPlugin:()=>void // 安装插件
    width:String // 整体宽度
    height:String // 整体高度
    currentIndex:Number // 当前sheet索引
}