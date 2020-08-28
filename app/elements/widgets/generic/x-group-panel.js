
import { defineCustomElement } from '../../../js/custom-element.js';

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
        this.shadowRoot.innerHTML = `
            <style>
                fieldset {
                    border-radius: 10px;
                    padding: 10px;
                    border-style: solid;
                    border-width: 2px;
                    border-color: #002060;
                    margin: 0px;

                    display: flex;
                }
                
                fieldset > legend {
                    font-size: 120%;
                    color: #004a94;
                    padding-left: 10px;
                    padding-right: 10px;
                    width: auto;
                    margin-bottom: 0;


                    display: block;
                    line-height: inherit;

                    border: 0;
                    border-bottom-color: currentcolor;
                    border-bottom-style: none;
                    border-bottom-width: 0px;
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

                ::slotted(div:not([slot])) {
                    font-weight: bold;
                    text-align: center;
                }

                </style>
            <fieldset>
                <legend></legend>
                <slot name='versal'></slot>
                <div id='content'>
                    <slot></slot>
                </div>
            </fieldset>
        `;
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'title':
                this.shadowRoot.querySelector('legend').innerHTML = newValue;
                break;
        }
    }

    checkValidity() { // TODO: legacy, but used for bill_fiche.php
        return true;
    }

}

defineCustomElement(XGroupPanel);
