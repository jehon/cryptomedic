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
export default class XIoAbstract extends HTMLElement {
    static get observedAttributes() {
        return ['mode', 'value'];
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        // always adapt...
        this.adapt();
    }

    /** @type {HTMLInputElement} */
    _inputEl

    constructor() {
        super();

        this.innerHTML = '';
    }

    isInputMode() {
        return this.hasAttribute('mode') && this.getAttribute('mode') == 'input';
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

    /**
     * According to mode
     *
     * @returns {*} with the value
     */
    get value() {
        if (this.isInputMode()) {
            return this.getInputValue();
        }
        return this.getAttribute('value');
    }

    adapt() {
        this.innerHTML = '';
        let el;
        if (this.isInputMode()) {
            el = this.getInputElement();
        } else {
            el = this.getOutputElement();
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
     * @param  {string} [value] to be filled
     * @returns {HTMLElement} as input
     */
    getOutputElement(value) {
        return createElementWithTag('div', {}, value);
    }


    /**
     * @param  {string} [value] to be filled
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
}

defineCustomElement(XIoAbstract);
