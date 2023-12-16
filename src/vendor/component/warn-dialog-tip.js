
export default class WarnDialogTip extends HTMLElement {

    show = false

    title = ''
    content = ''

    /**
     * @type {HTMLElement}
     */
    wrapperDom

    /**
     * @type {HTMLElement}
     */
    titleDom
    /**
     * @type {HTMLElement}
     */
    contentDom

    /**
     * @type {Boolean}
     */
    mounted = false

    connectedCallback(){
        this.show = this.getAttribute('show')
        this.title = this.getAttribute('t')
        this.content = this.getAttribute('content')

        this.className = 'e-sheet-warn-dialog-tip'
        this.wrapperDom = document.createElement('div')
        this.wrapperDom.className = 'e-sheet-warn-dialog-wrapper'
        this.titleDom = document.createElement('div')
        this.titleDom.className = 'e-sheet-warn-dialog-wrapper-title'
        this.contentDom = document.createElement('div')
        this.contentDom.className = 'e-sheet-warn-dialog-wrapper-content'

        const closeBtnDom = document.createElement('div')
        closeBtnDom.className = 'e-sheet-warn-dialog-tip-close-btn'
        closeBtnDom.addEventListener('click',_=>{
            this.setAttribute('show',false)
        })

        this.titleDom.innerText = this.title
        this.contentDom.innerText = this.content

        this.wrapperDom.append(this.titleDom)
        this.wrapperDom.append(this.contentDom)
        this.wrapperDom.append(closeBtnDom)

        this.append(this.wrapperDom)
        this.mounted = true

    }

    showDialog(){
        this.style.display = 'flex'
    }

    closeDialog(){
        this.style.display = 'none'
    }

    static get observedAttributes() {
        return ['show'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const newValueBoolean = JSON.parse(newValue)
        this.show = newValueBoolean
        if(newValueBoolean && this.mounted){
            this.title = this.getAttribute('t')
            this.content = this.getAttribute('content')
            this.titleDom.innerText = this.title
            this.contentDom.innerText = this.content
            this.showDialog()
        }else{
            this.closeDialog()
        }
    }

}

customElements.define("e-sheet-warn-dialog-tip", WarnDialogTip)