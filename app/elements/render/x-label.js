
import { orSmall } from '../../config.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';

// TODO: use x-i18n

/**
 * Properties:
 * - label
 */
export default class XLabel extends HTMLElement {
    static get DISPLAY_MODE() { return 'flex'; }

    label = '';

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: ${XLabel.DISPLAY_MODE};
        flex-direction: row;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;

        margin: 10px;
    }

    div#label {
        width: ${orSmall}%;
        flex-grow: 0;
        flex-shrink: 0;
        font-weight: bold;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    ::slotted(*) {
        padding: 5px;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 100px;
    }

    ::slotted(input) {
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
`),
            this._label = createElementWithTag('div', { id: 'label' }),
            createElementWithTag('slot')
        );
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
        // if (!this.label && this.hasAttribute('name')) {
        //     label = toSentenceCase(this.getAttribute('name'));
        // }
        this._label.innerHTML = label;
    }
}

defineCustomElement(XLabel);
