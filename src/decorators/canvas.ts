import { IGlobalCanvas,ICanvas } from '@/types'


const globalCanvas:IGlobalCanvas = {
  canvas:null,
  canvasDom:null
}

export function GlobalCanvas(target:Function){
  console.log('target',target)
  target.prototype.layer = globalCanvas.canvas
  target.prototype.canvasDom = globalCanvas.canvasDom
}


export function addGlobalCanvas(option:IGlobalCanvas){
  globalCanvas.canvas = option.canvas
  globalCanvas.canvasDom = option.canvasDom
}

