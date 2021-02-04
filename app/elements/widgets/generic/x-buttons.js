
import { createElementWith, defineCustomElement } from '../../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XButtons extends HTMLElement {
    constructor() {
        // TODO: use createElementWith

        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(createElementWith('style', {}, `
    :host > div {
        display: flex;

        margin: 0px;
        padding: 5px;

        background-color: lightgray;
    }

    ::slotted(*) {
        flex-grow: 1;
    }
`));

        this.shadowRoot.appendChild(createElementWith('div', {}, [
            createElementWith('slot')
        ]));

    }
}

defineCustomElement(XButtons);
