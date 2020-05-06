
import '../../app/elements/panels/x-messages.js';

import { fn, webDescribe } from './athelpers.js';
import { levels } from '../../app/config.js';

describe(fn(import.meta.url), function () {
    webDescribe('initialized', '<x-messages></x-messages>', function (element) {
        beforeEach(() => {
            element().clear();
        });

        it('should show messages', () => {
            expect(element().querySelectorAll('div').length).toBe(0);
            expect(element().messagesCount).toBe(0);

            element().showMessages(['a', 'b']);
            expect(element().querySelectorAll('div').length).toBe(2);
            expect(element().messagesCount).toBe(2);

            element().addMessage('c');
            expect(element().querySelectorAll('div').length).toBe(3);
            expect(element().messagesCount).toBe(3);

            element().showMessages(['a', 'b']);
            expect(element().querySelectorAll('div').length).toBe(2);
            expect(element().messagesCount).toBe(2);
        });

        it('should clear', () => {
            element().showMessages(['a', 'b']);
            expect(element().messagesCount).toBe(2);

            element().clear();
            expect(element().messagesCount).toBe(0);
        });

        it('should add messages', () => {
            element().addMessage('c');
            expect(element().messagesCount).toBe(1);

            element().addMessage({ text: 'c', level: levels.danger, id: 'MSG_C' });
            expect(element().messagesCount).toBe(2);
            expect(element().querySelectorAll('div#MSG_C').length).toBe(1);
            expect(element().messagesIds).toContain('MSG_C');

            element().addMessage('c', levels.danger, '', 'MSG_D');
            expect(element().messagesCount).toBe(3);
            expect(element().messagesIds).toContain('MSG_D');
        });
    });
});
