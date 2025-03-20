
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
            // console.log('evt',this.firstChild.getBoundingClientRect())
            if(!document.body.contains(tipDom)){
                const tipLabelWidth = this.tipLabel.length * 12
                const diffY = -32
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                const {x,y,width} = this.getBoundingClientRect()
                tipDom.style.left = x+(width - tipLabelWidth - 12)/2+scrollLeft+'px'
                tipDom.style.top = y+diffY+scrollTop+'px'
                tipDom.style.zIndex = 300
                document.body.appendChild(tipDom)
            }

        })
        this.addEventListener('mouseleave',evt=>{
            tipDom.remove()
        })
    }
}

customElements.define("e-sheet-tip", Tip)