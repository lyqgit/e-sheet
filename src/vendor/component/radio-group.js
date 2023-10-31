export default class RadioGroup extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback(){
        this.value = this.getAttribute('value')
        const shadowDom = this.attachShadow({mode:'open'})
        const slotDom = document.createElement('slot')
        this.className = 'e-sheet-radio-group'
        shadowDom.appendChild(slotDom)
        shadowDom.addEventListener('e-sheet-radio-group-change',evt=>{
            // console.log('e-sheet-radio-group',evt)
            this.value = evt.detail;
            (new Array(this.childElementCount)).fill(undefined).forEach((_,index)=>{
                this.children.item(index).setAttribute('current',this.value)
            })
            shadowDom.dispatchEvent(new CustomEvent('e-sheet-radio-group-onchange', {
                bubbles: false,
                composed: true,
                detail: this.value
            }));
            // console.log('this.shadowRoot',this.childNodes)
        })
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-group',name,oldValue,newValue,this.childElementCount)
        this.value = newValue;
        (new Array(this.childElementCount)).fill(undefined).forEach((_,index)=>{
            this.children.item(index).setAttribute('current',this.value)
        })

    }
}

customElements.define("e-sheet-radio-group", RadioGroup)