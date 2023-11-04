
export default class Tip extends HTMLElement {
    connectedCallback(){
        this.tipLabel = this.getAttribute('tip-label')
        this.left = parseInt(this.getAttribute('left'))
        this.top = parseInt(this.getAttribute('top'))
        let tipDom = document.createElement('div')
        tipDom.className = 'e-sheet-radio-button-tip'
        tipDom.innerText = this.tipLabel

        this.className = 'e-sheet-tip'

        this.addEventListener('mouseover',evt=>{
            // console.log('evt',this.getBoundingClientRect())
            if(!tipDom){
                tipDom = document.createElement('div')
                tipDom.className = 'e-sheet-radio-button-tip'
                tipDom.innerText = this.label
            }
            const {x,y} = this.getBoundingClientRect()
            tipDom.style.left = x+this.left+'px'
            tipDom.style.top = y+this.top+'px'
            document.body.appendChild(tipDom)
        })
        this.addEventListener('mouseleave',evt=>{
            tipDom.remove()
        })
    }
}

customElements.define("e-sheet-tip", Tip)