
import '../../app/elements/panels/x-messages.js';

import { webDescribe } from './athelpers.js';
import { levels } from '../../app/config.js';

describe('tests/unit/x-messages-test.js', function () {
    webDescribe('initialized', '<x-messages></x-messages>', function (element) {
        beforeEach(() => {
            element().clear();
        });

        it('should show messages', () => {
            expect(element().querySelectorAll('div').length).toBe(0);

            element().showMessages(['a', 'b']);
            expect(element().querySelectorAll('div').length).toBe(2);

            element().addMessage('c');
            expect(element().querySelectorAll('div').length).toBe(3);

            element().showMessages(['a', 'b']);
            expect(element().querySelectorAll('div').length).toBe(2);
        });

        it('should clear', () => {
            element().showMessages(['a', 'b']);
            expect(element().querySelectorAll('div').length).toBe(2);

            element().clear();
            expect(element().querySelectorAll('div').length).toBe(0);
        });

        it('should add messages', () => {
            element().addMessage('c');
            expect(element().querySelectorAll('div').length).toBe(1);

            element().addMessage({ text: 'c', level: levels.danger });
            expect(element().querySelectorAll('div').length).toBe(2);

            element().addMessage('c', levels.danger, '');
            expect(element().querySelectorAll('div').length).toBe(3);
        });
    });
});
