import { ISheet,ISheetOption,ICell } from '@/types'
import { Cell } from './cell'
import { getExcelHeaderName } from '@/utils'
import store from '@/store'
import u from 'cash-dom'

export class Sheet implements ISheet{
  data: Array<ICell>;
  constructor(option:ISheetOption){
    this.name = option.name
    this.lock = option.lock
    this.data = option.data
    this.initData(option.data);
  }

  initDraw(){
    // 初始绘制
    this.forceUpdateAll()
  }

  selCells:Array<Cell> = []

  // 记录偏移距离
  scrollTop: number = 0;
  scrollLeft: number = 0;
  contMap:Map<string,Cell>;

  colMap:Map<string,Cell>;
  rowMap:Map<string,Cell>;

  totalCell:Cell;

  spWidth:Map<string,number>; // 记录更改了长度的单元格列数
  spHeight:Map<string,number>; // 记录更改了高度的单元格行数

  mergeCell:Map<string,Array<string>>;

  // 装载空数据
  initData(data:Array<ICell>):void{
    // console.log('layer',store.canvas.dom)
    this.contMap = new Map<string,Cell>();
    this.colMap = new Map<string,Cell>();
    this.rowMap = new Map<string,Cell>();

    if(data.length === 0){
      this.emptyData()
    }else{
      // 组装数据
    }
    
  };

  emptyData(){
    const { row,col,cellWidth,cellHeight } = store.config

    let abY = 0;
    for(let i=0;i<row;i++){
      let abX = 0;

      this.rowMap.set(
        'row'+(i+1),
        new Cell({
          row:i+1,
          col:0,
          x:abX,
          y:abY,
          width:cellWidth,
          height:cellHeight,
          fontSize:12,
          fontWeight:'500',
          fontItalic:'',
          fontFamily:'',
          textAlign:'left',
          textBaseline:'top',
          strikethrough:false,
          underline:false,
          label:(i+1).toString(),
          img:[]
        })
      ) 

      for(let j=0;j<col;j++){
        const headerName = getExcelHeaderName(j+1)
        const rowNum = i+1
        const label = headerName+rowNum

        if(i===0){
          // 顶部行
          this.colMap.set(
            'col'+(j+1),
            new Cell({
              row:0,
              col:j+1,
              x:abX,
              y:0,
              width:cellWidth,
              height:cellHeight,
              fontSize:12,
              fontWeight:'500',
              fontItalic:'',
              fontFamily:'',
              textAlign:'left',
              textBaseline:'top',
              strikethrough:false,
              underline:false,
              label:headerName,
              img:[]
            })
          )
        }
        

        // 内容区域
        this.contMap.set(
          label,
          new Cell({
            row:i+1,
            col:j+1,
            x:abX,
            y:abY,
            width:cellWidth,
            height:cellHeight,
            fontSize:12,
            fontWeight:'500',
            fontItalic:'',
            fontFamily:'',
            textAlign:'left',
            textBaseline:'top',
            strikethrough:false,
            underline:false,
            label,
            img:[]
          })
        )
        abX += cellWidth
      }
      abY += cellHeight
    }
  }

  drawTotalRect(){

    const { cellHeight } = store.config

    this.totalCell = new Cell({
      row:0,
      col:0,
      x:0,
      y:0,
      width:cellHeight,
      height:cellHeight,
      fontSize:12,
      fontWeight:'500',
      fontItalic:'',
      fontFamily:'',
      textAlign:'left',
      textBaseline:'top',
      strikethrough:false,
      underline:false,
      label:'total',
      img:[]
    })

    this.totalCell.drawTotalRect()
  }

  // 绘制选中
  drawSelCell(left:number,top:number){

    const { ctx } = store.canvas
    const { selectedBorderBgColor } = store.config

    if(this.selCells.length === 1){
      // 单个选中
      const singleCell = this.selCells[0]
      ctx.drawStrokeRect({
        x: singleCell.xScale + left,
        y: singleCell.yScale + top,
        width: singleCell.widthScale,
        height: singleCell.heightScale,
        color:selectedBorderBgColor,
        globalCompositeOperation:'destination-over',
        lineWidth:3
      })
    }else if(this.selCells.length > 1){

      // console.log('this.selCells.length',this.selCells.length)

      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;

      const firstCell = this.selCells[0]
      const lastCell = this.selCells[this.selCells.length - 1]

      // 先确定方向
      if(firstCell.xScale < lastCell.xScale){
        x = firstCell.xScale
        width = lastCell.xScale - firstCell.xScale + firstCell.widthScale
      }else{
        x = lastCell.xScale
        width = firstCell.xScale - lastCell.xScale + lastCell.widthScale
      }

      if(firstCell.yScale < lastCell.yScale){
        y = firstCell.yScale
        height = lastCell.yScale - firstCell.yScale + firstCell.heightScale
      }else{
        y = lastCell.yScale
        height = firstCell.yScale - lastCell.yScale + lastCell.heightScale
      }

      // console.log('width',width)
      // console.log('height',height)
      
      // 绘制选中范围
      ctx.drawStrokeRect({
        x: x + left,
        y: y + top,
        width,
        height,
        color:selectedBorderBgColor,
        globalCompositeOperation:'destination-over',
        lineWidth:3
      })
      
    }
  }

  draw(left:number,top:number,drawDom:boolean = true,forceUpdate:boolean = false): void {
    // 整体绘制规则：前面绘制的图形层级高

    const { cellHeight,excelWidth,excelHeight,scale } = store.config

    const [
      leftCol,
      rightCol,
      topRow,
      bottomRow
    ] = this.getBoundMap(left,top);

    // console.log('leftCol,rightCol,topRow,bottomRow',leftCol,rightCol,topRow,bottomRow)

    const dfDom = u(document.createDocumentFragment())

    const { eventDom } = store.canvas

    const isLeft = left !== this.scrollLeft
    const isTop = top !== this.scrollTop
    const isInit = left === top && left === 0 && top === 0

    // console.log('isLeft',isLeft,left,this.scrollLeft)
    // console.log('isTop',isTop,top,this.scrollTop)

    // 擦除画面
    if(isInit || forceUpdate){
      this.clearCanvas(0,0,excelWidth,excelHeight,drawDom,forceUpdate)
    }else if(isTop){
      this.clearCanvas(0,cellHeight*scale,excelWidth,excelHeight,drawDom,forceUpdate)
    }else if(isLeft){
      this.clearCanvas(cellHeight*scale,0,excelWidth,excelHeight,drawDom,forceUpdate)
    }

    // 绘制左上角的cell
    if(isInit || forceUpdate){
      this.drawTotalRect()
      drawDom && dfDom.append(this.totalCell.ctRowDom(0,0,100))
    }

    // 绘制行
    if(isTop || isInit || forceUpdate){
      for(let i=topRow;i<=bottomRow;i++){
        const rowCell = this.rowMap.get('row'+i)
        rowCell.drawHeaderRowRect(cellHeight*scale - top,this.setSelDirBgColor(i,'row'))
        drawDom && dfDom.append(rowCell.ctRowDom(0,cellHeight*scale - top,100))
      }
    }

    // 绘制列
    if(isLeft || isInit || forceUpdate){
      for(let j=leftCol;j<=rightCol;j++){
        const headerCell = this.colMap.get('col'+j)
        headerCell.drawHeaderColRect(cellHeight*scale - left,this.setSelDirBgColor(j,'col'))
        drawDom && dfDom.append(headerCell.ctDom(cellHeight*scale - left,0,100))
      }
    }

    // 绘制选中
    this.drawSelCell(cellHeight*scale - left,cellHeight*scale - top)

    for(let i=topRow;i<=bottomRow;i++){
      for(let j=leftCol;j<=rightCol;j++){
        const headerName = getExcelHeaderName(j)
        const contCell = this.contMap.get(headerName+i)
        contCell.drawContRect(cellHeight*scale - left,cellHeight*scale - top)
        drawDom && dfDom.append(contCell.ctDom(cellHeight*scale - left,cellHeight*scale - top,100))
      }
    }

    // 绘制选中背景
    this.setSelBgColor(cellHeight*scale - left,cellHeight*scale - top)

    drawDom && eventDom.append(dfDom)

    this.scrollLeft = left
    this.scrollTop = top
  }

  drawX(left:number,drawDom:boolean = true,forceUpdate:boolean = false){
    this.draw(left,this.scrollTop,drawDom,forceUpdate)
  }

  drawY(top:number,drawDom:boolean = true,forceUpdate:boolean = false){
    this.draw(this.scrollLeft,top,drawDom,forceUpdate)
  }

  forceUpdateAll(){
    this.draw(this.scrollLeft,this.scrollTop,true,true)
  }

  forceUpdateRect(){
    this.draw(this.scrollLeft,this.scrollTop,false,true)
  }

  clearCanvas(startX:number,startY:number,endX:number,endY:number,drawDom:boolean = true,forceUpdate:boolean = false){
    store.canvas.ctx.clearRect(startX,startY,endX,endY)
    const { eventDom } = store.canvas;
    if(drawDom && forceUpdate){
      eventDom.children().each((_,item)=>{
        if(startX > 0){
          const tempDom = u(item)
          const label = tempDom.data('label') as string
          if(label.includes('row') || (forceUpdate && label.includes('total'))){
  
          }else{
            tempDom.remove()
          }
        }
  
        if(startY > 0){
          const tempDom = u(item)
          const label = tempDom.data('label') as string
          if(label.includes('col') || (forceUpdate && label.includes('total'))){
  
          }else{
            tempDom.remove()
          }
        }
      })
    }
    
  }

  searchCol(dis:number,grat:boolean):number{

    let { cellWidth,col,scale } = store.config
    cellWidth *= scale
    // console.log('dis',dis)
    const floor = grat?Math.ceil:Math.floor;
    let tempCol = floor(dis/cellWidth)
    // console.log('tempLN',tempCol,floor(dis/this.cellWidth))
    // console.log('tempL',tempLabel)
    if(tempCol < 1){
      // 在最左侧
      return 1
    }else{
      let cell:Cell = this.colMap.get('col'+tempCol)
      // console.log('cell.x',cell,(tempLabel+1),grat,tempCol)
      if(grat){
        while(cell && cell.xScale < dis) {
          tempCol++
          cell = this.colMap.get('col'+tempCol)
        }
      }else{
        while(cell && cell.xScale > dis) {
          tempCol--
          cell = this.colMap.get('col'+tempCol)
        }
      }
     
      return cell?cell.col:col
    }
  }

  searchRow(dis:number,grat:boolean):number{

    let { cellHeight,row,scale } = store.config
    cellHeight *= scale
    const floor = grat?Math.ceil:Math.floor;
    let tempRow = floor(dis/cellHeight)
    // console.log('tempRow',tempRow)
    // console.log('dis',dis)
    if(tempRow<1){
      return 1
    }else{
      let cell:Cell = this.rowMap.get('row'+tempRow)
      if(grat){
        while(cell && (cell.yScale+cell.heightScale) < dis) {
          tempRow++
          cell = this.rowMap.get('row'+tempRow)
        }
      }else{
        while(cell && cell.yScale > dis) {
          tempRow--
          cell = this.rowMap.get('row'+tempRow)
        }
      }

      return cell?cell.row:row
    }
  }

  // 获取展示内容的四个角
  getBoundMap(left:number,top:number):Array<number>{

    const { cellHeight,scale } = store.config

    const ld = left;
    const rd = left+ store.canvas.dom.width() - cellHeight*scale

    const td = top
    const bd = top + store.canvas.dom.height() - cellHeight*scale

    const leftCol = this.searchCol(ld,false)
    const rightCol = this.searchCol(rd,true)

    const topRow = this.searchRow(td,false)
    const bottomRow = this.searchRow(bd,true)
    return [
      leftCol,
      rightCol,
      topRow,
      bottomRow
    ]
  }

  // 判断多选中，选中cell显示的颜色
  setSelBgColor(left:number,top:number){
    this.selCells.forEach((item,i)=>{
      if(i>0){
        store.canvas.ctx.drawFillRect({
          x: item.xScale+left,
          y: item.yScale+top,
          width: item.widthScale,
          height: item.heightScale,
          color:store.config.selectedBgColor,
          globalCompositeOperation:'destination-over',
        })
      }
    })
  }

  // 判断选中时，最外侧边界的显示状态
  setSelDirBgColor(num:number,dir:string):string{
    if(this.selCells.length === 0){
      return undefined
    }
    const firstCell = this.selCells[0]
    const lastCell = this.selCells[this.selCells.length - 1]
    let firstNum = 0
    let lastNum = 0
    if(firstCell[dir] - lastCell[dir] < 0){
      firstNum = firstCell[dir]
      lastNum = lastCell[dir]
    }else{
      firstNum = lastCell[dir]
      lastNum = firstCell[dir]
    }
    if(num >= firstNum && num <= lastNum){
      // console.log('firstNum',firstNum)
      // console.log('lastNum',lastNum)
      // console.log('num',num)
      // console.log('this.selCells',this.selCells)
      return store.config.selectedBgColor
    }
    return undefined
  }

  // 搜索目标label是否在当前选中的cell中
  isInSelCellsBylabel(label:string){
    return this.selCells.some((item)=>{
      return item.label === label
    })
  }

  name: string;
  lock: Boolean;
}