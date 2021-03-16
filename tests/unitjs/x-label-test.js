
import XLabel from '../../app/elements/render/x-label.js';

import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {

    it('should instanciate', function () {
        const el = new XLabel();
        el.setAttribute('label', 'label');
        el.connectedCallback();
        expect(true).toBeTrue();
    });
});
