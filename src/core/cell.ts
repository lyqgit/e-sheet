import { ICell, ICellOption, Img } from "@/types";

export class Cell implements ICell{
  constructor(option:ICellOption){
    this.col = option.col
    this.row = option.row
    this.x = option.x
    this.y = option.y
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