
import { spacing } from '../../config.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host(x-buttons) {
        width: 100%;

        flex-wrap: wrap;
        flex-direction: row;

        margin: 0px;
        margin-top: 10px;
    }

    ::slotted(*) {
        flex-grow: 1;
        padding: calc(${spacing.element} / 2);
    }
`),
            createElementWithTag('slot')
        );
    }
}

defineCustomElement(XButtons);
