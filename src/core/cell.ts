import { ICell, ICellOption, Img } from "@/types";
import store from '@/store'
import u from 'cash-dom'

export class Cell implements ICell{
  constructor(option:ICellOption){
    this.col = option.col
    this.row = option.row
    this.x = option.x
    this.y = option.y
    this.width = option.width
    this.height = option.height
    this.fontSize = option.fontSize
    this.fontWeight = option.fontWeight
    this.fontItalic = option.fontItalic
    this.fontFamily = option.fontFamily
    this.textAlign = option.textAlign
    this.textBaseline = option.textBaseline
    this.strikethrough = option.strikethrough
    this.underline = option.underline
    this.label = option.label
    this.img = option.img
    this.text = option.text??''
  }
  
  clearRect(startX: number, startY: number, endX: number, endY: number): void {
    store.canvas.ctx.clearRect(startX,startY,endX,endY)
  }
  
  textWrapType?: string;

  drawTotalRect(){
    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:0,
      width:this.widthScale,
      height:this.heightScale,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawTriangleRect(
      {
        x:this.heightScale-this.defaultTri,
        y:this.defaultTri
      },
      {
        x:this.heightScale-this.defaultTri,
        y:this.heightScale-this.defaultTri
      },
      {
        x:6,
        y:this.heightScale-this.defaultTri
      }
    ,'#DCDCDC')

    store.canvas.ctx.drawFillRect({
      x:0,
      y:0,
      width:this.widthScale,
      height:this.heightScale,
      globalCompositeOperation:'destination-over',
    })
  }

  ctBaseDom(reX:number,reY:number,width:number,height:number,zIndex?:number){
    const tempRect = u('<div>')
    tempRect.css('position','absolute');
    tempRect.css('left',this.xScale+reX);
    tempRect.css('top',this.yScale+reY);
    zIndex && tempRect.css('z-index',zIndex);
    tempRect.data('label',this.label)
    tempRect.data('row',this.row)
    tempRect.data('col',this.col)
    tempRect.css('width',width)
    tempRect.css('height',height)

    return tempRect
  }

  ctRowDom(reX:number,reY:number,zIndex?:number){
    return this.ctBaseDom(reX,reY,this.heightScale,this.heightScale,zIndex)
  }

  ctDom(reX:number,reY:number,zIndex?:number){
    return this.ctBaseDom(reX,reY,this.widthScale,this.heightScale,zIndex)
  }

  drawHeaderColRect(reX:number,color?:string): void {

    store.canvas.ctx.drawText({
      x:this.xScale+reX,
      y:0,
      text:this.label,
      rectWidth:this.widthScale,
      rectHeight:this.heightScale,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:this.xScale+reX,
      y:0,
      width:this.widthScale,
      height:this.heightScale,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawFillRect({
      x:this.xScale+reX,
      y:0,
      width:this.widthScale,
      height:this.heightScale,
      globalCompositeOperation:'destination-over',
      color
    })

  }

  drawHeaderRowRect(reY:number,color?:string): void {

    store.canvas.ctx.drawText({
      x:0,
      y:this.yScale+reY,
      text:this.label,
      rectWidth:this.heightScale,
      rectHeight:this.heightScale,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:this.yScale+reY,
      width:this.heightScale,
      height:this.heightScale,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawFillRect({
      x:0,
      y:this.yScale+reY,
      width:this.heightScale,
      height:this.heightScale,
      globalCompositeOperation:'destination-over',
      color
    })
  }

  drawContRect(reX:number,reY:number): void {

    store.canvas.ctx.drawText({
      x:this.xScale+reX,
      y:this.yScale+reY,
      text:this.text,
      rectWidth:this.widthScale,
      rectHeight:this.heightScale,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:this.xScale+reX,
      y:this.yScale+reY,
      width:this.widthScale,
      height:this.heightScale,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
  }

  get xScale():number{
    const { scale } = store.config
    return this.x*scale
  }
  
  get yScale():number{
    const { scale } = store.config
    return this.y*scale
  }

  get widthScale():number{
    const { scale } = store.config
    return this.width*scale
  }
  
  get heightScale():number{
    const { scale } = store.config
    return this.height*scale
  }
  
  get fontSizeScale():number{
    const { scale } = store.config
    return this.fontSize*scale
  }

  get defaultTri():number{
    const { scale } = store.config
    return 6*scale
  }
  
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: string;
  fontItalic: string;
  fontFamily: string;
  textAlign: string;
  textBaseline: string;
  strikethrough: Boolean;
  underline: Boolean;
  label: string;
  text: string;
  img: Img[];

}