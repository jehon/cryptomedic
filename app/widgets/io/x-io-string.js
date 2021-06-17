
import { copyAttributes, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';

/**
 * Attributes:
 *  - value (write only)
 *  - input (boolean)
 *  - empty (readonly)
 *
 *  - readonly (todo)
 *  - required (todo)
 *  - placeholder (todo)
 *
 *
 * Properties
 *  - value (also set by attribute)
 *
 * Events:
 *  - mode
 *  - change
 */
export default class XIoString extends HTMLElement {
    static get observedAttributes() {
        return ['input', 'value', ...this.transmissibleAttributesWithDefaultValues];
    }

    /**
     * @type {Array<string>} as name of attributes that need to be copied
     */
    static get transmissibleAttributesWithDefaultValues() {
        return ['type', 'required', 'autofocus', 'placeholder'];
    }

    /** @type {HTMLElement} */
    _rootEl

    /** @type {string} */
    _initialValue = '';

    /** @type {string} */
    _currentValue = '';

    constructor() {
        super();
        this.setAttribute('x-io', 'x-io');

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
            ::slotted(input:not([type="checkbox"])) {
                display: block;
                width: 100%;

                box-sizing: border-box;
                margin: 0;
                /* padding: 6px 12px; */

                color: #555555;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
            }

            ::slotted(input:focus) {
                border-color: #66afe9;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
            }

            ::slotted(input:invalid) {
                border-color: red;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
            }
            `),
            this._rootEl = createElementWithTag('div', { id: 'root' })
        );
        this.goOutputMode();
        this.dispatchChange(this._initialValue);
    }

    /**
     * @returns {string} as the root css selector
     */
    getRootCssSelector() {
        return '#root';
    }

    /**
     * @returns {HTMLElement} as the root element
     */
    getRootElement() {
        return this._rootEl;
    }

    /**
     * Apply callback on each found element
     *
     * @param {string} selector based on root element
     * @param {function(HTMLElement): any} cb to apply on each found element
     * @returns {Array<*>} as the results of each function
     */
    onRootElement(selector, cb) {
        return Array.from(this.getRootElement().querySelectorAll(selector))
            .map(el => cb(el));
    }


    attributeChangedCallback(attributeName, _oldValue, newValue) {
        if (this.constructor.transmissibleAttributesWithDefaultValues.includes(attributeName)) {
            this.onRootElement('input', el => el.setAttribute(attributeName, newValue));
            return;
        }
        switch (attributeName) {
            case 'input':
                if (this.isInputMode()) {
                    this.goInputMode();
                } else {
                    this.goOutputMode();
                }
                this.dispatchEvent(new CustomEvent('mode', { bubbles: true }));
                break;

            case 'value':
                // Call the setter to have the same behavior
                this.value = newValue;
                break;
        }
    }


    /**
     * @returns {*} as the initial value
     */
    getInitialValue() {
        return this._initialValue;
    }

    //
    //
    // I/O Mode handling
    //
    //

    isInputMode() {
        return this.hasAttribute('input');
    }

    /**
     *
     * @param {...HTMLElement}els to be inserted
     */
    setElements(...els) {
        this.getRootElement().innerHTML = '';
        this.getRootElement().append(...els);
    }

    goInputMode() {
        this.setElements(
            createElementWithTag('input', { value: this.getInitialValue(), style: { width: '100%' } }, [],
                el => {
                    el.addEventListener('change',
                        () => this.dispatchChange(/** @type {HTMLInputElement} */(el).value));
                    el.addEventListener('blur',
                        () => this.dispatchChange(/** @type {HTMLInputElement} */(el).value));
                    copyAttributes(this, el, this.constructor.transmissibleAttributesWithDefaultValues);
                }
            )
        );

        this.setInputValue(this._initialValue);
    }

    goOutputMode() {
        this.setElements(
            createElementWithTag('div')
        );
        this.setOutputValue(this._initialValue);
    }

    //
    //
    // Value handling
    //
    //

    set value(newValue) {
        this._initialValue = newValue;
        if (this.isInputMode()) {
            this.setInputValue(newValue);
        } else {
            this.setOutputValue(newValue);
        }
        this.dispatchChange(newValue);
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
        return this._initialValue;
    }

    setOutputValue(val) {
        const el = this.shadowRoot.querySelector('div');
        if (el) {
            el.innerHTML = val;
        }
    }

    setInputValue(val) {
        const el = this.shadowRoot.querySelector('input');
        if (el) {
            el.setAttribute('value', val);
        }
    }

    getInputValue() {
        return this.onRootElement('input', el => el.value)[0];
    }

    /**
     * To be called by child elements when element is changed
     *
     * @param {*} _val to be set
     */
    dispatchChange(_val) {
        this.toggleAttribute('empty', !this.getInitialValue());
        this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
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
        if (!this.isInputMode()) {
            return true;
        }
        return this.onRootElement('input', el => el.checkValidity())
            .reduce((prev, curr) => prev & curr, true);
    }

    // /**
    //  * reportValidity():
    //  *   Returns true if the element's value passes validity checks; otherwise, returns false.
    //  *
    //  * (not used in cr code)
    //  *
    //  * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
    //  * @returns {boolean} if ok
    //  */
    // reportValidity() {
    //     console.log('reportValidity');
    //     if (!this.isInputMode()) {
    //         return true;
    //     }
    //     return this.querySelector('input').reportValidity();
    // }
}

defineCustomElement(XIoString);
