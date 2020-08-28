
import '../../../../node_modules/css-inherit/css-inherit.js';
import { defineCustomElement } from '../../../js/custom-element.js';
import { spacing } from '../../../config.js';

/**
 * Slot[]: content
 */
export default class XPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style css-inherit-local>
                :host {
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;

                    /* absolute will be relative to panel */
                    position: relative;
                    display: block;
                    padding: ${spacing.text};
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

defineCustomElement(XPanel);
