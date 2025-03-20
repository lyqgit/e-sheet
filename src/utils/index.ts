import Base64Image from '@/image'
import { ICell } from '@/types';

export { EventEmitterIns } from './event-emitter'


/**
 * @description 判断输入内容的类型
 * @param obj
 * @param type 
 * @returns 
 */
export function judgeType(obj:any,type:string[]):boolean{
  const typeResult = Object.prototype.toString.call(obj) as String
  const typeStr = typeResult.replace('[object ','').replace(']','')
  return type.includes(typeStr)
}

/**
 * @description 获取Excel表列名称
 * @param colNum 
 * @returns 
 */
export function getExcelHeaderName(colNum:number):string{
  const sb = Array<string>();
  while(colNum !== 0){
    colNum--;
    sb.push(String.fromCharCode(colNum%26+'A'.charCodeAt(0)))
    colNum = Math.floor(colNum/26);
  }
  return sb.reverse().join('')
}

/**
 * @description 表头转数字
 * @param colTitle 
 */
export function transHeaderNameToNum(colTitle:string):number{
  // A的Unicode码是65 这样所有的字母取码后-64即其所代表的数字，然后与其所在位数关联后相加即可
  let len = colTitle.length,
    resNum = 0
  for (let z = 0; z < len; z++) {
    resNum += (colTitle[z].charCodeAt(0) - 64) * (26 ** (len - 1 - z))
  }
  return resNum
}

export function isInDom(container:HTMLElement,target:HTMLElement){
  return container !== target && container.contains(target)
}

/**
 * @description 设置鼠标样式
 * @param {string} shape 
 * @returns 
 */
export function setCursor(shape:string = 'default'){
  if(shape === 'default'){
    return shape
  }else{
    return `url(${Base64Image[shape]}) 18 18, ${shape}`;
  }
}

/**
 * @description 获取页面滚动的高度和宽度
 */
export function getScrollTopAndLeft():Array<number>{
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
  return [scrollTop,scrollLeft]
}

export interface ParamsDoubleLoop {
  initI:number,
  maxI:number,
  initJ:number, 
  maxJ:number,
  callback:(i:number,j:number)=>void
}

/**
 * @description 双循环
 * @param param 
 */
export function doubleLoop(param:ParamsDoubleLoop){
  for(let i=param.initI;i<=param.maxI;i++){
    for(let j=param.initJ;j<=param.maxJ;j++){
      param.callback(i,j)
    }
  }
}

/**
 * @description 双循环
 * @param firstCell
 * @param lastCell
 * @param callback 
 */
export function doubleLoopByCell(firstCell:ICell,lastCell:ICell,callback:(i:number,j:number)=>void){
  doubleLoop({
    initI:firstCell.row,
    maxI:lastCell.row,
    initJ:firstCell.col,
    maxJ:lastCell.col,
    callback
  })
}