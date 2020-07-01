
import '../../app/elements/panels/x-group-panel.js';

import { fn, webDescribe } from './athelpers.js';

describe(fn(import.meta.url), function () {
    webDescribe('initialized', '<x-group-panel title="test"></x-group-panel>', function (element) {
        it('should initialize', function () {
            expect(element()).not.toBeNull();
            expect(element().shadowRoot.querySelector('legend')).not.toBeNull();
            expect(element().shadowRoot.querySelector('legend').innerHTML).toBe('test');
        });
    });
});
