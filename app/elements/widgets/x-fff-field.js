
import { defineCustomElement } from '../../js/custom-element.js';
import { toSentenceCase } from '../../js/string-utils.js';
import XWithFile from '../abstract/x-with-file.js';

// TODO: use x-i18n


/**
 * mode: read (hide empty values), write (?)
 */
export default class XFffField extends XWithFile {
    static get observedAttributes() {
        return ['field', 'label', 'mode'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: start;
                }

                :host([mode=read][empty]) {
                    display: none !important;
                }

                #label {
                    width: min(25%, 150px);
                    flex-grow: 0;
                    flex-shrink: 0;
                    font-weight: bold;
                }

                ::slotted(*) {
                    padding: 5px;
                    flex-grow: 1;
                    flex-shrink: 1;
                    flex-basis: 10px;
                }

                ::slotted([slot=third]) {
                    border-left: 1px solid black;
                    padding-left: 5px;
                }

            </style>
            <div id='label'></div>
            <slot><div id='content'></div></slot>
            <slot name='third'></slot>
        `;
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        switch (attributeName) {
            case 'label':
                this.refreshLabel();
                break;
            case 'field':
                this.refreshLabel();
                if (this.isOk()) {
                    this.adapt();
                }
                break;
        }
    }

    refreshLabel(){
        this.label = this.getAttribute('label');
        if (!this.label) {
            this.label = toSentenceCase(this.getAttribute('field'));
        }
        this.shadowRoot.querySelector('#label').innerHTML = this.label;
    }

    adapt() {
        // We dont' call super.adapt, because we are not based on formula();
        const field = this.getAttribute('field');
        if (field in this.file && this.file[field]) {
            this.removeAttribute('empty');
        } else {
            this.setAttribute('empty', field);
        }
        if (field) {
            this.shadowRoot.querySelectorAll('#content').forEach(e => e.innerHTML = this.file[field]);
        }
    }
}

defineCustomElement(XFffField);
