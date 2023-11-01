export default class Select extends HTMLElement {
    constructor() {
        super();
    }

    optionLayoutDom = null

    isOpen = false

    /**
     * @type {HTMLElement}
     */
    showTextDom = null
    /**
     * @type {HTMLElement}
     */
    arrowDom = null

    close(){
        this.optionLayoutDom && this.optionLayoutDom.remove()
        this.optionLayoutDom = null
        this.isOpen = false
        this.arrowDom.style.transform = 'rotate(0deg)'
    }

    connectedCallback(){
        this.value = this.getAttribute('value')??12
        this.className = 'e-sheet-select'

        const showTextDom = document.createElement('div')

        showTextDom.innerText = this.value
        showTextDom.className = 'select-text'

        this.showTextDom = showTextDom

        const arrowDom = document.createElement('e-sheet-icon-svg')

        arrowDom.setAttribute('category','select')
        arrowDom.setAttribute('position','down')
        this.arrowDom = arrowDom

        arrowDom.style.transition = 'transform .5s'

        this.appendChild(showTextDom)
        this.appendChild(arrowDom)

        document.addEventListener('click',evt=>{
            // console.log('evt-document',evt)
            if(!this.contains(evt.target)){
                this.close()
            }
        })

        this.addEventListener('e-sheet-option-onchange',evt=>{
            // console.log('e-sheet-option-onchange-evt',evt)
            showTextDom.innerText = this.value = evt.detail
            this.dispatchEvent(new CustomEvent('e-sheet-select-onchange', {
                bubbles: false,
                composed: true,
                detail: this.value
            }));

            this.close()
            // console.log('this.optionLayoutDom',this.optionLayoutDom)
        })

        this.addEventListener('click',evt=>{

            evt.stopImmediatePropagation()
            // console.log('点击select')
            // console.log('this.optionLayoutDom.contains(evt.target)',this.optionLayoutDom && this.optionLayoutDom.contains(evt.target),evt.target)
            if(this.isOpen){
                this.close()
                return;
            }

            // console.log('this.optionLayoutDom-this.click',this.optionLayoutDom)

            if(this.optionLayoutDom && !this.optionLayoutDom.contains(evt.target)){
                return
            }
            this.isOpen = true
            arrowDom.style.transform = 'rotate(180deg)'
            this.optionLayoutDom = document.createElement('div');
            this.optionLayoutDom.className = 'e-sheet-option-layout';
            (new Array(10).fill(0).forEach((_,index)=>{
                const temp = document.createElement('e-sheet-option')
                temp.setAttribute('label',(12+index).toString())
                temp.setAttribute('value',12+index)
                temp.setAttribute('current',this.value)
                this.optionLayoutDom.appendChild(temp)
            }))
            // console.log('evt',this.getBoundingClientRect())
            const {y} = this.getBoundingClientRect()
            this.optionLayoutDom.style.left = 0+'px'
            this.optionLayoutDom.style.top = y+1+'px'
            this.appendChild(this.optionLayoutDom)

        })

    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-group',name,oldValue,newValue,this.childElementCount)
        this.value = newValue;
        this.showTextDom.innerText = this.value
    }

}

customElements.define("e-sheet-select", Select)