
import '../../../../node_modules/css-inherit/css-inherit.js';
import { createElementWith, defineCustomElement } from '../../../js/custom-element.js';
import { spacing } from '../../../config.js';

/**
 * Slot[]: content to be shown in the pannel
 */
export default class XPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWith('style', { 'css-inherit-local': true }, `
    :host {
        box-sizing: border-box;
        width: 100%;
        height: 100%;

        /* absolute will be relative to panel */
        position: relative;
        display: block;
        padding: ${spacing.text};
    }

    :host > slot {
        display: flex;
        width: 100%;
        height: 100%;

        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`
            ),
            this.getXPanelContent()
        );
    }

    /**
     * @returns {HTMLElement} to be inserted
     */
    getXPanelContent() {
        return document.createElement('slot');
    }
}

defineCustomElement(XPanel);
