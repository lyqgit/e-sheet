import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import u, { Cash } from 'cash-dom'
import { getScrollTopAndLeft } from '@/utils'

export class ContextmenuPlugin implements IPlugin {
  excel: IExcel;
  store: IStore;
  register(): void {
    this.registryContextMenu()
  }
  unregister(): void {
  }
  docMouseUp(evt:MouseEvent): void {
    const targetDom = evt.target as HTMLElement
    if(!this.containerDom.get(0)?.contains(targetDom)){
      this.closeContextMenu()
    }
  }
  constructor(excel: IExcel, store: IStore) {
    this.excel = excel
    this.store = store 
  }

  containerDom:Cash;

  /**
   * 合并单元格
   */
  mergeCell(){
    const curSheet = this.excel.getCurSheet()
    const { selCells } = curSheet
    if(selCells.length === 1){
      // 只有一个单元格
      return
    }else if(selCells.length > 1){ 
      // 多个单元格
      console.log('curSheet.selCells',selCells)
      const firstCell = selCells[0]
      firstCell.isStartMergeLabel = true
      curSheet.mergeCell.set(firstCell.label,[firstCell.label,selCells[selCells.length-1].label])
      selCells.forEach(cell=>{
        cell.isMerge = true
      })
      curSheet.selCells = [firstCell]
      curSheet.forceUpdateAll()
    }
  }

  registryContextMenu(){
    const containerDom = u('<div>').addClass('e-sheet-contextmenu-layout').css('display','none')
    const mergeBtn = u('<div>').text('合并单元格').addClass('item-btn').css({cursor:'pointer'})
    const splitBtn = u('<div>').text('拆分单元格').addClass('item-btn').css({cursor:'pointer'})
    const clearImgBtn = u('<div>').text('清空图片').addClass('item-btn').css({cursor:'pointer'})
    const addImgBtn = u('<div>').text('插入图片').addClass('item-btn').css({cursor:'pointer'})

    mergeBtn.on('click',(_:MouseEvent)=>{
      this.mergeCell()
      this.closeContextMenu()
    })

    containerDom.append(mergeBtn)
    containerDom.append(splitBtn)
    containerDom.append(addImgBtn)
    containerDom.append(clearImgBtn)

    this.containerDom = containerDom;

    this.excel.canvasWrapperDom.append(containerDom)

    this.registryContextMenuEvent()

  }

  registryContextMenuEvent(){
    const { eventDom } = this.store.canvas
    eventDom.on('contextmenu',(evt:MouseEvent)=>{
      evt.preventDefault()
      const [top,left] = getScrollTopAndLeft()
      this.containerDom.css({
        'display':'block',
        'top':evt.clientY + top,
        'left':evt.clientX + left
      })
    })
  }

  closeContextMenu(){
    this.containerDom.css('display','none')
  }
  
}