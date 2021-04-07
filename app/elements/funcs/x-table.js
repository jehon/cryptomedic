
// TODO: use x-table this in x-page-reports
// TODO: use x-table this in x-page-search

import { defineCustomElement, createElementWithObject, createElementWithTag, enrichObject } from '../../js/custom-element.js';
import XOverlay from '../render/x-overlay.js';
import XPanel from '../render/x-panel.js';

/**
 * Fill in a table
 *
 * @param {Array<T>} arr to be fill in
 * @param {number} newSize to expand
 * @param {T} withValue to fill in
 * @template {*} T
 *
 * @returns {Array<T>} completed
 */
function arrayResize(arr, newSize, withValue) {
    arr = arr ?? [];
    return [...arr, ...Array(newSize - arr.length).fill(withValue)];
}

export default class XTable extends HTMLElement {
    /** @type {HTMLElement} */
    _element

    /** @type {XOverlay} */
    _overlay

    _regions

    /** @type {Array<string|function(object, number):(string|HTMLElement)>} to describe data/body columns */
    _columns

    /** @type {function(Element, *, number): void} callback to modify the element */
    _rowsCallback

    constructor() {
        super();

        this._regions = {
            headers: createElementWithTag('thead', {}),
            body: createElementWithTag('tbody', {}),
            footers: createElementWithTag('tfoot', {}),
        };
        this._columns = [];
        this._rowsCallback = null;

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
                }, [
                    this._regions.headers,
                    this._regions.body,
                    this._regions.footers,
                ])
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
     *
     * @param {HTMLElement} region of the region
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    _addLinesInRegion(region, n, attributes, callback) {
        for (let i = 0; i < n; i++) {
            region.append(createElementWithTag('tr', attributes, [], (el) => callback(el, i)));
        }
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
        this._addLinesInRegion(this._regions.headers, n, attributes, callback);
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
        this._addLinesInRegion(this._regions.footers, n, attributes, callback);
        return this;
    }

    /**
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {XTable} for chaining
     */
    addRowFormatting(callback = (_el, _i) => { }) {
        this._rowsCallback = callback;
        return this;
    }

    /**
     * @param {Array<object>} data to be set in the table
     *
     * @returns {XTable} for chaining
     */
    setData(data) {
        this._regions.body.innerHTML = '';

        this._overlay.free();
        this.removeAttribute('empty');
        this.setAttribute('count', '' + data?.length);

        this._addLinesInRegion(this._regions.body, data.length, {}, (el, i) => this._rowsCallback(el, data[i], i));

        for (const fieldData of this._columns) {
            this._addCellToEachLinesInRegion(this._regions.body,
                data
                    .map(row =>
                        fieldData instanceof Function
                            ? (i) => fieldData(row, i)
                            : (i) => (data[i][fieldData] ?? '')
                    ),
                'td'
            );
        }

        return this;
    }

    /**
     *
     * @param {HTMLElement} region to be filled in
     * @param {Array<string|function(number):string|null>} values to be put in cells
     * @param {string} tag name
     *
     * @returns {Array<string>} of calculated values
     */
    _addCellToEachLinesInRegion(region, values, tag) {
        if (!region) {
            console.error('Region is empty: ', region);
        }

        const childrenList = Array.from(region.children);
        if (!childrenList || childrenList.length < values.length) {
            console.error('Too much data: ', childrenList, values);
        }


        let res = [];

        for (let i = 0; i < childrenList.length; i++) {
            let val = values[i];
            if (val instanceof Function) {
                val = val(i);
            }

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

    /**
     *
     * @param {string|function(object, number):(string|HTMLElement)} fieldData to be put in cells
     * @param {Array<null|string|function([string]):(string|HTMLElement)>} headers to be put in headers (in reverse order)
     * @param {Array<null|string|function([string]):(string|HTMLElement)>} footers to be put in footesr (in reverse order)
     *
     * @returns {XTable} for chaining
     */
    addColumn(fieldData, headers = [], footers = []) {
        this._columns.push(fieldData);

        this._addCellToEachLinesInRegion(this._regions.headers,
            arrayResize(headers, this._regions.headers.childElementCount, null).reverse().map(row =>
                (n) =>
                    row instanceof Function
                        ? 'Not implemented ' + n // TODO
                        : row
            ),
            'th'
        );

        this._addCellToEachLinesInRegion(this._regions.footers,
            arrayResize(footers.reverse(), this._regions.footers.childElementCount, null).reverse().map(row =>
                (n) =>
                    row instanceof Function
                        ? 'Not implemented ' + n // TODO
                        : row
            ),
            'th'
        );

        return this;
    }
}

defineCustomElement(XTable);