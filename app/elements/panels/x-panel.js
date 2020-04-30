
import '../../../node_modules/css-inherit/css-inherit.js';

/**
 * Slot[]: content
 */
export default class XPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <css-inherit></css-inherit>
            <style css-inherit-local>
                :host {
                    width: 100%;
                    height: 100%;

                    /* absolute will be relative to panel */
                    position: relative;
                    display: block;
                }

                :host > slot {
                    display: flex;
                    width: 100%;
                    height: 100%;

                    flex-direction: column;
                    align-items: center; 
                    justify-content: center;
                }
            </style>
            <slot></slot>
        `;
    }
}

window.customElements.define('x-panel', XPanel);
