
export default class TableIterator {
    static get LAST() { return -1; }

    /** @type {string} */
    #tableSelector

    /** @type {number} */
    #row

    /** @type {number} */
    #col

    /** @type {string} */
    #section

    constructor(tableSelector, row = 1, col = 1, section = 'tbody') {
        this.#tableSelector = tableSelector;
        this.#row = row;
        this.#col = col;
        this.#section = section;
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
        cy.get(this.#tableSelector).find('table > ' + this.toString() + ' ' + selector).should('contain', text);
        return this;
    }
}
