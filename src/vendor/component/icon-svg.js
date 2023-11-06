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

        if(this.category === 'font'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'weight':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00081"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00081)"><path fill="currentColor" d="M5.8 3.05a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h5.5c2.297 0 3.75-1.862 3.75-4 0-1.415-.637-2.71-1.734-3.423.734-.635 1.234-1.588 1.234-2.827 0-2.424-1.91-3.75-3.75-3.75h-5Zm5 6H6.55v-4.5h4.25c1.16 0 2.25.796 2.25 2.25s-1.09 2.25-2.25 2.25Zm-4.25 1.5h4.75c1.314 0 2.25 1.027 2.25 2.5s-.936 2.5-2.25 2.5H6.55v-5Z" data-spm-anchor-id=""></path></g></svg>'
                    return;
                case 'italic':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20" data-spm-anchor-id=""><defs><clipPath id="master_svg0_7600_9375"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_9375)"><path fill="currentColor" d="M12 4h3V3H8v1h2.769l-2.77 12H5v1h7v-1H9.231l2.77-12Z"></path></g></svg>'
                    return;
            }
        }

        if(this.category === 'cell'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'merge':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31608_94416"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31608_94416)"><path fill="#0089FF" d="M15 10.5H5v-1h10v1Z"></path><path fill="currentColor" d="M6.5 3A1.5 1.5 0 0 1 8 4.5V6H7V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h1v1.5A1.5 1.5 0 0 1 6.5 17h-2A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3h2Zm7 0A1.5 1.5 0 0 0 12 4.5V6h1V4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14h-1v1.5a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3h-2Z"></path></g></svg>'
                    return;
                case 'split':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31608_94446"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31608_94446)"><path fill="currentColor" fill-rule="evenodd" d="M4 4.5A1.5 1.5 0 0 1 5.5 3h2A1.5 1.5 0 0 1 9 4.5v11A1.5 1.5 0 0 1 7.5 17h-2A1.5 1.5 0 0 1 4 15.5V14h1v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V6H4V4.5ZM16 4.5A1.5 1.5 0 0 0 14.5 3h-2A1.5 1.5 0 0 0 11 4.5v11a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V14h-1v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V6h1V4.5Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M7 10.5H4v-1h3v1ZM16 10.5h-3v-1h3v1Z"></path><path fill="#0089FF" d="m18 10-3-2.5v5l3-2.5ZM2 10l3-2.5v5L2 10Z"></path></g></svg>'
                    return;
            }
        }
    }

}

customElements.define("e-sheet-icon-svg", IconSvg)