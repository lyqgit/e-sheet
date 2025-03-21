import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import type { Cash } from "cash-dom";
import u from "cash-dom";
import { EventEmitterIns,ICellLabelInputEvent } from '@/utils'


export class SettingPlugin implements IPlugin{
  excel: IExcel;
  store: IStore;
  register(): void {
    this.registrySettingDom()
    this.emitterListen()
  }
  unregister(): void {
  }
  docMouseUp(evt: MouseEvent): void {
  }
  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
  }

  emitterListen(){
    EventEmitterIns.on('setting',({type,data})=>{
      // console.log('label',data)
      if(type === 'cell-label-input'){
        const { label,value } = data as ICellLabelInputEvent
        this.labelInputDom.val(label)
        this.fxInputDom.val(value)
      }
    })
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
      .append(
        u('<span>').addClass('prefix-label').text('fx'),
        this.fxInputDom
      )
    )

    settingDom.insertBefore(this.excel.canvasWrapperDom)

    // 选择字体水平对齐
    this.createFontHorAddrGroup()

    // 选择字体垂直对齐
    this.createFontVerAddrGroup()

    const settingTopDom = u('<div>').addClass('e-sheet-setting-layout');

    const fontPositionDom = u('<div>').addClass('font-position-layout')

    fontPositionDom.append(
      this.fontHorAddrGroup,
      this.fontVerAddrGroup
    )

    // 选择字体大小
    this.createFontSizeSelectDom()

    const fontSizeAndFamilyLayoutDom = u('<div>').addClass('font-position-layout')

    const fontColorAndBgColorDom = u('<div>').addClass('font-position-layout')
    
    fontSizeAndFamilyLayoutDom.append(this.fontSizeSelectDom)

    // 字体粗体
    this.createFontWeightBtnDom()
    // 斜体字
    this.createFontItalicBtnDom()
    // 下划线
    this.createFontUnderlineBtnDom()
    // 删除线
    this.createFontStrikethroughBtnDom()


    const fontStyleGroupDom = u('<div>').addClass('e-sheet-font-style-layout')
    .append(
      this.fontWeightBtnDom,
      this.fontItalicBtnDom,
      this.fontUnderlineBtnDom,
      this.fontStrikethroughBtnDom
    )
    
    fontSizeAndFamilyLayoutDom.append(fontStyleGroupDom)


    // 字体颜色设置
    fontColorAndBgColorDom.append(this.createFontColorSelectDom())


    // 背景颜色设置
    fontColorAndBgColorDom.append(this.createBgColorSelectDom())

    // 分割线dom
    const divideLine = u('<div>').addClass('e-sheet-divide-line')

    // 合并按钮
    this.createCellMergerBtnDom()
    // 拆分按钮
    this.createCellSplitBtnDom()
    this.createTextWrapBtnDom()
    this.createExtraFuncDom()
    this.createFilterFuncDom()
    this.createFreezeFuncDom()

    const cellMergeAndSplitLayoutDom = u('<div>').addClass('cell-merge-and-split-layout')

    cellMergeAndSplitLayoutDom.append(this.cellMergerBtnDom)
    cellMergeAndSplitLayoutDom.append(this.cellSplitBtnDom)
    cellMergeAndSplitLayoutDom.append(this.textWrapGroup)

    // 撤销和重做

    settingTopDom.append(this.createStepDom())
    settingTopDom.append(divideLine.clone())

    settingTopDom.append(fontPositionDom)
    settingTopDom.append(divideLine.clone())

    settingTopDom.append(fontSizeAndFamilyLayoutDom)
    settingTopDom.append(divideLine.clone())
    settingTopDom.append(fontColorAndBgColorDom)
    settingTopDom.append(divideLine.clone())
    settingTopDom.append(cellMergeAndSplitLayoutDom)
    settingTopDom.append(divideLine.clone())
    settingTopDom.append(this.uploadCellImgDom)
    // settingTopDom.append(divideLine.clone())
    // settingTopDom.append(this.filterFuncDom)
    settingTopDom.append(divideLine.clone())
    settingTopDom.append(this.freezeFuncDom)

    settingTopDom.insertBefore(settingDom)
  }
  createStepDom(): Cash {
    const stepForwardDom = u('<e-sheet-radio-button>').attr({
        label: '撤销(Ctrl+Z)',
        value: 'fallback',
        top:'24',
        left:'-24'
    }).on('click',_=>{
        // this.fallbackSetSheet()
    }).append(
        u('<e-sheet-icon-svg>').attr({
            category: 'step',
            position: 'fallback'
        })
    )

    const stepFallbackDom = u('<e-sheet-radio-button>').attr({
        label: '重做(Ctrl+Y)',
        value: 'forward',
        top:'24',
        left:'-24'
    }).on('click',_=>{
        // this.forwardSetSheet()
    }).append(
        u('<e-sheet-icon-svg>').attr({
            category:'step',
            position: 'forward'  
        })
    )

    document.addEventListener('keydown',evt=>{
        // console.log('evt',evt)
        if(evt.ctrlKey && evt.key === 'z'){
            // this.fallbackSetSheet()
        }
        if(evt.ctrlKey && evt.key === 'y'){
            // this.forwardSetSheet()
        }
    })

    const stepLayout = u('<div>').addClass('font-position-layout')
    
    stepLayout.append(stepForwardDom)
    stepLayout.append(stepFallbackDom)
    return stepLayout
  }

  freezeFuncDom:Cash
  freezeStatusDom:Cash

  /**
   * @description 创建冻结行
   */
  createFreezeFuncDom() {
    const funcRadioDom = u('<e-sheet-radio-button>').attr({
      label: '冻结',
      value: 'true' 
    }).append(
      u('<e-sheet-icon-svg>').attr({
        category: 'freeze',
        position: '1'
      }) 
    )

    const freezeFuncDom = u('<div>').css({
      display: 'flex',
      alignItems: 'center',
      height: '52px' 
    }).append(
      u('<div>').css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' 
      }).append(
        funcRadioDom,
        u('<div>').attr({
          innerText: '冻结',
          className: 'e-sheet-cell-font'  
        }).css({
          marginTop: '6px'
        })
      )
    )
    

    this.freezeFuncDom = freezeFuncDom
    funcRadioDom.on('e-sheet-radio-group-change',evt=>{
        // const { config } = this.core.getCurrentSheet()
        // // console.log('evt',evt)
        // if(!funcRadioDom.getAttribute('current')){
        //     const { clickCell,secondClickCell } = this.contentComponent
        //     if(secondClickCell){
        //         // 选中多个，以最后一个的行数为基准
        //         config.freezeRow = secondClickCell.row
        //         config.freezeType = 1
        //         funcRadioDom.setAttribute('current',evt.detail)
        //     }else if(clickCell){
        //         config.freezeRow = clickCell.row
        //         config.freezeType = 1
        //         funcRadioDom.setAttribute('current',evt.detail)
        //     }
        //     // 当滚动条滚动后才冻结，需要刷新一下
        //     this.core.fresh();
        // }else{
        //     funcRadioDom.setAttribute('current','')
        //     config.freezeType = 0
        //     config.freezeRow = 0
        //     // 取消冻结，需要刷新一下
        //     this.core.fresh();
        // }
        // this.wsSendCellAttrByTypeAndData(19)
    })
    this.freezeStatusDom = funcRadioDom
  }

  filterFuncDom:Cash
  /**
   * @description 创建筛选按钮
   */
  createFilterFuncDom() {
    const filterFuncRadioDom = u('<e-sheet-radio-button>').attr({
      lable: '筛选',
      value: 'true'
    }).append(
      u('<e-sheet-icon-svg>').attr({
        category: 'filter',
        position: '1'
      }) 
    )

    const filterFuncDom = u('<div>').css({
      display: 'flex',
      alignItems: 'center',
      height: '52px' 
    }).append(
      u('<div>').css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' 
      }).append(
        filterFuncRadioDom,
        u('<div>').attr({
          innerText: '筛选',
          className: 'e-sheet-cell-font'  
        }).css({
          marginTop: '6px' 
        })
      )
    )

    this.filterFuncDom = filterFuncDom
    filterFuncRadioDom.on('e-sheet-radio-group-change',evt=>{
        // const { config } = this.core.getCurrentSheet()
        // // console.log('evt',evt)
        // if(!filterFuncRadioDom.getAttribute('current')){
        //     // 判断当前的选择是否能筛选
        //     if(this.judgeCanFilter()){
        //         filterFuncRadioDom.setAttribute('current',evt.detail)
        //         const { moreSelectedCell,clickCell,contentGroup } = this.contentComponent
        //         // 获取可以筛选的头部单元格
        //         this.contentComponent.filterCellHeader = moreSelectedCell.filter(item=>item.row === clickCell.row && contentGroup.some(itemA=>item.col === itemA.col && !!itemA.text))
        //         config.filterType = 1
        //     }else{
        //         this.showDialog('提示','指定区域无法筛选')
        //     }

        // }else{
        //     // 关闭筛选后，重置filterCellHeader
        //     this.contentComponent.filterCellHeader = []
        //     filterFuncRadioDom.setAttribute('current','')
        //     config.filterType = 0
        // }
        // this.wsSendCellAttrByTypeAndData(19)
    })
  }

  uploadCellImgInputDom:Cash
  uploadCellImgDom:Cash

  /**
   * @description 上传图片
   */
  createExtraFuncDom() {

    this.uploadCellImgInputDom = u('<input>').css({
        width: 0,
        height: 0,
        padding: 0,
        border: 'none'
    }).attr({
        type: 'file',
        multiple: 'true'
    })
    

    const uploadCellImgDom = u('<div>').css({
        display: 'flex',
        alignItems: 'center',
        height: '52px'
    }).append(
        u('<div>').css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' 
        }).append(
            u('<e-sheet-tip>').attr({
                'tip-label': '插入单元格图片', 
            }).append(
                u('<e-sheet-icon-svg>').attr({
                    category: 'extra',
                    position: 'cell-img'
                })
            ),
            u('<div>').attr({
                innerText: '图片',
                className: 'e-sheet-cell-font' 
            }).css({
                marginTop: '6px' 
            })
        ),
        this.uploadCellImgInputDom
    )

    this.uploadCellImgInputDom.on('input',evt=>{
        // console.log('上传图片',evt.target.value)
        // const { clickCell } = this.contentComponent
        // if(this.core.options.uploadImg){
        //     this.core.options.uploadImg(evt.target.files).then(res=>{
        //         // console.log('上传图片res',res)
        //         loadMoreNetImgPromise(res).then(resA=>{
        //             const imgIds = [];
        //             let imgWidth = 0
        //             let imgHeight = 0
        //             resA.forEach(item=>{
        //                 imgIds.push(item.url)
        //                 this.core.imgCanvasElMap[item.url] = item.imgEl
        //                 imgWidth += item.imgEl.width
        //                 imgHeight += item.imgEl.height
        //             })
        //             if(imgWidth > clickCell.width){
        //                 this.core.plugins.DragPlugin.expandWidthNoDrag(clickCell.col,imgWidth,false)
        //             }
        //             if(imgHeight > clickCell.height){
        //                 this.core.plugins.DragPlugin.expandHeightNoDrag(clickCell.row,imgHeight,false)
        //             }
        //             this.changeStepArr({
        //                 type:22,
        //                 label:clickCell.label,
        //                 pre:JSON.stringify(clickCell.img),
        //                 next:JSON.stringify(clickCell.img.concat(imgIds))
        //             })
        //             this.cellImgChange(imgIds)
        //         })
        //     })
        // }else{
        //     loadMoreImagePromise(evt.target.files).then(res=>{
        //         const imgIds = [];
        //         let imgWidth = 0
        //         res.forEach(item=>{
        //             imgIds.push(item.url)
        //             this.core.imgCanvasElMap[item.url] = item.imgEl
        //             imgWidth += item.imgEl.width
        //         })
        //         if(imgWidth > clickCell.width){
        //             this.core.plugins.DragPlugin.expandWidthNoDrag(clickCell.col,imgWidth-clickCell.width,false)
        //         }
        //         const imgHeight = Math.max(...res.map(item=>item.imgEl.height))
        //         if(imgHeight > clickCell.height){
        //             this.core.plugins.DragPlugin.expandHeightNoDrag(clickCell.row,imgHeight-clickCell.height,false)
        //         }
        //         this.cellImgChange(imgIds)
        //     })
        // }
    })

    uploadCellImgDom.on('click',_=>{
        // console.log('this.uploadCellImgInputDom',this.uploadCellImgInputDom)
        // this.uploadCellImgInputDom.click()
    })

    this.uploadCellImgDom = uploadCellImgDom
  }

  textWrapGroup:Cash

  createTextWrapBtnDom() {
    const textWrapGroup = u('<e-sheet-radio-group>').append(
      u('<e-sheet-radio-button>').attr({
        label:'截断',
        value:'cut' 
      }).append(
        u('<e-sheet-icon-svg>').attr({
          category:'text',
          position:'cut'
        }) 
      ),
      u('<e-sheet-radio-button>').attr({
        label:'换行',
        value:'wrap' 
      }).append(
        u('<e-sheet-icon-svg>').attr({
          category:'text',
          position:'wrap'
        })
      )
    )
    
    
    this.textWrapGroup = textWrapGroup
    textWrapGroup.on('e-sheet-radio-group-onchange',evt=>{
        console.log('evt',evt)
        // const currentSheet = this.core.getCurrentSheet();
        // this.changeStepArr({
        //     type:21,
        //     pre:currentSheet.config.textWrapType,
        //     next:evt.detail
        // })
        // this.core.ws.wsSend(21,{textWrapType:evt.detail})
        // this.setTextWrapChange(evt.detail)
    })
  }

  cellSplitBtnDom:Cash

  createCellSplitBtnDom() {
    const cellSplitBtnDom = u('<e-sheet-tip>').css({
        display:'none',
    }).append(
      u('<div>').addClass('e-sheet-font-style-layout e-sheet-cell-hover').css({
        padding:'2px',
        userSelect:'none' 
      }).append(
        u('<e-sheet-icon-svg>').attr({
          category:'cell',
          position:'split'
        }),
        u('<div>').addClass('e-sheet-cell-font').text('拆分单元格')
      )
    )
    
    cellSplitBtnDom.on('click',_=>{
      
    })

    // cellSplitBtnDom.onclick=_=>{
    //     const { clickCell } = this.contentComponent
    //     const next = {
    //         row:clickCell.row,
    //         col:clickCell.col,
    //         mergeRow:clickCell.mergeRow,
    //         mergeCol:clickCell.mergeCol,
    //         mergeStartLabel:clickCell.mergeStartLabel,
    //         mergeEndLabel:clickCell.mergeEndLabel,
    //         isMerge:false,
    //     }
    //     this.changeStepArr({
    //         type:10,
    //         label:clickCell.label,
    //         pre:{
    //             row:clickCell.row,
    //             col:clickCell.col,
    //             mergeRow:clickCell.mergeRow,
    //             mergeCol:clickCell.mergeCol,
    //             mergeStartLabel:clickCell.mergeStartLabel,
    //             mergeEndLabel:clickCell.mergeEndLabel,
    //             isMerge:true,
    //         },
    //         next
    //     })
    //     this.wsSendInfoByTypeAndData(10,next)
    //     if(this.core.plugins.ContextmenuPlugin.splitCell(clickCell)){
    //         this.cellMergerBtnDom.style.display = 'flex'
    //         cellSplitBtnDom.style.display = 'none'
    //     }

    //     // this.convenientGroupChangeStepArr()

    // }

    this.cellSplitBtnDom = cellSplitBtnDom
  }

  cellMergerBtnDom:Cash

  createCellMergerBtnDom() {
    const cellMergerBtnDom = u('<e-sheet-tip>').attr({
        'tip-label':'合并单元格' 
    }).append(
      u('<div>').addClass('e-sheet-font-style-layout e-sheet-cell-hover').css({
        padding:'2px',
        userSelect:'none' 
      }).append(
        u('<e-sheet-icon-svg>').attr({
          category:'cell',
          position:'merge'
        }),
        u('<div>').addClass('e-sheet-cell-font').text('合并单元格')
      )
    )

    cellMergerBtnDom.on('click',_=>{

    })

    // cellMergerBtnDom.onclick=_=>{
        // const { clickCell,mergeSelectedCell } = this.contentComponent
        // const stepObj = {
        //     type:9,
        //     label:clickCell.label
        // }
        // const tempGroupCell = [clickCell,...mergeSelectedCell].sort((a,b)=>{return (a.row - b.row)+(a.col - b.col) })

        // stepObj.pre = tempGroupCell[0].label
        // stepObj.next = tempGroupCell.map(item=>item.label)
        // this.changeStepArr(stepObj)
        // this.wsSendInfoByTypeAndData(9,stepObj.next)
        // if(this.core.plugins.ContextmenuPlugin.mergeCell(tempGroupCell[0],tempGroupCell.slice(0))){
        //     cellMergerBtnDom.style.display = 'none'
        //     this.cellSplitBtnDom.style.display = 'flex'
        // }

        // if(mergeSelectedCell.some(item=>item.isMerge) || mergeSelectedCell.length === 0){
        //     return
        // }

    // }

    this.cellMergerBtnDom = cellMergerBtnDom
  }

  bgColorSelectDom:Cash

  /**
   * @description 创建背景颜色选择器
   * @returns
   */
  createBgColorSelectDom(): Cash {
    const bgColorSelectTipConDom = u('<e-sheet-tip>').attr({
        'tip-label':'背景颜色'
    })

    const bgColorSelectDom = u('<e-sheet-icon-color-svg>').attr('category','bg-color')

    this.bgColorSelectDom = bgColorSelectDom

    bgColorSelectTipConDom.append(bgColorSelectDom)

    bgColorSelectDom.on('e-sheet-icon-color-svg-onchange',evt=>{
        // this.convenientChangeStepArr(8,'bgColor',evt.detail)
        // this.cellBgColorChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(8)
    })

    return bgColorSelectTipConDom
  }

  fontColorSelectDom:Cash

  /**
   * @description 创建背景颜色选择器
   * @returns
   */
  createFontColorSelectDom(): Cash {
    const fontColorSelectDom = u('<e-sheet-icon-color-svg>').attr('category','font-color')

    fontColorSelectDom.on('e-sheet-icon-color-svg-onchange',evt=>{
        // this.convenientChangeStepArr(7,'fontColor',evt.detail)
        // this.cellFontColorChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(7)
    })

    const fontColorSelectTipConDom = u('<e-sheet-tip>').attr({
        'tip-label':'字体颜色'
    })

    fontColorSelectTipConDom.append(fontColorSelectDom)
    this.fontColorSelectDom = fontColorSelectDom
    return fontColorSelectTipConDom
  }

  fontStrikethroughBtnDom:Cash

  /**
   * @description 创建字体删除线按钮
   */
  createFontStrikethroughBtnDom() {
    // 删除线
    const fontStrikethroughBtnDom = u('<e-sheet-radio-button>').css({
        marginLeft:'6px'
    }).attr({
        label:'删除线',
        value:'true'
    }).append(
      u('<e-sheet-icon-svg>').attr({
        category:'font',
        position:'strikethrough' 
      })
    )

    this.fontStrikethroughBtnDom = fontStrikethroughBtnDom
    fontStrikethroughBtnDom.on('e-sheet-radio-group-change',evt=>{
        console.log('evt',evt)
        // if(fontStrikethroughBtnDom.getAttribute('current') === ''){
        //     fontStrikethroughBtnDom.setAttribute('current',evt.detail)
        //     this.convenientChangeStepArr(18,'strikethrough',evt.detail)
        //     this.cellStrikethroughChange('true')
        // }else{
        //     fontStrikethroughBtnDom.setAttribute('current','')
        //     this.convenientChangeStepArr(18,'strikethrough','')
        //     this.cellStrikethroughChange('')
        // }
        // this.wsSendCellAttrByTypeAndData(18)
    })
  }


  fontUnderlineBtnDom:Cash

  /**
   * @description 创建字体下划线按钮
   */
  createFontUnderlineBtnDom() {
    const fontUnderlineBtnDom = u('<e-sheet-radio-button>').css({
        marginLeft:'6px' 
    }).attr({
        label:'下划线',
        value:'true'
    }).append(
      u('<e-sheet-icon-svg>').attr({
        category:'font',
        position:'underline'
      }) 
    )
    
    this.fontUnderlineBtnDom = fontUnderlineBtnDom
    fontUnderlineBtnDom.on('e-sheet-radio-group-change',evt=>{
        console.log('evt',evt)
        // if(fontUnderlineBtnDom.getAttribute('current') === ''){
        //     fontUnderlineBtnDom.setAttribute('current',evt.detail)
        //     this.convenientChangeStepArr(19,'underline',evt.detail)
        //     this.cellUnderlineChange('true')
        // }else{
        //     fontUnderlineBtnDom.setAttribute('current','')
        //     this.convenientChangeStepArr(19,'underline','')
        //     this.cellUnderlineChange('')
        // }
        // this.wsSendCellAttrByTypeAndData(19)
    })
  }

  fontItalicBtnDom:Cash

  /**
   * @description 创建字体斜体按钮
   */
  createFontItalicBtnDom() {
    const fontItalicBtnDom = u('<e-sheet-radio-button>').css({
        marginLeft:'6px' 
    }).attr({
        label:'斜体',
        value:'italic' 
    }).append(
      u('<e-sheet-icon-svg>').attr({
        category:'font',
        position:'italic'
      }) 
    )

    this.fontItalicBtnDom = fontItalicBtnDom

    fontItalicBtnDom.on('e-sheet-radio-group-change',evt=>{
        // console.log('evt',evt)
        // if(fontItalicBtnDom.getAttribute('current') === ''){
        //     fontItalicBtnDom.setAttribute('current',evt.detail)
        //     this.convenientChangeStepArr(6,'fontItalic',evt.detail)
        //     this.cellFontItalicChange(evt.detail)
        // }else{
        //     fontItalicBtnDom.setAttribute('current','')
        //     this.convenientChangeStepArr(6,'fontItalic','')
        //     this.cellFontItalicChange('')
        // }
        // this.wsSendCellAttrByTypeAndData(6)

    })
  }

  fontWeightBtnDom:Cash

  /**
   * @description 创建字体粗细按钮
   */

  createFontWeightBtnDom() {
    // 粗体
    const fontWeightBtnDom = u('<e-sheet-radio-button>').attr({'label':'粗体','value':'bold'})
    .append(
      u('<e-sheet-icon-svg>').attr({'category':'font','position':'weight'})
    )
        

    this.fontWeightBtnDom = fontWeightBtnDom
    fontWeightBtnDom.on('e-sheet-radio-group-change',evt=>{
        console.log('evt',evt)
        // if(fontWeightBtnDom.getAttribute('current') === ''){
        //     fontWeightBtnDom.setAttribute('current',evt.detail)
        //     this.convenientChangeStepArr(5,'fontWeight',evt.detail)
        //     this.cellFontWeightChange(evt.detail)
        // }else{
        //     fontWeightBtnDom.setAttribute('current','')
        //     this.convenientChangeStepArr(5,'fontWeight','')
        //     this.cellFontWeightChange('')
        // }
        // this.wsSendCellAttrByTypeAndData(5)
    })
  }

  fontHorAddrGroup:Cash

  /**
   * @description 创建水平对齐dom
   */
  createFontHorAddrGroup(){

    this.fontHorAddrGroup = u('<e-sheet-radio-group>').
    append(
      u('<e-sheet-radio-button>').attr({label:'左对齐',value:'left'})
      .append(u('<e-sheet-icon-svg>').attr({category:'hor',position:'left'})),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'居中对齐',value:'center'})
     .append(u('<e-sheet-icon-svg>').attr({category:'hor',position:'center'})),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'右对齐',value:'right'})
      .append(u('<e-sheet-icon-svg>').attr({category:'hor',position:'right'}))
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
      .append(u('<e-sheet-icon-svg>').attr({category:'ver',position:'top'})),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'垂直居中',value:'middle'})
     .append(u('<e-sheet-icon-svg>').attr({category:'ver',position:'middle'})),
      u('<e-sheet-radio-button>').css({marginLeft:'6px'}).attr({label:'底部对齐',value:'bottom'})
      .append(u('<e-sheet-icon-svg>').attr({category:'ver',position:'bottom'}))
    )

    this.fontVerAddrGroup.on('e-sheet-radio-group-onchange',evt=>{
        console.log('evt',evt)
        // this.convenientChangeStepArr(3,'textBaseLine',evt.detail)
        // this.cellFontTextBaseLineChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(3)
    })
  }

  fontSizeSelectDom:Cash

  createFontSizeSelectDom(){
    this.fontSizeSelectDom = u('<e-sheet-select>')

    this.fontSizeSelectDom.on('e-sheet-select-onchange',evt=>{

        // this.convenientChangeStepArr(2,'fontSize',parseInt(evt.detail))
        // this.cellFontSizeChange(evt.detail)
        // this.wsSendCellAttrByTypeAndData(2)
    })
    this.fontSizeSelectDom.attr('label','字号')
}

}