
export default class TableIterator {
    static get LAST() { return -1; }

    /** @type {string} */
    #tableSelector;

    /** @type {number} */
    #row;

    /** @type {number} */
    #col;

    /** @type {string} */
    #section;

    /** @type {boolean} true if the table selector is a x-table */
    #xtable;

    constructor(tableSelector, options) {
        this.#tableSelector = tableSelector;
        this.#row = options?.row ?? 1;
        this.#col = options?.col ?? 1;
        this.#section = options?.section ?? 'tbody';
        this.#xtable = options?.xtable ?? true;
    }

    col(i) { this.#col = i; return this; }
    row(i) { this.#row = i; return this; }
    section(i = 'tbody') { this.#section = i; return this; }
    nextCol(i = 1) { this.#col += i; return this; }
    nextRow(i = 1) { this.#row += i; return this; }
    lastCol() { this.#col = TableIterator.LAST; return this; }
    lastRow() { this.#row = TableIterator.LAST; return this; }

    toString() {
        return this.#section
            + ` > tr:${(this.#row === TableIterator.LAST ? 'last-child' : `nth-child(${this.#row})`)}`
            + ` > ${this.#section == 'tbody' ? 'td' : 'th'}:${(this.#col === TableIterator.LAST ? 'last-child' : `nth-child(${this.#col})`)}`;
    }

    assert(text, selector = '') {
        cy.get(this.#tableSelector).find((this.#xtable ? 'table > ' : '') + this.toString() + ' ' + selector).should('contain.text', text);
        return this;
    }

    log() {
        console.info(this.toString(), document.querySelector(this.toString()));
        return this;
    }
}
