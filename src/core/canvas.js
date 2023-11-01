import base64Img from '../image/base64Img.js'

/**
 * @typedef {Object} Canvas
 * @typedef {(string | CanvasGradient | CanvasPattern)} Color
 */
export default class Canvas{

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
     */
    constructor(canvasDom,options={}) {
        this.ctx = canvasDom.getContext('2d')
        this.cellWidth = options.cellWidth
        this.cellHeight = options.cellHeight
        this.canvasDom = canvasDom

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
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {number} cellWidth
     * @param {number} cellHeight
     * @param {Color} color
     * @param {string} textAlign
     * @param {string} font
     * @param {string} textBaseline
     */
    drawText(x,y,text,rectWidth,rectHeight,globalCompositeOperation,color,textAlign='center',font,textBaseline){
        const { ctx,cellWidth,cellHeight } = this
        ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        rectWidth = rectWidth??cellWidth
        rectHeight = rectHeight??cellHeight

        ctx.font = font?font:'12px Calibri'
        ctx.fillStyle= color?color:"black";
        const baseX = x+rectWidth/2
        const baseY = y+rectHeight/2

        ctx.textBaseline = textBaseline?textBaseline:"middle";
        ctx.textAlign = textAlign?textAlign:"center";

        const textObj = ctx.measureText(text);

        let tempText = ''

        if(textObj.width > rectWidth){
            const txtNum = (rectWidth/12).toFixed(0)-1
            tempText = text.slice(0,txtNum-1)+'...'
        }else{
            tempText = text
        }

        if(textAlign === 'left'){
            ctx.fillText(tempText,x,y)
        }else if(textAlign === 'right'){
            ctx.fillText(tempText,x+rectWidth - textObj.width,y)
        }else{
            ctx.fillText(tempText,baseX,baseY)
        }
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