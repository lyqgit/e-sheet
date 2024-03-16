import Canvas from './canvas.js'
import {transformNumToLabel} from '../util/cell.js'

/**
 * @typedef {Object} AppExcel
 */
export default class AppExcel{

    /**
     * @description cut-截断  wrap-换行
     * @type {string}
     */
    textWrapType = 'cut'

    /**
     * @type {Array}
     */
    mulPersonSelected = []

    /**
     * @type {number}
     */
    userId = (new Date()).valueOf()

    /**
     * @type {string}
     */
    userName = (new Date()).valueOf().toString()

    /**
     * @type {string}
     */
    userColor = this.getRandomColor()

    /**
     * @type {Array}
     */
    stepCallbackArr = []

    /**
     * @type {number}
     */
    scale = 1

    /**
     * @type {WebsocketPlugin}
     */
    ws

    fontSize = 12

    workBook = {}

    eSheetWorkBook = []

    row= 60

    col = 26

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

    /**
     * @type {number}
     */
    currentSheetIndex = 0

    installComponentsObj = {}
    installPluginsObj = {}

    constructor(selectorDom,options={},components={},plugins={}) {

        // 默认设置容器宽和高为600
        // 校验width、height、row、col
        options.width = options.width && !isNaN(options.width) && options.width>0?options.width:this.width;
        options.height = options.height && !isNaN(options.height) && options.height>0?options.height:this.width;
        options.row = options.row && options.row>this.row?options.row:this.row;
        options.col = options.col && options.col>this.col?options.col:this.col;

        // 固有属性
        options.cellWidth = this.cellWidth;
        options.cellHeight = this.cellHeight;

        this.installComponentsObj = components
        this.installPluginsObj = plugins

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

        this.layer = new Canvas(canvasDom,options,this)

        this.options = options
        // console.log('this.options',this.options)

        // 是否默认初始化
        if(options.init){
            // 装载组件
            this.installComponents(components);
            this.installPlugins(plugins);

            this.createNewSheet()
            this.drawCanvas()
            this.freshScrollBar()
            // 默认选中A1
            this.plugins.SettingPlugin.changeFirstSelectedCell('A1');
            this.plugins.SettingPlugin.setTextWrapInHeader('cut')
            this.ws = this.plugins.WebsocketPlugin
        }else{
            // 显示加载动画
            const loadingCupDom = this.h('e-sheet-loading-cup')
            this.selectorDom.appendChild(loadingCupDom)
        }
        // requestAnimationFrame(this.draw);
    }

    /**
     * @description 重置eSheetWorkBook
     */
    resetESheetWorkBook(){
        this.eSheetWorkBook = []
    }

    /**
     * @param {Array} books
     */
    loadData(books){
        this.resetESheetWorkBook()
        if(!books || (Array.isArray(books) && books.length === 0)){
           this.createNewSheet();
           return
        }
        books.forEach(item=>{
            item.sheet.forEach(sheetItem=>{
                sheetItem.img.forEach(itemImg=>{
                    const imgEl = new Image()
                    imgEl.src = itemImg.url;
                    imgEl.onload = ()=>{
                        itemImg.imgEl = imgEl
                    }
                })
            })
            this.eSheetWorkBook.push({
                id:item.id,
                label: item.label,
                sheet:item.sheet,
                clickCell: null,
                stepArr:[],
                stepNum:-1,
                config:{
                    textWrapType:item.config?.textWrapType??'cut'
                }
            })
        })
    }

    /**
     * @param {Array} books
     */
    drawExcel(books){
        this.currentSheetIndex = 0
        this.loadData(books)
        // 装载组件
        if(Object.keys(this.components).length === 0){
            this.installComponents(this.installComponentsObj);
            this.installPlugins(this.installPluginsObj);
        }

        this.drawCanvas()
        this.freshScrollBar()
        // 默认选中A1
        this.plugins.SettingPlugin.changeFirstSelectedCell('A1');
        const currentSheet = this.getCurrentSheet();
        this.plugins.SettingPlugin.setTextWrapInHeader(currentSheet.config.textWrapType)
        if(!this.ws){
            this.ws = this.plugins.WebsocketPlugin
        }
        const eSheetLoadingLayout = this.selectorDom.querySelector('.e-sheet-loading-cup-layout')
        eSheetLoadingLayout && eSheetLoadingLayout.remove()
    }

    drawCanvas(){
        this.currentSheetIndex = 0
        const sheetBook = this.eSheetWorkBook[this.currentSheetIndex]
        this.components.ContentComponent.installContentDataByData(sheetBook.sheet)
        if(sheetBook.clickCell){
            this.components.ContentComponent.showClickRect(sheetBook.clickCell)
        }
        const sheetAttr = this.getSheetAttr()
        this.sheetWidth = sheetAttr.sheetWidth
        this.sheetHeight = sheetAttr.sheetHeight
        this.row = sheetAttr.row
        this.col = sheetAttr.col
        this.components.WholeComponent.draw()
        this.components.HeaderComponent.trendsDraw(0)
        this.components.SideComponent.trendsDraw(0)
        this.components.ContentComponent.trendsDraw(0,0)
        this.plugins.BookPlugin.freshBookSheet()
    }

    /**
     * @description 获取随机颜色
     * @returns {string}
     */
    getRandomColor( ) {
        var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);
        if(rand.length === 6){
            return '#'+rand;
        }else{
            return this.getRandomColor();
        }
    }

    /**
     * @description 操作回调
     * @param {Function} callback
     */
    stepCallbackHandle(callback){
        this.stepCallbackArr.push(callback)
    }

    /**
     * @description 表格操作完成后的其他操作
     */
    afterHandle(){
        this.stepCallbackArr.forEach(itemFn=>{
            this.getType(itemFn) === '[object Function]' && itemFn()
        })
    }

    /**
     * @description 导出sheet数据
     * @returns {Array}
     */
    exportXlsxData(){
        const book = []
        this.eSheetWorkBook.forEach(item=>{

            const mergeGroup = item.sheet.filter(itemA=>itemA.isMerge)

            const merges = mergeGroup.filter(itemA=>itemA.mergeStartLabel === itemA.label).map(itemB=>{

                const endIndex = mergeGroup.findIndex(itemC=>itemC.label === itemB.mergeEndLabel)

                const endRect = mergeGroup[endIndex]

                return {
                    s:{
                        c:itemB.col - 1,
                        r:itemB.row - 1
                    },
                    e:{
                        c:endRect.col - 1,
                        r:endRect.row - 1
                    }
                }
            })

            const hasDataCellGroup = item.sheet.filter(itemA=>!!itemA.text).filter(itemB=>(itemB.isMerge && itemB.label === itemB.mergeStartLabel) || !itemB.isMerge)
            const sheet = {}
            hasDataCellGroup.forEach(itemB=>{
                sheet[itemB.label] = {
                    t:'s',
                    v:itemB.text
                }
            })
            if(hasDataCellGroup.length>1){
                const rowArr = hasDataCellGroup.map(item=>item.row)
                const colArr = hasDataCellGroup.map(item=>item.col)
                const minRow = Math.min(...rowArr)
                const minCol = Math.min(...colArr)
                const maxRow = Math.max(...rowArr)
                const maxCol = Math.max(...colArr)

                const firstLabel = transformNumToLabel(minCol)+minRow
                const endLabel = transformNumToLabel(maxCol)+maxRow

                sheet['!ref'] = firstLabel+':'+endLabel
            }else if(hasDataCellGroup.length === 1){
                sheet['!ref'] = hasDataCellGroup[0].label
            }

            const sheetBook = {
                label:item.label,
                sheet
            };

            if(merges.length > 0){
                sheet['!merges'] = merges
            }

            book.push(sheetBook)

        })

        return book
    }


    /**
     * @param {string} addr
     */
    connectWebSocket(addr){
        this.ws.connect(addr)
    }

    /**
     * @param {string} userName
     */
    setUserName(userName){
        this.userName = userName
    }

    /**
     * @param {number} userId
     */
    setUserId(userId){
        this.userId = userId
    }


    // 切换sheet
    switchSheet(sheetIndex){

        this.saveHandle()

        const currentSheetBook = this.eSheetWorkBook[sheetIndex]
        this.currentSheetIndex = sheetIndex
        this.components.ContentComponent.installContentDataByData(currentSheetBook.sheet)
        if(currentSheetBook.clickCell){
            this.components.ContentComponent.showClickRect(currentSheetBook.clickCell)
            this.plugins.SettingPlugin.setLabelCon(currentSheetBook.clickCell.label)
            this.plugins.SettingPlugin.setCellCon(currentSheetBook.clickCell.text)
        }else{
            const clickCell = this.components.ContentComponent.searchRectByLabel('A1')
            this.components.ContentComponent.showClickRect(clickCell)
            this.plugins.SettingPlugin.setLabelCon(clickCell.label)
            this.plugins.SettingPlugin.setCellCon(clickCell.text)
        }
        this.plugins.SettingPlugin.setTextWrapInHeader(currentSheetBook.config.textWrapType)
        this.fresh()
    }

    saveHandle(){
        this.copyKey = false
        this.copyCellDash = []
        if(this.components.ContentComponent && this.components.ContentComponent.clickCell){
            const preSheetBook = this.eSheetWorkBook[this.currentSheetIndex]
            if(preSheetBook){
                preSheetBook.clickCell = this.components.ContentComponent.clickCell
            }
            this.components.ContentComponent.hideClickRect()
        }
    }

    getCurrentSheet(){
        return this.eSheetWorkBook[this.currentSheetIndex]
    }

    /**
     * @description 通过id查找sheet
     * @param {number} id
     * @returns {Object || null}
     */
    getSheetById(id){
        const index = this.eSheetWorkBook.findIndex(item=>item.id === id)
        if(index !== -1){
            return this.eSheetWorkBook[index]
        }else{
            return null
        }
    }

    createNewSheet(sheetName = 'Sheet'){

        this.saveHandle()

        const { row,col,cellWidth,cellHeight } = this.options

        let colWidth = 0
        let colAbWidth = 0
        let rowHeight = 0
        let rowAbHeight = cellHeight
        this.sheetWidth = 0
        this.sheetHeight = 0

        let currentIndex = 1

        let newSheetName = sheetName+currentIndex

        let sheetIndex = this.eSheetWorkBook.findIndex(item=>item.label === newSheetName)
        while (sheetIndex !== -1){
            currentIndex++;
            newSheetName = sheetName+currentIndex
            sheetIndex = this.eSheetWorkBook.findIndex(item=>item.label === newSheetName)
        }

        this.eSheetWorkBook.push({
            id:(new Date).valueOf(),
            label: newSheetName,
            sheet:[],
            clickCell: null,
            stepArr:[],
            stepNum:-1,
            config:{
                /**
                 * @description cut-截断  wrap-换行
                 * @type {string}
                 */
                textWrapType:'cut'
            }
        })

        this.currentSheetIndex = this.eSheetWorkBook.length - 1

        const sheet = this.eSheetWorkBook[this.eSheetWorkBook.length - 1].sheet
        // const stepArr = this.eSheetWorkBook[this.eSheetWorkBook.length - 1].stepArr

        for(let i=0;i<row;i++){
            colWidth = 0
            colAbWidth = cellHeight
            this.sheetHeight += cellHeight
            for(let j=0;j<col;j++){
                if(i===0){
                    this.sheetWidth += cellWidth
                }

                let label = transformNumToLabel(j+1)+(i+1)

                sheet.push({
                    row:i+1,
                    col:j+1,
                    text:'',
                    textAsNumber:NaN,
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
                    bgColor:'#ffffff',
                    fontColor:'#000000',
                    font:null,
                    fontSize:12,
                    fontWeight:'',
                    fontItalic:'',
                    fontFamily:'Calibre',
                    textAlign:'center',
                    textBaseline:'middle',
                    strikethrough:'',
                    underline:'',
                    img:[],
                    label
                })
                colWidth += cellWidth
                colAbWidth += cellWidth
            }
            rowHeight += cellHeight
            rowAbHeight += cellHeight
        }

        // stepArr.push({
        //     label:'A1',
        //     sheet:JSON.stringify(sheet)
        // })
        this.afterHandle()
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

        const sheetIndex = this.eSheetWorkBook.findIndex(item=>item.label === sheetName)
        let currentIndex = 0

        if(sheetIndex === -1){
            this.eSheetWorkBook.push({
                label: sheetName,
                sheet:[]
            })
            currentIndex = this.eSheetWorkBook.length - 1
        }else{
            currentIndex = sheetIndex
        }

        this.eSheetWorkBook[currentIndex].sheet = []

        for(let i=0;i<row;i++){
            colWidth = 0
            colAbWidth = cellHeight
            this.sheetHeight += cellHeight
            for(let j=0;j<col;j++){
                if(i===0){
                    this.sheetWidth += cellWidth
                }

                let label = transformNumToLabel(j+1)+(i+1)

                this.eSheetWorkBook[currentIndex].sheet.push({
                    row:i+1,
                    col:j+1,
                    text:this.workBook[sheetName]?((this.workBook[sheetName][String.fromCharCode(65 + j)+(i+1)]?.v)??''):'',
                    textAsNumber:NaN,
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
                    bgColor:'#ffffff',
                    fontColor:'#000000',
                    font:null,
                    fontSize:12,
                    fontWeight:'',
                    fontItalic:'',
                    fontFamily:'Calibre',
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
        this.components.ContentComponent.installContentDataByName(Object.keys(oriData)[0])
        this.components.ContentComponent.hideClickRect()
        this.fresh()
    }

    /**
     * @description 装载固有组件
     * @param {Object} components
     */
    installComponents(components){
        for(let component in components){
            this.components[component] = new components[component](this.layer,this.options,this)
        }
    }

    /**
     * @description 装载插件
     * @param {Object} plugins
     */
    installPlugins(plugins){
        for(let plugin in plugins){
            this.plugins[plugin] = new (plugins[plugin])(this.selectorDom,this.layer,this.options,this.components,this)
        }
    }

    /**
     * @description 单元格整体刷新（不包括滚动条）
     */
    fresh(){

        const { offsetX,offsetY } = this.plugins.ScrollPlugin

        const { ContentComponent,HeaderComponent,SideComponent,WholeComponent } = this.components
        ContentComponent.trendsDraw(offsetX,offsetY)
        HeaderComponent.trendsDraw(offsetX)
        SideComponent.trendsDraw(offsetY)
        WholeComponent.draw()
    }

    /**
     * @description 内容刷新
     */
    freshContent(){
        const { offsetX,offsetY } = this.plugins.ScrollPlugin

        const { ContentComponent } = this.components
        ContentComponent.trendsDraw(offsetX,offsetY)
    }

    /**
     * @description 获取sheet属性
     * @returns {Object}
     */
    getSheetAttr(){
        const curSheet = this.getCurrentSheet();
        const col = Math.max(...curSheet.sheet.map(item=>item.col))
        const row = Math.max(...curSheet.sheet.map(item=>item.row))
        let sheetWidth = 0
        let sheetHeight = 0

        curSheet.sheet.forEach(item=>{
            if(item.col <= col && item.row === 1){
                sheetWidth += item.width
            }
            if(item.col === 1){
                sheetHeight += item.height
            }
        })

        return {
            col,
            row,
            sheetWidth,
            sheetHeight
        }
    }

    /**
     * @description 更新滚动条
     */
    freshScrollBar(){
        const curSheetAttr = this.getSheetAttr();
        this.sheetWidth = curSheetAttr.sheetWidth
        this.sheetHeight = curSheetAttr.sheetHeight
        this.plugins.ScrollPlugin.changeHorBarWidth()
        this.plugins.ScrollPlugin.changeVerBarHeight()
    }

    /**
     * @description 获取js具体类型
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