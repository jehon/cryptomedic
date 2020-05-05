
import { spacing } from '../../config.js';

const button = Symbol('button');

/**
 * Slot[]: content
 * level: default / primary / success / info / warning / danger
 *     https://getbootstrap.com/docs/3.3/css/#buttons-options
 */
export default class XButton extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'level'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <css-inherit></css-inherit>
            <style css-inherit-local>
                :host {
                    display: inline-block;
                    background-color: rgba(0,0,0,0);
                }

                button {
                    height: 3em;
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
            <button class='btn btn-primary'>
                <img src=''><slot></slot>
            </button>
        `;
        this[button] = this.shadowRoot.querySelector('button');
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'icon':
                this.shadowRoot.querySelector('img').setAttribute('src', `/static/img/${newValue}`);
                break;
            case 'level':
                this[button].classList.forEach(c => {
                    if (c.startsWith('btn-'))
                        this[button].classList.remove(c);
                });
                this[button].classList.add('btn-' + newValue);
                break;
        }
    }
}
window.customElements.define('x-button', XButton);
