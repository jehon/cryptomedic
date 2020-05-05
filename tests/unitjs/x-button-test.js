
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
    });

    webDescribe('initialized', `<x-button level="${levels.success}" icon='${icons.error}'></x-button>`, function (element) {
        it('should initialize', function () {
            expect(element()).not.toBeNull();
            expect(element().shadowRoot.querySelector('button')).not.toBeNull();
            expect(element().shadowRoot.querySelector('img').offsetWidth).toBeGreaterThan(0);
        });
    });
});
