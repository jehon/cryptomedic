
const timestamp = new Date().toJSON();

export function getTestTimestamp() { return timestamp + ''; }

export function getTestName() {
    if (!('mocha' in Cypress)) {
        return '';
    }

    let cypressContext = Cypress.mocha.getRunner().suite.ctx.test;
    let testTitles = [];

    while (cypressContext) {
        testTitles.push(cypressContext.title);
        cypressContext = cypressContext.parent;
    }
    // function extractTitles(obj) {
    //     if (obj.hasOwnProperty('parent')) {
    //         testTitles.push(obj.title);
    //         let nextObj = obj.parent;
    //         extractTitles(nextObj);
    //     }
    // }

    // extractTitles(cypressContext);
    let orderedTitles = testTitles.reverse();
    let fileName = Cypress.spec.relative.replace('cypress/integration/', '') + '-' + orderedTitles.join('-');
    return fileName;
}

export class TableIterator {
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
        // this.waitForElementVisible(tableSelector);
        // this.waitForElementVisible(iterator.toString() + ' ' + selector);
        // if (text) {
        //     this
        //         .assert.containsText(iterator.toString(), text);
        // }
        return this;
    }
}
