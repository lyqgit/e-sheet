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
export function getExcelHeaderName(colNum):string{
  const sb = Array<string>();
  while(colNum !== 0){
    colNum--;
    sb.push(String.fromCharCode(colNum%26+'A'.charCodeAt(undefined)))
  }
  return sb.reverse().join('')
}