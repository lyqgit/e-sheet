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

export default class eSheet{
    constructor(selector,options={},plugins=[]) {
        if(Object.prototype.toString.call(selector) === '[object HTMLDivElement]'){
            this.excelDom = selector;
        }else{
            this.excelDom = document.querySelector(selector)
        }

        if(!this.excelDom){
            throw new Error('选择器错误')
        }
        this.excelDom.style.position = 'relative'
        this.excelDom.style.overflow = 'hidden'
        // console.log('selector',selector)

        new AppExcel(
            this.excelDom,
            options,
            {ContentComponent,HeaderComponent,SideComponent,WholeComponent},
            {ScrollPlugin,InputPlugin,SelectPlugin,DragPlugin}
        )


        // 装载插件

    }
}

// script引入自动注册到window上
