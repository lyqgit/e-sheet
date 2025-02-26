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
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawTriangleRect({x:this.height-6,y:6},{x:this.height-6,y:this.height-6},{x:6,y:this.height-6},'#DCDCDC')

    store.canvas.ctx.drawFillRect({
      x:0,
      y:0,
      width:this.width,
      height:this.height,
      globalCompositeOperation:'destination-over',
    })
  }

  ctDom(reX:number,reY:number,zIndex?:number){

    const tempRect = u('<div>')
    tempRect.css('position','absolute');
    tempRect.css('left',this.x+reX);
    tempRect.css('top',this.y+reY);
    zIndex && tempRect.css('z-index',zIndex);
    tempRect.data('label',this.label)
    tempRect.data('row',this.row)
    tempRect.data('col',this.col)
    tempRect.css('width',this.width)
    tempRect.css('height',this.height)

    return tempRect
  }

  drawHeaderColRect(reX:number): void {

    store.canvas.ctx.drawText({
      x:this.x+reX,
      y:0,
      text:this.label,
      rectWidth:this.width,
      rectHeight:this.height,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:this.x+reX,
      y:0,
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawFillRect({
      x:this.x+reX,
      y:0,
      width:this.width,
      height:this.height,
      globalCompositeOperation:'destination-over',
    })

  }

  drawHeaderRowRect(reY:number): void {

    store.canvas.ctx.drawText({
      x:0,
      y:this.y+reY,
      text:this.label,
      rectWidth:this.height,
      rectHeight:this.height,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:this.y+reY,
      width:this.height,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawFillRect({
      x:0,
      y:this.y+reY,
      width:this.height,
      height:this.height,
      globalCompositeOperation:'destination-over',
    })
  }

  drawContRect(reX:number,reY:number): void {

    store.canvas.ctx.drawText({
      x:this.x+reX,
      y:this.y+reY,
      text:this.text,
      rectWidth:this.width,
      rectHeight:this.height,
      globalCompositeOperation:'destination-over',
    })

    store.canvas.ctx.drawStrokeRect({
      x:this.x+reX,
      y:this.y+reY,
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
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