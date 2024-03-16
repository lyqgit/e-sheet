import base64Img from '../image/base64Img.js'
import setting from "../plugins/setting/index.js";

/**
 * @typedef {Object} Canvas
 * @typedef {(string | CanvasGradient | CanvasPattern)} Color
 */
export default class Canvas{

    /**
     * @type {HTMLElement}
     */
    canvasDom= null

    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx = null

    /**
     * @type {number}
     */
    cellWidth = 0

    /**
     * @type {number}
     */
    cellHeight = 0

    /**
     * @param {HTMLCanvasElement} canvasDom
     * @param {Object} options
     * @param {Object} core
     */
    constructor(canvasDom,options={},core) {
        this.ctx = canvasDom.getContext('2d')
        this.cellWidth = options.cellWidth
        this.cellHeight = options.cellHeight
        this.canvasDom = canvasDom
        this.core = core

        canvasDom.addEventListener('mousemove',_=>{
            // console.log('evt',evt)
            this.setCursor('cell')
        })
    }


    setCursor(shape){
        this.canvasDom.style.cursor = `url(${base64Img[shape]}) 18 18, ${shape}`;
    }

    setCursorDefault(){
        this.canvasDom.style.cursor = 'default';
    }

    /**
     * @param {Array<number>} points
     * @param {string} globalCompositeOperation
     * @param {string} color
     */
    drawLine(points,globalCompositeOperation= 'source-over',color){
        this.ctx.strokeStyle = color??'black'
        this.ctx.lineWidth = 1
        this.ctx.globalCompositeOperation = globalCompositeOperation //'destination-over'
        this.ctx.beginPath();
        if(points.length%2 !== 0){
            throw new Error('points is error')
        }

        const drawNum = points.length/2

        this.ctx.moveTo(points[0],points[1])

        for(let i = 2;i<drawNum+1;i+=2){
            this.ctx.lineTo(points[i],points[i+1])
        }

        this.ctx.closePath();
        this.ctx.stroke();

    }

    /**
     * @description 绘制图片
     * @param {Number} x
     * @param {Number} y
     * @param {Array} img
     * @param {Number} col
     * @param {Number} row
     * @param {Boolean} isMerge
     * @param {Function} thenDraw
     */
    drawImage(x,y,img,row,col,isMerge,thenDraw){
        img.forEach((item)=>{
            this.ctx.globalCompositeOperation = 'destination-over'
            this.ctx.drawImage(item.imgEl,x,y,item.imgEl.width,item.imgEl.height)
        })
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {number} rectWidth
     * @param {number} rectHeight
     * @param {GlobalCompositeOperation | string} globalCompositeOperation
     * @param {Color} color
     * @param {string} textAlign
     * @param {object} font
     * @param {string} textBaseline
     * @param {string} strikethrough
     * @param {string} underline
     * @param {string} textWrapType
     */
    drawText(x,y,text='',rectWidth,rectHeight,globalCompositeOperation,color,textAlign='center',font,textBaseline,strikethrough='',underline='',textWrapType = 'cut'){

        if(text.length === 0){
            return;
        }

        const { ctx,cellWidth,cellHeight } = this
        ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        rectWidth = rectWidth??cellWidth
        rectHeight = rectHeight??cellHeight
        font.fontSize = font.fontSize?parseInt(font.fontSize):12
        ctx.font = font?`${font.fontWeight+' '}${font.fontItalic+' '}${font.fontSize}px ${font.fontFamily}`:'12px Calibre'
        ctx.fillStyle= color?color:"black";

        if(textWrapType === 'wrap'){
            ctx.textBaseline = "top";
            ctx.textAlign = "start";
            const txtArr = text.split('\n')
            txtArr.forEach((item,index)=>{
                ctx.fillText(item,x+2,y+2+index*font.fontSize)
                const lineWidth = ctx.measureText(item).width;
                if(strikethrough === 'true'){
                    const fontSizeHalf = font.fontSize/2
                    // console.log('画穿过线',item,x,y,y+index*font.fontSize+fontSizeHalf,x+lineWidth+2)
                    this.drawThroughLine(x,y+index*font.fontSize+fontSizeHalf,x+lineWidth+2,y+index*font.fontSize+fontSizeHalf)
                }
                if(underline === 'true'){
                    this.drawThroughLine(x,y+(index+1)*font.fontSize,x+lineWidth+2,y+(index+1)*font.fontSize)
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
            const txtNum = (rectWidth/font.fontSize).toFixed(0)-1
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

        if(strikethrough === 'true'&&text){
            const strikeObj = ctx.measureText(tempText)
            if(textAlign === 'right' && textBaseline==='middle'){
                this.drawThroughLine(alignX-strikeObj.width,alignY,alignX,alignY)
            }if(textAlign === 'left' && textBaseline==='middle'){
                this.drawThroughLine(alignX,alignY,alignX+strikeObj.width,alignY)
            }if(textAlign === 'center' && textBaseline==='top'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY+font.fontSize/2,alignX+(strikeObj.width/2),alignY+font.fontSize/2)
            }if(textAlign === 'center' && textBaseline==='bottom'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY-font.fontSize/2,alignX+(strikeObj.width/2),alignY-font.fontSize/2)
            }if(textAlign === 'right' && textBaseline==='bottom'){
                this.drawThroughLine(alignX-strikeObj.width,alignY-font.fontSize/2,alignX,alignY-font.fontSize/2)
            }if(textAlign === 'right' && textBaseline==='top'){
                this.drawThroughLine(alignX-strikeObj.width,alignY+font.fontSize/2,alignX,alignY+font.fontSize/2)
            }if(textAlign === 'left' && textBaseline==='bottom'){
                this.drawThroughLine(alignX,alignY-font.fontSize/2,alignX+strikeObj.width,alignY-font.fontSize/2)
            }if(textAlign === 'left' && textBaseline==='top'){
                this.drawThroughLine(alignX,alignY+font.fontSize/2,alignX+strikeObj.width,alignY+font.fontSize/2)
            }else if(textAlign === 'center' && textBaseline==='middle'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY,alignX+(strikeObj.width/2),alignY)
            }
        }

        if(underline === 'true'&&text){
            const strikeObj = ctx.measureText(tempText)
            if(textAlign === 'right' && textBaseline==='middle'){
                this.drawThroughLine(alignX-strikeObj.width,alignY+font.fontSize/2,alignX,alignY+font.fontSize/2)
            }if(textAlign === 'left' && textBaseline==='middle'){
                this.drawThroughLine(alignX,alignY+font.fontSize/2,alignX+strikeObj.width,alignY+font.fontSize/2)
            }if(textAlign === 'center' && textBaseline==='top'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY+font.fontSize,alignX+(strikeObj.width/2),alignY+font.fontSize)
            }if(textAlign === 'center' && textBaseline==='bottom'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY,alignX+(strikeObj.width/2),alignY)
            }if(textAlign === 'right' && textBaseline==='bottom'){
                this.drawThroughLine(alignX-strikeObj.width,alignY,alignX,alignY)
            }if(textAlign === 'right' && textBaseline==='top'){
                this.drawThroughLine(alignX-strikeObj.width,alignY+font.fontSize,alignX,alignY+font.fontSize)
            }if(textAlign === 'left' && textBaseline==='bottom'){
                this.drawThroughLine(alignX,alignY,alignX+strikeObj.width,alignY)
            }if(textAlign === 'left' && textBaseline==='top'){
                this.drawThroughLine(alignX,alignY+font.fontSize,alignX+strikeObj.width,alignY+font.fontSize)
            }else if(textAlign === 'center' && textBaseline==='middle'){
                this.drawThroughLine(alignX-(strikeObj.width/2),alignY+font.fontSize/2,alignX+(strikeObj.width/2),alignY+font.fontSize/2)
            }
        }
    }

    /**
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     */
    drawThroughLine(startX,startY,endX,endY){
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 1
        this.ctx.beginPath();
        this.ctx.moveTo(startX,startY)
        this.ctx.lineTo(endX,endY)
        this.ctx.closePath();
        this.ctx.stroke();
    }

    /**
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     */
    clearRect(startX,startY,endX,endY){
        this.ctx.clearRect(startX,startY,endX,endY)
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Color} color
     * @param {string} globalCompositeOperation
     * @param {number} lineWidth
     */
    drawStrokeRect(x,y,width,height,color,globalCompositeOperation,lineWidth = 1){
        this.ctx.lineWidth = lineWidth
        this.ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        this.ctx.strokeStyle = color??'black'
        this.ctx.strokeRect(x,y,width,height)
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Color} color
     * @param {string} globalCompositeOperation
     */
    drawFillRect(x,y,width,height,color,globalCompositeOperation){
        this.ctx.fillStyle = color??'black'
        this.ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        this.ctx.fillRect(x,y,width,height)
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Color} color
     * @param {string} globalCompositeOperation
     * @param {number} lineWidth
     */
    drawDashStrokeRect(x,y,width,height,color,globalCompositeOperation,lineWidth = 1){
        this.ctx.lineWidth = lineWidth
        this.ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        this.ctx.strokeStyle = color??'black'
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(x,y,width,height)
        this.ctx.setLineDash([])
    }

    /**
     * @param {Object} first
     * @param {Object} second
     * @param {Object} thrid
     * @param {Color} color
     */
    drawTriangleRect(first,second,thrid,color){
        this.ctx.beginPath();
        this.ctx.moveTo(first.x,first.y)
        this.ctx.lineTo(second.x,second.y)
        this.ctx.lineTo(thrid.x,thrid.y)
        this.ctx.closePath();
        this.ctx.fillStyle = color??'black';
        this.ctx.fill()
    }

}