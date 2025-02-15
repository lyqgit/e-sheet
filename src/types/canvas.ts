import type { Cash } from 'cash-dom'

export interface ICanvas{
  ctx:CanvasRenderingContext2D
  drawLine():void
  drawImage():void
  drawText():void
  drawThroughLine():void
  clearRect():void
  drawStrokeRect(option:IStrokeRectOption):void
  drawFillRect():void
  drawDashStrokeRect():void
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
  globalCompositeOperation:GlobalCompositeOperation,
  lineWidth?:number
}