
import XGroupPanel from '../../app/elements/widgets/generic/x-group-panel.js';
import { fn } from './athelpers.js';

// TODO: use constructor instead of webDescribe

describe(fn(import.meta.url), function () {
    it('should initialize', function () {
        const el = new XGroupPanel();
        el.setAttribute('title', 'test');

        expect(el.shadowRoot.querySelector('legend')).not.toBeNull();
        expect(el.shadowRoot.querySelector('legend').innerHTML).toBe('test');

        expect(el.checkValidity()).toBeTruthy();
    });
});
