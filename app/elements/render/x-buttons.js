
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
    :host {
        display: flex;
        flex-wrap: wrap;

        margin: 0px;
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
