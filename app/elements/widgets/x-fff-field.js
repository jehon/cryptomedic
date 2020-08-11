
import { defineCustomElement } from '../../js/custom-element.js';
import { toSentenceCase } from '../../js/string-utils.js';
import XWithFile from '../abstract/x-with-file.js';

// TODO: use x-i18n


/**
 * @param {string} field
 * @param {string} side
 * @returns {string}
 */
function toSide(field, side) {
    if (field.includes('*')) {
        return field.replace('*', side);
    }
    return field + side;
}

/**
 * mode: read (hide empty values), write (?)
 */
export default class XFffField extends XWithFile {
    label = '';
    field = '';
    bySides = '';
    sideLeft = '';
    sideRight = '';

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

                ::slotted(*), slot > div {
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
            <slot name='left'><div id='side-left'></div></slot>
            <slot name='right'><div id='side-right'></div></slot>
            <slot name='third'></slot>
        `;
    }

    static get observedAttributes() {
        return ['field', 'label', 'by-sides'];
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'label':
                this.label = newValue;
                this.adaptLabel();
                break;
            case 'field':
                this.field = newValue;
                this.adapt();
                break;
            case 'by-sides':
                this.bySides = newValue;
                this.sideLeft = toSide(this.bySides, 'Left');
                this.sideRight = toSide(this.bySides, 'Right');
                this.adapt();
        }
    }

    _setElementFor(field, where) {
        if (field) {
            this.shadowRoot.querySelectorAll(where).forEach(e => {
                e.style.display = 'inline-block';
                e.innerHTML = this.file[field];
            });
        } else {
            this.shadowRoot.querySelectorAll(where).forEach(e => e.style.display = 'none');
        }
    }

    _testFieldIsEmpty(field) {
        if (!field) {
            return false;
        }
        if (!this.file){
            return false;
        }
        if (!(field in this.file) || !this.file[field]) {
            this.setAttribute('empty', field);
            return true;
        }
        return false;
    }

    adapt() {
        // We dont' call super.adapt, because we are not based on formula();
        this.adaptEmpty();
        this.adaptLabel();
        if (this.isOk()) {
            this._setElementFor(this.field, '#content');
            this._setElementFor(this.sideLeft, '#side-left');
            this._setElementFor(this.sideRight, '#side-right');
        }
    }

    adaptEmpty() {
        if (this._testFieldIsEmpty(this.field)) {
            return ;
        }
        if (this.bySides) {
            if (this._testFieldIsEmpty(this.sideLeft) && this._testFieldIsEmpty(this.sideRight)) {
                return ;
            }
        }

        this.removeAttribute('empty');
    }

    adaptLabel() {
        let label = this.label;
        if (!label) {
            label = toSentenceCase(this.field);
        }
        if (!label) {
            label = toSentenceCase(toSide(this.bySides, ''));
        }
        this.shadowRoot.querySelector('#label').innerHTML = label;
    }
}

defineCustomElement(XFffField);
