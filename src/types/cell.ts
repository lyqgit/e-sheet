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
  fontSize:string
  fontWeight:string
  fontItalic:string
  fontFamily:string
  textAlign:string
  textBaseline:string
  strikethrough:Boolean
  underline:Boolean,
  label:string,
  img:Array<Img>
}

export interface ICell extends IBaseCell{

}

export interface ICellOption extends IBaseCell{

}