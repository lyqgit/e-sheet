import { ICell, ICellOption, Img } from "@/types";
import store from '@/store'

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
  drawDom(reX: number, reY: number): void {
    throw new Error("Method not implemented.");
  }
  drawHeaderColStrokeRect(reX:number): void {
    store.canvas.ctx.drawStrokeRect({
      x:this.x+reX,
      y:0,
      width:this.width,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
  }
  drawHeaderRowStrokeRect(reY:number): void {
    store.canvas.ctx.drawStrokeRect({
      x:0,
      y:this.y+reY,
      width:this.height,
      height:this.height,
      lineWidth:1,
      globalCompositeOperation:'destination-over',
      color:store.config.borderColor
    })
  }
  drawStrokeRect(reX:number,reY:number): void {
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