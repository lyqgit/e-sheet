import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import type { Cash } from 'cash-dom'
import u from 'cash-dom'
import { EventEmitterIns } from '@/utils'

export class InputPlugin implements IPlugin {
  excel: IExcel;
  store: IStore;
  register(): void {
  }
  unregister(): void {
  }
  docMouseUp(evt: MouseEvent): void {
  }

  constructor(excel: IExcel, store: IStore) {
    this.excel = excel;
    this.store = store;

    this.registryDom()

  }

  hideInput(){
    this.inputDom.hide()
    this.inputDom.val('')
  }

  inputDom:Cash;

  registryDom(){

    const { selectedBorderBgColor } = this.store.config
    const { eventDom } = this.store.canvas
    const { canvasWrapperDom } = this.excel

    const curSheet = this.excel.getCurSheet()

    const inputDom = u('<textarea>').css({
      display:'none',
      position:'absolute',
      outline:'none',
      border:`2px solid ${selectedBorderBgColor}`,
      borderRaidus:'6px',
      'box-sizing':'border-box',
      zIndex:101,
      resize:'none',
    })

    this.inputDom = inputDom

    canvasWrapperDom.append(inputDom)

    eventDom.on('dblclick',evt=>{

      // 首先单选
      const targetDom = u(evt.target as HTMLElement)
      
      const targetDomCol = targetDom.data('col')
      const targetDomRow = targetDom.data('row')

      if(targetDomCol === 0 || targetDomRow === 0){
        // 边界cell不展示输入框
        return
      }

      const { top,left } = targetDom.position()

      inputDom.css({
        opacity:1,
        top,
        left,
        display:'inline-block',
        textAlign:'center',
        width:targetDom.width(),
        height:targetDom.height(),
      })

      inputDom.get(0).focus()

      inputDom.on('blur',()=>{
        const cell = curSheet.contMap.get(targetDom.data('label'))
        cell.text = inputDom.val() as string
        this.hideInput()
        curSheet.forceUpdateRect()
      })

      inputDom.on('input',_=>{
        EventEmitterIns.emit("input",inputDom.val() as string)
        console.log('输入内容',inputDom.val())
      })

    })

  }

}