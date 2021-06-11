
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XIoNumeric from './x-io-numeric.js';

/**
 * attributes:
 *   - value (inherited)
 *   - price (-1 / >=1 )
 *   - no-price (readonly)
 *
 *
 * Format
 *
 *      +--------------------+-----------------+---------------+
 *  1/  |     unit price     |       input     | total         |
 *      +--------------------+-----------------+---------------+
 *  2/  |         1          |     input       | total         |
 *      +--------------------+-----------------+---------------+
 *
 */
export default class XIoBill extends XIoNumeric {
    static get observedAttributes() {
        return [...XIoNumeric.observedAttributes, 'price'];
    }

    /**
     *
     *  -1: unused
     *   1: open (user will enter the price)
     *  >1: value is the fixed price
     *
     * @type {number}
     */
    _price = -1

    /**
     * We store this input to use it everywhere
     * and to resist to change
     *
     * @type {XIoNumeric}
     */
    _xIoNumericEl

    constructor() {
        super();
        this.updatePrice();
    }

    getOutputElement(value) {
        const el = createElementWithTag('div', {}, [
            createElementWithTag('style', {}, `
        :host([no-available]) {
            display: none;
        }

        :host(:not([input]):not([total])) {
            display: none;
        }

        span {
            flex-grow: 0;
            flex-basis: 2em;
        }

        * {
            text-align: right;
        }

        .total {
            padding-right: 20px;
        }
    `),
            this._priceEl = createElementWithTag('div', {}, '' + this._price),
            createElementWithTag('span', {}, 'x'),
            this._xIoNumericEl = createElementWithObject(XIoNumeric, { value }, [],
                el => el.addEventListener('change', () => this.totalChanged())),
            createElementWithTag('span', {}, '='),
            this._totalEl = createElementWithTag('div', { class: 'total' }, '0')
        ]);
        this.updatePrice();
        return el;
    }

    getInputElement(value) {
        const el = this.getOutputElement(value);
        this._xIoNumericEl.setAttribute('input', 'input');
        return el;
    }

    getInputValue() {
        return this._xIoNumericEl.value;
    }

    //
    //
    // Price management
    //
    //

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'price':
                this._price = parseInt(newValue);
                this.updatePrice();
                break;
        }
    }

    updatePrice() {
        this._priceEl.innerHTML = '' + this._price;

        if (this._price < 1) {
            this.setAttribute('no-available', '' + this._price);
        } else {
            this.removeAttribute('no-available');
        }
        this.totalChanged();
    }

    /**
     * Total is always > 0
     *
     * @returns {number} of the total (cost) of the line
     */
    get total() {
        return Math.max(0, this._price * this._input.value);
    }

    totalChanged() {
        this._totalEl.innerHTML = '' + this.total;
        if (this.total > 0) {
            this.setAttribute('total', '' + this.total);
        } else {
            this.removeAttribute('total');
        }
        this.dispatchEvent(new CustomEvent('totalchange'));
    }
}

defineCustomElement(XIoBill);
