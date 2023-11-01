export default class IconSvg extends HTMLElement{
    constructor() {
        super();
    }


    connectedCallback(){
        this.category = this.getAttribute('category')
        this.position = this.getAttribute('position')

        if(this.category === 'hor'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position){
                case 'left':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00059"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00059)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4H3V8h7v1Zm0 8H3v-1h7v1Zm7-4v-1H3v1h14Z"></path></g></svg>'
                    return
                case 'start':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00059"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00059)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4H3V8h7v1Zm0 8H3v-1h7v1Zm7-4v-1H3v1h14Z"></path></g></svg>'
                    return
                case 'center':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00035"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00035)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1ZM7 9h6V8H7v1Zm10 4H3v-1h14v1Zm-4 4H7v-1h6v1Z"></path></g></svg>'
                    return;
                case 'right':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00066"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00066)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4h7V8h-7v1Zm7 3v1H3v-1h14Zm0 5h-7v-1h7v1Z"></path></g></svg>'
                    return;
                case 'end':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00066"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00066)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4h7V8h-7v1Zm7 3v1H3v-1h14Zm0 5h-7v-1h7v1Z"></path></g></svg>'
                    return;
            }
        }
        if(this.category === 'ver'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'top':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00213"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00213)"><path fill="currentColor" d="M17 4H3V3h14v1Z"></path><path fill="#0089FF" d="m10.013 6 3.487 4h-7l3.513-4Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 9v8h-1V9h1Z"></path></g></svg>'
                    return;
                case 'middle':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00207"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00207)"><path fill="currentColor" d="M17 10H3V9h14v1Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 1v5h-1V1h1Z"></path><path fill="#0089FF" d="m10.01 8 2.49-3h-5l2.51 3ZM10.01 11l2.49 3h-5l2.51-3Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 14v4h-1v-4h1Z"></path></g></svg>'
                    return;
                case 'bottom':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00217"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00217)"><path fill="currentColor" d="M17 17H3v-1h14v1Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 3v8h-1V3h1Z"></path><path fill="#0089FF" d="m10.013 14 3.487-4h-7l3.513 4Z"></path></g></svg>'
                    return;
            }
        }

        if(this.category === 'bool'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position){
                case 'true':
                    this.innerHTML = '<svg fill="none" width="20" height="20" viewBox="0 0 20 20" class="wdn-icon"><path d="M16.354 6.854a.5.5 0 0 0-.708-.708L8.5 13.293 4.854 9.647a.5.5 0 1 0-.708.707l4 4a.5.5 0 0 0 .708 0l7.5-7.5Z" fill="currentColor"></path></svg>'
                return;
            }
        }

        if(this.category === 'select'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-12-12'
            switch (this.position){
                case 'down':
                    this.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" stroke="none" data-spm-anchor-id="" style=""><path d="M6.00004 7.79293L1.85359 3.64648L1.14648 4.35359L6.00004 9.20714L10.8536 4.35359L10.1465 3.64648L6.00004 7.79293Z" fill="currentColor" data-spm-anchor-id=""></path></svg>'
                return;
            }
        }
    }

}

customElements.define("e-sheet-icon-svg", IconSvg)