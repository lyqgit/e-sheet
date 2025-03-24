export interface Img {
  imgId:string,
  url:HTMLImageElement
}

export interface IBaseJsonCell{
  row?:number,
  col?:number,
  x?:number,
  y?:number,
  width?:number,
  height?:number,
  fontSize?:number
  fontWeight?:string
  fontItalic?:string
  fontFamily?:string
  textAlign?:string
  textBaseline?:string
  strikethrough?:Boolean
  underline?:Boolean,
  textWrapType?:string
  label?:string,
  img?:Array<Img>
  text?:string
  fontColor?:string
  bgColor?:string
}

export interface IBaseCell{
  row:number,
  col:number,
  x:number,
  y:number,
  width:number,
  height:number,
  fontSize?:number
  fontWeight?:string
  fontItalic?:string
  fontFamily?:string
  textAlign?:string
  textBaseline?:string
  strikethrough?:Boolean
  underline?:Boolean,
  textWrapType?:string
  label:string,
  img:Array<Img>
  text?:string
  fontColor?:string
  bgColor?:string
}

export interface ICell extends IBaseCell{
  drawContRect(reX:number,reY:number,textWrapType:string):void
  drawHeaderColRect(reX:number,color?:string):void
  drawHeaderRowRect(reY:number,color?:string):void
  clearRect(startX:number,startY:number,endX:number,endY:number):void
  isMerge:boolean
  isStartMergeLabel:boolean
  mergeLabel:string
}

export interface ICellOption extends IBaseCell{

}