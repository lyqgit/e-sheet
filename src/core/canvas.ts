import type { Cash } from 'cash-dom'
import { ICanvas,IDot,IFillRectOption,IStrokeRectOption, ITextRectOption } from '@/types'
import store from '@/store';

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
  drawText(option:ITextRectOption): void {
    const { ctx } = this
    const { fontWeight,fontItalic,fontFamily,fontSize,rectHeight,rectWidth,x,y,text,textBaseline,textAlign } = option
    ctx.font = `${fontWeight??500+' '}${fontItalic??'normal'+' '}${fontSize??12}px ${fontFamily??'serif'}`
    ctx.fillStyle= option.fontColor??"black";
    const baseX = x+rectWidth/2
    const baseY = y+rectHeight/2

    ctx.textBaseline = textBaseline?textBaseline:"middle";
    ctx.textAlign = textAlign?textAlign:"center";

    const textObj = ctx.measureText(text);

    let tempText = ''

    if(textObj.width > rectWidth){
        const txtNum = parseInt((rectWidth/fontSize).toFixed(0))-1
        tempText = text.slice(0,txtNum-1)+'...'
    }else{
        tempText = text
    }

    let alignX = 0
    let alignY = 0

    if(textAlign === 'left'){
        alignX = x
    }else if(textAlign === 'right'){
        alignX = x+rectWidth
    }else{
        alignX = baseX
    }

    if(textBaseline === 'top'){
        alignY = y+2
    }else if(textBaseline === 'bottom'){
        alignY = y+rectHeight-2
    }else{
        alignY = baseY
    }

    ctx.fillText(tempText,alignX,alignY,rectWidth)
  }
  drawThroughLine(): void {
    throw new Error('Method not implemented.');
  }
  clearRect(startX:number,startY:number,endX:number,endY:number): void {
    this.ctx.clearRect(startX,startY,endX,endY)
  }
  drawStrokeRect(option:IStrokeRectOption): void {
    const { ctx } = this
    ctx.lineWidth = option.lineWidth??1
    ctx.globalCompositeOperation = option.globalCompositeOperation??'source-over'
    ctx.strokeStyle = option.color??'blue'
    ctx.strokeRect(option.x,option.y,option.width,option.height)
  }
  drawFillRect(option:IFillRectOption): void {
    const { ctx } = this
    ctx.fillStyle = option.color??store.config.borderCellBgColor
    ctx.globalCompositeOperation = option.globalCompositeOperation??'source-over'
    ctx.fillRect(option.x,option.y,option.width,option.height)
  }
  drawDashStrokeRect(): void {
    throw new Error('Method not implemented.');
  }
  drawTriangleRect(first:IDot,second:IDot,thrid:IDot,color:string){
    const { ctx } = this
    ctx.beginPath();
    ctx.moveTo(first.x,first.y)
    ctx.lineTo(second.x,second.y)
    ctx.lineTo(thrid.x,thrid.y)
    ctx.closePath();
    ctx.fillStyle = color??'black';
    ctx.fill()
  }

}