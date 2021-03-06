
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoBoolean extends XIoString {
    setOutputValue(newValue) {
        this.setElements(
            createElementWithTag('img', { src: `/static/img/boolean-${newValue ? 'true' : 'false'}.gif` })
        );
    }

    /**
     * @override
     */
    goInputMode() {
        this.setElements(createElementWithTag('input',
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
        this.onRootElement('input', el => el.checked = !!val);
    }
}

defineCustomElement(XIoBoolean);
