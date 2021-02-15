
import { spacing, icons, actions, colors } from '../../config.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
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
            createElementWithTag('css-inherit'),
            createElementWithTag('style', { 'css-inherit-local': true }, `
    :host {
        display: inline-block;
        background-color: rgba(0,0,0,0);
        min-width: 100px;
        flex-shrink: 0;
    }

    :host(.selected) {
        border: blue 2px solid;
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
`),

            this[button] = createElementWithTag('button', {}, [
                createElementWithTag('img'),
                this._slot = createElementWithTag('slot')
            ], element => element.addEventListener('click', () => {
                const toRoute = this.getAttribute('to-route');
                if (toRoute) {
                    setRoute(toRoute);
                }
            })));

        this.colorizeButton();
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'icon':
                if (!(newValue in icons)) {
                    console.error(`Icon ${newValue} is not found in config.icons`);
                }
                this.shadowRoot.querySelector('img').setAttribute('src', icons[newValue]);
                break;

            case 'discrete':
            case 'action': {
                this.colorizeButton();
                break;
            }
        }
    }

    click() {
        this[button].click();
    }

    colorizeButton() {
        this[button].style.backgroundColor = this.hasAttribute('discrete') ? 'transparent' : '';
        this[button].className = 'btn';

        if (this.hasAttribute('discrete')) {
            return;
        }
        // !! could not have any other class on button, otherwise it will be wiped out :-)
        let action = this.getAttribute('action');
        if (!action) {
            action = actions.query;
        } else if (!(action in actions)) {
            console.error('unknown action: ', action);
            action = actions.move;
        }
        const cls = colors.actions[action].class;

        // TODO: use config.js colors
        this[button].classList.add(`btn-${cls}`);
        switch (action) {
            case actions.move:
                this._slot.innerHTML = 'Go';
                break;
            case actions.query:
                this._slot.innerHTML = 'Search';
                break;
            case actions.alternate:
                this._slot.innerHTML = 'Alternate';
                break;
            case actions.cancel:
                this._slot.innerHTML = 'Cancel';
                break;
            case actions.commit:
                this._slot.innerHTML = 'Save';
                break;
            case actions.delete:
                this._slot.innerHTML = 'Delete';
                break;
        }
    }
}

defineCustomElement(XButton);
