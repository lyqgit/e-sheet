import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import u from 'cash-dom'
import Base64Image from '@/image'

export class GesturePlugin implements IPlugin {
  register(): void {
    this.showGesture()
  }
  unregister(): void {
  }
  excel: IExcel;
  store: IStore;
  docMouseUp = (): void => { };

  constructor(excel: IExcel, store: IStore) {
    this.excel = excel;
    this.store = store;
  }

  diffDis:number = 6;

  // 设置鼠标经过时的手势
  showGesture(){
    const { gestureEventDom } = this.store.canvas
    gestureEventDom.on('mousemove',evt=>{
      const targetDom = u(evt.target as HTMLElement)
      const targetDomCol = targetDom.data('col')
      const targetDomRow = targetDom.data('row')
      if(targetDomCol > 0 && targetDomRow > 0){
        gestureEventDom.css('cursor',this.setCursor('cell'))
      }else if(targetDomCol === 0 && targetDomRow > 0){
        // 顶部
        if(evt.offsetY <= this.diffDis && targetDomRow !== 1){
          gestureEventDom.css('cursor',this.setCursor('row-resize'))
        }else if(targetDom.height() - evt.offsetY <= this.diffDis){
          gestureEventDom.css('cursor',this.setCursor('row-resize'))
        }else{
          gestureEventDom.css('cursor',this.setCursor('e-resize'))
        }
      }else if(targetDomCol > 0 && targetDomRow === 0){
        // 左侧
        if(evt.offsetX <= this.diffDis && targetDomCol !== 1){
          gestureEventDom.css('cursor',this.setCursor('col-resize'))
        }else if(targetDom.width() - evt.offsetX <= this.diffDis){
          gestureEventDom.css('cursor',this.setCursor('col-resize'))
        }else{
          gestureEventDom.css('cursor',this.setCursor('s-resize'))
        }
      }else if(targetDomCol === 0 && targetDomRow === 0){
        gestureEventDom.css('cursor',this.setCursor('cell'))
      }
    })
  }

  setCursor(shape:string){
    return `url(${Base64Image[shape]}) 18 18, ${shape}`;
  }

}