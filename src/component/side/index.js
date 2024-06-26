export default class SideComponent{

    options = {}

    layer = null

    sideRectGroup = []

    constructor(layer,options={},core) {

        this.options = options

        this.layer = layer

        this.core = core;

        // this.trendsDraw(0)
    }

    initDraw(){
        const {row,cellHeight} = this.options
        for(let i=0;i<row;i++){
            const tempRectBack = new Konva.Rect({
                x: 0,
                y: i*cellHeight+40,
                width: cellHeight,
                height: cellHeight,
                fill:'#fff',
                stroke: '#606266',
                strokeWidth: 1,
                attrs:{
                    uniPos:'header'+i,
                    exHeaderCell:true,
                    col:0,
                    row:i,
                    zIndex:99
                }
            });
            // const tempRect = new Konva.Rect({
            //     x: 0,
            //     y: i*cellHeight+40,
            //     width: cellHeight,
            //     height: cellHeight,
            //     attrs:{
            //         uniPos:'header'+i,
            //         exHeaderCell:true,
            //         row:i,
            //         zIndex:99
            //     }
            // });
            const tempText = new Konva.Text({
                x: 0,
                y: i*cellHeight+40,
                width: cellHeight,
                height: cellHeight,
                text: i+1,
                fontSize: 20,
                align: 'center',
                verticalAlign: 'middle',
                fontFamily: 'Calibri',
                fill: 'black',
                attrs:{
                    col:0,
                    row:i,
                    label:i
                }
            })
            tempRectBack.hide()
            tempText.hide()
            this.sideBackGroup.add(tempRectBack);
            this.sideTextGroup.add(tempText);
        }
        const tempBorder = new Konva.Line({
            points: [0,0,0,0],
            stroke: 'blue',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round'
        })
        this.sideBorderGroup.add(tempBorder);
    }

    trendsDraw(offsetY = 0){
        const { height,cellHeight } = this.options
        const { contentGroup,clickCell,clickRectShow,isColSelect,secondClickCell,attrSecond,attrFirst,startAndEndRect } = this.core.components.ContentComponent
        const { borderCellBgColor,selectedBorderBgColor,borderColor,selectedBgColor,nonSelectBgColor } = this.core

        const { config:{ freezeType,freezeRow } } = this.core.getCurrentSheet()

        const lt = this.searchScreenAddr(0,offsetY)
        const rb = this.searchScreenAddr(cellHeight,height-cellHeight+offsetY)

        // console.log(lt,rb);

        const sideRectGroup = contentGroup.filter(item=>item.row>=lt.row && item.col === 1 && item.row <= rb.row)
        let freezeRectGroup = [];
        if(freezeType === 1 && freezeRow>0){
            freezeRectGroup = contentGroup.filter(item=>item.col === 1 && item.row <= freezeRow)
        }
        this.sideRectGroup = sideRectGroup

        // const startRow = parseInt((offsetY/cellHeight).toFixed(1))
        // const endRow = parseInt(((height - cellHeight + offsetY)/cellHeight).toFixed(1))

        this.layer.clearRect(0,cellHeight,cellHeight,height)

        this.layer.drawLine([0,cellHeight,0,height],null,borderColor)
        this.layer.drawLine([cellHeight,cellHeight,cellHeight,height],null,borderColor)

        for(let i=0;i<freezeRectGroup.length;i++){
            const tempSide = freezeRectGroup[i]
            this.layer.drawText(0,tempSide.y+cellHeight,tempSide.row,cellHeight,tempSide.height,'destination-over',null,null, {
                fontSize:tempSide.fontSize,
                fontWeight:tempSide.fontWeight,
                fontItalic:tempSide.fontItalic,
                fontFamily:tempSide.fontFamily
            })
            this.layer.drawLine([0,tempSide.y+cellHeight,cellHeight,tempSide.y+cellHeight],'destination-over',borderColor)
            // if(clickCell.row === tempSide.row && clickRectShow && !isColSelect){
            //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,selectedBgColor,'destination-over')
            // }else{
            //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,borderCellBgColor,'destination-over')
            // }

            if(clickRectShow && !isColSelect){
                const topRow = startAndEndRect?attrFirst.row:(secondClickCell?.row>clickCell.row?clickCell.row:secondClickCell?.row);
                const bottomRow = startAndEndRect?attrSecond.row:(secondClickCell?.row>clickCell.row?secondClickCell?.row:clickCell.row)
                if(secondClickCell && tempSide.row>=topRow && tempSide.row <= bottomRow){
                    this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                }else if(clickCell.row === tempSide.row && !clickCell.isMerge){
                    this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                }else if(clickCell.isMerge){
                    const isMergeinArr = this.findClickCellRowArr(clickCell)
                    if(isMergeinArr.findIndex(item=>item === tempSide.row) !== -1){
                        this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                    }
                }else{
                    this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,borderCellBgColor,'destination-over')
                }

            }else{
                this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,borderCellBgColor,'destination-over')
            }
            this.layer.drawFillRect(0,tempSide.y+cellHeight,cellHeight,tempSide.height,nonSelectBgColor,'destination-over')

        }

        for(let i=0;i<sideRectGroup.length;i++){
            const tempSide = sideRectGroup[i]
            this.layer.drawText(0,tempSide.y+cellHeight-offsetY,tempSide.row,cellHeight,tempSide.height,'destination-over',null,null, {
                fontSize:tempSide.fontSize,
                fontWeight:tempSide.fontWeight,
                fontItalic:tempSide.fontItalic,
                fontFamily:tempSide.fontFamily
            })
            this.layer.drawLine([0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.y+cellHeight-offsetY],'destination-over',borderColor)
            // if(clickCell.row === tempSide.row && clickRectShow && !isColSelect){
            //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,selectedBgColor,'destination-over')
            // }else{
            //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,borderCellBgColor,'destination-over')
            // }

            if(clickRectShow && !isColSelect){
                const topRow = startAndEndRect?attrFirst.row:(secondClickCell?.row>clickCell.row?clickCell.row:secondClickCell?.row);
                const bottomRow = startAndEndRect?attrSecond.row:(secondClickCell?.row>clickCell.row?secondClickCell?.row:clickCell.row)
                if(secondClickCell && tempSide.row>=topRow && tempSide.row <= bottomRow){
                    this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                }else if(clickCell.row === tempSide.row && !clickCell.isMerge){
                    this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                }else if(clickCell.isMerge){
                    const isMergeinArr = this.findClickCellRowArr(clickCell)
                    if(isMergeinArr.findIndex(item=>item === tempSide.row) !== -1){
                        this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,selectedBgColor,'destination-over')
                    }
                }else{
                    this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,borderCellBgColor,'destination-over')
                }

            }else{
                this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,borderCellBgColor,'destination-over')
            }
            this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,tempSide.height,nonSelectBgColor,'destination-over')

        }



    }


    findClickCellRowArr(clickCell){
        const isMergeinArr = []
        const len = clickCell.row+clickCell.mergeRow-1
        for(let i=clickCell.row;i<=len;i++){
            isMergeinArr.push(i)
        }
        return isMergeinArr
    }

    searchScreenAddr(offsetX = 0,offsetY = 0){
        // console.log('offsetX',offsetX,offsetY)
        const { contentGroup } = this.core.components.ContentComponent

        const sideGroup = contentGroup.filter(item=>item.col === 1)

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        for(let i=0;i<sideGroup.length;i++){
            const tempContentSin = sideGroup[i]
            startX = tempContentSin.x
            endX = startX+tempContentSin.width

            startY = tempContentSin.y
            endY = startY+tempContentSin.height

            if((startX<=offsetX && offsetX<=endX) && (startY<=offsetY && offsetY<=endY) && tempContentSin.col === 1){
                return tempContentSin
            }
        }

        return sideGroup[sideGroup.length-1]

    }
}
