
export default class WholeComponent{

    options = {}

    /**
     * @type {Canvas}
     */
    layer = null
    core = null

    constructor(layer,options={},core) {
        this.layer = layer
        this.options = options;
        this.core = core;
        // this.draw();
        // this.addEvent();
    }

    draw(){

        const { borderCellBgColor,borderColor } = this.core
        const { cellHeight } = this.options

        this.layer.clearRect(0,0,cellHeight,cellHeight)
        this.layer.drawTriangleRect(
            {x:cellHeight-6,y:6},{x:cellHeight-6,y:cellHeight-6},{x:6,y:cellHeight-6}
            ,'#DCDCDC')
        this.layer.drawLine([0,0,cellHeight,0],null,borderColor)
        this.layer.drawLine([0,0,0,cellHeight],null,borderColor)
        this.layer.drawFillRect(0,0,cellHeight,cellHeight,borderCellBgColor,'destination-over')
    }

    addEvent(){

    }
}