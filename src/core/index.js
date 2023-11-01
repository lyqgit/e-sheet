import Canvas from './canvas.js'
import {transformNumToLabel} from '../util/cell.js'

export default class AppExcel{


    mulPersonSelected = []

    /**
     * @type {WebSocket}
     */
    ws

    userId = (new Date()).valueOf()

    userName = (new Date()).valueOf()

    userColor = this.getRandomColor()

    fontSize = 12

    workBook = {}

    eSheetWorkBook = {
        'Sheet1':[]
    }

    row= 160

    col = 52

    // 以内容表格左上角为原点计算表格的坐标

    cellWidth = 120 // 标准单个框宽度

    cellHeight = 40 // 标准单个框高度

    width= 600

    height = 600

    sheetWidth = 0
    sheetHeight = 0

    selectorDom = null
    canvasDom = null
    canvasWrapperDom = null

    layer = null

    components = {}

    plugins = {}

    copyKey = false
    copyCellDash = []

    shiftKey = false
    ctrlKey = false
    dragSign = false
    lockDrag = false
    dragSignDirectionIsHor = false


    offsetYLock = false
    offsetXLock = false

    isScrollBottomBound = false
    isScrollRightBound = false

    nonSelectBgColor = '#FFFFFF'
    selectedBorderBgColor = '#0089FF'
    selectedBgColor = '#EBF4FF'
    borderColor = '#ECEDEE'
    borderCellBgColor = '#F9FBFD'

    constructor(selectorDom,options={},components={},plugins={}) {

        // 默认设置容器宽和高为600
        options.width = options.width??this.width;
        options.height = options.height??this.width;
        options.row = options.row??this.row;
        options.col = options.col??this.col;

        // 固有属性
        options.cellWidth = this.cellWidth;
        options.cellHeight = this.cellHeight;


        this.selectorDom = selectorDom;


        const canvasDom = document.createElement('canvas');
        canvasDom.width = options.width
        canvasDom.height = options.height

        const canvasWrapperDom = this.h('div',{
            attr:{
                className:'e-sheet-canvas-wrapper'
            }
        })

        canvasWrapperDom.appendChild(canvasDom)

        this.canvasWrapperDom = canvasWrapperDom

        this.selectorDom.style.width = options.width + 'px'
        this.canvasWrapperDom.style.width = options.width + 'px'
        this.canvasWrapperDom.style.height = options.height + 'px'

        this.selectorDom.appendChild(canvasWrapperDom)
        this.canvasDom = canvasDom

        this.layer = new Canvas(canvasDom,options)

        this.options = options
        // console.log('this.options',this.options)

        this.initExcelData()

        // 装载组件
        this.installComponents(components);
        this.installPlugins(plugins);

        // requestAnimationFrame(this.draw);
    }

    /**
     * @param {string} addr
     */
    connectWebSocket(addr){

        this.ws = new WebSocket(addr)

        this.wsOpenCallback()

        this.wsCloseCallback()

        this.wsMsgCallback()

    }

    wsMsgCallback(){
        this.ws.onmessage = evt=>{
            console.log('evt---onmessage',evt)

            const { DragPlugin } = this.plugins
            const { ContentComponent } = this.components

            /**
             * 0.同步数据
             * 1.选中改变
             * 2.单元格内容改变
             * 3.横向距离改变
             * 4.纵向距离改变
             */

            const data = JSON.parse(evt.data)
            if(data.type === 0){
                ContentComponent.contentGroup = data.command
                this.mulPersonSelected.forEach(item=>{
                    item.command = ContentComponent.searchRectByLabel(item.command.label)
                })
            } else if(data.type === 1){
                const index = this.mulPersonSelected.findIndex(item=>item.userId === data.userId)
                data.command = ContentComponent.searchRectByLabel(data.command.label)
                if(index === -1){
                    this.mulPersonSelected.push(data)
                }else{
                    this.mulPersonSelected[index] = data
                }
            }else if(data.type === 2){
                this.components.ContentComponent.changeRectTextByLabel(data.command)
            }else if(data.type === 3){
                const oriRect = ContentComponent.searchRectByLabel(data.command.label)
                DragPlugin.expandWidthNoDrag(data.command.col,data.command.width - oriRect.width)
            }


            this.fresh()
        }
    }

    wsOpenCallback(){
        this.ws.onopen = evt=>{
            console.log('evt---onopen',evt)
        }
    }

    wsCloseCallback(){
        this.ws.onclose = evt=>{
            console.log('evt---onclose',evt)
            this.ws = null
        }
    }

    setUserName(userName){
        this.userName = userName
    }

    wsSend(type,data){
        if(this.ws){
            this.ws.send(JSON.stringify({
                type,
                command:data,
                userId:this.userId,
                userName:this.userName,
                userColor:this.userColor
            }))
        }
    }

    syncData(){
        this.wsSend(0,this.components.ContentComponent.contentGroup)
    }

    getRandomColor( ) {
        var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
        if(rand.length === 6){
            return '#'+rand;
        }else{
            return this.getRandomColor();
        }
    }

    initExcelData(sheetName = 'Sheet1'){

        const { row,col,cellWidth,cellHeight } = this.options

        let colWidth = 0
        let colAbWidth = 0
        let rowHeight = 0
        let rowAbHeight = cellHeight
        this.sheetWidth = 0
        this.sheetHeight = 0

        // this.core.sheetWidth += cellHeight
        // this.core.sheetHeight += cellHeight
        this.eSheetWorkBook[sheetName] = []

        for(let i=0;i<row;i++){
            colWidth = 0
            colAbWidth = cellHeight
            this.sheetHeight += cellHeight
            for(let j=0;j<col;j++){
                if(i===0){
                    this.sheetWidth += cellWidth
                }

                let label = transformNumToLabel(j+1)+(i+1)

                this.eSheetWorkBook[sheetName].push({
                    row:i+1,
                    col:j+1,
                    text:this.workBook[sheetName]?((this.workBook[sheetName][String.fromCharCode(65 + j)+(i+1)]?.v)??''):'',
                    width:cellWidth,
                    height:cellHeight,
                    x:colWidth,
                    y:rowHeight,
                    ltX:colAbWidth,
                    ltY:rowAbHeight,
                    mergeWidth:0,
                    mergeHeight:0,
                    mergeRow:1,
                    mergeCol:1,
                    mergeStartLabel:'',
                    mergeEndLabel:'',
                    mergeLabelGroup:[],
                    isMerge:false,
                    bgColor:null,
                    fontColor:null,
                    font:null,
                    textAlign:'center',
                    textBaseline:'middle',
                    label
                })
                colWidth += cellWidth
                colAbWidth += cellWidth
            }
            rowHeight += cellHeight
            rowAbHeight += cellHeight
        }

    }


    installXlsxData(oriData){

        // console.log('oriData',oriData)

        this.workBook = oriData

        if(Object.keys(oriData).length === 0){
            throw new Error('data is error')
        }

        this.initExcelData(Object.keys(oriData)[0])
        this.components.ContentComponent.installContentData(Object.keys(oriData)[0])
        this.components.ContentComponent.hideClickRect()
        this.fresh()
    }

    // 装载固有组件
    installComponents(components){
        for(let component in components){
            this.components[component] = new components[component](this.layer,this.options,this)
        }
    }

    // 装载插件
    installPlugins(plugins){
        for(let plugin in plugins){
            this.plugins[plugin] = new (plugins[plugin])(this.selectorDom,this.layer,this.options,this.components,this)
        }
    }

    fresh(){

        const { offsetX,offsetY } = this.plugins.ScrollPlugin

        const { ContentComponent,HeaderComponent,SideComponent,WholeComponent } = this.components
        ContentComponent.trendsDraw(offsetX,offsetY)
        HeaderComponent.trendsDraw(offsetX)
        SideComponent.trendsDraw(offsetY)
        WholeComponent.draw()
    }

    freshContent(){
        const { offsetX,offsetY } = this.plugins.ScrollPlugin

        const { ContentComponent } = this.components
        ContentComponent.trendsDraw(offsetX,offsetY)
    }

    freshScrollBar(){
        this.plugins.ScrollPlugin.changeHorBarWidth()
        this.plugins.ScrollPlugin.changeVerBarHeight()
    }

    /**
     * @param {*} obj
     * @returns {string}
     */
    getType=(obj)=>{
        return Object.prototype.toString.call(obj)
    }

    /**
     *
     * @param {string} elName
     * @param {Object} attr
     * @param {Object} style
     * @param {HTMLElement | Array<HTMLElement>} childDom
     * @param {Object} listener
     * @returns {HTMLElement}
     */
    h=(elName,{attr,style,attribute} = {},childDom=null)=>{
        const tempDom = document.createElement(elName)

        for(let i in attr){
            tempDom[i] = attr[i]
        }

        for(let i in attribute){
            tempDom.setAttribute(i,attribute[i])
        }

        for(let i in style){
            tempDom.style[i] = style[i]
        }

        if(childDom){
            const childType = this.getType(childDom)
            if(childType === '[object Array]'){
                childDom.forEach(item=>{
                    tempDom.appendChild(item)
                })
            }else{
                tempDom.appendChild(childDom)
            }
        }

        return tempDom
    }

    fps = 0;
    lastTime = 0;

    draw=()=> {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 在这里进行动画的绘制逻辑

        this.fps = Math.round(1000 / deltaTime);

        console.log('fps',this.fps)

        requestAnimationFrame(this.draw);
    }


}