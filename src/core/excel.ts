import { IExcelOptions,IExcel,IPlugin } from '@/types'
import { judgeType } from '@/utils'
import type { Cash } from 'cash-dom'
import u from 'cash-dom';
import { Sheet } from './sheet'
import { Canvas } from './canvas'
import store from '@/store'
import { ScrollPlugin,SelectPlugin,BookPlugin,GesturePlugin, ContextmenuPlugin,SettingPlugin } from '@/plugins'

export class eSheet implements IExcel {

  sheetArr:Array<Sheet> = [];
  curSheetIndex: number = 0;

  excelDom:Cash;
  canvasWrapperDom:Cash

  constructor(selector:string | HTMLElement,options?:IExcelOptions){

    store.config.cellWidth = options?.cellWidth??120
    store.config.cellHeight = options?.cellHeight??40
    store.config.excelWidth = options?.width??600
    store.config.excelHeight = options?.height??500
    store.config.lock = options?.lock??false
    store.config.col = options?.col??store.config.defaultCol
    store.config.row = options?.row??store.config.defaultRow

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

      this.createEmptySheet()
    }

    this.initPlugin(options.plugins);

  }

  removeSheet(i:number){
    this.sheetArr.splice(i,1)
  }

  switchSheet(i: number): void {
    this.curSheetIndex = i
    const curSheet = this.getCurSheet()
    curSheet.forceUpdateAll()
  }

  resizeCallback:Array<Function> = [];

  addResizeCallback(callback:Function){
    this.resizeCallback.push(callback)
  }

  resize(): void {
    console.log('监听尺寸改变')
    // 需要处理的地方
    this.resizeCallback.forEach(itemFn=>{
      itemFn()
    })
  }

  getCurSheet():Sheet{
    return this.sheetArr[this.curSheetIndex]
  }

  createEmptySheet(){
    const { lock } = store.config

    // 没有数据，渲染默认内容，加载一个sheet
    const oneSheet = new Sheet({
      name:'未命名'+(this.sheetArr.length+1),
      lock:lock,
      data:[]
    })
    // console.log("------",'未命名'+(this.sheetArr.length+1))
    this.sheetArr.push(oneSheet)
    oneSheet.initDraw()
  }

  // 装载canvas
  private initCanvas(){

    const { excelWidth,excelHeight } = store.config

    const canvasWrapper = u('<div>')
    canvasWrapper.css('width',excelWidth + 'px')
    canvasWrapper.css('height',excelHeight-96+'px')
    canvasWrapper.css('position','relative')
    this.canvasWrapperDom = canvasWrapper

    // 手势样式处理层
    const canvasMoveEventWrapper = u('<div>')
    canvasMoveEventWrapper.css({
      'width':excelWidth + 'px',
      'height':excelHeight-96+'px',
    })

    // 点击事件处理层
    const canvasEventWrapper = u('<div>')
    canvasEventWrapper.css('width',excelWidth-10 + 'px')
    canvasEventWrapper.css('height',excelHeight-96-10+'px')
    canvasEventWrapper.css('position','absolute')
    canvasEventWrapper.css('overflow','hidden')
    canvasEventWrapper.css('top','0')
    canvasEventWrapper.css('left','0')
    canvasEventWrapper.css('zIndex','101')

    // canvas
    const canvasDom = u('<canvas>')
    canvasDom.attr('width',(excelWidth-10).toString())
    canvasDom.attr('height',(excelHeight-96-10).toString())
    const engine = new Canvas(canvasDom)
    store.canvas.dom = canvasDom
    store.canvas.ctx = engine
    store.canvas.eventDom = canvasEventWrapper
    store.canvas.gestureEventDom = canvasMoveEventWrapper

    // 组装dom
    canvasMoveEventWrapper.append(canvasDom)
    canvasMoveEventWrapper.append(canvasEventWrapper)
    canvasWrapper.append(canvasMoveEventWrapper)
    this.excelDom.append(canvasWrapper)
  }

  private init(){
    // 加载头部栏

    // 加载渲染内容

    // 加载底部栏
  }

  // 装载插件
  private initPlugin(plugins:Record<string,IPlugin>){

    store.config.plugins = {
      scroll:new ScrollPlugin(this,store),
      select:new SelectPlugin(this,store),
      book:new BookPlugin(this,store),
      gesture:new GesturePlugin(this,store),
      contextmenu:new ContextmenuPlugin(this,store),
      setting:new SettingPlugin(this,store),
    }

    store.config.plugins = { ...store.config.plugins, ...plugins }

    for(let i in store.config.plugins){
      store.config.plugins[i].register()
    }

    u(document).on('mouseup',(evt:MouseEvent)=>{
      for(let i in store.config.plugins){
        store.config.plugins[i].docMouseUp(evt)
      }
    })
  }
  

  private initExcel(){

    const { excelWidth,excelHeight } = store.config

    this.excelDom.css('width',excelWidth+'px')
    this.excelDom.css('height',excelHeight+'px')
    this.warnDialogDom = u('<e-sheet-warn-dialog-tip>').attr('show','false')
    this.excelDom.append(this.warnDialogDom)
  }

  warnDialogDom:Cash

  showDialog(title:string,content:string){
    this.warnDialogDom.attr({
      t:title,
      content,
      show:'true'
    })
}
}