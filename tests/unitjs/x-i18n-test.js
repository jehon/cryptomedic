
import XI18n from '../../app/elements/widgets/x-i18n.js';
import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    withHtml({ title: 'without value', html: '<x-i18n></x-i18n>' },
        function (element) {
            it('should show text', function () {
                expect(element()).not.toBeNull();
                expect(element().innerHTML).toBe('');
            });
        });

    withHtml({ title: 'with value=', html: '<x-i18n value=""></x-i18n>' },
        function (element) {
            it('should show text', function () {
                expect(element()).not.toBeNull();
                expect(element().innerHTML).toBe('');
            });
        });

    withHtml({ title: 'with value=original', html: '<x-i18n value=\'original\'></x-i18n>' },
        function (element) {
            it('should show text', function () {
                expect(element()).not.toBeNull();
                expect(element().innerHTML).toBe('original');
            });
        });

    withHtml({ title: 'with value=originalThere', html: '<x-i18n value=\'originalThere\'></x-i18n>' },
        function (element) {
            it('should show text', function () {
                expect(element()).not.toBeNull();
                expect(element().innerHTML).toBe('original There');
            });
        });

    withHtml({ title: 'with value=123', html: '<x-i18n value=\'123\'></x-i18n>' },
        function (element) {
            it('should show text', function () {
                expect(element()).not.toBeNull();
                expect(element().innerHTML).toBe('123');
            });
        });

});
