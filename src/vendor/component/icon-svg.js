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
                case 'strikethrough':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="b33801_0"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#b33801_0)"><path fill="currentColor" d="M11.276 11h2.133c.222.192.42.419.584.694.672 1.125.684 2.469-.01 3.535-.697 1.07-2.04 1.771-3.91 1.771-1.935 0-3.102-.915-3.765-1.934-.642-.986-.808-2.058-.808-2.466h1c0 .242.125 1.12.646 1.921.501.77 1.37 1.479 2.927 1.479 1.621 0 2.604-.598 3.072-1.316.47-.722.481-1.653-.01-2.478-.244-.408-.62-.68-1.18-.934a10.414 10.414 0 0 0-.679-.272ZM3 10h14V9H3v1Zm4.115-6.016C7.87 3.329 8.92 3 10.073 3c2.058 0 3.631 1.518 3.984 3.669l-.987.162C12.783 5.082 11.564 4 10.073 4c-.972 0-1.77.278-2.304.74-.523.452-.832 1.113-.788 1.985.014.275.07.513.156.721.083.204.198.387.339.554H6.29a3.168 3.168 0 0 1-.307-1.225c-.06-1.163.364-2.127 1.132-2.791Z"></path></g></svg>'
                    return;
                case 'underline':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="9fa4b3_0"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#9fa4b3_0)"><path fill="currentColor" d="M3 17v1h13v-1H3Zm3-6.5V3H5v7.5a4.5 4.5 0 1 0 9 0V3h-1v7.5a3.5 3.5 0 1 1-7 0Z"></path></g></svg>'
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

        if(this.category === 'book'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'menu':
                    this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-spm-anchor-id=""><path d="M6 5H18V4H6V5ZM18 10H6V9H18V10ZM18 15H6V14H18V15ZM2 5H4V4H2V5ZM4 10H2V9H4V10ZM4 15H2V14H4V15Z" fill="rgba(40,50,72,1)"></path></svg>'
                    return;
                case 'plus':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_30306_58308"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_30306_58308)"><path fill="currentColor" fill-opacity="0.94" d="M9.5 4.5v5h-5a.5.5 0 0 0 0 1h5v5a.5.5 0 0 0 1 0v-5h5a.5.5 0 0 0 0-1h-5v-5a.5.5 0 0 0-1 0Z"></path></g></svg>'
                return;
                case 'arrow-left':
                    this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="wdn-icon" data-spm-anchor-id=""><path d="m12.646 3.646.708.708L7.707 10l5.647 5.646-.707.708L6.292 10l6.353-6.354Z" fill="currentColor"></path></svg>'
                return;
                case 'arrow-right':
                    this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="wdn-icon"><path d="m7.353 3.646-.707.708L12.293 10l-5.647 5.646.707.708L13.707 10 7.353 3.646Z" fill="currentColor"></path></svg>'
                    return;
            }
        }

        if(this.category === 'step'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'forward':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20" data-spm-anchor-id=""><defs><clipPath><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#___SVG_ID__50__0___)"><path fill="currentColor" fill-opacity="0.94" d="M16.3 6H7.988C4.975 6 3 8.22 3 11s1.975 5 4.988 5h4.168v1H7.988C4.388 17 2 14.296 2 11s2.387-6 5.988-6h8.298l-2.14-2.147.708-.706 3.353 3.364-3.354 3.343-.706-.708L16.3 6Z"></path></g></svg>'
                    return;
                case 'fallback':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#___SVG_ID__49__0___)"><path fill="currentColor" fill-opacity="0.94" d="M6.354 2.353 3.714 5h8.298C15.612 5 18 7.704 18 11s-2.387 6-5.988 6H8v-1h4.012C15.025 16 17 13.78 17 11s-1.975-5-4.988-5H3.7l2.653 2.646-.706.708-3.854-3.843 3.853-3.864.708.706Z"></path></g></svg>'
                    return;

            }
        }

        if(this.category === 'text'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'cut':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#939411_0)"><path fill="#0089FF" d="M7 10h9v1H7v-1Z"></path><path fill="currentColor" d="M4 17V4H3v13h1ZM17 17V4h-1v13h1Z"></path></g></svg>'
                    return;
                case 'wrap':
                    this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#a74a80_0)"><path fill="#0089FF" d="M6 7h4.5a2.5 2.5 0 0 1 0 5H9v-2l-3 2.49L9 15v-2h1.5a3.5 3.5 0 1 0 0-7H6v1Z"></path><path fill="currentColor" fill-opacity="0.94" d="M4 17V4H3v13h1ZM17 17V4h-1v13h1Z"></path></g></svg>'
                    return;

            }
        }

        if(this.category === 'extra'){
            this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20'
            switch (this.position) {
                case 'cell-img':
                    this.innerHTML = '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-opacity="0.94" d="M2 18.5q0 1.035.732 1.768Q3.464 21 4.5 21h15q1.035 0 1.768-.732Q22 19.535 22 18.5v-13q0-1.036-.732-1.768Q20.535 3 19.5 3h-15q-1.036 0-1.768.732T2 5.5v13Zm1 0v-.993l3.705-3.705q.205-.205.495-.205.29 0 .495.205l2.398 2.398-3.8 3.8H4.5Q3 20 3 18.5Zm0-2.407V5.5Q3 4 4.5 4h15Q21 4 21 5.5v9.393l-3.598-3.598q-1.202-1.202-2.404 0L10.8 15.493l-2.398-2.398q-.498-.498-1.202-.498t-1.202.498L3 16.093Zm18 .214V18.5q0 1.5-1.5 1.5H7.707l7.998-7.998q.495-.495.99 0L21 16.307ZM8.914 9.914Q9.5 9.328 9.5 8.5t-.586-1.414Q8.328 6.5 7.5 6.5t-1.414.586Q5.5 7.672 5.5 8.5t.586 1.414q.586.586 1.414.586t1.414-.586Zm-.707-2.121q.293.293.293.707t-.293.707Q7.914 9.5 7.5 9.5t-.707-.293Q6.5 8.914 6.5 8.5t.293-.707Q7.086 7.5 7.5 7.5t.707.293Z"></path></svg>'
                    return;

            }
        }

    }

}

customElements.define("e-sheet-icon-svg", IconSvg)