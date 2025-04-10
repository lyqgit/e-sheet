import { Cell } from "@/core";
import { IStore } from "@/store";
import { IExcel, IPlugin } from "@/types";
import { getExcelHeaderName,EventEmitterIns } from "@/utils";
import u from 'cash-dom'

export class SelectPlugin implements IPlugin{

  constructor(excel:IExcel,store:IStore){
    this.excel = excel
    this.store = store
  }
  docMouseUp=(): void=> {
    const { eventDom } = this.store.canvas
    eventDom.off('mouseover')
  }

  excel: IExcel;
  store: IStore;
  register(): void {
    this.singleMouse()
  }
  unregister(): void {
  }

  getCellsInMerge(tempAllCells:Array<Cell>):Array<Cell>{

    let mergeStartArr = []

    const curSheet = this.excel.getCurSheet()

    const sortSelCells = tempAllCells.sort((a,b)=>(a.col - b.col < 0 || a.row - b.row < 0) ? -1 : 1)
    const simpleFirstCell = sortSelCells[0]
    const simpleLastCell = sortSelCells[sortSelCells.length - 1]

    let mergeEndArr = []

    sortSelCells.forEach(cell=>{
      if(cell.isMerge && cell.isStartMergeLabel && mergeStartArr.findIndex(it=>it.label === cell.getMergeStartLabel()) === -1){
        mergeStartArr.push(cell)
        mergeEndArr.push(curSheet.contMap.get(cell.getMergeEndLabel()))
      }else if(cell.isMerge && mergeStartArr.findIndex(it=>it.label === cell.getMergeStartLabel()) === -1){
        mergeStartArr.push(curSheet.contMap.get(cell.getMergeStartLabel()))
        mergeEndArr.push(curSheet.contMap.get(cell.getMergeEndLabel()))
      }
    })

    const mergeStartArrLength = mergeStartArr.length

    // mergeStartArr = mergeStartArr.sort((a,b)=>(a.col - b.col < 0 || a.row - b.row < 0) ? -1 : 1)
    // mergeEndArr = mergeEndArr.sort((a,b)=>(a.col - b.col < 0 || a.row - b.row < 0) ? -1 : 1)

    // const mergeLeftTop = mergeStartArr[0]
    // const mergeRightBottom = mergeEndArr[mergeEndArr.length-1]

    const mergeLeftTopRow = Math.min(...mergeStartArr.map(item=>item.row))
    const mergeLeftTopCol = Math.min(...mergeStartArr.map(item=>item.col))

    const mergeRightBottomRow = Math.max(...mergeEndArr.map(item=>item.row))
    const mergeRightBottomCol = Math.max(...mergeEndArr.map(item=>item.col))

    // console.log('----------------------=-----------',simpleLastCell,mergeRightBottom,mergeEndArr)

    // console.log('simpleFirstCell-=-----------',simpleFirstCell)
    // console.log('simpleLastCell-=-----------',simpleLastCell)
    // console.log('mergeLeftTop-=-----------',mergeLeftTop)
    // console.log('mergeRightBottom-=-----------',mergeRightBottom)

    const leftTopRow = [simpleFirstCell.row,mergeLeftTopRow].sort((a,b)=>a-b)[0]
    const leftTopCol = [simpleFirstCell.col,mergeLeftTopCol].sort((a,b)=>a-b)[0]

    const rightBottomRow = [simpleLastCell.row,mergeRightBottomRow].sort((a,b)=>a-b)[1]
    const rightBottomCol = [simpleLastCell.col,mergeRightBottomCol].sort((a,b)=>a-b)[1]

    let tempNowAllCells = []

    for(let i=leftTopRow;i<=rightBottomRow;i++){
      for(let j=leftTopCol;j<=rightBottomCol;j++){
        const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
        tempNowAllCells.push(cell)
      }
    }

    let mergeNowStartArr = []

    tempNowAllCells.forEach(item=>{
      const mergeStartLabel = item.getMergeStartLabel()
      if(item.isMerge && mergeStartLabel && mergeNowStartArr.findIndex(it=>it.label === mergeStartLabel) === -1){
        mergeNowStartArr.push(curSheet.contMap.get(mergeStartLabel))
      }
    })

    if(mergeNowStartArr.length>mergeStartArrLength){
      return this.getCellsInMerge(tempNowAllCells)
    }

    return [curSheet.contMap.get(getExcelHeaderName(leftTopCol)+leftTopRow),curSheet.contMap.get(getExcelHeaderName(rightBottomCol)+rightBottomRow)]

  }


  getDiagonal(cellArr:Array<Cell>):Array<Cell>{
    const curSheet = this.excel.getCurSheet()
    const mergeLeftTopRow = Math.min(...cellArr.map(item=>item.row))
    const mergeLeftTopCol = Math.min(...cellArr.map(item=>item.col))

    const mergeRightBottomRow = Math.max(...cellArr.map(item=>item.row))
    const mergeRightBottomCol = Math.max(...cellArr.map(item=>item.col))
    return [
      curSheet.contMap.get(getExcelHeaderName(mergeLeftTopCol)+mergeLeftTopRow),
      curSheet.contMap.get(getExcelHeaderName(mergeRightBottomCol)+mergeRightBottomRow)
    ]
  }

  // 点击单元格
  singleMouse(){
    const { eventDom } = this.store.canvas

    eventDom.on('mousedown',(evtA:MouseEvent)=>{
      // console.log('evtA',evtA)
      evtA.preventDefault()

      const curSheet = this.excel.getCurSheet()

      // 首先单选
      const targetDom = u(evtA.target as HTMLElement)
      
      // console.log('target-col',targetDom.data('col'))
      // console.log('target-row',targetDom.data('row'))
      const targetDomCol = targetDom.data('col')
      const targetDomRow = targetDom.data('row')

      const label = targetDom.data('label')
      const cellA = curSheet.contMap.get(label)

      if(evtA.button === 2 && curSheet.isInSelCellsBylabel(label)){
        // 右键点击，不执行后续操作
        return
      }

      if(targetDomCol === 0 || targetDomRow === 0){
        curSheet.firstCell = undefined
        // 点击边界cell
        // console.log('curSheet.selCells',curSheet.selCells)
        if(targetDomCol === 0 && targetDomRow === 0){
          // 点击到total
          const tempCells = Array.from(curSheet.contMap).map(item=>{
            const [ _,cell ] = item
            return cell
          })
          curSheet.selCells = [tempCells[0],tempCells[tempCells.length-1]]
        }else if(targetDomCol === 0){
          const tempCells = Array.from(curSheet.contMap).filter(itemA=>{
            const [_,cell] = itemA
            return cell.row === targetDomRow 
          }).map(itemB=>{
            const [ _,cell ] = itemB
            return cell
          })
          curSheet.selCells = [tempCells[0],tempCells[tempCells.length-1]]
          // 点击到左侧行
        }else if(targetDomRow === 0){
          // 点击到上侧列
          const tempCells = Array.from(curSheet.contMap).filter(itemA=>{
            const [_,cell] = itemA
            return cell.col === targetDomCol 
          }).map(itemB=>{
            const [ _,cell ] = itemB
            return cell
          })
          curSheet.selCells = [tempCells[0],tempCells[tempCells.length-1]]
        }
        return
      }else{
        // 清空选中的cell
        curSheet.selCells = []
        curSheet.firstCell = cellA
      }
      

      curSheet.selCells = [cellA]
      curSheet.forceUpdateRect()

      EventEmitterIns.emit('setting',{
        type:'cell-label-input',
        data:cellA
      })
      
      // 可能多选
      eventDom.on('mouseover',(evtB:MouseEvent)=>{
        // 只需找出第二个点即可
        let tempAllCells = [] // 记录所有选中的cell
        let mergeStartArr = []

        // curSheet.selCells.forEach(item=>{
        //   const mergeStartLabel = item.getMergeStartLabel()
        //   if(item.isMerge && mergeStartArr.findIndex(it=>it.label === mergeStartLabel) === -1){
        //     mergeStartArr.push(curSheet.contMap.get(mergeStartLabel))
        //   }
        // })

        

        curSheet.selCells = [cellA]
        const targetOverDom = u(evtB.target as HTMLElement)
        // console.log('targetOverDom',targetOverDom)
        // 获取第二个cell，根据这个cell计算选中的所有cell
        const label = targetOverDom.data('label')
        const cellB = curSheet.contMap.get(label)
        if(!cellB){
          return
        }

        const diffCol = cellB.col - cellA.col
        const diffRow = cellB.row - cellA.row

        for(let i=cellA.row;diffRow>0?i<=cellB.row:i>=cellB.row;diffRow>0?i++:i--){
          for(let j=cellA.col;diffCol>0?j<=cellB.col:j>=cellB.col;diffCol>0?j++:j--){
            const cell = curSheet.contMap.get(getExcelHeaderName(j)+i)
            tempAllCells.push(cell)
            const mergeStartLabel = cell.getMergeStartLabel()
            if(cell.isMerge && mergeStartArr.findIndex(it=>it.label === mergeStartLabel) === -1){
              mergeStartArr.push(curSheet.contMap.get(mergeStartLabel))
            }
          }
        }

        if(diffRow === 0 && diffCol === 0){
          curSheet.selCells = [cellA]
        }else{
          // 排序
          if(mergeStartArr.some(cellItem=>cellItem.isMerge)){
            curSheet.selCells = this.getCellsInMerge(tempAllCells)
          }else{
            curSheet.selCells = this.getDiagonal([cellA,cellB])
          }
        }

        // console.log('curSheet.selCells',curSheet.selCells)
        curSheet.selCells.length > 0 && curSheet.forceUpdateRect()
      })
      eventDom.one('mouseup',(evtC:MouseEvent)=>{
        eventDom.off('mouseover')
        // console.log('evt',evtC)
      })
    })
  }

}