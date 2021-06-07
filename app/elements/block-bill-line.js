
/* istanbul ignore file */

import JHElement from './jh-element.js';
import '../widgets/io/x-io-numeric.js';

const title = Symbol('title');
const price = Symbol('price');
const input = Symbol('input');
const total = Symbol('total');

export default class BlockBillLine extends JHElement {
    constructor() {
        super();
        this._value = {
            Amount: 0
        };
        this._price = {
            title: 'Unknown',
            Amount: 1
        };
        this._Date = false;
    }

    static get properties() {
        return {
            value: 'Object',
            price: 'Object',
            Date: 'String',
            edit: 'Boolean'
        };
    }

    render() {
        super.render();
        this.createElementAndAddThem(`
                <div style='display: table-cell' id='title'></div>
                <div style='display: table-cell'><x-io-numeric mode=${this.edit ? 'input' : 'write'} name='${this._price.title}' value='0'></x-io-numeric></div>
                <div style='display: table-cell' id='price'></div>
                <div style='display: table-cell' id='total'></div>
            `);
        this[title] = this.querySelector('#title');
        this[price] = this.querySelector('#price');
        this[input] = this.querySelector('x-inline');
        this[total] = this.querySelector('#total');

        this[input].addEventListener('blur', () => {
            let tot = this.getTotal();
            this[total].innerHTML = tot;
            this.fire('blur', tot);
        });
    }

    adapt() {
        super.adapt();
        this[title].innerHTML = this._price.title;
        this[price].innerHTML = this._price.Amount;
        if (this._value && typeof (this._value) == 'object' && isFinite(this._value.Amount)) {
            this[input].setAttribute('value', this._value.Amount);
            this[total].innerHTML = this.getTotal();
        } else {
            this[input].setAttribute('value', 0);
            this[total].innerHTML = 0;
        }
    }

    getTotal() {
        let val = this[input].value;
        val = parseInt(val);
        return val * this._price.Amount;
    }

    getBillLine() {
        let val = this[input].value;
        val = parseInt(val);
        let res = {
            title: this._price.title,
            Amount: val,
        };
        if (this._value) {
            if (this._value.id) {
                res.id = this._value.id;
            }
            if (this._value.Date) {
                res.Date = this._value.Date;
            }
        }
        return res;
    }
}

window.customElements.define('block-bill-line', BlockBillLine);
