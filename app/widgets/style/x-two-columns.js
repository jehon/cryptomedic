import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getPanelStyles } from './x-panel.js';

export default class XTwoColumns extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(
            getPanelStyles(this),
            createElementWithTag('style', {}, `
                :host(x-two-columns) > div {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    width: 100%;

                    xxx-margin-right: -15px;
                    xxx-margin-left: -15px;
                }

                ::slotted(*) {
                    flex-basis: 100px;
                    flex-grow: 1;

                    max-width: 50%;
                    box-sizing: border-box;

                    padding-right: 15px;
                    padding-left: 15px;
                }
            `),
            createElementWithTag('div', {}, [
                createElementWithTag('slot'),
                createElementWithTag('slot', { name: 'right' })
            ])
        );
    }
}

defineCustomElement(XTwoColumns);