
import '../../app/elements/render/x-messages.js';
import { messages } from '../../app/config.js';

import { fn } from './athelpers.js';
import XMessage from '../../app/elements/render/x-message.js';

describe(fn(import.meta.url), function () {
    const el = new XMessage();

    it('should show a message', function () {
        el.innerHTML = 'test';
        el.setAttribute('level', 'success');

        expect(el.style.backgroundColor).toBe('rgb(223, 240, 216)');
    });

    it('should show different types', function () {
        spyOn(console, 'error');
        el.setAttribute('level', '');
        el.setAttribute('level', messages.success);
        el.setAttribute('level', messages.info);
        el.setAttribute('level', messages.warning);
        el.setAttribute('level', messages.error);
        expect(console.error).not.toHaveBeenCalled();

        el.setAttribute('level', 'anything');
        expect(console.error).toHaveBeenCalled();
    });

});
