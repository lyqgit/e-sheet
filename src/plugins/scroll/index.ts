import { IStore } from "@/store";
import { IExcel } from "@/types";
import { IScrollPlugin } from "@/types/plugin";
import u, { Cash } from "cash-dom";

export class ScrollPlugin implements IScrollPlugin{
  constructor(excel:IExcel,store:IStore){
    this.excel = excel,
    this.store = store
  }
  
  barDomColor:string = 'rgb(201, 201, 201)'
  barDomActiveColor:string = 'rgb(150, 150, 150)'

  unregister(): void {
    
  }

  register(): void {
    u(document).on('mouseup',()=>{
      console.log('停止')
      u(document).off('mousemove')
      this.verBarDom.css('background',this.barDomColor)
      this.horBarDom.css('background',this.barDomColor)
      const curSheet = this.excel.getCurSheet()
      // curSheet.forceUpdateAll()
    })
    this.registryVerScroll();
    this.registryHorScroll();
  }

  excel: IExcel;
  store: IStore;

  verBarDom:Cash;
  horBarDom:Cash;

  defaultBarWidth:number = 10;

  verPropor:number;
  horPropor:number;

  // 横向滚动
  registryHorScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,col } = this.store.config
    barContainerDom.css({
      'height':this.defaultBarWidth,
      'width':canvasDom.width() - cellHeight,
      'position':'absolute',
      'left':cellHeight,
      'bottom':0,
      'zIndex':200
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastCol = curSheet.colMap.get('col'+col)


    this.horPropor = (canvasDom.width() - cellHeight)/(lastCol.x+lastCol.width)

    const barDom = u('<div>')

    this.horBarDom = barDom

    barDom.css({
      'width':(canvasDom.width() - cellHeight)*this.horPropor,
      'background':this.barDomColor,
      'transformOrigin':'left',
      'transform':'translateX(0px)',
      'userSelect':'none',
      'height':this.defaultBarWidth,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

    const boundDiff = parseInt((barContainerDom.width() - barDom.width()).toFixed(0))

    barDom.on('mousedown',(eA:MouseEvent)=>{
      eA.preventDefault();
      const trasform = barDom.css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), \d+\)/)
      let oriTransX = 0
      if(trasform){
        oriTransX = parseInt(trasform[1])
      }
      // console.log('开始的位置',eA.pageX)
      // console.log('trasform',trasform)
      u(document).on('mousemove',(eB:MouseEvent)=>{
        barDom.css('background',this.barDomActiveColor)
        requestAnimationFrame(()=>{
          // console.log('scrollTop',eB.pageY)
          // 滚动距离计算
          const diffDis = eB.pageX - eA.pageX
          let finalDis = oriTransX+diffDis
          // console.log('trasform',trasform)
          // console.log('oriTransX',oriTransX)

          if(finalDis > boundDiff && diffDis > 0){
            finalDis = boundDiff
          }else if(finalDis < 0 && diffDis < 0){
            
            // console.log('diffDis',diffDis)
            // console.log('boundDiff',boundDiff)
            // console.log('finalDis',finalDis)
            finalDis = 0
          }

          barDom.css('transform',`translateX(${finalDis}px)`)
          this.sheetMoveX(finalDis/this.horPropor)
        })
      })
      
    })
  }
  
  sheetMoveX(reX:number){
    const curSheet = this.excel.getCurSheet()
    curSheet.drawX(reX,false,false)
  }

  sheetMoveY(reY:number){
    const curSheet = this.excel.getCurSheet()
    curSheet.drawY(reY,false,false)
  }

  // 纵向滚动
  registryVerScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,row } = this.store.config
    barContainerDom.css({
      'height':canvasDom.height() - cellHeight,
      'width':this.defaultBarWidth,
      'position':'absolute',
      'top':cellHeight,
      'right':0,
      'zIndex':200
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastRow = curSheet.rowMap.get('row'+row)


    this.verPropor = (canvasDom.height()-cellHeight)/(lastRow.y+lastRow.height)

    const barDom = u('<div>')

    this.verBarDom = barDom

    barDom.css({
      'width':this.defaultBarWidth,
      'background':this.barDomColor,
      'transformOrigin':'top',
      'transform':'translateY(0px)',
      'userSelect':'none',
      'height':(canvasDom.height()-cellHeight)*this.verPropor,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

    const boundDiff = parseInt((barContainerDom.height() - barDom.height()).toFixed(0))

    barDom.on('mousedown',(eA:MouseEvent)=>{
      eA.preventDefault();
      const trasform = barDom.css('transform').match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\d+)\)/)
      let oriTransY = 0
      if(trasform){
        oriTransY = parseInt(trasform[1])
      }
      // console.log('开始的位置',eA.pageY)
      u(document).on('mousemove',(eB:MouseEvent)=>{
        barDom.css('background',this.barDomActiveColor)
        requestAnimationFrame(()=>{
          // console.log('scrollTop',eB.pageY)
          // 滚动距离计算
          const diffDis = eB.pageY - eA.pageY
          // console.log('oriTransY',oriTransY)
          // console.log('diffDis',diffDis)
          

          let finalDis = oriTransY+diffDis
          // console.log('boundDiff',boundDiff)
          // console.log('finalDis',finalDis)

          if(finalDis > boundDiff && diffDis > 0){
            finalDis = boundDiff
          }else if(finalDis < 0 && diffDis < 0){
            finalDis = 0
          }

          barDom.css('transform',`translateY(${finalDis}px)`)
          this.sheetMoveY(finalDis/this.verPropor)
        })
      })
      
    })

  }
  barHeight:number // 滚动条宽度
}