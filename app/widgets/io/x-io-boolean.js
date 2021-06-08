
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoBoolean extends XIoString {

    /** @type {HTMLInputElement} */
    _inputEl

    /**
     * @override
     */
    getOutputElement(value) {
        return createElementWithTag('img', { src: `/static/img/boolean-${value ? 'true' : 'false'}.gif` });
    }

    /**
     * @override
     */
    getInputElement(value) {
        return this._inputEl = /** @type {HTMLInputElement} */ (createElementWithTag('input', {
            type: 'checkbox',
            checked: !!value
        }, [], el => el.addEventListener('click', () => this.onInputChanged())));
    }

    /**
     * @override
     */
    getInputValue() {
        return this._inputEl.checked;
    }
}

defineCustomElement(XIoBoolean);
