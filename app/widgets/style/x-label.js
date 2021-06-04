
import { orSmall } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XI18n from '../func/x-i18n.js';

// TODO: use x-i18n

/**
 * Properties:
 * - label
 *
 * Slots:
 * - *:
 * - right
 * - left
 * - stat
 *
 * layout:
 *    +----------+----------+
 *    | label    | default  |
 *    +----------+----------+
 *
 *    +----------+------------+-----------+
 *    | label    | (R) right  | (L) left  |
 *    +----------+------------+-----------+
 *
 *    +----------+------------++-----------+
 *    | label    | default    || stat      |
 *    +----------+------------++-----------+
 *
 */
export default class XLabel extends HTMLElement {
    // TODO: is this used ?
    static get DISPLAY_MODE() { return 'flex'; }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'label':
                this._label.setAttribute('value', newValue ?? '');
                break;
        }
    }

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: ${XLabel.DISPLAY_MODE};
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;

        margin: 10px;
        width: 100%;
    }

    #label {
        width: ${orSmall}%;
        flex-grow: 0;
        flex-shrink: 0;
        font-weight: bold;
        text-align: right;
    }

    ::slotted(*) {
        padding: 5px;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 100px;
    }

    ::slotted([slot=right]):before {
        content: 'R';
    }

    ::slotted([slot=left]):before {
        content: 'L';
    }

    ::slotted([slot=right]):before,
    ::slotted([slot=left]):before {
        margin-right: 2px;
        padding: 4px;
        border: 1px solid gray;
        border-radius: 20px;
        font-size: 9px;
        background-color: gray;
        color: white;
        font-weight: bold;
    }

    ::slotted(input:not([type="checkbox"])) {
        display: block;
        width: 100%;

        box-sizing: border-box;
        /* height: 34px; */
        margin: 0;
        padding: 6px 12px;

        color: #555555;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    }

    ::slotted(input:focus) {
        border-color: #66afe9;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    ::slotted(input:invalid) {
        border-color: red;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    ::slotted([slot=stat]) {
        border-left: 1px solid black;
        padding-left: 5px;
    }
`),
            this._label = createElementWithObject(XI18n, { id: 'label', value: this.getAttribute('label') ?? '' }),
            createElementWithTag('slot'),
            createElementWithTag('slot', { name: 'right' }),
            createElementWithTag('slot', { name: 'left' }),
            createElementWithTag('slot', { name: 'stat' }),
        );
    }
}

defineCustomElement(XLabel);
