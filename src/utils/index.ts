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