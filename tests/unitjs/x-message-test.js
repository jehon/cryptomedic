
import '../../app/elements/panels/x-messages.js';

import { fn } from './athelpers.js';
import XMessage from '../../app/elements/widgets/x-message.js';

describe(fn(import.meta.url), function () {
    const el = new XMessage();

    it('should show a message', function () {
        el.innerHTML = 'test';
        el.setAttribute('level', 'success');

        expect(el.style.backgroundColor).toBe('rgb(223, 240, 216)');
    });

    it('should show different types', function () {
        spyOn(console, 'info');
        el.setAttribute('level', '');
        el.setAttribute('level', 'success');
        el.setAttribute('level', 'warning');
        el.setAttribute('level', 'danger');
        expect(console.info).not.toHaveBeenCalled();

        el.setAttribute('level', 'anything');
        expect(console.info).toHaveBeenCalled();
    });

});
