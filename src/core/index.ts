import { Options } from '../type/options'
import type { GlobalSheet,GlobalComponent } from '../type/global'
import { initComponent } from './initComponent'

function eSheet(this: GlobalComponent, options?:Options) {
    if(options){
        if(Array.isArray(options.sheet)){
            this.loadData(options.sheet)
        }else{
            this.loadData([])
        }
    }
}

//@ts-expect-error eSheet has function type
initComponent(eSheet)

export default eSheet as unknown as GlobalSheet