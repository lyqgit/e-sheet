import './css/index.scss'
import AppExcel from './core/index.js'
import WholeComponent from './component/whole/index.js'
import HeaderComponent from './component/header/index.js'
import SideComponent from './component/side/index.js'
import ContentComponent from './component/content/index.js'
import ScrollPlugin from './plugins/scroll/index.js'
import InputPlugin from './plugins/input/index.js'
import SelectPlugin from './plugins/select/index.js'
import DragPlugin from './plugins/drag/index.js'
import ContextmenuPlugin from './plugins/contextmenu/index.js'
import SettingPlugin from './plugins/setting/index.js'
import BookPlugin from './plugins/book/index.js'
import WebsocketPlugin from './plugins/websocket/index.js'
import './vendor/component/index.js'

export default class eSheet{

    /**
     * @type {HTMLElement}
     */
    excelDom = null

    /**
     * @type {AppExcel}
     */
    AppExcel = null

    constructor(selector,options={},plugins=[]) {
        if(Object.prototype.toString.call(selector) === '[object HTMLDivElement]'){
            this.excelDom = selector;
        }else{
            this.excelDom = document.querySelector(selector)
        }

        if(!this.excelDom){
            throw new Error('the selector is error')
        }
        this.excelDom.style.position = 'relative'
        // this.excelDom.style.overflow = 'hidden'
        // console.log('selector',selector)
        options = {init:true,width:1200,height:800,...options}
        return this.init(options,plugins)

    }

    init(options={},plugins=[]){
        this.AppExcel = new AppExcel(
            this.excelDom,
            options,
            {ContentComponent,HeaderComponent,SideComponent,WholeComponent},
            {SettingPlugin,ScrollPlugin,InputPlugin,DragPlugin,SelectPlugin,ContextmenuPlugin,BookPlugin,WebsocketPlugin,...plugins}
        )
        return this.AppExcel
    }

    installXlsxData(oriData){
        this.AppExcel.installXlsxData(oriData)
    }
}
