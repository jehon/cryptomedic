import { yearsToYM, fromBirthDateTo } from './widgets/x-fff-age';
import { defineCustomElement } from '../js/custom-element';

export default class XAge extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'ref'];
    }

    constructor() {
        super();
        this.adapt();
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        this.adapt();
    }

    adapt() {
        try {
            this.removeAttribute('error');
            this.innerHTML = yearsToYM(this.value);
        } catch (e) {
            this.setAttribute('error', e.id);
            this.innerHTML = e.message;
        }
    }

    get value() {
        const value = this.getAttribute('value');
        const ref = this.getAttribute('ref');
        return fromBirthDateTo(value, ref ? ref : new Date());
    }
}

defineCustomElement(XAge);
