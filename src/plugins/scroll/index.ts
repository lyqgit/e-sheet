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
      const curSheet = this.excel.getCurSheet()
      curSheet.forceUpdate()
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

  registryHorScroll(): void {
    
  }
  
  sheetMove(reX:number,reY:number){
    const curSheet = this.excel.getCurSheet()
    curSheet.draw(reX,reY,false,false)
  }

  registryVerScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,row } = this.store.config
    barContainerDom.css({
      'height':canvasDom.height() - cellHeight - this.defaultBarWidth,
      'width':this.defaultBarWidth,
      'position':'absolute',
      'top':cellHeight,
      'right':0
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastRow = curSheet.rowMap.get('row'+row)


    this.verPropor = canvasDom.height()/(lastRow.y+lastRow.height)

    const barDom = u('<div>')

    this.verBarDom = barDom

    barDom.css({
      'width':this.defaultBarWidth,
      'background':this.barDomColor,
      'transformOrigin':'top',
      'transform':'translateY(0px)',
      'userSelect':'none',
      'height':(canvasDom.height()-cellHeight - this.defaultBarWidth)*this.verPropor,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

    const boundDiff = barContainerDom.height() - barDom.height()

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

          if(finalDis > boundDiff){
            finalDis = boundDiff
          }else if(finalDis < 0){
            finalDis = 0
          }

          this.sheetMove(0,finalDis/this.verPropor)
          barDom.css('transform',`translateY(${finalDis}px)`)
        })
      })
      
    })

  }
  barHeight:number // 滚动条宽度
}