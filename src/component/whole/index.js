
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
        this.layer.drawFillRect(0,0,cellHeight,cellHeight,'yellow')
    }

    addEvent(){

    }
}