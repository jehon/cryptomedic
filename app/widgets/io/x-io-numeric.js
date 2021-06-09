
import { copyAttributes, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoNumeric extends XIoString {
    /**
     * @override
     */
    getInputElement(value) {
        const el = super.getInputElement(value);
        el.setAttribute('type', 'number');
        copyAttributes(this, el, {
            min: 0,
            max: '',
            step: 1,
            size: 3
        });
        return el;
    }

    /**
     * @override
     */
    getInputValue() {
        return parseInt(this._inputEl.value);
    }
}

defineCustomElement(XIoNumeric);
