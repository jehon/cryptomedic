
import '../../www/static/jh-i18n.js';

describe('jh-i18n-test', function () {
	withHtml({ title: 'without value', html: '<jh-i18n></jh-i18n>' },
		function (element) {
			it('should show text', function () {
				expect(element()).not.toBeNull();
				expect(element().innerHTML).toBe('');
			});
		});

	withHtml({ title: 'with value=', html: '<jh-i18n value=""></jh-i18n>' },
		function (element) {
			it('should show text', function () {
				expect(element()).not.toBeNull();
				expect(element().innerHTML).toBe('');
			});
		});

	withHtml({ title: 'with value=original', html: '<jh-i18n value=\'original\'></jh-i18n>' },
		function (element) {
			it('should show text', function () {
				expect(element()).not.toBeNull();
				expect(element().innerHTML).toBe('original');
			});
		});

	withHtml({ title: 'with value=originalThere', html: '<jh-i18n value=\'originalThere\'></jh-i18n>' },
		function (element) {
			it('should show text', function () {
				expect(element()).not.toBeNull();
				expect(element().innerHTML).toBe('original There');
			});
		});

	withHtml({ title: 'with value=123', html: '<jh-i18n value=\'123\'></jh-i18n>' },
		function (element) {
			it('should show text', function () {
				expect(element()).not.toBeNull();
				expect(element().innerHTML).toBe('123');
			});
		});
});
