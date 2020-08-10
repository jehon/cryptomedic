
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

    #field = '';
    #bySides = '';
    #label = '';

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

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'label':
                this.#label = newValue;
                this.adaptLabel();
                break;
            case 'field':
                this.#field = newValue;
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
        if (this.#field) {
            if (!(this.#field in this.file) || !this.file[this.#field]) {
                this.setAttribute('empty', this.#field);
                return;
            }
        }

        this.removeAttribute('empty');
    }

    adaptLabel() {
        let label = this.#label;
        if (!this.#label) {
            label = toSentenceCase(this.#field);
        }
        this.shadowRoot.querySelector('#label').innerHTML = label;
    }

    adaptField() {
        this.adaptEmpty();

        if (this.#field) {
            this.shadowRoot.querySelectorAll('#content').forEach(e => e.innerHTML = this.file[this.#field]);
        } else {
            this.shadowRoot.querySelectorAll('#content').forEach(e => e.innerHTML = '');
        }
    }

}

defineCustomElement(XFffField);
