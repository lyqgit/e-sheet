import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import u, { Cash } from 'cash-dom'
import { doubleLoopByCell, EventEmitterIns, getExcelHeaderName } from '@/utils'

export class ContextmenuPlugin implements IPlugin {
  excel: IExcel;
  store: IStore;
  register(): void {
    this.registryContextMenu()
    this.emitterListen()
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

  emitterListen(){
    EventEmitterIns.on('contextmenu',({type,data})=>{
      if(type === 'merge-cell'){
        this.mergeCell()
      }
      
      if(type === 'split-cell'){
        this.splitCell()
      }
    })
  }

  containerDom:Cash;

  /**
   * @description 拆分单元格
   */
  splitCell(){
    const curSheet = this.excel.getCurSheet()
    const { selCells,firstCell } = curSheet
    // console.log('selCells',selCells)
    // console.log('firstCell',firstCell)
    if(selCells.length > 1){
      // 多个单元格
      this.excel.showDialog('提示','选中多个单元格，无法拆分')
      return
    }

    if(!firstCell){
      // 没有选中单元格
      this.excel.showDialog('提示','没有选中单元格，无法拆分')
      return
    }

    if(!firstCell.isMerge){
      // 没有合并单元格
      this.excel.showDialog('提示','选中的单元格无法拆分')
      return
    }else{
      // 拆分单元格
      const mergeStartLabel = firstCell.getMergeStartLabel()
      const mergeEndLabel = firstCell.getMergeEndLabel()
      const mergeStartCell = curSheet.contMap.get(mergeStartLabel)
      const mergeEndCell = curSheet.contMap.get(mergeEndLabel)

      doubleLoopByCell(mergeStartCell,mergeEndCell,(i:number,j:number)=>{
        const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
        cell.mergeLabel = ''
      })

      curSheet.selCells = [mergeStartCell,mergeEndCell]

      EventEmitterIns.emit('setting',{
        type:'cell-label-input',
        data:mergeStartCell
      })

      curSheet.forceUpdateAll()
    }

  }

  /**
   * 合并单元格
   */
  mergeCell(){
    const curSheet = this.excel.getCurSheet()
    const { selCells } = curSheet
    if(selCells.length === 1){
      // 只有一个单元格
      this.excel.showDialog('提示','单个单元格无法合并')
      return
    }else if(selCells.length > 1){ 
      // 多个单元格
      // console.log('curSheet.selCells',selCells)
      // 排序
      const sortSelCells = curSheet.selCells
      const firstCell = sortSelCells[0]
      const lastCell = sortSelCells[sortSelCells.length-1]

      curSheet.mergeCell.set(firstCell.label,[firstCell.label,lastCell.label])

      const tempAllSelCells = []

      doubleLoopByCell(firstCell,lastCell,(i:number,j:number)=>{
        const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
        tempAllSelCells.push(cell)
      })

      // for(let i=firstCell.row;i<=lastCell.row;i++){
      //   for(let j=firstCell.col;j<=lastCell.col;j++){
      //     const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
      //     tempAllSelCells.push(cell)
      //   }
      // }

      if(tempAllSelCells.some(item=>item.isMerge)){
        // 提示不可合并
        this.excel.showDialog('提示','所选中的单元格中有已合并的，遂无法合并')
        return
      }else{
        tempAllSelCells.forEach(item=>{
          item.mergeLabel = firstCell.label+':'+lastCell.label
        })
      }

      curSheet.selCells = [firstCell]
      curSheet.firstCell = firstCell
      EventEmitterIns.emit('setting',{
        type:'cell-label-input',
        data:firstCell
      })
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

    splitBtn.on('click',(_:MouseEvent)=>{
      this.splitCell()
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
      const cashRect = u(evt.target as HTMLElement)
      this.containerDom.css({
        'display':'block',
        'top':cashRect.position().top+evt.offsetY,
        'left':cashRect.position().left+evt.offsetX
      })
    })
  }

  closeContextMenu(){
    this.containerDom.css('display','none')
  }
  
}