export default class BookPlugin{

    /**
     * @type HTMLElement
     */
    contextmenuDom = null
    /**
     * @type number
     */
    sheetSelectedIndex = 0

    constructor(selectorDom,layer,options={},components={},core) {
        this.contentComponent = components.ContentComponent
        this.headerComponent = components.HeaderComponent
        this.sideComponent = components.SideComponent
        this.selectorDom = selectorDom
        this.canvasDom = core.canvasDom
        this.canvasWrapperDom = core.canvasWrapperDom
        this.options = options
        this.layer = layer
        this.core = core

        this.registryDom()
        this.registryContextmenuDom()
    }


    hideContextMenu=()=>{
        this.contextmenuDom.style.display = 'none'
    }

    registryContextmenuDom(){
        const { h } = this.core
        this.contextmenuDom = h('div',{
            style:{
                display:'none',
            },
            attr:{
                className:'e-sheet-contextmenu-layout'
            }
        },[
            h('div',{
                style:{
                    cursor:'pointer'
                },
                attr:{
                    innerText:'删除',
                    className: 'item-btn',
                    onclick:evt=>{
                        if(this.core.eSheetWorkBook.length === 1){
                            this.hideContextMenu()
                            return
                        }
                        const index = parseInt(evt.target.parentNode.dataset.select)
                        this.core.eSheetWorkBook.splice(index,1)
                        this.core.currentSheetIndex = this.core.eSheetWorkBook.length - 1
                        this.core.switchSheet(this.core.currentSheetIndex)
                        this.sheetArrLayoutDom.removeChild(this.sheetArrLayoutDom.childNodes[index])
                        this.sheetArrLayoutDom.childNodes.forEach(item=>{
                            item.className = 'item-span'
                        })
                        this.sheetArrLayoutDom.childNodes[index-1].className = 'item-span active-item-span'
                        this.hideContextMenu()
                    }
                }
            })
        ])

        this.selectorDom.appendChild(this.contextmenuDom)
    }



    createNewSheet(){
        this.core.createNewSheet()
        this.core.currentSheetIndex = this.core.eSheetWorkBook.length - 1
        const sheetWork = this.core.eSheetWorkBook[this.core.currentSheetIndex]
        this.core.switchSheet(this.core.currentSheetIndex)
        this.sheetArrLayoutDom.childNodes.forEach(item=>{
            item.className = 'item-span'
        })
        this.sheetArrLayoutDom.appendChild(this.core.h('span',{
            attr:{
                innerText:sheetWork.label,
                className:'item-span active-item-span'
            },
            attribute:{
                index:this.core.currentSheetIndex
            }
        }))
    }

    switchSheet(index){
        this.core.switchSheet(index)
        const { currentSheetIndex } = this.core
        this.sheetArrLayoutDom.childNodes.forEach((item,index)=>{
            // console.log('item.className',item.className,'---------',currentSheetIndex,index,currentSheetIndex===index?'item-span active-item-span':'item-span')
            item.className = currentSheetIndex===index?'item-span active-item-span':'item-span'
        })
        // console.log('index',index,currentSheetIndex)
    }

    /**
     * @param {string} index
     * @param {string} label
     * @returns {boolean}
     */
    setSheetName(index,label){
        const labelArr = this.core.eSheetWorkBook.map(item=>item.label)
        if(labelArr.includes(label) || !label){
            return false
        }
        this.core.eSheetWorkBook[index].label = label
        return true
    }

    /**
     * @param {number} scale
     */
    setCanvasScale(scale){

        const { width,height,cellHeight } = this.options

        this.contentComponent.contentGroup.forEach(item=>{
            item.width /= this.core.scale
            item.height /= this.core.scale
            item.x /= this.core.scale
            item.y /= this.core.scale
            item.ltX = cellHeight+item.x
            item.ltY = cellHeight+item.y
            item.mergeWidth /= this.core.scale
            item.mergeHeight /= this.core.scale
            // item.fontSize /= this.core.scale

            item.width *= scale
            item.height *= scale
            item.x *= scale
            item.y *= scale
            item.ltX = scale*cellHeight+item.x
            item.ltY = scale*cellHeight+item.y
            item.mergeWidth *= scale
            item.mergeHeight *= scale
            // item.fontSize *= scale
        })
        this.core.scale = scale

        const lastRect = this.contentComponent.contentGroup[this.contentComponent.contentGroup.length - 1]

        this.core.sheetWidth = lastRect.ltX+lastRect.width
        this.core.sheetHeight = lastRect.ltY+lastRect.height

        this.layer.clearRect(0,0,width,height)
        this.core.fresh()
        this.core.freshScrollBar()
    }

    /**
     * @type {HTMLElement}
     */
    sheetArrLayoutDom = null

    registryDom(){

        const { h,eSheetWorkBook,currentSheetIndex } = this.core

        const sheetArrLayoutDom = h('div',
            {
                attr:{
                    className:'sheet-arr-layout',
                    onclick:evt=>{
                        // console.log('sheetArrLayoutDom-evt',evt.target.getAttribute('index'))
                        this.hideContextMenu();
                        const strIndex = evt.target.getAttribute('index')
                        if(strIndex){
                            this.switchSheet(parseInt(strIndex))
                        }
                    },
                    ondblclick:evt=>{
                        // console.log('evt',evt)
                        const itemDom = evt.target
                        const index = parseInt(evt.target.getAttribute('index'))
                        const oriText = itemDom.innerText
                        const inputDom = h('input',{
                            attr:{
                                className:'item-input',
                                onblur:_=>{
                                    if(itemDom.contains(inputDom)){
                                        if(this.setSheetName(index,itemDom.innerText)){
                                            itemDom.innerText = inputDom.value
                                        }else{
                                            itemDom.innerText = oriText
                                        }
                                        inputDom.remove()
                                    }
                                },
                                onkeydown:keyEvent=>{
                                    // console.log('keyEvent',keyEvent)
                                    if(keyEvent.key === 'Enter'){
                                        if(this.setSheetName(index,itemDom.innerText)){
                                            console.log('内容不写入')
                                            itemDom.innerText = inputDom.value
                                        }else{
                                            itemDom.innerText = oriText
                                        }
                                        inputDom.remove()
                                    }
                                }
                            }
                        })
                        inputDom.value = itemDom.innerText
                        // console.log('itemDom.style.width',itemDom.getBoundingClientRect())
                        inputDom.style.width = itemDom.getBoundingClientRect().width - 24 + 'px'
                        itemDom.innerText = ''
                        itemDom.appendChild(inputDom)
                        inputDom.focus()
                    },
                    oncontextmenu:evt=>{
                        evt.preventDefault()
                        // console.log('evt.offsetX',evt)
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                        this.contextmenuDom.dataset['select'] = evt.target.getAttribute('index')
                        this.contextmenuDom.style.display = 'block'
                        this.contextmenuDom.style.left = scrollLeft+evt.x+'px'
                        this.contextmenuDom.style.top = scrollTop+evt.y-34+'px'
                    }
                }
            },
            eSheetWorkBook.map((item,index)=>{
                return h('div',{
                    attr:{
                        innerText:item.label,
                        className:currentSheetIndex===index?'item-span active-item-span':'item-span'
                    },
                    attribute:{
                        index
                    }
                })
            })
        )

        this.sheetArrLayoutDom = sheetArrLayoutDom

        const bookLayoutDom = h('div',{
            attr:{
                className:'e-sheet-book-layout'
            }
        },[
            h('div',{
                attr:{
                    className:'e-sheet-book-con'
                }
            },
                [
                    h('div',{attr:{className:'menu-layout'}},
                        [
                            h('div',{
                                attr:{
                                    className:'e-sheet-cell-hover'
                                }
                            },
                                [h('e-sheet-tip',{
                                    attribute:{
                                        'tip-label':'全部',
                                        left:-6,
                                        top:-36,
                                    }
                                },
                                    [
                                        h('e-sheet-icon-svg',{
                                            attribute:{
                                                category:'book',
                                                position:'menu'
                                            }
                                        })
                                    ]
                                )
                                ]
                            ),
                            h('div',{
                                    attr:{
                                        className:'e-sheet-cell-hover'
                                    }
                                },
                                [
                                    h('e-sheet-tip',{
                                        attribute:{
                                            'tip-label':'新增',
                                            left:-6,
                                            top:-36,
                                        },
                                        attr:{
                                            onclick:_=>{
                                                this.createNewSheet()
                                            }
                                        }
                                    },
                                        [
                                            h('e-sheet-icon-svg',{
                                                attribute:{
                                                    category:'book',
                                                    position:'plus'
                                                }
                                            })
                                        ]
                                    )
                                ]
                            )
                        ]
                    ),
                    sheetArrLayoutDom,
                    h('div',{
                        attr:{
                            className:'scroll-handle-layout'
                        }
                    },
                        [
                            h('e-sheet-tip',{
                                attribute:{
                                    'tip-label':'向左滚动',
                                    left:-20,
                                    top:-36,
                                },
                                style:{
                                    height:'100%'
                                },
                                attr:{
                                    onclick:evt=>{
                                        // console.log('sheetArrLayoutDom',sheetArrLayoutDom.scrollLeft)
                                        sheetArrLayoutDom.scrollLeft -= 300
                                    }
                                }
                            },[
                                h('div',{
                                    attr:{
                                        className:'arrow'
                                    }
                                },[h('e-sheet-icon-svg',{
                                    attribute:{
                                        category:'book',
                                        position:'arrow-left'
                                    }
                                })])
                                ]),
                            h('e-sheet-tip',{
                                attribute:{
                                    'tip-label':'向右滚动',
                                    left:-20,
                                    top:-36,
                                },
                                style:{
                                    height:'100%'
                                },
                                attr:{
                                    onclick:evt=>{
                                        // console.log('sheetArrLayoutDom',sheetArrLayoutDom.scrollLeft)
                                        sheetArrLayoutDom.scrollLeft += 300
                                    }
                                }
                            },[
                                h('div',{
                                    attr:{
                                        className:'arrow'
                                    }
                                },[
                                    h('e-sheet-icon-svg',{
                                        attribute:{
                                            category:'book',
                                            position:'arrow-right'
                                        }
                                    })
                                ])
                            ]),
                        ]
                    )
                ]
            )
        ])

        this.selectorDom.appendChild(bookLayoutDom)
    }
}