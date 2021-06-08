
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoText extends XIoString {
    /**
     * @override
     */
    getInputElement(value) {
        return this._inputEl = /** @type {HTMLInputElement} */ (createElementWithTag('textarea', {
            value,
            cols: 40,
            rows: 4
        }));
    }

    /**
     * @override
     */
    getOutputElement(value) {
        return createElementWithTag('span', { style: { whiteSpace: 'pre' } }, value);
    }
}

defineCustomElement(XIoText);
