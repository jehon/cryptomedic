
import { defineCustomElement, createElementWithObject, createElementWithTag, enrichObject } from '../../js/custom-element.js';
import XOverlay from '../render/x-overlay.js';
import XPanel from '../render/x-panel.js';

//
// TODO: switch to Grid
// Idea to reverse it (statistical report): https://stackoverflow.com/a/44092580/1954789
// Style by region name: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
//

/**
 * @typedef {string|function(object, number, object):(string|HTMLElement)} BodyDetailDescription - function is (val, index, fullData)
 * @typedef {null|string|function([string], number, Object):(string|HTMLElement)} HeadFootDetailDescription - funciton is (col, index, fullData)
 */

/**
 *
 * Attributes: horizontal (otherwise: by columns)
 *
 *  > set: a set of data ([hi, hi], [i, i, i], [fi, fi] )
 *  - detail: a cross et ([ h1 ], [ i, j, k, l ], [ f1 ])
 *
 * Vertical (default)
 *
 * +-----+
 * │head │
 * +-----+
 * │ijllm│
 * │i   m│
 * │i v m│
 * │i   m│
 * │ijklm│
 * +-----+
 * │foot │
 * +-----+
 *
 * Horizontal
 *
 * +-+-----+-+
 * |h|iiiii|f|
 * |e|j   j|o|
 * |a|k > k|o|
 * |d|l   l|t|
 * |d|mmmmm|t|
 * +-+-----+-+
 *
 * TODO: addBefore(), addAfter() => first/last column or head/foot ?
 */
export default class XTable extends HTMLElement {
    /** @type {HTMLElement} */
    _element

    /** @type {XOverlay} */
    _overlay

    /**
     * @type {Object} to describe data/body
     * @property {BodyColumnDescription} rows - to generate row in each columns
     * @property {Array<HeadFootColumnDescription>} headers - to generate thead data
     * @property {Array<HeadFootColumnDescription>} footers - to generate tfoot data
     */
    _details

    /**
     * @type {Object} the config of the table
     * @property {Object} headers to define headers
     * @property {Object} footers to define footers
     */
    _config

    /** @type {function(Element, *, number): void} callback to modify the element */
    _rowsCallback

    constructor() {
        super();

        this._details = [];
        this._config = {};

        this._rowsCallback = () => { };

        // this.attachShadow({ mode: 'open' });

        this.innerHTML = '';
        this.append(
            // createElementWithTag('css-inherit'),
            // getPanelStyles(this, true),
            this._overlay = createElementWithObject(XOverlay, {}, [
                createElementWithObject(XPanel, { slot: 'overlay' }, [
                    this._overlayMsg = createElementWithTag('div'),
                ]),
                this._element = createElementWithTag('table', {
                    class: 'table table-hover table-bordered tablesorter',
                    style: {
                        width: '100%'
                    }
                }, [])
            ])
        );
        this.block();
    }

    block(msg = 'No result found') {
        this._overlay.block();
        this._overlayMsg.innerHTML = msg;
        this.setAttribute('empty', 'empty');
        this.setAttribute('count', '0');
    }

    /**
     * Set attributes on the top table element
     *
     * @param {object} attributes to be set
     * @param {function(Element): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    enrichTable(attributes = {}, callback = (_el) => { }) {
        enrichObject(this._element, attributes, [], callback);
        return this;
    }

    /**
     * Set the number of headers
     *
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    addHeaders(n, attributes = {}, callback = (_el, _i) => { }) {
        this._config.headers = { n, attributes, callback };
        return this;
    }

    /**
     * Set the number of footers
     *
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    addFooters(n, attributes = {}, callback = (_el, _i) => { }) {
        this._config.footers = { n, attributes, callback };
        return this;
    }

    /**
     *
     * @param {BodyDetailDescription} fieldData to be put in cells
     * @param {Array<HeadFootDetailDescription>} headers to be put in headers (in reverse order)
     * @param {Array<HeadFootDetailDescription>} footers to be put in footers
     * @param {function(Element, BodyDetailDescription, number): void} callback to modify the element
     * @returns {XTable} for chaining
     */
    addDetail(fieldData, headers = [], footers = [], callback = (_el, _fieldData, _i) => { }) {
        this._details.push({
            body: fieldData,
            headers,
            footers,
            callback
        });

        return this;
    }

    /**
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    addSetFormatting(callback = (_el, _data, _i) => { }) {
        this._rowsCallback = callback;
        return this;
    }

    /**
     * @param {Array<object>} data to be set in the table
     * @param {object} context as third parameter for everything
     * @returns {XTable} for chaining
     */
    setData(data, context) {
        this._overlay.free();
        this.removeAttribute('empty');
        this.setAttribute('count', '' + data?.length);

        // empty rows and create them back emtpy
        this._element.innerHTML = '';
        const _regions = {
            headers: createElementWithTag('thead', {}),
            body: createElementWithTag('tbody', {}),
            footers: createElementWithTag('tfoot', {}),
        };
        this._element.append(_regions.headers, _regions.body, _regions.footers);

        if (this._config.headers) {
            this._addSetInRegion(_regions.headers, this._config.headers.n, this._config.headers.attributes, this._config.headers.callback);
        }
        if (this._config.footers) {
            this._addSetInRegion(_regions.footers, this._config.footers.n, this._config.footers.attributes, this._config.footers.callback);
        }
        this._addSetInRegion(_regions.body, data.length, {}, (el, i) => this._rowsCallback(el, data[i], i));

        for (const col of this._details) {
            let colData = data.map(row =>
                col.body instanceof Function
                    ? (i) => col.body(row, i, context)
                    : () => (row[col.body] ?? '')
            );

            this._addDetailToSetsInRegion(_regions.body,
                colData,
                'td'
            );

            const calcColData = colData.map((v, i) => v(i));

            if (this._config.headers) {
                //
                // If we don't have enough values, we need to add the at top rows
                //    because the values given are probably more specific
                //    To materialize this, headers are passed in reverse order (first on = closer to the body)
                this._addDetailToSetsInRegion(_regions.headers,
                    [...col.headers, ...Array(this._config.headers.n - col.headers.length)].reverse()
                        // For each row of ...
                        .map(row =>
                            (n) =>
                                row instanceof Function
                                    ? row(calcColData, n, context)
                                    : row
                        ),
                    'th'
                );
            }

            if (this._config.footers) {
                //
                // If we don't have enough values, we must add them at the bottom row
                //    because the values given are probably more specific
                //
                this._addDetailToSetsInRegion(_regions.footers,
                    [...col.footers, ...Array(this._config.footers.n - col.footers.length)]
                        // For each row of ...
                        .map(row =>
                            (n) =>
                                row instanceof Function
                                    ? row(calcColData, n, context)
                                    : row
                        ),
                    'th'
                );
            }
        }

        return this;
    }

    /**
     *
     * @param {HTMLElement} region of the region
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    _addSetInRegion(region, n, attributes, callback) {
        // TODO: rotate
        for (let i = 0; i < n; i++) {
            region.append(createElementWithTag('tr', attributes, [], (el) => callback(el, i)));
        }
        return this;
    }


    /**
     *
     * @param {HTMLElement} region to be filled in
     * @param {Array<function(number):string|null>} values to be put in cells (number = row number)
     * @param {string} tag name
     *
     * @returns {Array<string>} of calculated values
     */
    _addDetailToSetsInRegion(region, values, tag) {
        const childrenList = Array.from(region.children);
        if (!childrenList || childrenList.length < values.length) {
            console.error('Too much data: ', childrenList, values);
        }

        let res = [];

        for (let i = 0; i < childrenList.length; i++) {
            let val = values[i](i);
            const rowElement = childrenList[i];
            if (val == null) {
                // null header = extend precedent one

                const prev = /** @type {HTMLElement} */ (rowElement.lastChild);
                const colspan = prev.hasAttribute('colspan') ? Number.parseInt(prev.getAttribute('colspan')) : 1;
                prev.setAttribute('colspan', '' + (colspan + 1));
            } else {
                rowElement.append(createElementWithTag(tag, {}, val));
            }
            res.push(val);
        }

        return res;
    }
}

defineCustomElement(XTable);