
export default class ScrollPlugin{

    clientHorX = 0
    clientVerY = 0
    recordDeltaY = 0
    barTopDis = 0
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
        }
    }


    customMove(x=0,y=0){
        this.offsetX += x
        this.leftDis -= x
        this.offsetY += y
        this.topDis -= y
        this.contentMoveX()
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
    registryWheel(barDom,proportion){
        this.selectorDom.onmouseover = ()=>{

            this.selectorDom.onwheel = event=>{
                event.preventDefault();
                this.recordDeltaY = Math.abs(this.barTopDis)
                this.recordDeltaY += event.deltaY>0?this.wheelStep:-this.wheelStep

                // console.log('event.deltaY',event.deltaY)
                // console.log('recordDeltaY',this.recordDeltaY)

                requestAnimationFrame(()=>{
                    // console.log('eA',eA)
                    const topDis = this.recordDeltaY
                    // console.log('leftDis',leftDis)
                    this.verMoveFunc(null,null,proportion,this.recordDeltaY)

                    // const topBound = 0
                    //
                    // const bottomBound = (this.options.height - this.options.cellHeight - 10 - (this.options.height - this.options.cellHeight)*proportion)
                    //
                    //
                    // // bound
                    // if(topDis <= topBound){
                    //     // barDom.style.top = 0+'px'
                    //     barDom.style.transform = `translateY(0px)`
                    //     this.barTopDis = 0
                    //     this.topDis = topBound
                    //     this.core.isScrollBottomBound = false
                    // }else if(topDis >= bottomBound){
                    //     // barDom.style.top = bottomBound+'px'
                    //     barDom.style.transform = `translateY(${bottomBound+'px'})`
                    //     this.barTopDis = bottomBound
                    //     this.topDis = -(this.options.cellHeight*this.options.row-(this.options.height - this.options.cellHeight))
                    //     this.core.isScrollBottomBound = true
                    // }else{
                    //     // barDom.style.top = topDis+'px'
                    //     barDom.style.transform = `translateY(${topDis+'px'})`
                    //     this.barTopDis = topDis
                    //     this.topDis =-topDis/proportion
                    //     this.core.offsetYLock = false
                    //     this.core.isScrollBottomBound = false
                    // }
                    // if(this.core.offsetYLock) {
                    //     // console.log('临界点',this.topDis)
                    //     return
                    // }
                    // this.offsetY = Math.abs(this.topDis)
                    // this.contentMoveY()
                    // // bound
                    // if(topDis <= topBound){
                    //     this.core.offsetYLock = true
                    // }else if(topDis >= bottomBound){
                    //     this.core.offsetYLock = true
                    // }
                })
            }
        }
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
        this.selectorDom.appendChild(barContainerDom)
        this.barHorContainerDom = barContainerDom
        // bor-bar
        const barDom = document.createElement('div')
        this.horBarDom = barDom
        const proportion = (this.options.width - this.options.cellHeight - 10)/(this.options.cellWidth*this.options.col)

        barDom.style.width = (this.options.width - this.options.cellHeight-10)*proportion+'px'
        barDom.style.height = this.barHeight+'px'
        // barDom.style.position = 'absolute'
        // barDom.style.left = 0
        // barDom.style.top = 0
        barDom.style.transformOrigin = 'left'
        barDom.style.userSelect = 'none'
        barDom.style.borderRadius = this.barHeight+'px'
        barDom.style.backgroundColor = 'rgb(201, 201, 201)'

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

            if(!this.clientHorX){
                this.clientHorX = e.pageX - e.offsetX
            }
            document.onmousemove = eA=>{
                barDom.style.backgroundColor = 'rgb(150, 150, 150)'
                // console.log('eA',eA)
                requestAnimationFrame(()=>{
                    const leftDis = eA.pageX - this.clientHorX-e.offsetX


                    const leftBound = 0

                    const rightBound = (this.options.width - this.options.cellHeight - 10 - (this.options.width - this.options.cellHeight)*proportion)

                    // bound
                    if(leftDis <= leftBound){
                        // barDom.style.left = 0+'px'
                        barDom.style.transform = `translateX(0px)`
                        this.leftDis = leftBound
                        this.core.isScrollRightBound = false
                    }else if(leftDis >= rightBound){
                        // barDom.style.left = rightBound+'px'
                        barDom.style.transform = `translateX(${rightBound+'px'})`
                        this.leftDis = -(this.core.sheetWidth-(this.options.width - this.options.cellHeight))
                        this.core.isScrollRightBound = true
                    }else{
                        // barDom.style.left = leftDis+'px'
                        barDom.style.transform = `translateX(${leftDis+'px'})`
                        this.leftDis = -leftDis/proportion
                        this.core.offsetXLock = false
                        this.core.isScrollRightBound = false
                    }

                    if(this.core.offsetXLock) {
                        // console.log('临界点',this.topDis)
                        return
                    }

                    this.offsetX = Math.abs(this.leftDis)
                    // console.log('leftDis',leftDis)
                    // console.log('offsetX',this.leftDis)
                    this.contentMoveX()
// bound
                    if(leftDis <= leftBound){
                        this.core.offsetXLock = true
                    }else if(leftDis >= rightBound){
                        this.core.offsetXLock = true
                    }
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
        this.selectorDom.appendChild(barContainerDom)
        this.barVerContainerDom = barContainerDom
        // bor-bar
        const barDom = document.createElement('div')
        this.verBarDom = barDom
        const proportion = (this.options.height - this.options.cellHeight - 10)/(this.options.cellHeight*this.options.row)

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

        this.registryWheel(barDom,proportion)

        barDom.onmousedown = e=>{
            e.preventDefault()

            document.onmousemove = eA=>{

                barDom.style.backgroundColor = 'rgb(150, 150, 150)'
                requestAnimationFrame(()=>{
                    // console.log('eA',eA)
                    // console.log('leftDis',leftDis)
                    this.verMoveFunc(eA,e,proportion)

                })

            }
        }

    }

    verMoveFunc(eA,e,proportion,wheelTopDis = null){

        const topDis = wheelTopDis??(eA.pageY - (this.selectorDom.offsetTop + this.options.cellHeight) - e.offsetY)

        const topBound = 0

        const bottomBound = (this.options.height - this.options.cellHeight - 10 - (this.options.height - this.options.cellHeight)*proportion)


        // console.log('this.core.offsetYLock',this.core.offsetYLock)
        if(topDis <= topBound){
            // barDom.style.top = 0+'px'
            this.barVerContainerDom.style.transform = `translateY(0px)`
            this.barTopDis = 0
            this.topDis = topBound
            this.core.isScrollBottomBound = false
        }else if(topDis >= bottomBound){
            // barDom.style.top = bottomBound+'px'
            this.barVerContainerDom.style.transform = `translateY(${bottomBound+'px'})`
            this.barTopDis = bottomBound
            this.topDis = -(this.core.sheetHeight -(this.options.height - this.options.cellHeight))
            this.core.isScrollBottomBound = true
            // console.log('topDis',topDis)
            // console.log('this.topDis',this.topDis)
            // console.log('bottomBound',bottomBound)
            // console.log('topDis>=bottomBound',topDis>=bottomBound)
        }else{
            // barDom.style.top = topDis+'px'
            this.barVerContainerDom.style.transform = `translateY(${topDis+'px'})`
            this.barTopDis = topDis
            this.topDis =-topDis/proportion
            this.core.offsetYLock = false
            this.core.isScrollBottomBound = false
        }
        if(this.core.offsetYLock) {
            // console.log('临界点',this.topDis)
            return
        }
        this.offsetY = Math.abs(this.topDis)
        this.contentMoveY()
        // bound
        if(topDis <= topBound){
            this.core.offsetYLock = true
        }else if(topDis >= bottomBound){
            this.core.offsetYLock = true
        }
    }

}