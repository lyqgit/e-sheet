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
    const { fontWeight,fontItalic,fontFamily,fontSize,rectHeight,rectWidth,x,y,text,textBaseline,textAlign,strikethrough,underline,fontColor,textWrapType } = option
    ctx.font = `${fontWeight?fontWeight:300} ${fontItalic?fontItalic:'normal'} ${fontSize?fontSize:12}px ${fontFamily?fontFamily:'serif'}`

    ctx.fillStyle= fontColor?fontColor:"black";

    if(textWrapType === 'wrap'){
      ctx.textBaseline = "top";
      ctx.textAlign = "start";
      const txtArr = text.split('\n')
      txtArr.forEach((item,index)=>{
          ctx.fillText(item,x+2,y+2+index*fontSize)
          const lineWidth = ctx.measureText(item).width;
          if(strikethrough){
              const fontSizeHalf = fontSize/2
              // console.log('画穿过线',item,x,y,y+index*font.fontSize+fontSizeHalf,x+lineWidth+2)
              this.drawThroughLine(x,y+index*fontSize+fontSizeHalf,x+lineWidth+2,y+index*fontSize+fontSizeHalf)
          }
          if(underline){
              this.drawThroughLine(x,y+(index+1)*fontSize,x+lineWidth+2,y+(index+1)*fontSize)
          }
      })
      return
  }



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


    if(strikethrough&& text){
      const strikeObj = ctx.measureText(tempText)
      if(textAlign === 'right' && textBaseline==='middle'){
          this.drawThroughLine(alignX-strikeObj.width,alignY,alignX,alignY)
      }if(textAlign === 'left' && textBaseline==='middle'){
          this.drawThroughLine(alignX,alignY,alignX+strikeObj.width,alignY)
      }if(textAlign === 'center' && textBaseline==='top'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY+fontSize/2,alignX+(strikeObj.width/2),alignY+fontSize/2)
      }if(textAlign === 'center' && textBaseline==='bottom'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY-fontSize/2,alignX+(strikeObj.width/2),alignY-fontSize/2)
      }if(textAlign === 'right' && textBaseline==='bottom'){
          this.drawThroughLine(alignX-strikeObj.width,alignY-fontSize/2,alignX,alignY-fontSize/2)
      }if(textAlign === 'right' && textBaseline==='top'){
          this.drawThroughLine(alignX-strikeObj.width,alignY+fontSize/2,alignX,alignY+fontSize/2)
      }if(textAlign === 'left' && textBaseline==='bottom'){
          this.drawThroughLine(alignX,alignY-fontSize/2,alignX+strikeObj.width,alignY-fontSize/2)
      }if(textAlign === 'left' && textBaseline==='top'){
          this.drawThroughLine(alignX,alignY+fontSize/2,alignX+strikeObj.width,alignY+fontSize/2)
      }else if(textAlign === 'center' && textBaseline==='middle'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY,alignX+(strikeObj.width/2),alignY)
      }
    }

    if(underline&&text){
      const strikeObj = ctx.measureText(tempText)
      if(textAlign === 'right' && textBaseline==='middle'){
          this.drawThroughLine(alignX-strikeObj.width,alignY+fontSize/2,alignX,alignY+fontSize/2)
      }if(textAlign === 'left' && textBaseline==='middle'){
          this.drawThroughLine(alignX,alignY+fontSize/2,alignX+strikeObj.width,alignY+fontSize/2)
      }if(textAlign === 'center' && textBaseline==='top'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY+fontSize,alignX+(strikeObj.width/2),alignY+fontSize)
      }if(textAlign === 'center' && textBaseline==='bottom'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY,alignX+(strikeObj.width/2),alignY)
      }if(textAlign === 'right' && textBaseline==='bottom'){
          this.drawThroughLine(alignX-strikeObj.width,alignY,alignX,alignY)
      }if(textAlign === 'right' && textBaseline==='top'){
          this.drawThroughLine(alignX-strikeObj.width,alignY+fontSize,alignX,alignY+fontSize)
      }if(textAlign === 'left' && textBaseline==='bottom'){
          this.drawThroughLine(alignX,alignY,alignX+strikeObj.width,alignY)
      }if(textAlign === 'left' && textBaseline==='top'){
          this.drawThroughLine(alignX,alignY+fontSize,alignX+strikeObj.width,alignY+fontSize)
      }else if(textAlign === 'center' && textBaseline==='middle'){
          this.drawThroughLine(alignX-(strikeObj.width/2),alignY+fontSize/2,alignX+(strikeObj.width/2),alignY+fontSize/2)
      }
    }

  }
  drawThroughLine(startX:number,startY:number,endX:number,endY:number): void {
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 1
    this.ctx.beginPath();
    this.ctx.moveTo(startX,startY)
    this.ctx.lineTo(endX,endY)
    this.ctx.closePath();
    this.ctx.stroke();
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