import { ICell, ICellOption, Img } from "@/types";

export class Cell implements ICell{
  constructor(option:ICellOption){
    this.col = option.col
    this.row = option.row
    this.x = option.x
    this.y = option.y
    this.width = option.width
    this.height = option.height
    this.fontSize = option.fontSize
    this.fontWeight = option.fontWeight
    this.fontItalic = option.fontItalic
    this.fontFamily = option.fontFamily
    this.textAlign = option.textAlign
    this.textBaseline = option.textBaseline
    this.strikethrough = option.strikethrough
    this.underline = option.underline
    this.label = option.label
    this.img = option.img
  }
  row: number;
  col: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: string;
  fontWeight: string;
  fontItalic: string;
  fontFamily: string;
  textAlign: string;
  textBaseline: string;
  strikethrough: Boolean;
  underline: Boolean;
  label: string;
  img: Img[];

}