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
     */
    drawText(x,y,text,rectWidth,rectHeight,globalCompositeOperation){
        const { ctx,cellWidth,cellHeight } = this
        ctx.globalCompositeOperation = globalCompositeOperation??'source-over'
        rectWidth = rectWidth??cellWidth
        rectHeight = rectHeight??cellHeight

        ctx.font = '12px Calibri'
        ctx.fillStyle= "black";
        const baseX = x+rectWidth/2
        const baseY = y+rectHeight/2

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text,baseX,baseY)
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

}