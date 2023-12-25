import { h } from '../../util/dom.js'

export default class LoadingCup extends HTMLElement {

    connectedCallback(){
        this.className = 'e-sheet-loading-cup-layout'
        const cup = h('div',{
            attr:{
                className:'cup'
            }
        },[
            h('div',{
                attr:{
                    className:'handle'
                }
            })
        ])

        this.appendChild(cup)
    }

}

customElements.define("e-sheet-loading-cup", LoadingCup)