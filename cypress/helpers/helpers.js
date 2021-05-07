
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
