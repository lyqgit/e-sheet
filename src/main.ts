import { IExcelOptions,IExcel } from '@/types'
import { judgeType } from '@/utils'
import type { Cash } from 'cash-dom'
import u from 'cash-dom';
import { Sheet,Canvas } from '@/core'

export default class eSheet implements IExcel {

  col:number = 60; // 默认的列数
  row:number = 40; // 默认的行数
  width:number = 600;
  height:number = 500;
  cellWidth:number = 40;
  cellHeight:number = 20;
  sheetArr:Array<Sheet> = [];
  scale: number = 1;
  curSheet: number = 0;
  lock:Boolean = false; // 优先级最高

  excelDom:Cash
  canvasDom:Cash;
  engine:Canvas

  constructor(selector:string | HTMLElement,options?:IExcelOptions){
    this.col = options?.col
    this.row = options?.row
    this.width = options?.width
    this.height = options?.height
    this.cellWidth = options?.cellWidth
    this.cellHeight = options?.cellHeight
    this.lock = options?.lock

    // 获取要装载的dom
    if(judgeType(selector,['String',"HTMLElement"])){
      this.excelDom = u(selector)
      this.initExcel()
    }else{
      throw new Error('the selector is error')
    }

    // 实例化Canvas
    this.initCanvas()

    // 查看是否有数据，如果初始化时带入数据，则直接根据数据渲染
    if(Array.isArray(options?.data) && options?.data.length > 0){
      // 装载数据

    }else{
      // 没有数据，渲染默认内容，加载一个sheet
      const oneSheet = new Sheet({
        name:'未命名'+this.sheetArr.length+1,
        col:this.col,
        row:this.row,
        cellWidth:this.cellWidth,
        cellHeight:this.cellHeight,
        lock:this.lock,
        data:[]
      },this)
      this.sheetArr.push(oneSheet)
    }

  }

  private initCanvas(){
    const canvasWrapper = u('<div>')
    canvasWrapper.css('width',this.width + 'px')
    canvasWrapper.css('height',this.height-96+'px')
    this.canvasDom = u('<canvas>')
    this.engine = new Canvas(this.canvasDom)
    canvasWrapper.append(this.canvasDom)
  }

  private init(){
    // 加载头部栏

    // 加载渲染内容

    // 加载底部栏
  }
  

  private initExcel(){
    this.excelDom.css('width',this.width+'px')
    this.excelDom.css('height',this.height+'px')
  }
}