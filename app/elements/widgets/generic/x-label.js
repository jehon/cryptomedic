
import { createElementWith, defineCustomElement } from '../../../js/custom-element.js';
import { toSentenceCase } from '../../../js/string-utils.js';

// TODO: use x-i18n

/**
 * mode: read (hide empty values), write (?)
 */
export default class XLabel extends HTMLElement {
    label = '';

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(createElementWith('style', {}, `
    :host {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: start;
        align-items: center;

        margin: 10px;
    }

    :host > div:nth-child(2) {
        width: min(25%, 150px);
        flex-grow: 0;
        flex-shrink: 0;
        font-weight: bold;
    }

    ::slotted(*), :host > div:nth-child(3) {
        padding: 5px;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 10px;
    }

    ::slotted(input), :host input {

        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        margin: 0;
        box-sizing: border-box;
    }

    ::slotted(input:focus), :host input:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    ::slotted(input:invalid), :host input:invalid {
        border-color: #red;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }
`));

        this.shadowRoot.appendChild(this._label = createElementWith('div', { id: 'label' }));
        this.shadowRoot.appendChild(createElementWith('slot'));
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'label':
                this.label = newValue;
                this.updateLabel();
                break;
        }
    }

    connectedCallback() {
        this.updateLabel();
    }

    updateLabel() {
        let label = this.label;
        if (!this.label && this.hasAttribute('name')) {
            label = toSentenceCase(this.getAttribute('name'));
        }
        this._label.innerHTML = label;
    }
}

defineCustomElement(XLabel);
