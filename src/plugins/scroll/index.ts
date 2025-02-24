import { IStore } from "@/store";
import { IExcel } from "@/types";
import { IScrollPlugin } from "@/types/plugin";
import u from "cash-dom";

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
    this.registryVerScroll();
    this.registryHorScroll();
  }

  excel: IExcel;
  store: IStore;

  defaultBarWidth:number = 10;

  verPropor:number;

  registryHorScroll(): void {
    
  }
  registryVerScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,row } = this.store.config
    barContainerDom.css({
      'height':canvasDom.height(),
      'width':this.defaultBarWidth,
      'position':'absolute',
      'top':0,
      'right':0
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastRow = curSheet.rowMap.get('row'+row)


    this.verPropor = (canvasDom.height()-cellHeight - 10)/(lastRow.y+lastRow.height)

    const barDom = u('<div>')
    barDom.css({
      'width':this.defaultBarWidth,
      'background':this.barDomColor,
      'transformOrigin':'top',
      'userSelect':'none',
      'height':(canvasDom.height()-cellHeight - 10)*this.verPropor,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

  }
  barHeight:number // 滚动条宽度
}