
import { spacing, icons, actions } from '../../config.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { setLocation, setRoute } from '../../js/router.js';

/**
 * Slot[]: content
 * level: default / primary / success / info / warning / danger
 *     https://getbootstrap.com/docs/3.3/css/#buttons-options
 * to-route: the route where to go on click (if set)
 * to-location: the new location path (if set)
 */
export default class XButton extends HTMLElement {
    static get observedAttributes() {
        return ['icon', 'action', 'timed'];
    }

    _disableCron = () => { }

    /** @type {HTMLButtonElement} */
    _button

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', { 'css-inherit-local': true }, `
    :host {
        display: inline-block;
        background-color: rgba(0,0,0,0);
        min-width: 100px;
        flex-shrink: 0;
    }

    :host(x-button.selected) {
        border: blue 2px solid;
    }

    button {
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 4px;
        user-select: none;

        width: 100%;
    }

    :host(x-button[discrete]) button {
        background-color: transparent !important;
        color: black !important;
    }

    button {
        color: white;
    }

    :host(x-button:not([action])) button,
    :host(x-button[action="${actions.move}"]) button,
    :host(x-button[action="${actions.query}"]) button,
    :host(x-button[action="${actions.alternate}"]) button,
    :host(x-button[action="${actions.edit}"]) button
    {
        background-color: #5bc0de;
        border-color: #46b8da;
    }

    :host(x-button[action="${actions.commit}"]) button {
        background-color: #5cb85c;
        border-color: #4cae4c;
    }

    :host(x-button[action="${actions.cancel}"]) button {
        background-color: #f0ad4e;
        border-color: #eea236;
    }

    :host(x-button[action="${actions.alternate}"]) button {
        background-color: #5bc0de;
        border-color: #46b8da;
    }

    :host(x-button[action="${actions.delete}"]) button {
        background-color: #d9534f;
        border-color: #d43f3a;
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

            this._button = /** @type {HTMLButtonElement} */ (createElementWithTag('button', {}, [
                createElementWithTag('img'),
                this._slot = createElementWithTag('slot')
            ], element => element)));

        this.buttonText();
        this.addEventListener('click', () => {
            const toRoute = this.getAttribute('to-route');
            if (toRoute) {
                setRoute(toRoute);
            } else {
                const toLocation = this.getAttribute('to-location');
                if (toLocation) {
                    setLocation(toLocation);
                }
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

            case 'action': {
                this.buttonText();
                break;
            }
            // TODO: timed x-button (x-confirmation)
            // case 'timed': {
            //     this._disableCron();
            //     this._disableCron = () => { };
            //     let t = parseInt(newValue);
            //     if (t > 0) {
            //         this._disableCron = cron(() => {
            //             // https://css-tricks.com/timer-bars-in-css-with-custom-properties/
            //             /* transition: width 5s ease; */
            //         }, t);
            //     }
            //     break;
            // }
        }
    }

    click() {
        this._button.click();
    }

    buttonText() {
        // !! could not have any other class on button, otherwise it will be wiped out :-)
        let action = this.getAttribute('action');
        if (!action) {
            action = actions.query;
        } else if (!(action in actions)) {
            console.error('unknown action: ', action);
            action = actions.query;
        }

        switch (action) {
            case actions.move:
                this._slot.innerHTML = 'Go';
                break;
            case actions.query:
                this._slot.innerHTML = 'Search';
                break;
            case actions.edit:
                this._slot.innerHTML = 'Edit';
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
