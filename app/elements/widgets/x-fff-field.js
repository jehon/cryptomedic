
import { defineCustomElement } from '../../js/custom-element.js';
import { toSentenceCase } from '../../js/string-utils.js';
import XWithFile from '../abstract/x-with-file.js';

// TODO: use x-i18n


/**
 * mode: read (hide empty values), write (?)
 */
export default class XFffField extends XWithFile {
    static get observedAttributes() {
        return ['field', 'label'];
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
            <slot><div id='left'></div></slot>
            <slot><div id='right'></div></slot>
            <slot name='third'><div id='alternate'></div></slot>
        `;
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        switch (attributeName) {
            case 'label':
                this.adaptLabel();
                break;
            case 'field':
                this.adaptLabel();
                if (this.isOk()) {
                    this.adaptField();
                }
                break;
        }
    }

    adapt() {
        // We dont' call super.adapt, because we are not based on formula();
        this.adaptField();
    }

    adaptEmpty() {
        const field = this.getAttribute('field');
        if (field) {
            if (!(field in this.file) || !this.file[field]) {
                this.setAttribute('empty', field);
                return;
            }
        }

        this.removeAttribute('empty');
    }

    adaptLabel() {
        this.label = this.getAttribute('label');
        if (!this.label) {
            this.label = toSentenceCase(this.getAttribute('field'));
        }
        this.shadowRoot.querySelector('#label').innerHTML = this.label;
    }

    adaptField() {
        this.adaptEmpty();

        const field = this.getAttribute('field');
        if (field) {
            this.shadowRoot.querySelectorAll('#content').forEach(e => e.innerHTML = this.file[field]);
        } else {
            this.shadowRoot.querySelectorAll('#content').forEach(e => e.innerHTML = '');
        }
    }

}

defineCustomElement(XFffField);
