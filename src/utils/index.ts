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