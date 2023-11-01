export default class Option extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.label = this.getAttribute('label')
        this.value = this.getAttribute('value')
        this.current = this.getAttribute('current')

        this.className = 'e-sheet-option'

        const fontDom = document.createElement('div')

        fontDom.className = 'option-font'
        fontDom.innerText = this.label

        const statusDom = document.createElement('e-sheet-icon-svg')

        // console.log('this.value !== this.current',this.value !== this.current,this.current,this.value)

        if(this.value !== this.current){
            statusDom.style.display = 'none'
        }

        statusDom.setAttribute('category','bool')
        statusDom.setAttribute('position','true')

        this.appendChild(fontDom)
        this.appendChild(statusDom)

        this.addEventListener('click',evt=>{
            // console.log('点击option')
            evt.stopImmediatePropagation()
            this.dispatchEvent(new CustomEvent('e-sheet-option-onchange',{
                bubbles: true,
                composed: true,
                detail: this.value
            }))
        })


    }

}

customElements.define("e-sheet-option", Option)