import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import { getExcelHeaderName } from "@/utils";
import u from 'cash-dom'

export class SelectPlugin implements IPlugin{

  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
  }
  docMouseUp=(): void=> {
    const { eventDom } = this.store.canvas
    eventDom.off('mouseover')
  }

  excel: IExcel;
  store: IStore;
  register(): void {
    this.singleMouse()
  }
  unregister(): void {
  }

  // 点击单元格
  singleMouse(){
    const { eventDom } = this.store.canvas

    eventDom.on('mousedown',(evtA:MouseEvent)=>{

      const curSheet = this.excel.getCurSheet()

      // 清空选中的cell
      curSheet.selCells = []

      // 首先单选
      const targetDom = u(evtA.target as HTMLElement)
      console.log('target',targetDom.data('col'))
      const label = targetDom.data('label')
      const cellA = curSheet.contMap.get(label)
      curSheet.selCells = [cellA]
      curSheet.forceUpdateRect()
      
      // 可能多选
      eventDom.on('mouseover',(evtB:MouseEvent)=>{

        curSheet.selCells = []
        const targetOverDom = u(evtB.target as HTMLElement)
        // 获取第二个cell，根据这个cell计算选中的所有cell
        const label = targetOverDom.data('label')
        const cellB = curSheet.contMap.get(label)
        const diffCol = cellB.col - cellA.col
        const diffRow = cellB.row - cellA.row

        for(let i=cellA.row;diffRow>0?i<=cellB.row:i>=cellB.row;diffRow>0?i++:i--){
          for(let j=cellA.col;diffCol>0?j<=cellB.col:j>=cellB.col;diffCol>0?j++:j--){
            const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
            curSheet.selCells.push(cell)
          }
        }

        // console.log('curSheet.selCells',curSheet.selCells,diffCol,diffRow)
        curSheet.selCells.length > 1 && curSheet.forceUpdateRect()
      })
      eventDom.one('mouseup',(evtC:MouseEvent)=>{
        console.log('evt',evtC)
      })
    })
  }

}