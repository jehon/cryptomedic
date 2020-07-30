
import { spacing } from '../../config.js';
import { defineCustomElement } from '../../js/custom-element.js';
import { toAttributeCase } from '../../js/string-utils.js';

/**
 * Slot[]: content
 */
export default class XMessage extends HTMLElement {
    static get observedAttributes() {
        return [ 'level' ];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    box-sizing: border-box;
                    width: 100%;
                    margin-bottom: ${spacing.element};

                    padding: calc(${spacing.text} * 3);
                    text-align: center;

                    border: 1px solid transparent;
                    border-radius: 4px;

                }
            </style>
            <slot></slot>
        `;
        this.refresh();
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        this.refresh();
    }

    refresh() {
        const level = this.getAttribute('level');
        switch(level) {
            case '':
                break;
            case 'success':
                this.style.color = '#3c763d';
                this.style.backgroundColor = '#dff0d8';
                this.style.borderColor = '#d6e9c6';
                break;
            case 'warning':
                this.style.color = '#8a6d3b';
                this.style.backgroundColor = '#fcf8e3';
                this.style.borderColor = '#faebcc';
                break;
            case 'danger':
                this.style.color = '#a94442';
                this.style.backgroundColor = '#f2dede';
                this.style.borderColor = '#ebccd1;';
                break;
            default:
                console.info(toAttributeCase(XMessage.name) + ': Level not found: ', level);
        }
    }
}

defineCustomElement(XMessage);
