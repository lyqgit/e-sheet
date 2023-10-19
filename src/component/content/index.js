export default class ContentComponent{

    options = {};

    offsetX = 0;
    offsetY = 0;

    clickRectShow = false

    clickCell = null

    secondClickCell = null

    isColSelect = false
    isRowSelect = false

    moreSelectedCell = []
    mergeSelectedCell = []

    startAndEndRect = null
    attrFirst = null
    attrSecond = null

    /**
     * @type {Canvas}
     */
    layer = null;

    contentGroup = []

    constructor(layer,options={},core) {

        this.options = options;
        this.layer = layer;
        this.core = core;
        this.installContentData()
        // console.log('this.core.sheetWidth',this.core.sheetWidth)
        // console.log('this.core.sheetHeight',this.core.sheetHeight)
        // this.initDraw()
        this.trendsDraw(0,0)
    }


    // Load Data
    installContentData(sheetName='Sheet1'){
        this.contentGroup = this.core.eSheetWorkBook[sheetName]
        // console.log('sheetName',this.contentGroup)
    }

    changeContentGroupByRectArr(selectedArr){
        const firstCell = selectedArr[0]
    }

    showClickRect(attr,col=false,row=false){
        this.clickCell = attr
        this.clickRectShow = true
        this.isColSelect = col
        this.isRowSelect = row
    }

    setSecondClickCell(attr){
        this.secondClickCell = attr
    }

    hideClickRect(){
        this.clickRectShow = false
        this.isColSelect = false
        this.isRowSelect = false
        this.secondClickCell = null
        this.clickCell = null
        this.moreSelectedCell = []
    }

    // draw canvas
    initDraw(){
        const col = this.options.col
        const row = this.options.row
        const cellWidth = this.options.cellWidth
        const cellHeight = this.options.cellHeight
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                const label = String.fromCharCode(65 + j)
                // console.log('label+i',label+i)
                // const tempRect = new Konva.Rect({
                //     x: j*cellWidth+40,
                //     y: i*cellHeight+40,
                //     width: cellWidth,
                //     height: cellHeight,
                //     attrs:{
                //         exCell:true,
                //         row:i,
                //         col:j,
                //         v:sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
                //         k:label+(i+1),
                //     },
                //     name:label+(i+1),
                // });

                const tempRectBack = new Konva.Rect({
                    x: j*cellWidth+40,
                    y: i*cellHeight+40,
                    width: cellWidth,
                    height: cellHeight,
                    stroke: '#dcdfe6',
                    strokeWidth: 1,
                    listening: false,
                    attrs:{
                        row:i,
                        col:j,
                        name:label+(i+1),
                    }
                });

                // const tempBackBorder = new Konva.Line({
                //     points: [j*cellWidth+40,cellHeight+i*cellHeight,j*cellWidth+40,(row+1)*cellHeight],
                //     stroke: '#dcdfe6',
                //     strokeWidth: 1,
                //     lineCap: 'round',
                //     lineJoin: 'round',
                //     attrs:{
                //         row:i,
                //         col:j,
                //         name:label+(i+1),
                //     }
                // })

                const tempText = new Konva.Text({
                    x: j*cellWidth+40,
                    y: i*cellHeight+40,
                    // text: sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
                    width:cellWidth,
                    height: cellHeight,
                    align:'center',
                    verticalAlign:'middle',
                    padding:6,
                    ellipsis:true,
                    fontSize: 12,
                    fontFamily: 'Calibri',
                    fill: 'black',
                    attrs:{
                        row:i,
                        col:j,
                        name:label+(i+1),
                    }
                })

                tempRectBack.hide()
                tempText.hide()
                this.contentBackGroup.add(tempRectBack);
                this.contentTextGroup.add(tempText);

            }
        }

        const tempHandlerRectBack = new Konva.Rect({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
        this.contentBorderGroup.add(tempHandlerRectBack);
    }

    /**
     * @param {number} offsetX
     * @param {number} offsetY
     */
    trendsDraw(offsetX = 0,offsetY = 0){

        const { width,height,cellHeight,cellWidth } = this.options

        const { nonSelectBgColor,selectedBorderBgColor,borderColor,selectedBgColor } = this.core

        const lt = this.searchScreenAddr(offsetX,offsetY)
        const rb = this.searchScreenAddr(offsetX+width-cellHeight,offsetY+height-cellHeight)
        // console.log('start1',lt)
        // console.log('start2',rb)


        // const startCol = parseInt((offsetX/cellWidth).toFixed(1))
        // const endCol = parseInt(((width - cellHeight +offsetX)/cellWidth).toFixed(1))
        //
        // const startRow = parseInt((offsetY/cellHeight).toFixed(1))
        // const endRow = parseInt(((height - cellHeight + offsetY)/cellHeight).toFixed(1))

        this.layer.clearRect(cellHeight,cellHeight,width,height)

        // for(let i=startRow;i<=endRow;i++){
        //     for(let j=startCol;j<=endCol;j++){
        //         this.layer.drawStrokeRect(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,cellWidth,cellHeight)
        //         this.layer.drawText(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,'111',cellWidth,cellHeight)
        //     }
        // }



        let attrFirst = null
        let attrSecond = null

        let startAndEndRect = null

        if(this.secondClickCell){
            attrFirst = this.clickCell
            attrSecond = this.secondClickCell

            let isRight = attrSecond.x>attrFirst.x
            let isBottom = attrSecond.y>attrFirst.y

            if(isRight && !isBottom){
                // 第二个在右上角
                startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrSecond.y,attrSecond.x,attrFirst.y,attrFirst,attrSecond)
            }else if(isRight && isBottom){
                // 第二个在右下角
                startAndEndRect = this.searchRectIsMerge(attrFirst.x,attrFirst.y,attrSecond.x,attrSecond.y,attrFirst,attrSecond)
            }else if(!isRight && isBottom){
                // 第二个在左下角
                startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrFirst.y,attrFirst.x,attrSecond.y,attrFirst,attrSecond)
            }else{
                // 第二个在左上角
                startAndEndRect = this.searchRectIsMerge(attrSecond.x,attrSecond.y,attrFirst.x,attrFirst.y,attrFirst,attrSecond)
            }

            this.startAndEndRect = startAndEndRect

            if(startAndEndRect) {

                const startRect = []
                const endRect = []

                startAndEndRect.forEach(item=>{
                    startRect.push(this.searchRectByLabel(item.mergeStartLabel))
                    endRect.push(this.searchRectByLabel(item.mergeEndLabel))
                })

                const startArr = startRect.concat([attrFirst, attrSecond])
                const endArr = endRect.concat([attrFirst, attrSecond])


                const startCol = startArr.sort((a, b) => a.x - b.x)[0].col
                const startRow = startArr.sort((a, b) => a.y - b.y)[0].row
                const endCol = endArr.sort((a, b) => a.x - b.x)[endArr.length - 1].col
                const endRow = endArr.sort((a, b) => a.y - b.y)[endArr.length - 1].row

                // console.log('startAndEndRect', startAndEndRect)

                // console.log('startCol,startRow', startCol, startRow, endCol, endRow)

                attrFirst = this.searchRectByColAndRow(startCol, startRow)
                attrSecond = this.searchRectByColAndRow(endCol, endRow)


                this.attrFirst = attrFirst
                this.attrSecond = attrSecond
                // console.log('attrFirst+attrSecond', attrFirst, attrSecond)


            }
        }

        // const lt = this.searchScreenAddr(offsetX,offsetY)
        // const rb = this.searchScreenAddr(offsetX+width-cellHeight,offsetY+height-cellHeight)
        // console.log('start1',lt)
        // console.log('start2',rb)


        const startCol = lt.col
        const endCol = rb.col

        const startRow = lt.row
        const endRow = rb.row

        const { contentGroup } = this
        // 选中绘制
        if(this.clickRectShow){
            if(this.isColSelect && !this.isRowSelect){
                // 竖向整个选中
                // console.log('-offsetY+cellHeight',-offsetY+cellHeight,this.core.offsetYLock)
                this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,cellHeight,this.clickCell.width,this.core.isScrollBottomBound?height-cellHeight:height,selectedBorderBgColor,'destination-over',2)
            }else if(this.isRowSelect && !this.isColSelect){
                // 横向整个选中
                this.layer.drawStrokeRect(cellHeight,this.clickCell.y-offsetY+cellHeight,this.core.isScrollRightBound?width-cellHeight:width,cellHeight,selectedBorderBgColor,'destination-over',2)
            }else if(this.isRowSelect && this.isColSelect){
                // 整个选中
                this.layer.drawStrokeRect(cellHeight,cellHeight,this.core.isScrollRightBound?width-cellHeight:width,this.core.isScrollBottomBound?height-cellHeight:height,selectedBorderBgColor,'destination-over',2)
            }else{
                // console.log('secondClickCell',this.secondClickCell)
                if(!this.secondClickCell){
                    if(this.clickCell.isMerge){
                        const {mergeWidth,mergeHeight} = this.clickCell
                        // console.log('多个选中框',this.clickCell)
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBorderBgColor,'destination-over',2)
                    }else{
                        // console.log('单个选中框',this.clickCell)
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,this.clickCell.width,this.clickCell.height,selectedBorderBgColor,'destination-over',2)
                    }

                }else if(!startAndEndRect){
                    if(this.secondClickCell.x >= this.clickCell.x){
                        // 最后一个在右边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.secondClickCell.x-this.clickCell.x+this.secondClickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                    }else{
                        // 最后一个在左边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.secondClickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.clickCell.x-this.secondClickCell.x+this.clickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                    }
                }else if(startAndEndRect){
                    this.layer.drawStrokeRect(attrFirst.x+cellHeight-offsetX,attrFirst.y-offsetY+cellHeight,attrSecond.x-attrFirst.x+attrSecond.width,attrSecond.y-attrFirst.y+attrSecond.height,selectedBorderBgColor,'destination-over',2)
                }


            }
        }


        this.moreSelectedCell = []
        this.mergeSelectedCell = []

        // console.log('x,y,x,y',ltCol,ltRow,rbCol,rbRow)

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]
            const {row,col,text,x,y,width,height} = tempRect

            if((col>=startCol && col<=endCol) && (row>=startRow && row<=endRow)){
                // 多个选中除了第一个之外的渲染
                // 合并渲染从左上角开始
                if(tempRect.isMerge && tempRect.label === tempRect.mergeStartLabel){
                    const {mergeWidth,mergeHeight} = tempRect
                    // console.log('背景色',tempRect)
                    this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,mergeWidth,mergeHeight,borderColor,'destination-over',1)
                    this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,mergeWidth,mergeHeight,'destination-over',tempRect.fontColor)
                    this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,mergeWidth,mergeHeight,tempRect.bgColor?tempRect.bgColor:nonSelectBgColor,'destination-over',1)

                }else if(!tempRect.isMerge){
                    this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,borderColor,'destination-over',1)
                    this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,width,height,'destination-over',tempRect.fontColor)
                    this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,tempRect.bgColor?tempRect.bgColor:nonSelectBgColor,'destination-over',1)
                }
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'#EBF4FF','destination-over',1)
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'red','destination-over')
            }


            if(this.secondClickCell){

                const ltCol= startAndEndRect?(attrSecond.col>attrFirst.col?attrFirst.col:attrSecond.col):(this.secondClickCell.col>this.clickCell.col?this.clickCell.col:this.secondClickCell.col)
                const ltRow= startAndEndRect?(attrSecond.row>attrFirst.row?attrFirst.row:attrSecond.row):(this.secondClickCell.row>this.clickCell.row?this.clickCell.row:this.secondClickCell.row)
                const rbCol= startAndEndRect?(attrSecond.col>attrFirst.col?attrSecond.col:attrFirst.col):(this.secondClickCell.col>this.clickCell.col?this.secondClickCell.col:this.clickCell.col)
                const rbRow= startAndEndRect?(attrSecond.row>attrFirst.row?attrSecond.row:attrFirst.row):(this.secondClickCell.row>this.clickCell.row?this.secondClickCell.row:this.clickCell.row)
                if((col>=ltCol && col<=rbCol) && (row>=ltRow && row<=rbRow)){
                    // console.log('x+cellHeight-offsetX',x+cellHeight-offsetX)
                    // this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
                    this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
                    if(!(tempRect.col === this.clickCell.col && tempRect.row === this.clickCell.row)){
                        this.mergeSelectedCell.push(tempRect)
                    }
                    this.moreSelectedCell.push(tempRect)
                }

            }
            // else if(this.secondClickCell && this.secondClickCell.isMerge){
            //     // 选中的是合并的单元格
            //     const {mergeWidth,mergeHeight} = this.countMergeWidthAndHeight(tempRect)
            //     this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBgColor,'destination-over')
            // }
            if(this.isRowSelect && this.isColSelect){
                this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
            }
        }



    }

    searchScreenAddr(offsetX = 0,offsetY = 0){

        const currentTime = performance.now();

        const { contentGroup } = this

        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;



        for(let i=0;i<contentGroup.length;i++){
            const tempContentSin = contentGroup[i]
            startX = tempContentSin.x
            endX = startX+tempContentSin.width

            startY = tempContentSin.y
            endY = startY+tempContentSin.height

            if((startX<=offsetX && offsetX<=endX) && (startY<=offsetY && offsetY<=endY)){
                const endTime = performance.now();

                // console.log('endTime - currentTime',endTime - currentTime)
                return tempContentSin
            }
        }



    }

    countMergeWidthAndHeight(tempRect){
        let mergeWidth = tempRect.width
        let mergeHeight = tempRect.height

        tempRect.mergeLabelGroup.forEach(item=>{
            if(tempRect.row === item.row){
                mergeWidth += item.width
            }
            if(tempRect.col === item.col){
                mergeHeight += item.height
            }
        })
        return {mergeWidth,mergeHeight}
    }


    searchRectIsMerge(startX,startY,endX,endY,attrFirst,attrSecond){
        const { contentGroup } = this

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        const res = contentGroup.filter(item=>
            (
                (item.x>=startX && item.x<=endX) && (item.y>=startY && item.y<=endY) && item.isMerge)
                &&
                ([attrFirst.row,attrSecond.row].includes(item.row) || [attrFirst.col,attrSecond.col].includes(item.col))
            )
        // console.log('res',res)
        if(res.length > 0){
            return res
        }else {
            return null
        }

    }

    searchRectByLabel(label){
        const { contentGroup } = this
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.label === label)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

    searchRectByColAndRow(col,row){
        const { contentGroup } = this
        // console.log('col',col)
        const index = contentGroup.findIndex(item=>item.col === col && item.row === row)
        if(index !== -1){
            return contentGroup[index]
        }else{
            return null
        }

    }

}