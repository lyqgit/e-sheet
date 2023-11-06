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

    currentSheetIndex = 0

    registryDom(){

        const { currentSheetIndex } = this
        const { h,eSheetWorkBook } = this.core

        const sheetArrLayoutDom = h('div',
            {
                attr:{
                    className:'sheet-arr-layout'
                }
            },
            eSheetWorkBook.map((item,index)=>{
                return h('span',{
                    attr:{
                        innerText:item.label,
                        className:currentSheetIndex===index?'item-span active-item-span':'item-span'
                    }
                })
            })
        )

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