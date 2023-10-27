
export default class WholeComponent{

    options = {}

    /**
     * @type {Canvas}
     */
    layer = null

    constructor(layer,options={}) {
        this.layer = layer
        this.options = options;
        this.draw();
        // this.addEvent();
    }

    draw(){

        const { cellHeight } = this.options

        this.layer.clearRect(0,0,cellHeight,cellHeight)
        this.layer.drawTriangleRect(
            {x:cellHeight-6,y:6},{x:cellHeight-6,y:cellHeight-6},{x:6,y:cellHeight-6}
            ,'#DCDCDC')
        this.layer.drawFillRect(0,0,cellHeight,cellHeight,'#F9FBFD','destination-over')
    }

    addEvent(){

    }
}