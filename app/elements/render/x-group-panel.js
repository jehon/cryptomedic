
import { spacing } from '../../config.js';
import { createElementWithTag, defineCustomElement, resizeChildrenBasedOn } from '../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XGroupPanel extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'full'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: block;
    }

    fieldset {
        /* Horizontal Flex */
        display: flex;

        margin: 0px;
        padding: ${spacing.element};

        border: solid 2px #002060;
        border-radius: 10px;
    }

    fieldset > legend {
        margin-bottom: 0;
        padding-left: 10px;
        padding-right: 10px;

        font-size: 120%;
        color: #004a94;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
    }

    ::slotted([slot=versal]) {
        background-color: white;
        flex-grow: 0;
        margin: ${spacing.text};
    }

    div#content {
        flex-grow: 1;
    }

    slot:not([name]) {
        display: flex;
        flex-direction: column;
        margin: ${spacing.element};

        height: 100%;
    }

    ::slotted(:not([slot])) {
        flex-grow: 0;
    }

    ::slotted(hr:not([slot])) {
        flex-grow: 1000;
        border: none;
        background-color: none;
    }

    ::slotted(:not(hr):not([slot]):nth-child(odd):not([white])) {
        background-color: #f5f5f5;
    }

    ::slotted(:not(hr):not([slot]):nth-child(even):not([white])) {
        background-color: lightgray;
    }

    ::slotted(div:not([slot]):not([white])) {
        font-weight: bold;
        text-align: center;
    }
`),

            createElementWithTag('fieldset', {}, [
                this._legend = createElementWithTag('legend'),
                createElementWithTag('slot', { name: 'versal' }),
                createElementWithTag('div', { id: 'content' }, [
                    createElementWithTag('slot')
                ])
            ]));
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'title':
                this._legend.innerHTML = newValue;
                break;
            case 'full':
                if (this._resizeCallbackCancel) {
                    this._resizeCallbackCancel();
                }
                if (this.hasAttribute('full')) {
                    this._resizeCallbackCancel = resizeChildrenBasedOn(this);
                }
        }
    }

    checkValidity() { // TODO: legacy, but used for bill_fiche.php
        return true;
    }

}

defineCustomElement(XGroupPanel);
