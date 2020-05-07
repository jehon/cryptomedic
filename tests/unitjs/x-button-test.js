
import '../../app/elements/widgets/x-button.js';

import { fn, webDescribe } from './athelpers.js';
import { levels, icons } from '../../app/config.js';

describe(fn(import.meta.url), function () {
    webDescribe('initialized', '<x-button></x-button>', function (element) {
        it('should initialize', function () {
            expect(element()).not.toBeNull();
            expect(element().shadowRoot.querySelector('button')).not.toBeNull();
            expect(element().shadowRoot.querySelector('img').offsetWidth).toBe(0);
        });

        it('should reac to click', function (done) {
            element().addEventListener('click', (event) => done());
            element().shadowRoot.querySelector('button').click();
        });
    });

    webDescribe('with level and icon', `<x-button level="${levels.success}" icon='${icons.error}'></x-button>`, function (element) {
        it('should initialize', function () {
            expect(element()).not.toBeNull();
            expect(element().shadowRoot.querySelector('button')).not.toBeNull();
            expect(element().shadowRoot.querySelector('img').offsetWidth).toBeGreaterThan(0);
        });
    });

    webDescribe('within form', '<form><x-button></x-button></form>', function (element) {
        it('should not submit a form', function (done) {
            element().addEventListener('submit', () => done.fail('form has been submitted'));
            element().querySelector('x-button').shadowRoot.querySelector('button').click();
            setTimeout(() => {
                done();
            }, 10);
        })
    })
});
