export interface Img {
  imgId:string,
  url:HTMLImageElement
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
}

export interface ICell extends IBaseCell{
  drawContRect(reX:number,reY:number):void
  drawHeaderColRect(reX:number):void
  drawHeaderRowRect(reY:number):void
  clearRect(startX:number,startY:number,endX:number,endY:number):void
}

export interface ICellOption extends IBaseCell{

}