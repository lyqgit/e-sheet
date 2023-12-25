
 /**
 * @param {string} elName
 * @param {Object} attr
 * @param {Object} style
 * @param {HTMLElement | Array<HTMLElement>} childDom
 * @param {Object} listener
 * @returns {HTMLElement}
 */
 export const h=(elName,{attr,style,attribute} = {},childDom=null)=>{
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
        const childType = getType(childDom)
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

 /**
  * @param {*} obj
  * @returns {string}
  */
 export const getType=(obj)=>{
     return Object.prototype.toString.call(obj)
 }
