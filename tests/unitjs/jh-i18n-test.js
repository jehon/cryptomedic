/* eslint-env jasmine */
/* global webDescribe */

describe('jh-i18n-test', function() {
	webDescribe('with value=original', '<jh-i18n value=\'original\'></jh-i18n>', function(element) {
		it('should show text', function() {
			expect(element()).not.toBeNull();
			expect(element().innerHTML).toBe('original');
		});
	});
});
