/* eslint-env jasmine */
/* global webDescribe */

describe('jh-i18n-test', function() {
	webDescribe('without value', '<jh-i18n></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('');
		});
	});

	webDescribe('with value=', '<jh-i18n value=""></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('');
		});
	});

	webDescribe('with value=original', '<jh-i18n value=\'original\'></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('original');
		});
	});

	webDescribe('with value=originalThere', '<jh-i18n value=\'originalThere\'></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('original There');
		});
	});

	webDescribe('with value=123', '<jh-i18n value=\'123\'></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('123');
		});
	});
});
