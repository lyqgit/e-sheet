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
  drawStrokeRect(option:IStrokeRectOption = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 'black',
    globalCompositeOperation: 'source-over',
    lineWidth: 1
  }): void {
    throw new Error('Method not implemented.');
  }
  drawFillRect(): void {
    throw new Error('Method not implemented.');
  }
  drawDashStrokeRect(): void {
    throw new Error('Method not implemented.');
  }
}