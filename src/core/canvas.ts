import type { Cash } from 'cash-dom'
import { ICanvas,IStrokeRectOption } from '@/types'

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
  clearRect(): void {
    throw new Error('Method not implemented.');
  }
  drawStrokeRect(option:IStrokeRectOption): void {
    console.log('option',option)
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
}