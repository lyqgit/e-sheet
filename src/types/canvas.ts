import type { Cash } from 'cash-dom'

export interface IDot{
  x:number
  y:number
}

export interface ICanvas{
  ctx:CanvasRenderingContext2D
  drawLine():void
  drawImage():void
  drawText():void
  drawThroughLine():void
  clearRect(startX:number,startY:number,endX:number,endY:number):void
  drawStrokeRect(option:IStrokeRectOption):void
  drawFillRect(option:IFillRectOption):void
  drawDashStrokeRect():void
  drawTriangleRect(first:IDot,second:IDot,thrid:IDot,color:string):void
}

export interface IGlobalCanvas{
  canvas:ICanvas,
  canvasDom:Cash
}

export interface IStrokeRectOption{
  x:number,
  y:number,
  width:number,
  height:number,
  color?:string,
  globalCompositeOperation?:GlobalCompositeOperation,
  lineWidth?:number
}

export interface IFillRectOption{
  x:number,
  y:number,
  width:number,
  height:number,
  color?:string,
  globalCompositeOperation?:GlobalCompositeOperation,
}