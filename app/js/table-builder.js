import { createElementWithTag, enrichObject } from './custom-element.js';

/**
 * Fill in a table
 *
 * @param {Array<T>} arr to be fill in
 * @param {number} newSize to expand
 * @param {T} withValue to fill in
 * @template T
 *
 * @returns {Array<T>} completed
 */
function arrayResize(arr, newSize, withValue) {
    arr = arr ?? [];
    return /** @type {Array<T>} */ ([...arr, ...Array(newSize - arr.length).fill(withValue)]);
}

export default class TableBuilder {
    /** @type {HTMLElement} */
    #element

    #regions = {
        headers: createElementWithTag('thead', {}),
        body: createElementWithTag('tbody', {}),
        footers: createElementWithTag('tfoot', {}),
    }

    /** @type {Array<object>} */
    #data

    constructor() {
        this.#element = createElementWithTag('table', {}, [
            this.#regions.headers,
            this.#regions.body,
            this.#regions.footers,
        ]);
    }

    /**
     * Set attributes on the top table element
     *
     * @param {object} attributes to be set
     * @param {function(Element): void} callback to modify the element
     *
     * @returns {TableBuilder} for chaining
     */
    enrichTable(attributes = {}, callback = (_el) => { }) {
        enrichObject(this.#element, attributes, [], callback);

        return this;
    }


    /**
     *
     * @param {HTMLElement} region of the region
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, *, number): void} callback to modify the element
     */
    _addRegion(region, n, attributes, callback) {
        for (let i = 0; i < n; i++) {
            region.append(createElementWithTag('tr', attributes, [], (el) => callback(el, this.#data[i], i)));
        }
    }

    /**
     * Set the number of headers
     *
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {TableBuilder} for chaining
     */
    addHeaders(n, attributes = {}, callback = (_el, _i) => { }) {
        this._addRegion(this.#regions.headers, n, attributes, callback);
        return this;
    }

    /**
     * Set the number of footers
     *
     * @param {number} n - the number of * to add
     * @param {object} attributes to be set
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {TableBuilder} for chaining
     */
    addFooters(n, attributes = {}, callback = (_el, _i) => { }) {
        this._addRegion(this.#regions.footers, n, attributes, callback);
        return this;
    }

    /**
     * @param {Array<object>} data to be set in the table
     * @param {object} attributes to be set
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {TableBuilder} for chaining
     */
    addData(data, attributes = {}, callback = (_el, _i) => { }) {
        this.#data = data;
        this._addRegion(this.#regions.body, data.length, attributes, callback);

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
    _addToRegion(region, values, tag) {
        const childrenList = Array.from(region.children);

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
     * @param {string|function(object, number):string} fieldData to be put in cells
     * @param {Array<null|string|function([string]):string>} headers to be put in headers (in reverse order)
     * @param {Array<null|string|function([string]):string>} footers to be put in footesr (in reverse order)
     *
     * @returns {TableBuilder} for chaining
     */
    addColumn(fieldData, headers = [], footers = []) {

        // BODY
        // const values =
        this._addToRegion(this.#regions.body,
            this.#data
                .map(row =>
                    fieldData instanceof Function
                        ? (i) => (fieldData(row, i) ?? '')
                        : (i) => (this.#data[i][fieldData] ?? '')
                ),
            'td'
        );

        this._addToRegion(this.#regions.headers,
            arrayResize(headers, this.#regions.headers.childElementCount, null).reverse().map(row =>
                (n) =>
                    row instanceof Function
                        ? 'Not implemented ' + n // TODO
                        : row
            ),
            'th'
        );

        this._addToRegion(this.#regions.footers,
            arrayResize(footers.reverse(), this.#regions.footers.childElementCount, null).reverse().map(row =>
                (n) =>
                    row instanceof Function
                        ? 'Not implemented ' + n // TODO
                        : row
            ),
            'th'
        );

        return this;
    }

    render() {
        return this.#element;
    }
}