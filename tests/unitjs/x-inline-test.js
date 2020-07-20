
import '../../app/elements/x-inline.js';

import { webDescribe } from './athelpers.js';

import JHElement from '../../app/elements/jh-element.js';

// TODO: use constructor instead of webDescribe

describe('x-inline-test', function () {
    beforeEach(function () {
        spyOn(console, 'error');
    });

    webDescribe('without parameters', '<x-inline edit></x-inline>', function (element) {
        it('should be instanciated', function () {
            let xelement = element().querySelector('x-write');
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe('');
            expect(xelement.getAttribute('value')).toBe('');
        });
    });

    webDescribe('without parameters', '<x-inline></x-inline>', function (element) {
        it('should be instanciated', function () {
            let xelement = element().querySelector('x-read');
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe('');
            expect(xelement.getAttribute('value')).toBe('');
        });
    });

    webDescribe('with mode read', '<x-inline name=\'xname\' type=\'xtype\' value=\'xvalue\'></x-inline>', function (element) {
        it('should be instanciated', function () {
            let xelement = element().querySelector('x-read');
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe('xtype');
            expect(xelement.getAttribute('value')).toBe('xvalue');
        });
    });

    webDescribe('with mode edit', '<x-inline edit name=\'xname\' type=\'numeric\' value=\'xvalue\' ping=\'pong\' test editable></x-inline>', function (element) {
        it('should be instanciated', function () {
            let xelement = element().querySelector('x-write');
            expect(xelement).not.toBeNull();

            expect(xelement.getAttribute('name')).toBeNull();
            expect(xelement.getAttribute('type')).toBe('numeric');
            expect(xelement.getAttribute('value')).toBe('xvalue');
            expect(xelement.getAttribute('ping')).toBe('pong');
            expect(xelement.hasAttribute('test')).toBeTruthy();
            // edit* parameters should not be passed through
            expect(xelement.hasAttribute('editable')).toBeFalsy();
        });

        it('should fire event', function () {
            let res = false;
            element().addEventListener('blur', () => { res = 'test'; });
            const input = element().querySelector('input');
            input.value = 10;
            JHElement.fireOn(input, 'blur', 10);
            expect(res).toBe('test');
            expect(element().value).toBe(10);
        });

        it('should fire event on blur', function () {
            let res = false;
            element().addEventListener('blur', () => { res = 'test'; });
            element().blur();
            expect(res).toBe('test');
        });

        it('should react to set value', function () {
            element().value = 111;
            expect(element().value).toBe(111);
        });
    });
});
