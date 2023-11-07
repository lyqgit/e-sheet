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
            console.log('item.className',item.className,'---------',currentSheetIndex,index,currentSheetIndex===index?'item-span active-item-span':'item-span')
            item.className = currentSheetIndex===index?'item-span active-item-span':'item-span'
        })
        console.log('index',index,currentSheetIndex)

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
                        console.log('sheetArrLayoutDom-evt',evt.target.getAttribute('index'))
                        this.switchSheet(parseInt(evt.target.getAttribute('index')))
                    }
                }
            },
            eSheetWorkBook.map((item,index)=>{
                return h('span',{
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