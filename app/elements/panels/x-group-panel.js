
import XPanel from './x-panel.js';
import { insertInSlotDefault } from '../element-helpers.js';

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
                
                fieldset > legend > label {
                    padding: 0;
                }
                
                fieldset > slot {
                    width: 100%;
                }

            </style>
            <fieldset>
                <legend></legend>
                <slot></slot>
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

window.customElements.define('x-group-panel', XGroupPanel);
