
import XGroupPanel from '../../app/elements/render/x-group-panel.js';
import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    it('should initialize', function () {
        const el = new XGroupPanel();
        el.setAttribute('title', 'test');

        expect(el.shadowRoot.querySelector('legend')).not.toBeNull();
        expect(el.shadowRoot.querySelector('legend').innerHTML).toBe('test');

        expect(el.checkValidity()).toBeTruthy();
    });
});
