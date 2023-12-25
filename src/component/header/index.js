export default class HeaderComponent{

    options = {}

    /**
     * @type {Canvas}
     */
    layer = null;
    headerRectGroup = []

    constructor(layer,options={},core) {

        this.options = options;
        this.layer = layer;
        this.core = core;
        // this.initDraw()
        // this.trendsDraw(0)
    }


    initDraw(){
        const col = this.options.col
        const cellWidth = this.options.cellWidth
        const cellHeight = this.options.cellHeight
        for(let j=0;j<col;j++){
            const label = String.fromCharCode(65 + j)
            // const tempRect = new Konva.Rect({
            //     x: j*cellWidth+40,
            //     y: 0,
            //     width: cellWidth,
            //     height: cellHeight,
            //     attrs:{
            //         headerLabel:label,
            //         col:j,
            //         row:0
            //     }
            // });
            const tempRectBack = new Konva.Rect({
                x: j*cellWidth+40,
                y: 0,
                width: cellWidth,
                height: cellHeight,
                fill:'#c0c4cc',
                stroke: '#606266',
                strokeWidth: 1,
                attrs:{
                    headerLabel:label,
                    col:j,
                    row:0
                }
            });
            const tempText = new Konva.Text({
                x: j*cellWidth+40,
                y: 0,
                width: cellWidth,
                height: cellHeight,
                align: 'center',
                verticalAlign: 'middle',
                text: label,
                fontSize: 20,
                fontFamily: 'Calibri',
                fill: 'black',
                attrs:{
                    headerLabel:label,
                    col:j,
                    row:0
                }
            })

            tempRectBack.hide()
            tempText.hide()

            this.headerBackGroup.add(tempRectBack);
            this.headerTextGroup.add(tempText);
        }
        const tempBorder = new Konva.Line({
            points: [0,0,0,0],
            stroke: 'blue',
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round'
        });
        this.headerBorderGroup.add(tempBorder);
    }

    trendsDraw(offsetX = 0){
        const { width,cellHeight } = this.options
        const { borderCellBgColor,nonSelectBgColor,borderColor,selectedBgColor } = this.core

        const { contentGroup,clickCell,clickRectShow,isRowSelect,secondClickCell,attrSecond,attrFirst,startAndEndRect } = this.core.components.ContentComponent

        // const startCol = parseInt((offsetX/cellWidth).toFixed(1))
        // const endCol = parseInt(((width - cellHeight +offsetX)/cellWidth).toFixed(1))

        const lt = this.searchScreenAddr(offsetX,0)
        const rb = this.searchScreenAddr(offsetX+width-cellHeight,cellHeight)

        // console.log(lt,rb);

        const headerRectGroup = contentGroup.filter(item=>item.col>=lt.col && item.row === 1 && item.col <= rb.col)

        this.headerRectGroup = headerRectGroup

        this.layer.clearRect(cellHeight,0,width,cellHeight)

        this.layer.drawLine([cellHeight,0,width,0],null,borderColor)
        this.layer.drawLine([cellHeight,cellHeight,width,cellHeight],null,borderColor)
        // console.log('headerRectGroup',headerRectGroup)

        for(let j=0;j<headerRectGroup.length;j++){
            const tempHeader = headerRectGroup[j]
            // let label = ''
            // const col = tempHeader.col - 1
            // if(tempHeader.col>=27){
            //     label = String.fromCharCode(65 + col-26)+String.fromCharCode(65 + col-26)
            // }else{
            //     label = String.fromCharCode(65 + col)
            // }
            // console.log('label',label,j)
            // console.log('tempHeader.label',tempHeader.label)
            this.layer.drawText(tempHeader.x+cellHeight-offsetX,0,tempHeader.label.slice(0,tempHeader.label.length - 1),tempHeader.width,cellHeight,'destination-over',null,null,{fontSize:12,fontFamily:'',fontWeight:'',fontItalic:''})
            this.layer.drawLine([tempHeader.x+cellHeight-offsetX,0,tempHeader.x+cellHeight-offsetX,cellHeight],'destination-over',borderColor)
            if(clickRectShow && !isRowSelect){
                // console.log('secondClickCell',secondClickCell)
                const leftCol = startAndEndRect?attrFirst.col:(secondClickCell?.col>clickCell.col?clickCell.col:secondClickCell?.col)
                const rightCol = startAndEndRect?attrSecond.col:(secondClickCell?.col>clickCell.col?secondClickCell?.col:clickCell.col)
                if(secondClickCell && tempHeader.col>=leftCol && tempHeader.col <= rightCol){
                    // 多个
                    // console.log('tempHeader.col',tempHeader.col)
                    this.layer.drawFillRect(tempHeader.x+cellHeight-offsetX,0,tempHeader.width,cellHeight,selectedBgColor,'destination-over')
                }else if(tempHeader.col === clickCell.col && !clickCell.isMerge){
                    this.layer.drawFillRect(tempHeader.x+cellHeight-offsetX,0,tempHeader.width,cellHeight,selectedBgColor,'destination-over')

                }else if(clickCell.isMerge){
                    const isMergeinArr = this.findClickCellRowArr(clickCell)
                    if(isMergeinArr.findIndex(item=>item === tempHeader.col) !== -1) {
                        this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX,0, tempHeader.width, cellHeight, selectedBgColor, 'destination-over')
                    }
                }else{
                    this.layer.drawFillRect(tempHeader.x+cellHeight-offsetX,0,tempHeader.width,cellHeight,borderCellBgColor,'destination-over')
                }

            }else{
                this.layer.drawFillRect(tempHeader.x+cellHeight-offsetX,0,tempHeader.width,cellHeight,borderCellBgColor,'destination-over')
            }


            this.layer.drawFillRect(tempHeader.x+cellHeight-offsetX,0,tempHeader.width,cellHeight,nonSelectBgColor,'destination-over')
        }


    }

    findClickCellRowArr(clickCell){
        const isMergeinArr = []
        const len = clickCell.col+clickCell.mergeCol-1
        for(let i=clickCell.col;i<=len;i++){
            isMergeinArr.push(i)
        }
        return isMergeinArr
    }

    searchScreenAddr(offsetX = 0,offsetY = 0){

        const { contentGroup } = this.core.components.ContentComponent

        const headerGroup = contentGroup.filter(item=>item.row === 1)

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        for(let i=0;i<headerGroup.length;i++){
            const tempContentSin = headerGroup[i]
            startX = tempContentSin.x
            endX = startX+tempContentSin.width

            startY = tempContentSin.y
            endY = startY+tempContentSin.height

            if((startX<=offsetX && offsetX<=endX) && (startY<=offsetY && offsetY<=endY) && tempContentSin.row === 1){
                return tempContentSin
            }
        }

        return headerGroup[headerGroup.length-1]

    }

}