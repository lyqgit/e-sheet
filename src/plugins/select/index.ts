import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import u from 'cash-dom'

export class SelectPlugin implements IPlugin{

  constructor(excel:IExcel,store:IStore){
    this.excel = excel,
    this.store = store
  }

  excel: IExcel;
  store: IStore;
  register(): void {
    this.singleClick()
  }
  unregister(): void {
    throw new Error("Method not implemented.");
  }

  // 单个点击单元格
  singleClick(){
    const { eventDom } = this.store.canvas

    const curSheet = this.excel.getCurSheet()

    eventDom.on('click',(evt:MouseEvent)=>{
      console.log('evt',evt)
      const targetDom = u(evt.target as HTMLElement)
      console.log('target',targetDom.data('col'))
      const label = targetDom.data('label')
      if(label){
        const cell = curSheet.contMap.get(targetDom.data('label'))
        curSheet.selCells = [cell]
        curSheet.forceUpdateRect()
      }
      
    })
  }

}