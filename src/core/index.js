import Canvas from './canvas.js'

export default class AppExcel{

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

    layer = null

    components = {}

    plugins = {}


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
        this.selectorDom.style.width = options.width + 'px'
        this.selectorDom.style.height = options.height + 'px'

        const canvasDom = document.createElement('canvas');
        canvasDom.width = options.width
        canvasDom.height = options.height
        this.selectorDom.appendChild(canvasDom)
        this.canvasDom = canvasDom

        this.layer = new Canvas(canvasDom,options)

        this.options = options
        // console.log('this.options',this.options)

        // 装载组件
        this.installComponents(components);
        this.installPlugins(plugins);



        // requestAnimationFrame(this.draw);
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
        HeaderComponent.trendsDraw(offsetX)
        SideComponent.trendsDraw(offsetY)
        ContentComponent.trendsDraw(offsetX,offsetY)
        WholeComponent.draw()
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