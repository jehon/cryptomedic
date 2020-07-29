
import { defineCustomElement } from '../../js/custom-element.js';
import { toSentenceCase } from '../../js/string-utils.js';
import XWithFile from '../abstract/x-with-file.js';
import { yearsToYM } from './x-fff-age.js';

export default class XFffField extends XWithFile {
    static get observedAttributes() {
        return ['field', 'label'];
    }

    constructor() {
        super();

        // PS: Could be placed in a <style> tag, but would slow down the render
        this.style.display = 'grid';
        this.style.gridTemplateColumns = '150px auto';
        this.shadowRoot.innerHTML = `
            <style>
                #label {
                    font-weight: bold
                }
            </style>
            <div>
                <span id='label'></span>
            </div>
            <div>
                <slot></slot>
            </div>
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
        // Set the value
    }
}

defineCustomElement(XFffField);
