
import { copyAttributes, defineCustomElement } from '../../js/custom-element.js';
import XIoAbstract from './x-io-string.js';

class XIoBoolean extends XIoAbstract {
    /**
     * @override
     */
    getInputElement(value) {
        const el = super.getInputElement(value);
        el.setAttribute('type', 'numeric');
        copyAttributes(this, el, {
            min: '0',
            max: '',
            step: '1'
        });
        return el;
    }
}

defineCustomElement(XIoBoolean);
