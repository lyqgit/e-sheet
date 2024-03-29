<p align="center">
	<img alt="e-sheet" width="132" style="max-width:40%;min-width:60px;" src="./assets/logo.svg" />
</p>
<h1 align="center" style="margin: 0 0 20px; font-weight: bold;">e-sheet</h1>
<h4 align="center">web excel</h4>

<p align="center">
    <a href="https://github.com/lyqgit/e-sheet/tree/main/README.md">English</a>&nbsp;&nbsp;
    <a href="https://github.com/lyqgit/e-sheet/tree/main/README.zh-hans.md">简体中文</a>&nbsp;&nbsp;
</p>

## introduction

* using Canvas to draw Excel tables, supporting some basic table operation functions, and supporting copying and pasting data with Alibaba in Excel documents and WPS

![example](assets/example1.jpg)

## preview

<p>
    <a href="https://lyqgit.github.io">https://lyqgit.github.io</a>
</p>

## install

```

npm i e-sheet

```

## use

```

// es

import eSheet from 'e-sheet'
import 'e-sheet/dist/css/index.css'

const excel = new eSheet('#elt',{
    width:1200,
    height:800
})


// umd

<link rel="stylesheet" href="dist/css/index.css">
<script lang="javascript" src="dist/e-sheet.umd.js"></script>

const excel = new eSheet('#elt',{
    width:1200,
    height:800
})

```

## collaborative services

```

cd ./server/multi-person-collaboration

cargo run

```

## api

|   function name    |      ability       |  param   |                              example                               |
|:------------------:|:------------------:|:--------:|:------------------------------------------------------------------:|
|   exportXlsxData   |       export       |   none   | [{label:"sheet1",sheet:{!ref:"D10",D10:{t:"s",v:"test content"}}}] |
| stepCallbackHandle |   step callback    | callback |         excel.stepCallbackHandle((obj)=>{console.log(obj))         |
|    fresh           |     fresh all      |   none   |                                void                                |
|    freshContent    |   fresh content    |   none   |                                void                                |
|  connectWebSocket  | connnect websocket |   addr   |                                          ws://192.168.31.208:8091                      |
|    drawExcel     |    import data     |  books   | [{"id":1703748720496,"label":"Sheet1","sheet":[{"row":1,"col":1,"text":"","textAsNumber":null,"width":120,"height":40,"x":0,"y":0,"ltX":40,"ltY":40,"mergeWidth":0,"mergeHeight":0,"mergeRow":1,"mergeCol":1,"mergeStartLabel":"","mergeEndLabel":"","mergeLabelGroup":[],"isMerge":false,"bgColor":"#ffffff","fontColor":"#000000","font":null,"fontSize":12,"fontWeight":"","fontItalic":"","fontFamily":"Calibre","textAlign":"center","textBaseline":"middle","strikethrough":"","underline":"","label":"A1"}]}] |

## function

- [x] single choice
- [x] multiple choice
- [x] copy
- [x] paste
- [x] painter
- [x] merge
- [x] split
- [x] drag
- [x] add row
- [x] add col
- [x] font-family
- [x] font-color
- [x] background-color
- [x] horizontal-alignment
- [x] vertical-alignment
- [x] strikethrough
- [x] underline
- [x] export-data
- [x] import-data
- [x] forward
- [x] fallback