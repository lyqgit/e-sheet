import type { Cash } from 'cash-dom'
import { ICanvas,IDot,IStrokeRectOption } from '@/types'

export class Canvas implements ICanvas{
  ctx:CanvasRenderingContext2D;
  constructor(canvasDom:Cash){
    this.ctx = (canvasDom[0] as HTMLCanvasElement).getContext('2d')
  }
  drawLine(): void {
    throw new Error('Method not implemented.');
  }
  drawImage(): void {
    throw new Error('Method not implemented.');
  }
  drawText(): void {
    throw new Error('Method not implemented.');
  }
  drawThroughLine(): void {
    throw new Error('Method not implemented.');
  }
  clearRect(startX:number,startY:number,endX:number,endY:number): void {
    this.ctx.clearRect(startX,startY,endX,endY)
  }
  drawStrokeRect(option:IStrokeRectOption): void {
    this.ctx.lineWidth = option.lineWidth??1
    this.ctx.globalCompositeOperation = option.globalCompositeOperation??'source-over'
    this.ctx.strokeStyle = option.color??'blue'
    this.ctx.strokeRect(option.x,option.y,option.width,option.height)
  }
  drawFillRect(): void {
    throw new Error('Method not implemented.');
  }
  drawDashStrokeRect(): void {
    throw new Error('Method not implemented.');
  }
  drawTriangleRect(first:IDot,second:IDot,thrid:IDot,color:string){
    this.ctx.beginPath();
    this.ctx.moveTo(first.x,first.y)
    this.ctx.lineTo(second.x,second.y)
    this.ctx.lineTo(thrid.x,thrid.y)
    this.ctx.closePath();
    this.ctx.fillStyle = color??'black';
    this.ctx.fill()
}
}