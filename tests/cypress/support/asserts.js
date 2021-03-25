
// Thanks to https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/extending-cypress__chai-assertions/cypress/support/index.js

chai.use((_chai, _utils) => {
    // Must be a function for "this" to be ok

    _chai.Assertion.addMethod('routeStartsWith', function assertStartsWith(val, _options) {

        // TODO: check next char is '/' or '?'

        this.assert(
            this._obj.startsWith(`#${val}`),
            `expected #{this} to startsWith "${val}"`,
            `expected #{this} to not startsWith "${val}"`,
            this._obj
        );
    });
});
