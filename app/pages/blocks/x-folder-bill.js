
import { defineCustomElement } from '../../js/custom-element.js';
// import XBillLine from '../../widgets/x-bill-line.js';

/**
 * @typedef {import('../../widgets/io/x-io-numeric.js')} XIoNumeric
 */

/**
 * @param {Array<Object<string,(number|Date)>>} prices as the reference
 * @param {Date} date as the pivot date
 * @returns {Object<string,(number|Date)>} as the price
 */
function selectPriceFromDate(prices, date) {
    /** @type {number} */
    let price_id = -1;

    if (typeof (date) == 'undefined' || !date || !prices) {
        price_id = 0;
        return null;
    }

    var dref = date;
    /** @type {Object<string,*>} */
    let price = null;
    for (const i in prices) {
        var p = prices[i];
        if (((p['datefrom'] == null) || (p['datefrom'] <= dref))
            && ((p['dateto'] == null) || (p['dateto'] > dref))) {
            price_id = parseInt(i);
            price = prices[i];
        }
    }

    if (price_id < 0) {
        throw new Error('Price Id not set');
    }

    return price;
}

export default class XFolderBill extends HTMLElement {
    _allPrices

    _currentFile

    _edit = false;

    constructor() {
        super();
        if (location.hash.endsWith('/edit') || location.hash.endsWith('/Bill')) {
            this._edit = true;
        }
    }

    set allPrices(p) {
        this._allPrices = p;
        this.update();
    }

    set currentFile(cf) {
        this._currentFile = cf;
        this.update();
    }

    update() {
        if (!this._currentFile) {
            return;
        }

        const selectedPrice = selectPriceFromDate(this._allPrices, this._currentFile.Date);

        if (!selectedPrice) {
            return;
        }

        setTimeout(() => {
            // Let some time to angular to render the stuff
            for (const e of this.querySelectorAll('x-bill-line[price-name]')) {
                const pn = e.getAttribute('price-name');
                e.setAttribute('price', '' + selectedPrice[pn]);
                if (this._edit) {
                    e.setAttribute('input', 'input');
                } else {
                    e.removeAttribute('input');
                }
            }

            for (const e of this.querySelectorAll('x-io-numeric[name]')) {
                const xio = /** @type {XIoNumeric} */ /** @type {*} */ (e);
                const pn = xio.getAttribute('name');
                xio.value = this._currentFile[pn];
            }
        }, 1000);
    }
}

defineCustomElement(XFolderBill);
