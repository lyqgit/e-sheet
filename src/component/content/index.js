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

    /**
     * @type {Canvas}
     */
    layer = null;

    contentGroup = []

    constructor(layer,options={},core) {

        this.options = options;
        this.layer = layer;
        this.core = core;

        const { row,col,cellWidth,cellHeight } = options

        let colWidth = 0
        let colAbWidth = cellHeight
        let rowHeight = 0
        let rowAbHeight = 0

        // this.core.sheetWidth += cellHeight
        // this.core.sheetHeight += cellHeight

        for(let i=0;i<row;i++){
            colWidth = 0
            this.core.sheetHeight += cellHeight
            for(let j=0;j<col;j++){
                if(i===0){
                    this.core.sheetWidth += cellWidth
                }
                this.contentGroup.push({
                    row:i+1,
                    col:j+1,
                    text:String.fromCharCode(65 + j)+(i+1),
                    width:cellWidth,
                    height:cellHeight,
                    x:colWidth,
                    y:rowHeight,
                    ltX:colAbWidth,
                    ltY:rowAbHeight,
                    mergeRow:0,
                    mergeCol:0,
                    mergeStartLabel:'',
                    mergeEndLabel:'',
                    mergeLabelGroup:[],
                    isMerge:false,
                    bgColor:'',
                    fontColor:'',
                    label:String.fromCharCode(65 + j)+(i+1)
                })
                colWidth += cellWidth
                colAbWidth += cellWidth
            }
            rowHeight += cellHeight
            rowAbHeight += cellHeight
        }
        // console.log('this.core.sheetWidth',this.core.sheetWidth)
        // console.log('this.core.sheetHeight',this.core.sheetHeight)
        // this.initDraw()
        this.trendsDraw(0,0)
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
                        const {mergeWidth,mergeHeight} = this.countMergeWidthAndHeight(this.clickCell)
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBorderBgColor,'destination-over',2)
                    }else{
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,this.clickCell.y-offsetY+cellHeight,this.clickCell.width,this.clickCell.height,selectedBorderBgColor,'destination-over',2)
                    }

                }else{
                    if(this.secondClickCell.x >= this.clickCell.x){
                        // 最后一个在右边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.clickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.secondClickCell.x-this.clickCell.x+this.secondClickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                    }else{
                        // 最后一个在左边
                        const isBottom = this.secondClickCell.y>this.clickCell.y
                        this.layer.drawStrokeRect(this.secondClickCell.x+cellHeight-offsetX,(isBottom?this.clickCell.y:this.secondClickCell.y)-offsetY+cellHeight,this.clickCell.x-this.secondClickCell.x+this.secondClickCell.width,Math.abs(this.secondClickCell.y-this.clickCell.y)+this.secondClickCell.height,selectedBorderBgColor,'destination-over',2)
                    }
                }


            }
        }


        this.moreSelectedCell = []
        // console.log('x,y,x,y',ltCol,ltRow,rbCol,rbRow)

        for(let i=0;i<contentGroup.length;i++){
            const tempRect = contentGroup[i]
            const {row,col,text,x,y,width,height} = tempRect

            if((col>=startCol && col<=endCol) && (row>=startRow && row<=endRow)){
                // 多个选中除了第一个之外的渲染
                // 合并渲染从左上角开始
                if(tempRect.isMerge && tempRect.label === tempRect.mergeStartLabel){
                    const {mergeWidth,mergeHeight} = this.countMergeWidthAndHeight(tempRect)
                    this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,mergeWidth,mergeHeight,borderColor,'destination-over',1)
                    this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,mergeWidth,mergeHeight,'destination-over')

                }else if(!tempRect.isMerge){
                    this.layer.drawStrokeRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,borderColor,'destination-over',1)
                    this.layer.drawText(x-offsetX+cellHeight,y-offsetY+cellHeight,text,width,height,'destination-over')
                }
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'#EBF4FF','destination-over',1)
                // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'red','destination-over')
            }
            if(this.secondClickCell){
                const ltCol= this.secondClickCell.col>this.clickCell.col?this.clickCell.col:this.secondClickCell.col
                const ltRow= this.secondClickCell.row>this.clickCell.row?this.clickCell.row:this.secondClickCell.row
                const rbCol= this.secondClickCell.col>this.clickCell.col?this.secondClickCell.col:this.clickCell.col
                const rbRow= this.secondClickCell.row>this.clickCell.row?this.secondClickCell.row:this.clickCell.row
                if((col>=ltCol && col<=rbCol) && (row>=ltRow && row<=rbRow)){
                    // console.log('x+cellHeight-offsetX',x+cellHeight-offsetX)
                    if(!tempRect.isMerge){
                        this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
                    }
                    this.moreSelectedCell.push(tempRect)
                }
            }
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
        let mergeWidth = 0
        let mergeHeight = 0

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

}