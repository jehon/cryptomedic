
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';

/**
 * Slot[]: content
 */
export default class XGroupPanel extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
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
        display: flex;
        height: 100%;

        margin: 0px;
        padding: 10px;

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
    }

    div#content {
        flex-grow: 1;
    }

    ::slotted(:not([slot]):nth-child(odd):not([white])) {
        background-color: #f5f5f5;
    }

    ::slotted(:not([slot]):nth-child(even):not([white])) {
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
        }
    }

    checkValidity() { // TODO: legacy, but used for bill_fiche.php
        return true;
    }

}

defineCustomElement(XGroupPanel);
