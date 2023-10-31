export default class IconSvg extends HTMLElement{
    constructor() {
        super();
    }


    connectedCallback(){
        this.category = this.getAttribute('category')
        this.position = this.getAttribute('position')
        this.className = 'e-sheet-cell-svg-layout'
        if(this.category === 'hor'){
            switch (this.position){
                case 'left':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00059"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00059)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4H3V8h7v1Zm0 8H3v-1h7v1Zm7-4v-1H3v1h14Z"></path></g></svg>'
                    return
                case 'center':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00035"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00035)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1ZM7 9h6V8H7v1Zm10 4H3v-1h14v1Zm-4 4H7v-1h6v1Z"></path></g></svg>'
                    return;
                case 'right':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00066"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00066)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4h7V8h-7v1Zm7 3v1H3v-1h14Zm0 5h-7v-1h7v1Z"></path></g></svg>'
                    return;
            }
        }
    }

}

customElements.define("e-sheet-icon-svg", IconSvg)