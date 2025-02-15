import { IExcelOptions,IExcel } from '@/types'
import { judgeType } from '@/utils'
import type { Cash } from 'cash-dom'
import u from 'cash-dom';
import { Sheet,Canvas } from '@/core'
import store from '@/store'

export default class eSheet implements IExcel {

  col:number = 60; // 默认的列数
  row:number = 40; // 默认的行数
  width:number = 600;
  height:number = 600;
  cellWidth:number;
  cellHeight:number;
  sheetArr:Array<Sheet> = [];
  scale: number = 1;
  curSheet: number = 0;
  lock:Boolean = false; // 优先级最高

  excelDom:Cash

  constructor(selector:string | HTMLElement,options?:IExcelOptions){
    this.col = options?.col??60
    this.row = options?.row??40
    this.width = options?.width??600
    this.height = options?.height??500
    this.cellWidth = options?.cellWidth??40
    this.cellHeight = options?.cellHeight??20
    this.lock = options?.lock??false

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
      })
      this.sheetArr.push(oneSheet)
      oneSheet.draw(0,0)
    }

  }

  // 装载canvas
  private initCanvas(){
    const canvasWrapper = u('<div>')
    canvasWrapper.css('width',this.width + 'px')
    canvasWrapper.css('height',this.height-96+'px')
    const canvasDom = u('<canvas>')
    canvasDom.css('width',this.width + 'px')
    canvasDom.css('height',this.height-96+'px')
    const engine = new Canvas(canvasDom)
    store.canvas.dom = canvasDom
    store.canvas.ctx = engine
    canvasWrapper.append(canvasDom)
    this.excelDom.append(canvasWrapper)
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