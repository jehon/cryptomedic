
import { spacing } from '../../config.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getPanelStyles } from './x-panel.js';

/**
 * Slot[]: content
 */
export default class XButtons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            getPanelStyles(this, true),
            createElementWithTag('style', {}, `
    :host(x-buttons) {
        width: 100%;

        flex-wrap: wrap;
        flex-direction: row;
        align-content: end;
        gap: ${spacing.element};

        margin: 0px;
        margin-top: 10px;

        background-color: transparent;
        /* background-color: white !important; */
    }

    ::slotted(*) {
        flex-grow: 1;
    }
`),
            createElementWithTag('slot')
        );
    }
}

defineCustomElement(XButtons);
