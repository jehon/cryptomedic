
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoAbstract from './x-io-string.js';

class XIoBoolean extends XIoAbstract {
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

defineCustomElement(XIoBoolean);
