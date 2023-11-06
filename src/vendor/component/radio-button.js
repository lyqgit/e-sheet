
export default class RadioButton extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.label = this.getAttribute('label')
        this.value = this.getAttribute('value')
        this.className = 'e-sheet-radio-button'
        const shadowDOM = this.attachShadow({ mode: 'open' });
        let tipDom = document.createElement('div')
        tipDom.className = 'e-sheet-radio-button-tip'
        tipDom.innerText = this.label
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
        this.addEventListener('mouseover',evt=>{
            // console.log('evt',this.getBoundingClientRect())
            if(!document.body.contains(tipDom)){
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                const {x,y} = this.getBoundingClientRect()
                tipDom.style.left = x - this.label.length*12/2 + 4 + scrollLeft +'px'
                tipDom.style.top = y+scrollTop+24+'px'
                document.body.appendChild(tipDom)
            }

        })
        this.addEventListener('mouseleave',evt=>{
            tipDom.remove()
            // console.log(tipDom)
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