
import '../../app/elements/widgets/generic/x-messages.js';

import { fn } from './athelpers.js';
import XMessage from '../../app/elements/widgets/generic/x-message.js';

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
        el.setAttribute('level', 'info');
        expect(console.info).not.toHaveBeenCalled();

        el.setAttribute('level', 'anything');
        expect(console.info).toHaveBeenCalled();
    });

});
