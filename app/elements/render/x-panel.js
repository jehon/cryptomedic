
import '../../../node_modules/css-inherit/css-inherit.js';
import { createElementWithTag, defineCustomElement, getHTMLNameOfClass } from '../../js/custom-element.js';
import { spacing } from '../../config.js';

/**
 * @param {HTMLElement} element to be applied on
 * @returns {HTMLStyleElement} to be applied to each element
 */
export function getPanelStyles(element) {
    return /** @type {HTMLStyleElement} */ (createElementWithTag('style', {}, `

:host(${getHTMLNameOfClass(element)}) {
    display: flex;
    /* width: 100%; */
    /* height: 100%; */
    position: relative;

    box-sizing: border-box;
    padding: ${spacing.text};
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

:host([full]) {
    height: 100%;
}
    `));
}

/**
 * Slot[]: content to be shown in the pannel
 */
export default class XPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            getPanelStyles(this),
            createElementWithTag('slot')
        );
    }
}

defineCustomElement(XPanel);
