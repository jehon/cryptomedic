
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoBoolean extends XIoString {
    #checkbox;

    setOutputValue(newValue) {
        this.setElements(
            createElementWithTag('img', { src: `/static/img/boolean-${newValue ? 'true' : 'false'}.gif` })
        );
    }

    /**
     * @override
     */
    goInputMode() {
        this.setElements(this.#checkbox = createElementWithTag('input',
            {
                type: 'checkbox',
            }, [], el => el.addEventListener('click',
                () => this.dispatchChange()
            )
        ));
    }

    /**
     * @override
     */
    setInputValue(val) {
        if (this.isInputMode()) {
            this.#checkbox.checked = !!val;
        }
    }

    /**
     * @override
     */
    getInputValue() {
        if (this.isInputMode()) {
            return this.#checkbox.checked;
        }
    }

}

defineCustomElement(XIoBoolean);
