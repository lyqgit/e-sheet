import type { Cash } from 'cash-dom'

export class Canvas {
  ctx:CanvasRenderingContext2D;
  constructor(canvasDom:Cash){
    this.ctx = (canvasDom[0] as HTMLCanvasElement).getContext('2d')
    
  }
}