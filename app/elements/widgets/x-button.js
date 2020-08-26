
import { spacing, icons, levels } from '../../config.js';
import { defineCustomElement } from '../../js/custom-element.js';
import { setRoute } from '../../js/router.js';

const button = Symbol('button');

// TODO: restrict by auth -> extends XRestricted ?

/**
 * Slot[]: content
 * level: default / primary / success / info / warning / danger
 *     https://getbootstrap.com/docs/3.3/css/#buttons-options
 * to-route: the route where to go on click (if set)
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
                    width: 100%;
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
        this[button].addEventListener('click', () => {
            const toRoute = this.getAttribute('to-route');
            if (toRoute) {
                setRoute(toRoute);
            }
        });
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'icon':
                if (!(newValue in icons)) {
                    console.error(`Icon ${newValue} is not found in config.icons`);
                }
                this.shadowRoot.querySelector('img').setAttribute('src', icons[newValue]);
                break;
            case 'level':
                // !! could not have any other class on button, otherwise it will be wiped out :-)
                if (newValue == levels.discrete) {
                    this[button].className = 'btn';
                    this[button].style.backgroundColor = 'transparent';
                } else {
                    this[button].className = `btn btn-${newValue}`;
                    this[button].style.backgroundColor = '';
                }
                break;
        }
    }

    click() {
        this[button].click();
    }

    set onclick(fn) {
        this[button].addEventListener('click', fn);
    }
}

defineCustomElement(XButton);
