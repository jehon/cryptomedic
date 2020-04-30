
import { spacing, colors } from '../../config.js';

/**
 * Slot[]: content
 */
export default class XButton extends HTMLElement {
    static get observedAttributes() {
        return ['icon'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <css-inherit></css-inherit>
            <style css-inherit-local>
                :host {
                    display: inline-block;

                    height: 1.5em;

                    margin: ${spacing.element};
                    padding: 16px 30px;
                    border: none;
                    border-radius: ${spacing.element};

                    cursor: pointer;
                    text-align: center;

                    font-size: 16px;

                    color: ${colors.actions.default.fg};
                    background-color: ${colors.actions.default.bg};
                }

                :host([level=secondary]) {
                    color: ${colors.actions.secondary.fg};
                    background-color: ${colors.actions.secondary.bg};
                }

                :host([level=dangerous]) {
                    color: ${colors.actions.dangerous.fg};
                    background-color: ${colors.actions.dangerous.bg};
                }
                
                img[src=''] {
                    display: none;
                }

                img {
                    height: 1.5em;
                    vertical-align: middle;
                    padding-right: ${spacing.element};
                }
            </style>
            <img src=''><slot></slot>
        `;
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'icon':
                this.shadowRoot.querySelector('img').setAttribute('src', `/static/img/${newValue}`);
                break;
        }
    }
}
window.customElements.define('x-button', XButton);
