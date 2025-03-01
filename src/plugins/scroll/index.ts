import { IStore } from "@/store";
import { IExcel } from "@/types";
import { IScrollPlugin } from "@/types/plugin";
import u, { Cash } from "cash-dom";

export class ScrollPlugin implements IScrollPlugin{
  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
  }

  resize = (): void=> {

    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,col,row,scale } = this.store.config

    const curSheet = this.excel.getCurSheet()

    // 纵向重置
    this.verContainerDom.css({
      'height':canvasDom.height() - cellHeight*scale,
      'width':this.defaultBarWidth,
      'top':cellHeight*scale,
    })

    const lastRow = curSheet.rowMap.get('row'+row)
    this.verPropor = (canvasDom.height()-cellHeight*scale)/(lastRow.yScale+lastRow.heightScale)

    // console.log('scale',lastRow.yScale+lastRow.heightScale,this.verPropor)
    // console.log('lastRow.yScale+lastRow.heightScale',lastRow.yScale+lastRow.heightScale,this.verPropor)

    this.verBarDom.css({
      'height':(canvasDom.height()-cellHeight*scale)*this.verPropor
    })

    this.verBoundDiff = parseFloat((this.verContainerDom.height() - this.verBarDom.height()).toFixed(2))

    const tY = curSheet.scrollTop*this.verPropor

    const diffY = tY>this.verBoundDiff?this.verBoundDiff:tY

    this.verBarDom.css({
      'transform':`translateY(${diffY}px)`
    })

    // 更新sheet中的偏移
    curSheet.scrollTop = diffY/this.verPropor
    
    // console.log('this.verBoundDiff',this.verBoundDiff)

    // 横向

    this.horContainerDom.css({
      'height':this.defaultBarWidth,
      'width':canvasDom.width() - cellHeight*scale,
      'left':cellHeight*scale,
    })

    const lastCol = curSheet.colMap.get('col'+col)
    this.horPropor = (canvasDom.width() - cellHeight*scale)/(lastCol.xScale+lastCol.widthScale)

    this.horBarDom.css({
      'width':(canvasDom.width() - cellHeight*scale)*this.horPropor,
    })

    this.horBoundDiff = parseFloat((this.horContainerDom.width() - this.horBarDom.width()).toFixed(2))

    const tX = curSheet.scrollLeft*this.horPropor

    const diffX = tX>this.horBoundDiff?this.horBoundDiff:tX;
    
    this.horBarDom.css({
      'transform':`translateX(${diffX}px)`,
    })

    
  }
  
  barDomColor:string = 'rgb(201, 201, 201)'
  barDomActiveColor:string = 'rgb(150, 150, 150)'

  unregister(): void {
    
  }

  docMouseUp=()=>{
    u(document).off('mousemove')
    this.verBarDom.css('background',this.barDomColor)
    this.horBarDom.css('background',this.barDomColor)
    this.forceUpdateAll()
  }

  register(): void {
    
    this.registryVerScroll();
    this.registryHorScroll();
    this.registryWheel();
    this.excel.addResizeCallback(this.resize)
  }

  excel: IExcel;
  store: IStore;

  verBarDom:Cash;
  horBarDom:Cash;

  verContainerDom:Cash;
  horContainerDom:Cash;

  defaultBarWidth:number = 10;

  verPropor:number;
  horPropor:number;

  wheelStep:number = 10
  verBoundDiff:number;
  horBoundDiff:number;

  // 横向滚动
  registryHorScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    this.horContainerDom = barContainerDom
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,col,scale } = this.store.config
    barContainerDom.css({
      'height':this.defaultBarWidth,
      'width':canvasDom.width() - cellHeight,
      'position':'absolute',
      'left':cellHeight,
      'bottom':0,
      'zIndex':200
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastCol = curSheet.colMap.get('col'+col)


    this.horPropor = (canvasDom.width() - cellHeight)/(lastCol.x+lastCol.width)

    const barDom = u('<div>')

    this.horBarDom = barDom

    barDom.css({
      'width':(canvasDom.width() - cellHeight)*this.horPropor,
      'background':this.barDomColor,
      'transformOrigin':'left',
      'transform':'translateX(0px)',
      'userSelect':'none',
      'height':this.defaultBarWidth,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

    let boundDiff = parseFloat((barContainerDom.width() - barDom.width()).toFixed(2))
    
    this.horBoundDiff = boundDiff

    barDom.on('mousedown',(eA:MouseEvent)=>{

      // console.log('this.horBoundDiff',this.horBoundDiff)

      boundDiff = this.horBoundDiff

      eA.preventDefault();
      const trasform = barDom.css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d*\.?\d+), \d+\)/)
      let oriTransX = 0
      if(trasform){
        oriTransX = parseInt(trasform[1])
      }
      // console.log('开始的位置',eA.pageX)
      // console.log('trasform',trasform)
      // console.log('trasform-----',barDom.css('transform'))
      u(document).on('mousemove',(eB:MouseEvent)=>{
        barDom.css('background',this.barDomActiveColor)
        requestAnimationFrame(()=>{
          // console.log('scrollTop',eB.pageY)
          // 滚动距离计算
          const diffDis = eB.pageX - eA.pageX
          let finalDis = oriTransX+diffDis
          // console.log('trasform',trasform)
          // console.log('oriTransX',oriTransX)

          if(finalDis > boundDiff && diffDis > 0){
            finalDis = boundDiff
            // console.log('diffDis----',diffDis)
            // console.log('boundDiff---',boundDiff)
            // console.log('finalDis---',finalDis)
            // console.log('oriTransX---',oriTransX)
            // console.log('trasform----',trasform)
          }else if(finalDis < 0 && diffDis < 0){
            // console.log('trasform',trasform)
            // console.log('oriTransX',oriTransX)
            // console.log('diffDis',diffDis)
            // console.log('boundDiff',boundDiff)
            // console.log('finalDis',finalDis)
            finalDis = 0
          }

          barDom.css('transform',`translateX(${finalDis}px)`)
          this.sheetMoveX(finalDis/this.horPropor)
        })
      })
      
    })
  }

  forceUpdateAll(){
    const curSheet = this.excel.getCurSheet()
    curSheet.forceUpdateAll()
  }
  
  sheetMoveX(reX:number){
    const curSheet = this.excel.getCurSheet()
    curSheet.drawX(reX,false,false)
  }

  sheetMoveY(reY:number){
    const curSheet = this.excel.getCurSheet()
    curSheet.drawY(reY,false,false)
  }

  // 纵向滚动
  registryVerScroll(): void {
    const { canvasWrapperDom } = this.excel
    const barContainerDom = u('<div>')
    this.verContainerDom = barContainerDom
    const { dom:canvasDom } = this.store.canvas
    const { cellHeight,row,scale } = this.store.config
    barContainerDom.css({
      'height':canvasDom.height() - cellHeight,
      'width':this.defaultBarWidth,
      'position':'absolute',
      'top':cellHeight,
      'right':0,
      'zIndex':200
    })

    canvasWrapperDom.append(barContainerDom)
    const curSheet = this.excel.getCurSheet()

    const lastRow = curSheet.rowMap.get('row'+row)


    this.verPropor = (canvasDom.height()-cellHeight)/(lastRow.y+lastRow.height)

    const barDom = u('<div>')

    this.verBarDom = barDom

    barDom.css({
      'width':this.defaultBarWidth,
      'background':this.barDomColor,
      'transformOrigin':'top',
      'transform':'translateY(0px)',
      'userSelect':'none',
      'height':(canvasDom.height()-cellHeight)*this.verPropor,
      'borderRadius':this.defaultBarWidth
    })

    barDom.on('mouseover',_=>{
      barDom.css('background',this.barDomActiveColor)
    })

    barDom.on('mouseleave',_=>{
      barDom.css('background',this.barDomColor)
    })

    barContainerDom.append(barDom)

    let boundDiff = parseFloat((barContainerDom.height() - barDom.height()).toFixed(2))

    this.verBoundDiff = boundDiff

    barDom.on('mousedown',(eA:MouseEvent)=>{

      boundDiff = this.verBoundDiff

      eA.preventDefault();
      const trasform = barDom.css('transform').match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\d*\.?\d+)\)/)
      let oriTransY = 0
      if(trasform){
        oriTransY = parseInt(trasform[1])
      }
      // console.log('开始的位置',eA.pageY)
      u(document).on('mousemove',(eB:MouseEvent)=>{
        barDom.css('background',this.barDomActiveColor)
        requestAnimationFrame(()=>{
          // console.log('scrollTop',eB.pageY)
          // 滚动距离计算
          const diffDis = eB.pageY - eA.pageY
          // console.log('oriTransY',oriTransY)
          // console.log('diffDis',diffDis)
          

          let finalDis = oriTransY+diffDis
          console.log('boundDiff',boundDiff)
          // console.log('finalDis',finalDis)

          if(finalDis > boundDiff && diffDis > 0){
            finalDis = boundDiff
          }else if(finalDis < 0 && diffDis < 0){
            finalDis = 0
          }
          barDom.css('transform',`translateY(${finalDis}px)`)
          this.sheetMoveY(finalDis/this.verPropor)
        })
      })
      
    })

  }

  // 竖向鼠标中间滚动条
  registryWheel(){
    const { canvasWrapperDom } = this.excel
    let timeId = null

    canvasWrapperDom.one('mouseover',()=>{
      let recordDeltaY = 0;
      canvasWrapperDom.on('wheel',(evt:WheelEvent)=>{
        evt.preventDefault()
        const diffDis = evt.deltaY>0?this.wheelStep:-this.wheelStep
        const trasform = this.verBarDom.css('transform').match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\d*\.?\d+)\)/)
        let oriTransY = 0
        if(trasform){
          oriTransY = parseInt(trasform[1])
        }
        requestAnimationFrame(()=>{
          clearTimeout(timeId);
          recordDeltaY = oriTransY + diffDis
          if(recordDeltaY > this.verBoundDiff && diffDis > 0){
            recordDeltaY = this.verBoundDiff
          }else if(recordDeltaY < 0 && diffDis < 0){
            recordDeltaY = 0
          }
          this.verBarDom.css('transform',`translateY(${recordDeltaY}px)`)
          this.sheetMoveY(recordDeltaY/this.verPropor)
          timeId = setTimeout(()=>{
            this.forceUpdateAll()
          },200)
        })
      })
    })
  }
}