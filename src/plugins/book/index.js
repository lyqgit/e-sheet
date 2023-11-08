export default class BookPlugin{
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

    setSheetName(index,label){
        this.core.eSheetWorkBook[index].label = label
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
                        this.switchSheet(parseInt(evt.target.getAttribute('index')))
                    },
                    ondblclick:evt=>{
                        // console.log('evt',evt)
                        const itemDom = evt.target
                        const index = parseInt(evt.target.getAttribute('index'))
                        const inputDom = h('input',{
                            attr:{
                                className:'item-input',
                                onblur:_=>{
                                    itemDom.innerText = inputDom.value
                                    inputDom.remove()
                                    this.setSheetName(index,itemDom.innerText)
                                },
                                onkeydown:keyEvent=>{
                                    // console.log('keyEvent',keyEvent)
                                    if(keyEvent.key === 'Enter'){
                                        itemDom.innerText = inputDom.value
                                        inputDom.remove()
                                        this.setSheetName(index,itemDom.innerText)
                                    }
                                }
                            }
                        })
                        inputDom.value = itemDom.innerText
                        console.log('itemDom.style.width',itemDom.getBoundingClientRect())
                        inputDom.style.width = itemDom.getBoundingClientRect().width - 24 + 'px'
                        itemDom.innerText = ''
                        itemDom.appendChild(inputDom)
                        inputDom.focus()
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