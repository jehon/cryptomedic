
import { spacing, icons, actions } from '../../config.js';
import { createElementWith, defineCustomElement } from '../../js/custom-element.js';
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
        return ['icon', 'action', 'discrete'];
    }

    // TODO: use createElementWith

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWith('css-inherit'),
            createElementWith('style', { 'css-inherit-local': true }, `
    :host {
        display: inline-block;
        background-color: rgba(0,0,0,0);
        padding: calc(${spacing.element} / 2);
    }

    button {
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

    :host(.selected) button {
        background-color: blue;
    }
`),

            this[button] = createElementWith('button', { class: `btn btn-${actions.alternate}` }, [
                createElementWith('img'),
                createElementWith('slot')
            ], element => element.addEventListener('click', () => {
                const toRoute = this.getAttribute('to-route');
                if (toRoute) {
                    setRoute(toRoute);
                }
            })));
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'icon':
                if (!(newValue in icons)) {
                    console.error(`Icon ${newValue} is not found in config.icons`);
                }
                this.shadowRoot.querySelector('img').setAttribute('src', icons[newValue]);
                break;
            case 'discrete':
            case 'action':
                // !! could not have any other class on button, otherwise it will be wiped out :-)
                if (this.hasAttribute('discrete')) {
                    this[button].className = 'btn';
                    this[button].style.backgroundColor = 'transparent';
                } else {
                    let action = this.getAttribute('action');
                    if (!(action in actions)) {
                        console.error('unknown action: ', action);
                        action = 'alternate';
                    }
                    const color = actions[action];
                    this[button].className = `btn btn-${color}`;
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
