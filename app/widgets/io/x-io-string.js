
import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';

/**
 * Attributes:
 *  - value
 *  - mode
 *
 *  - readonly (todo)
 *  - required (todo)
 *  - placeholder (todo)
 *
 *  - empty (readonly)
 *
 */
export default class XIoString extends HTMLElement {
    static get observedAttributes() {
        return ['input', 'value'];
    }

    /** @type {HTMLInputElement} */
    _inputEl

    _initialValue

    constructor() {
        super();

        this.innerHTML = '';
        this.value = this.getAttribute('value');
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'value':
                /* Use the setter */
                this.value = newValue;
                break;
        }

        // Always adapt...
        this.adapt();
    }

    isInputMode() {
        return this.hasAttribute('input');
    }

    /**
     * Set the value through properties
     *
     * Used by XForm
     *
     * @see {XForm}
     */
    set value(val) {
        this._initialValue = val;
        this.adapt();
    }

    /**
     * According to mode
     *
     * @returns {*} with the value
     */
    get value() {
        if (this.isInputMode()) {
            return this.getInputValue();
        }
        return this.getInitialValue();
    }

    getInitialValue() {
        return this._initialValue;
    }

    adapt() {
        if (this.getInitialValue()) {
            // TODO: this should be done only in readonly mode
            this.removeAttribute('empty');
        } else {
            this.setAttribute('empty', 'empty');
        }

        this.innerHTML = '';
        this.append(this.isInputMode()
            ? this.getInputElement(this.getInitialValue())
            : this.getOutputElement(this.getInitialValue())
        );

        this.onInputChange();
    }

    /**
     * To be called by child elements when element is changed
     */
    onInputChange() {
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: this.value }));
    }

    /**
     * @param  {string} value to be filled
     * @returns {HTMLElement} as input
     */
    getOutputElement(value) {
        return createElementWithTag('div', {}, '' + value);
    }

    /**
     * @param  {string} value to be filled
     * @returns {HTMLElement} as input
     */
    getInputElement(value) {
        return this._inputEl = /** @type {HTMLInputElement} */ (
            createElementWithTag('input', { value }, [],
                el => el.addEventListener('change', () => this.onInputChange()))
        );
    }

    /**
     * @returns {*} from the input
     */
    getInputValue() {
        return this._inputEl.value;
    }

    /**
     *
     * checkValidity():
     *   Immediately runs the validity check on the element, triggering the document to fire the invalid event at the element if the value isn't valid.
     *
     * @see XForm.checkAndSubmit()
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
     * @returns {boolean} if ok
     */
    checkValidity() {
        return this._inputEl.checkValidity();
    }

    /**
     * reportValidity():
     *   Returns true if the element's value passes validity checks; otherwise, returns false.
     *
     * (not used in cr code)
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
     * @returns {boolean} if ok
     */
    reportValidity() {
        return this._inputEl.reportValidity();
    }
}

defineCustomElement(XIoString);
