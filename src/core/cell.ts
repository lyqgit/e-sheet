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
  }

  drawTotalRect(drawDom:boolean = true){

    const { cellHeight } = store.config

    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:0,
      width:cellHeight,
      height:cellHeight,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })

    store.canvas.ctx.drawTriangleRect({x:cellHeight-6,y:6},{x:cellHeight-6,y:cellHeight-6},{x:6,y:cellHeight-6},'#DCDCDC')
    drawDom && this.ctDom(0,0,cellHeight,cellHeight,100)
  }

  ctDom(reX:number,reY:number,width:number,height:number,zIndex?:number){

    const { eventDom } = store.canvas

    const tempRect = u('<div>')
    tempRect.css('position','absolute');
    tempRect.css('left',this.x+reX);
    tempRect.css('top',this.y+reY);
    zIndex && tempRect.css('z-index',zIndex);
    tempRect.data('label',this.label)
    tempRect.css('width',width)
    tempRect.css('height',height)

    eventDom.append(tempRect)
  }

  drawHeaderColStrokeRect(reX:number,drawDom:boolean = true): void {
    store.canvas.ctx.drawStrokeRect({
      x:this.x+reX,
      y:0,
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
    drawDom && this.ctDom(reX,0,this.width,this.height,100)
  }

  drawHeaderRowStrokeRect(reY:number,drawDom:boolean = true): void {
    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:this.y+reY,
      width:this.height,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
    drawDom && this.ctDom(0,reY,this.height,this.height,100)
  }

  drawStrokeRect(reX:number,reY:number,drawDom:boolean = true): void {
    store.canvas.ctx.drawStrokeRect({
      x:this.x+reX,
      y:this.y+reY,
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
    drawDom && this.ctDom(reX,reY,this.width,this.height)
  }
  
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: string;
  fontWeight: string;
  fontItalic: string;
  fontFamily: string;
  textAlign: string;
  textBaseline: string;
  strikethrough: Boolean;
  underline: Boolean;
  label: string;
  img: Img[];

}