export default class IconColorSvg extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){
        this.category = this.getAttribute('category')
        this.color = this.getAttribute('color')

        this.className = 'e-sheet-icon-color-svg'

        const svgLayoutDom = document.createElement('div')
        svgLayoutDom.onclick = evt=>{
            this.querySelector('svg').querySelectorAll('path').forEach(item=>{
                if(item.getAttribute('fill') !== 'currentColor'){
                    this.dispatchEvent(new CustomEvent('e-sheet-icon-color-svg-onchange', {
                        bubbles: false,
                        composed: true,
                        detail: item.getAttribute('fill')
                    }))
                }
            })
        }
        const selectArrowLayoutDom = document.createElement('div')
        const selectArrowDom = document.createElement('e-sheet-icon-svg')
        selectArrowDom.setAttribute('category','select')
        selectArrowDom.setAttribute('position','down')
        selectArrowDom.style.transition = 'transform .5s'
        selectArrowLayoutDom.appendChild(selectArrowDom)

        const inputColorDom = document.createElement('input')
        inputColorDom.className = 'no-draw-input'
        inputColorDom.type = 'color'
        inputColorDom.oninput = evt=>{
            this.setAttribute('color',evt.target.value)
            this.dispatchEvent(new CustomEvent('e-sheet-icon-color-svg-onchange', {
                bubbles: false,
                composed: true,
                detail: evt.target.value
            }))
        }

        selectArrowLayoutDom.appendChild(inputColorDom)

        selectArrowLayoutDom.className = 'arrow-layout'

        selectArrowLayoutDom.onclick = evt=>{
            selectArrowDom.style.transform = 'rotate(180deg)'
            inputColorDom.click()
        }

        document.addEventListener('click',evt=>{
            // console.log('evt-document',evt)
            if(!this.contains(evt.target)){
                selectArrowDom.style.transform = 'rotate(0deg)'
            }
        })

        svgLayoutDom.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'

        if(this.category === 'font-color'){
            svgLayoutDom.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" data-spm-anchor-id=""><defs><clipPath id="master_svg0_23880_31533"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_23880_31533)"><path fill="#000000" d="M17 19H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.14" d="M17 19.5q.621 0 1.06-.44.44-.439.44-1.06t-.44-1.06q-.439-.44-1.06-.44H3q-.621 0-1.06.44-.44.439-.44 1.06t.44 1.06q.439.44 1.06.44h14Zm0-.5H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.94" d="m12.456 11 1.584 3.697a.5.5 0 0 0 .92-.394l-1.715-4-2.785-6.5a.5.5 0 0 0-.92 0l-2.785 6.5-1.714 4a.5.5 0 0 0 .919.394L7.544 11h4.912Zm-.429-1H7.973L10 5.27 12.027 10Z"></path></g></svg>'
        }else if(this.category === 'bg-color'){
            svgLayoutDom.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31391_75878"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31391_75878)"><path fill="currentColor" fill-opacity="0.94" fill-rule="evenodd" d="M9.718 1.843 5.857 5.704h-3.87v1h2.87L3.354 8.207q-.44.44-.44 1.061t.44 1.06l4.95 4.95q.439.44 1.06.44t1.06-.44l6.365-6.364q.44-.439.44-1.06 0-.622-.44-1.061l-4.95-4.95q-.44-.44-1.06-.44-.622 0-1.061.44ZM11.5 6.704H6.271l-2.21 2.21q-.147.147-.147.354t.147.354l.531.531 10.315-.771 1.175-1.175q.146-.146.146-.353t-.146-.354l-4.95-4.95q-.147-.146-.354-.146t-.353.146L7.27 5.704H11.5v1Zm5.088 8.442c.78 0 1.412-.632 1.412-1.411q0-.78-1.412-2.353-1.412 1.573-1.412 2.353c0 .78.633 1.411 1.412 1.411Z"></path><path fill="#F2C150" d="M17 19H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.14" d="M17 19.5q.621 0 1.06-.44.44-.439.44-1.06t-.44-1.06q-.439-.44-1.06-.44H3q-.621 0-1.06.44-.44.439-.44 1.06t.44 1.06q.439.44 1.06.44h14Zm0-.5H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path></g></svg>'
        }

        this.appendChild(svgLayoutDom)
        this.appendChild(selectArrowLayoutDom)
    }

    static get observedAttributes() {
        return ['color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-button',name,oldValue,newValue,this.value)
        this.color = newValue
        this.querySelector('svg').querySelectorAll('path').forEach(item=>{
            if(item.getAttribute('fill') !== 'currentColor'){
                item.setAttribute('fill',newValue)
            }
        })
    }

}

customElements.define("e-sheet-icon-color-svg", IconColorSvg)