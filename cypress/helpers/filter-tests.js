/// <reference types="Cypress" />

const activeConfig = Cypress.env('config');

/**
 * Filter Cypress tests based on a given tag or tags. If no tags are present, run tests.
 *
 * @param {string} requiredConfig An array of tags
 * @param {Function} runTest All tests captured within a Cypress run
 * @example npm run open --env config=api
 */
export default function configFilter(requiredConfig, runTest) {
    if (activeConfig == requiredConfig) {
        runTest();
    }
}

configFilter.DESKTOP = 'desktop';
