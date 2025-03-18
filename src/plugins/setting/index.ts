import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import type { Cash } from "cash-dom";
import u from "cash-dom";


export class SettingPlugin implements IPlugin{
  excel: IExcel;
  store: IStore;
  register(): void {
  }
  unregister(): void {
  }
  docMouseUp(evt: MouseEvent): void {
  }
  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
    this.registrySettingDom()
  }

  labelInputDom:Cash
  fxInputDom:Cash

  /**
   * @description 装载dom
   */
  registrySettingDom(){
    this.labelInputDom = u('<input>').addClass('cell-label-input')
    .on('blur',_=>{
      
    })
    .on('keydown',_=>{
      
    })

    this.fxInputDom = u('<input>').addClass('fx-input')

    const settingDom = u('<div>').addClass('e-sheet-setting-input-bar-layout')
    .append(
      u('<div>').addClass('left-input-layout')
      .append(this.labelInputDom)
    )
    .append(
      u('<div>').addClass('right-input-layout')
      .append(this.fxInputDom)
    )

    settingDom.insertBefore(this.excel.canvasWrapperDom)

    this.createFontHorAddrGroup()

    this.createFontVerAddrGroup()

  }

  fontHorAddrGroup:Cash

  /**
   * @description 创建水平对齐dom
   */
  createFontHorAddrGroup(){

    this.fontHorAddrGroup = u('<e-sheet-radio-group>').
    append(
      u('<e-sheet-radio-button>').attr({label:'左对齐',value:'left'})
      .append('<e-sheet-icon-svg>').attr({category:'hor',position:'left'}),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'居中对齐',value:'center'})
     .append('<e-sheet-icon-svg>').attr({category:'hor',position:'center'}),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'右对齐',value:'right'})
      .append('<e-sheet-icon-svg>').attr({category:'hor',position:'right'})
    )

    this.fontHorAddrGroup.on('e-sheet-radio-group-onchange',evt=>{
        console.log('evt',evt)
        // this.convenientChangeStepArr(4,'textAlign',evt.detail)

        // this.cellFontTextAlignChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(4)
    })
  }

  fontVerAddrGroup:Cash

  /**
   * @description 创建垂直对齐dom
   */
  createFontVerAddrGroup(){
    this.fontVerAddrGroup = u('<e-sheet-radio-group>').
    append(
      u('<e-sheet-radio-button>').attr({label:'顶部对齐',value:'top'})
      .append('<e-sheet-icon-svg>').attr({category:'ver',position:'top'}),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'垂直居中',value:'middle'})
     .append('<e-sheet-icon-svg>').attr({category:'ver',position:'middle'}),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'底部对齐',value:'bottom'})
      .append('<e-sheet-icon-svg>').attr({category:'ver',position:'bottom'})
    )

    this.fontVerAddrGroup.on('e-sheet-radio-group-onchange',evt=>{
        console.log('evt',evt)
        // this.convenientChangeStepArr(3,'textBaseLine',evt.detail)
        // this.cellFontTextBaseLineChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(3)
    })
  }

}