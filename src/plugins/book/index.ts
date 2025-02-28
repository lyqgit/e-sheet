import { IStore } from "@/store";
import { IExcel, IPlugin, IScrollPlugin } from "@/types";
import u, { Cash } from 'cash-dom'

export class BookPlugin implements IPlugin{
  excel: IExcel;
  store: IStore;
  sheetArrLayoutDom:Cash;
  contextmenuDom:Cash;

  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store

  }

  register(): void {
    this.registerDom()
    this.registryContextmenuDom()
    this.installData()
  }

  unregister(): void {
  }

  docMouseUp(): void {
    // this.hideContextMenu()
  }

  hideContextMenu(){
    this.contextmenuDom.hide()
  }

  registryContextmenuDom(){
    this.contextmenuDom = u('<div>').css('display','none').addClass('e-sheet-contextmenu-layout')
    .append(
      u('<div>').css('cursor','pointer').text('删除').addClass('item-btn').on('click',(evt:MouseEvent)=>{
        if(this.excel.sheetArr.length === 1){
          this.hideContextMenu()
          return
        }
        const index = parseInt(u(evt.target as HTMLElement).parent().data('select'))
        // console.log('清除索引',index)
        this.removeSheet(index)
        this.hideContextMenu()
      })
    )
    

    this.excel.excelDom.append(this.contextmenuDom)
  }

  removeSheet(i:number){
    this.excel.removeSheet(i)

    this.sheetArrLayoutDom.children().each((_,item)=>{
      const tempDom = u(item)
      // console.log('item',tempDom,tempDom.attr('index'))
      parseInt(tempDom.attr('index')) === i && tempDom.remove()
    })
    // 如果时当前正在操作的sheet，则默认切换到前一个，否则切换到后面一个
    if(i === this.excel.curSheetIndex){
      this.switchSheet(i>0?i-1:i+1)
    }
  }

  installData(){
    const { sheetArr,curSheetIndex } = this.excel
    sheetArr.forEach((item,i)=>{
      this.sheetArrLayoutDom.append(
        u('<div>').attr({
          class:curSheetIndex===i?'item-span active-item-span':'item-span',
          index:i.toString()
        }).text(item.name)
      )
    })
  }

  switchSheet(i:number){
    this.excel.switchSheet(i)
    const { curSheetIndex } = this.excel
    this.sheetArrLayoutDom.children().each((index,item)=>{
      // console.log('item.className',item.className,'---------',currentSheetIndex,index,currentSheetIndex===index?'item-span active-item-span':'item-span')
      u(item).attr('class',curSheetIndex===index?'item-span active-item-span':'item-span')
    })
    // 重置滚动条
    const scrollPlugin = this.store.config.plugins['scroll'];
    (scrollPlugin as IScrollPlugin).resize()
  }

  createNewSheet(){
    this.excel.createEmptySheet()
    const { sheetArr } = this.excel

    this.sheetArrLayoutDom.append(
      u('<div>').attr({
        class:'item-span',
        index:(sheetArr.length - 1).toString()
      }).text(sheetArr[sheetArr.length - 1].name)
    )

    this.switchSheet(sheetArr.length - 1)
  }

  createSheetArrDom():Cash{
    return u('<div>')
    .addClass('sheet-arr-layout')
    .on('click',(evt:MouseEvent)=>{
      this.hideContextMenu()
      const strIndex = u(evt.target as HTMLElement).attr('index')
      if(strIndex){
          this.switchSheet(parseInt(strIndex))
      }
    })
    .on('contextmenu',(evt:MouseEvent)=>{
      evt.preventDefault()
      if(!this.sheetArrLayoutDom[0].contains(evt.target as HTMLElement) || this.sheetArrLayoutDom[0] === evt.target){
        return
      }
      // console.log('evt.offsetX',evt)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

      this.contextmenuDom.data('select',u(evt.target as HTMLElement).attr('index'))
      this.contextmenuDom.css({
        left:scrollLeft+evt.x,
        top:scrollTop+evt.y-34
      })
      this.contextmenuDom.show()
      
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

    this.sheetArrLayoutDom = sheetArrLayoutDom;

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
    // console.log('bookLayoutDom')
    this.excel.excelDom.append(bookLayoutDom)
  }

}