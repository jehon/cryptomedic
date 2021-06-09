
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../js/custom-element.js';
import XIoNumeric from './io/x-io-numeric.js';
import XLabel from './style/x-label.js';

/**
 * attributes:
 *   - price (-1 / >=1 )
 *   - no-price (readonly)
 *
 * innerHTML will be generated with the 'input' (x-io-numeric)
 *
 */
export default class XBillLine extends HTMLElement {
    static get observedAttributes() {
        return ['price', 'price-name', 'input'];
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
    _input

    constructor() {
        super();

        this.innerHTML = '';
        // The input element is visible for 'x-form' to work
        this.append(
            this._input = createElementWithObject(XIoNumeric, {}, [],
                el => el.addEventListener('change', () => this.totalChanged())
            )
        );

        /**
         * Format
         *
         *      +----------------+-------------------+-----------------+---------------+
         *  1/  | label          |    unit price     |       input     | total         |
         *      +----------------+-------------------+-----------------+---------------+
         *  2/  | label          |        1          |     input       | total         |
         *      +----------------+-------------------+-----------------+---------------+
         */

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
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
                    /* border-left: 1px solid black; */
                    padding-right: 20px;
                }
            `),
            this._xlabel = createElementWithObject(XLabel, {}, [
                this._priceEl = createElementWithTag('div', {}, '' + this._price),
                createElementWithTag('span', {}, 'x'),
                createElementWithTag('slot'),
                createElementWithTag('span', {}, '='),
                this._totalEl = createElementWithTag('div', { class: 'total' }, '0')
            ])
        );

        this.updatePrice();
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'price':
                if (this._price == parseInt(newValue)) {
                    return;
                }

                this._price = parseInt(newValue);
                this.updatePrice();
                break;

            case 'price-name':
                this._input.setAttribute('name', newValue);
                this._xlabel.setAttribute('label', this.getAttribute('price-name'));
                break;

            case 'input':
                if (this.hasAttribute('input')) {
                    this._input.setAttribute('input', 'input');
                } else {
                    this._input.removeAttribute('input');
                }
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

defineCustomElement(XBillLine);
