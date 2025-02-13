interface IImg {
  imgId:String,
  url:HTMLImageElement
}

export interface ICell{
  row:Number,
  col:Number,
  x:Number,
  y:Number,
  width:Number,
  height:Number,
  fontSize:Number | String
  fontWeight:String
  fontItalic:String
  fontFamily:String
  textAlign:String
  textBaseline:String
  strikethrough:Boolean
  underline:Boolean,
  label:String,
  img:Array<IImg>
}