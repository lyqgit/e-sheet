import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import u, { Cash } from 'cash-dom'

export class BookPlugin implements IPlugin{
  excel: IExcel;
  store: IStore;

  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
  }

  register(): void {
    this.registerDom()
  }
  unregister(): void {
  }
  docMouseUp(): void {
    
  }

  hideContextMenu(){

  }

  createNewSheet(){

  }

  createSheetArrDom():Cash{
    return u('<div>')
    .addClass('sheet-arr-layout')
    .on('click',(evt:MouseEvent)=>{
      this.hideContextMenu()
    })
  }

  createScrollhandleLayoutDom(sheetArrLayoutDom:Cash):Cash{
    return u('<div>').addClass('scroll-handle-layout')
    .append(
      u('<e-sheet-tip>').attr({
        'tip-label':'向左滚动',
        left:'-20',
        top:'-36',
      }).css('height','100%').on('click',()=>{
        sheetArrLayoutDom.css('scrollLeft',parseInt(sheetArrLayoutDom.css('scrollLeft')) - 300)
      })
      .append(
        u('<div>').addClass('arrow')
        .append(
          u('<e-sheet-icon-svg>').attr({
            category:'book',
            position:'arrow-left'
          })
        )
      ),
      u('<e-sheet-tip>').attr({
        'tip-label':'向右滚动',
        left:'-20',
        top:'-36',
      }).css('height','100%').on('click',()=>{
        sheetArrLayoutDom.css('scrollLeft',parseInt(sheetArrLayoutDom.css('scrollLeft')) + 300)
      })
      .append(
        u('<div>').addClass('arrow')
        .append(
          u('<e-sheet-icon-svg>').attr({
            category:'book',
            position:'arrow-right'
          })
        )
      )
    )
  }

  createMenuLayoutDom():Cash{
    return u('<div>').addClass('menu-layout')
        .append(
          u('<div>').addClass('e-sheet-cell-hover')
          .append(
            u('<e-sheet-tip>').attr({
              'tip-label':'全部',
              left:'-6',
              top:'-36',
            })
            .append(
              u('<e-sheet-icon-svg>').attr({
                category:'book',
                position:'menu'
              })
            )
          ),
          u('<div>').addClass('e-sheet-cell-hover')
            .append(
              u('<e-sheet-tip>').attr({
                'tip-label':'新增',
                left:'-6',
                top:'-36',
              }).on('click',()=>{
                this.createNewSheet()
              })
              .append(
                u('<e-sheet-icon-svg>').attr({
                  category:'book',
                  position:'plus'
                })
              )
            )
        )
  }

  // 注册底部dom组件
  registerDom(){
    const sheetArrLayoutDom = this.createSheetArrDom()

    const scrollhandleLayoutDom = this.createScrollhandleLayoutDom(sheetArrLayoutDom)

    const menuLayoutDom = this.createMenuLayoutDom()

    const bookLayoutDom = u('<div>').addClass('e-sheet-book-layout')
    .append(
      u('<div>').addClass('e-sheet-book-con')
      .append(
        menuLayoutDom,
        sheetArrLayoutDom,
        scrollhandleLayoutDom
      )
    )
    console.log('bookLayoutDom')
    this.excel.excelDom.append(bookLayoutDom)
  }

}