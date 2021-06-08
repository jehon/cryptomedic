
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
 */
export default class XIoString extends HTMLElement {
    static get observedAttributes() {
        return ['mode', 'value'];
    }

    /** @type {HTMLInputElement} */
    _inputEl

    _initialValue

    constructor() {
        super();

        this.innerHTML = '';
        this._initialValue = this.getAttribute('value');
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'value':
                this._initialValue = newValue;
                break;
        }

        // always adapt...
        this.adapt();
    }

    isInputMode() {
        return this.hasAttribute('mode') && this.getAttribute('mode') == 'input';
    }

    getInitialValue() {
        return this._initialValue;
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

    adapt() {
        this.innerHTML = '';
        let el;
        if (this.isInputMode()) {
            el = this.getInputElement(this.getInitialValue());
        } else {
            el = this.getOutputElement(this.getInitialValue());
        }
        this.append(el);
    }

    /**
     * To be called by child elements when element is changed
     */
    onInputChanged() {
        // TODO
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
                el => el.addEventListener('change', () => this.onInputChanged()))
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
