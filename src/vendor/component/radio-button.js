
export default class RadioButton extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.label = this.getAttribute('label')
        this.value = this.getAttribute('value')
        this.className = 'e-sheet-radio-button'
        const shadowDOM = this.attachShadow({ mode: 'open' });
        const slotDom = document.createElement('slot')
        shadowDOM.addEventListener('click',evt=>{
            // console.log('evt',evt,this.value)
            shadowDOM.dispatchEvent(new CustomEvent('e-sheet-radio-group-change', {
                bubbles: true,
                composed: true,
                detail: this.value
            }));
            // shadowDOM.dispatchEvent(new CustomEvent('e-sheet-radio-button-change', {
            //     bubbles: true,
            //     composed: true,
            //     detail: this.value
            // }));

        })
        shadowDOM.appendChild(slotDom);
    }

    static get observedAttributes() {
        return ['current'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-button',name,oldValue,newValue,this.value)
        if(this.value === newValue){
            this.className = 'e-sheet-radio-button e-sheet-radio-button-selected'
        }else{
            this.className = 'e-sheet-radio-button'
        }
    }


}

customElements.define("e-sheet-radio-button", RadioButton)