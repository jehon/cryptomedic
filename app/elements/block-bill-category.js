
/* istanbul ignore file */

import JHElement from './jh-element.js';
import './block-bill-line.js';
import './render/x-group-panel.js';

const tbody = Symbol('tbody');
const catTotal = Symbol('catTotal');
const xGroupPanel = Symbol('x-group-panel');

export default class BlockBillCategory extends JHElement {
    constructor() {
        super();
        this._value = [];
        this._priceLines = [];
        this._date = false;
    }

    static get properties() {
        return {
            value: 'Object',
            priceLines: 'Object',
            category: 'String',
            edit: 'Boolean'
        };
    }

    render() {
        super.render();
        this.innerHTML = `
        <x-group-panel title='default legend'>
            <table class='prices'>
            <thead>
                <tr>
                <th></th>
                <th>Quantity</th>
                <th>Price</th>
                <th>catTotal</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <th>sub-total</th>
                    <th></th>
                    <th></th>
                    <th id='catTotal'></th>
                </tr>
            </tfoot>
        </x-group-panel>`;
        this[tbody] = this.querySelector('tbody');
        this[catTotal] = this.querySelector('#catTotal');
        this[xGroupPanel] = this.querySelector('x-group-panel');
    }

    adapt() {
        super.adapt();
        if (!this._priceLines || this._priceLines.length < 1) {
            return;
        }
        this.removeAttribute('hidden');

        this[tbody].innerHTML = '';
        this[xGroupPanel].setAttribute('title', this._category);
        let displayed = false;
        this._priceLines.forEach((p) => {
            if (p.type == this._category) {
                let v = 0;
                if (this._value) {
                    v = this._value.reduce((acc, v) => {
                        return acc || (v.title == p.title ? v : false);
                    }, false);
                }
                if (v.Amount || this._edit) {
                    this[tbody].append(this.createElementAndAddThem(`<block-bill-line ${this._edit ? 'edit' : ''} style='display: table-row' value='${JSON.stringify(v)}' price='${JSON.stringify(p)}'></block-bill-line>`,
                        null)[0]);
                    displayed = true;
                }
            }
        });
        this.querySelectorAll('block-bill-line').forEach(el => el.addEventListener('blur', () => {
            this._adaptTotal();
            this.fire('blur', null);
        }));
        this._adaptTotal();
        if (!displayed) {
            this.setAttribute('hidden', 'empty-edit');
        }
    }

    getTotal() {
        return Array.from(this.querySelectorAll('block-bill-line')).reduce((acc, el) => {
            return acc + el.getTotal();
        }, 0);
    }

    _adaptTotal() {
        this[catTotal].innerHTML = this.getTotal();
    }

    getBillLines() {
        return Array.from(this.querySelectorAll('block-bill-line')).map(x => x.getBillLine()).filter(x => (x.Amount > 0));
    }
}

window.customElements.define('block-bill-category', BlockBillCategory);
