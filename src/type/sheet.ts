
export type SheetConfig = {
    /**
     * @description cut-截断  wrap-换行
     */
    textWrapType:String | 'cut' | 'wrap'
}

export type SheetCell = {
    row:Number,
    col:Number,
    text:String,
    textAsNumber:Number,
    width:Number,
    height:Number,
    mergeRow:Number,
    mergeCol:Number,
    isMerge:Boolean,
    bgColor:String,
    fontColor:String,
    fontSize:Number,
    fontWeight:String,
    fontItalic:String,
    fontFamily:String,
    textAlign:String,
    textBaseline:String,
    strikethrough:Boolean,
    underline:Boolean,
    label:String
}

export type WorkBook = {
    id:Number,
    name: String,
    sheet:Array<SheetCell>,
    curLabel: String,
    stepArr:Array<StepObj>,
    stepNum:Number,
    config:SheetConfig,
    row:Number,
    col:Number
}

type StepObj = {
    pre:Object | String,
    next:Object | String
}
