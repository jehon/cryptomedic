/// <reference types="Cypress" />

const activeConfig = Cypress.env('flavor');

/**
 * Filter Cypress tests based on a given tag or tags. If no tags are present, run tests.
 *
 * @param {string} requiredConfig An array of tags
 * @param {Function} runTest All tests captured within a Cypress run
 * @example npm run open --env flavor=api
 */
export default function flavorFilter(requiredConfig, runTest) {
    if (activeConfig == requiredConfig) {
        runTest();
    }
}

flavorFilter.DESKTOP = 'desktop';
