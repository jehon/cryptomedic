
import { defineCustomElement } from '../../app/js/custom-element.js';

export default class XxTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h2>title</h2>
            <slot></slot>
            <div id='code'></div>
            <style>
                #code {
                    font-size: 8px;
                    padding-top: 10px;
                }
            </style>
        `;
    }

    connectedCallback() {
        const code = this.innerHTML;

        this.shadowRoot.querySelector('#code').innerHTML = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        if (!this.hasAttribute('title')) {
            const topEl = this.querySelector('*');
            if (topEl) {
                const topElName = topEl.tagName.toLowerCase();
                this.setAttribute('title', topElName);
            } else {
                this.setAttribute('title', '...');
            }
        }
        this.shadowRoot.querySelector('h2').innerHTML = this.getAttribute('title');
    }
}

defineCustomElement(XxTest);

