
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoString from './x-io-string.js';

export default class XIoText extends XIoString {
    /**
     * @override
     */
    goInputMode() {
        this.setElements(
            createElementWithTag('textarea',
                {
                    style: { width: '100%' },
                    rows: 4
                }, [],
                el => el.addEventListener('change',
                    () => this.dispatchChange(/** @type {HTMLInputElement} */(el).value))
            )
        );
    }

    /**
     * @override
     */
    goOutputMode() {
        super.goOutputMode();
        this.getRootElement().style.whiteSpace = 'pre';
    }

    setInputValue(val) {
        const el = this.getRootElement().querySelector('textarea');
        if (el) {
            el.innerHTML = val;
        }
    }
}

defineCustomElement(XIoText);
