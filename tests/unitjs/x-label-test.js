
import XLabel from '../../app/elements/widgets/generic/x-label.js';

import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {

    it('should instanciate', function () {
        const el = new XLabel();
        el.setAttribute('label', 'label');
        el.connectedCallback();
    });
});
