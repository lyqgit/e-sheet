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
}

export interface ICell extends IBaseCell{
  drawStrokeRect(reX:number,reY:number):void
  drawHeaderColStrokeRect(reX:number):void
  drawHeaderRowStrokeRect(reY:number):void
}

export interface ICellOption extends IBaseCell{

}