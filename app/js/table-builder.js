import { createElementWithTag, enrichObject } from './custom-element.js';

export default class TableBuilder {
    /** @type {HTMLElement} */
    #element

    /** @type {Array<HTMLElement>} */
    #headers = []

    /** @type {Array<HTMLElement>} */
    #content = []

    /** @type {Array<object>} */
    #data

    /**
     *
     * @param {Array<object>} data to be set in the table
     * @param {object} options to pass it
     * @param {number} options.headerRows - amount of row header to set
     */
    constructor(data, { headerRows = 1 } = {}) {
        this.#data = data;

        for (let i = 0; i < headerRows; i++) {
            let r = createElementWithTag('tr');
            this.#headers.push(r);
        }

        for (let i = 0; i < data.length; i++) {
            let r = createElementWithTag('tr');
            this.#content.push(r);
        }

        this.#element = createElementWithTag('table', {}, [
            createElementWithTag('thead', {}, this.#headers),
            createElementWithTag('tbody', {}, this.#content)
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
     * Set attributes on each row element element
     *
     * @param {object} attributes to be set
     * @param {function(Element, *, number): void} callback to modify the element
     *
     * @returns {TableBuilder} for chaining
     */
    enrichRows(attributes = {}, callback = (_el, _i) => { }) {
        for (let i = 0; i < this.#content.length; i++) {
            enrichObject(this.#content[i], attributes, [], (el) => callback(el, this.#data[i], i));
        }

        return this;
    }

    /**
     *
     * @param {string|Array<string>|null} headers to be put in headers
     * @param {string | Function} fieldData to be put in cells
     *
     * @returns {TableBuilder} for chaining
     */
    addColumn(headers, fieldData) {
        if (!Array.isArray(headers)) {
            headers = [headers];
        }
        for (let i = 0; i < this.#headers.length; i++) {
            const v = headers[i];
            if (v === null) {
                // null header = extend precedent one
                const prev = /** @type {HTMLElement} */ (this.#headers[i].lastChild);
                const colspan = prev.hasAttribute('colspan') ? Number.parseInt(prev.getAttribute('colspan')) : 1;
                prev.setAttribute('colspan', '' + (colspan + 1));
                // null header = extend precedent one
            } else {
                this.#headers[i].append(createElementWithTag('th', {}, v));
            }
        }

        for (let i = 0; i < this.#content.length; i++) {
            let data = this.#data[i];
            let v = '';
            if (typeof (fieldData) == 'string') {
                v = data[fieldData];
            }
            if (fieldData instanceof Function) {
                v = fieldData(data);
            }
            this.#content[i].append(createElementWithTag('td', {}, v));
        }

        return this;
    }

    render() {
        return this.#element;
    }
}