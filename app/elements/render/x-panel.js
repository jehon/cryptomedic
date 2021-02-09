
import '../../../node_modules/css-inherit/css-inherit.js';
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { spacing } from '../../config.js';

/**
 * Slot[]: content to be shown in the pannel
 */
export default class XPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: flex;
        position: relative; /* absolute will be relative to panel */
        box-sizing: border-box;
        width: 100%;

        padding: ${spacing.text};
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    :host([full]) {
        height: 100%;
    }
`
            ),
            createElementWithTag('slot')
        );
    }
}

defineCustomElement(XPanel);
