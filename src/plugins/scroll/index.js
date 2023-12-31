
export default class ScrollPlugin{

    clientHorX = 0
    clientVerY = 0
    recordDeltaY = 0
    barTopDis = 0
    barLeftDis = 0
    wheelStep = 10

    /**
     * @type {HTMLElement}
     */
    selectorDom = null
    barVerContainerDom = null
    barHorContainerDom = null
    layer = null
    options = {}
    components = []

    barHeight = 10

    contentComponent = null
    headerComponent = null
    sideComponent = null

    horBarDom = null
    verBarDom = null
    core = null

    leftDis = 0
    topDis = 0
    offsetX = 0
    offsetY = 0

    constructor(selectorDom,layer,options={},components={},core) {
        this.selectorDom = selectorDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.layer = layer
        this.core = core
        this.options = options
        this.components = components
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.wholeComponent = components.WholeComponent
        this.registryHorScroll()
        this.registryVerScroll()
        document.onmouseup = ()=>{
            document.onmousemove = null
            this.horBarDom.style.backgroundColor = 'rgb(201, 201, 201)'
            this.verBarDom.style.backgroundColor = 'rgb(201, 201, 201)'
            this.core.canvasDom.onmousemove = null
            this.core.dragSign = false
            this.core.lockDrag = false
            // console.log('松开鼠标',this.core.dragSign)
        }
    }

    contentMoveX(){
        this.headerComponent.trendsDraw(this.offsetX)
        this.contentComponent.trendsDraw(this.offsetX,this.offsetY)
        // this.sideComponent.trendsDraw(Math.abs(this.topDis))
        // this.wholeComponent.draw()
    }

    contentMoveY(){
        this.sideComponent.trendsDraw(this.offsetY)
        this.contentComponent.trendsDraw(this.offsetX,this.offsetY)
        // this.headerComponent.trendsDraw(Math.abs(this.leftDis))
        // this.wholeComponent.draw()
    }

    // 竖向鼠标中间滚动条
    registryWheel(barDom){
        this.canvasWrapperDom.onmouseover = ()=>{

            this.canvasWrapperDom.onwheel = event=>{
                event.preventDefault();
                this.recordDeltaY = Math.abs(this.barTopDis)
                this.recordDeltaY += event.deltaY>0?this.wheelStep:-this.wheelStep

                // console.log('event.deltaY',event.deltaY)
                // console.log('recordDeltaY',this.recordDeltaY)

                requestAnimationFrame(()=>{
                    // console.log('eA',eA)
                    const topDis = this.recordDeltaY
                    // console.log('leftDis',leftDis)
                    this.verMoveFunc(topDis)
                })
            }
        }
    }


    unRegistryHorScroll(){
        this.barHorContainerDom.remove()
        this.horBarDom.remove()
    }

    changeHorBarWidth(){
        const proportion = (this.options.width - this.options.cellHeight - 10)/this.core.sheetWidth
        this.horBarDom.style.width = (this.options.width - this.options.cellHeight-10)*proportion+'px'
    }
    changeVerBarHeight(){
        const proportion = (this.options.height - this.options.cellHeight - 10)/this.core.sheetHeight
        this.verBarDom.style.height = (this.options.height - this.options.cellHeight-10)*proportion+'px'
    }

    // 注册横向滚动条
    registryHorScroll(){

        // hor-bar 容器
        const barContainerDom = document.createElement('div')
        barContainerDom.style.height = this.barHeight+'px'
        barContainerDom.style.width = this.options.width - this.options.cellHeight - 10+'px'
        barContainerDom.style.left = this.options.cellHeight+'px'
        barContainerDom.style.bottom = 0
        // barContainerDom.style.background = 'yellow'
        barContainerDom.style.position = 'absolute'
        this.canvasWrapperDom.appendChild(barContainerDom)
        this.barHorContainerDom = barContainerDom
        // bor-bar
        const barDom = document.createElement('div')
        this.horBarDom = barDom
        const proportion = this.core.sheetWidth>this.options.width?((this.options.width - this.options.cellHeight - 10)/this.core.sheetWidth):1

        barDom.style.width = (this.options.width - this.options.cellHeight-10)*proportion+'px'
        barDom.style.height = this.barHeight+'px'
        // barDom.style.position = 'absolute'
        // barDom.style.left = 0
        // barDom.style.top = 0
        barDom.style.transformOrigin = 'left'
        barDom.style.userSelect = 'none'
        barDom.style.borderRadius = this.barHeight+'px'
        barDom.style.backgroundColor = 'rgb(201, 201, 201)'

        barDom.style.transform = `translateX(${this.barLeftDis+'px'})`

        barContainerDom.appendChild(barDom)

        // console.log('proportion',proportion)

        barDom.onmouseover = _=>{
            barDom.style.backgroundColor = 'rgb(150, 150, 150)'
        }

        barDom.onmouseleave = _=>{
            barDom.style.backgroundColor = 'rgb(201, 201, 201)'
        }

        barDom.onmousedown = e=>{
            e.preventDefault()

            document.onmousemove = eA=>{
                barDom.style.backgroundColor = 'rgb(150, 150, 150)'
                // console.log('eA',eA)
                this.layer.setCursorDefault()
                requestAnimationFrame(()=>{
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                    const leftDis = eA.pageX - scrollLeft - (this.canvasWrapperDom.getBoundingClientRect().x + this.options.cellHeight) -e.offsetX
                    this.horMoveFunc(leftDis)
                })

            }

        }



    }


    // 注册纵向滚动条
    registryVerScroll(){
        // hor-bar 容器
        const barContainerDom = document.createElement('div')
        barContainerDom.style.height = this.options.height - this.options.cellHeight - 10+'px'
        barContainerDom.style.width = this.barHeight+'px'
        barContainerDom.style.right = 0
        barContainerDom.style.top = this.options.cellHeight+'px'
        // barContainerDom.style.background = 'yellow'
        barContainerDom.style.position = 'absolute'
        this.canvasWrapperDom.appendChild(barContainerDom)
        this.barVerContainerDom = barContainerDom
        // bor-bar
        const barDom = document.createElement('div')
        this.verBarDom = barDom
        const proportion = this.core.sheetHeight>this.options.height?((this.options.height - this.options.cellHeight - 10)/this.core.sheetHeight):1

        barDom.style.width = this.barHeight+'px'
        barDom.style.height = (this.options.height - this.options.cellHeight - 10)*proportion+'px'
        // barDom.style.position = 'absolute'
        // barDom.style.left = 0
        // barDom.style.top = 0
        barDom.style.transformOrigin = 'top'
        barDom.style.userSelect = 'none'
        barDom.style.backgroundColor = 'rgb(201, 201, 201)'
        barDom.style.borderRadius = this.barHeight+'px'

        barDom.onmouseover = _=>{
            barDom.style.backgroundColor = 'rgb(150, 150, 150)'
        }

        barDom.onmouseleave = _=>{
            barDom.style.backgroundColor = 'rgb(201, 201, 201)'
        }

        barContainerDom.appendChild(barDom)

        // console.log('proportion',proportion)

        this.registryWheel(barDom)

        barDom.onmousedown = e=>{
            e.preventDefault()

            document.onmousemove = eA=>{

                barDom.style.backgroundColor = 'rgb(150, 150, 150)'
                this.layer.setCursorDefault()
                requestAnimationFrame(()=>{
                    // console.log('eA',eA)
                    // console.log('leftDis',leftDis)
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    const topDis = eA.pageY - scrollTop - (this.canvasWrapperDom.getBoundingClientRect().y + this.options.cellHeight) - e.offsetY
                    // console.log('topDis',topDis)
                    this.verMoveFunc(topDis)

                })

            }
        }

    }

    horMoveFunc(leftDis){

        // 关闭输入框
        this.core.plugins.InputPlugin.hideInput()

        const proportion = this.core.sheetWidth>this.options.width?((this.options.width - this.options.cellHeight - 10)/this.core.sheetWidth):1

        const leftBound = 0

        const rightBound = proportion === 1?0:(this.options.width - this.options.cellHeight - 10 - (this.options.width - this.options.cellHeight)*proportion)

        // bound
        if(leftDis <= leftBound){
            // barDom.style.left = 0+'px'
            this.horBarDom.style.transform = `translateX(0px)`
            this.barLeftDis = 0
            this.leftDis = leftBound
            this.core.isScrollRightBound = false
        }else if(leftDis >= rightBound){
            // barDom.style.left = rightBound+'px'
            this.horBarDom.style.transform = `translateX(${rightBound+'px'})`
            this.barLeftDis = rightBound
            this.leftDis = -(this.core.sheetWidth-(this.options.width - this.options.cellHeight))
            this.core.isScrollRightBound = true
        }else{
            // barDom.style.left = leftDis+'px'
            this.horBarDom.style.transform = `translateX(${leftDis+'px'})`
            this.barLeftDis = Math.abs(leftDis)
            // console.log('this.barLeftDis',this.barLeftDis)
            this.leftDis = -leftDis/proportion
            this.core.offsetXLock = false
            this.core.isScrollRightBound = false
        }

        if(this.core.offsetXLock) {
            // console.log('临界点',this.topDis)
            return
        }

        if(proportion !== 1){
            this.offsetX = Math.abs(this.leftDis)
            // console.log('leftDis',leftDis)
            // console.log('offsetX',this.leftDis)
            this.contentMoveX()
        }


        // bound
        if(leftDis <= leftBound){
            this.core.offsetXLock = true
        }else if(leftDis >= rightBound){
            this.core.offsetXLock = true
        }
    }

    verMoveFunc(topDis){

        // 关闭输入框
        this.core.plugins.InputPlugin.hideInput()

        const proportion = this.core.sheetHeight>this.options.height?((this.options.height - this.options.cellHeight - 10)/this.core.sheetHeight):1

        const topBound = 0

        const bottomBound = proportion === 1?0:(this.options.height - this.options.cellHeight - 10 - (this.options.height - this.options.cellHeight)*proportion)


        // console.log('this.core.offsetYLock',this.core.offsetYLock)
        if(topDis <= topBound){
            // barDom.style.top = 0+'px'
            this.verBarDom.style.transform = `translateY(0px)`
            this.barTopDis = 0
            this.topDis = topBound
            this.core.isScrollBottomBound = false
        }else if(topDis >= bottomBound){
            // barDom.style.top = bottomBound+'px'
            this.verBarDom.style.transform = `translateY(${bottomBound+'px'})`
            this.barTopDis = bottomBound
            this.topDis = -(this.core.sheetHeight -(this.options.height - this.options.cellHeight))
            this.core.isScrollBottomBound = true
            // console.log('topDis',topDis)
            // console.log('this.topDis',this.topDis)
            // console.log('bottomBound',bottomBound)
            // console.log('topDis>=bottomBound',topDis>=bottomBound)
        }else{
            // barDom.style.top = topDis+'px'
            this.verBarDom.style.transform = `translateY(${topDis+'px'})`
            this.barTopDis = topDis
            this.topDis =-topDis/proportion
            this.core.offsetYLock = false
            this.core.isScrollBottomBound = false
        }
        if(this.core.offsetYLock) {
            // console.log('临界点',this.topDis)
            return
        }
        if(proportion !== 1){
            this.offsetY = Math.abs(this.topDis)
            this.contentMoveY()
        }

        // bound
        if(topDis <= topBound){
            this.core.offsetYLock = true
        }else if(topDis >= bottomBound){
            this.core.offsetYLock = true
        }
    }

}