/* global webDescribe, JHElement */

describe('x-input-date-test', function() {
	webDescribe('initial', '<x-input-date></x-input-date>', function(element) {
		it('should be initialized', function() {
			expect(element()).not.toBeNull();
		});

		it('should allow setting the value programmatically', function() {
			element().value = '2018-10-21';
			expect(element().value).toBe('2018-10-21');
		});

		it('should allow setting the value programmatically', function() {
			element().setAttribute('value', '2018-11-21');
			expect(element().value).toBe('2018-11-21');
		});

		it('should fire blur event on change', function(done) {
			element().addEventListener('blur', () => done());
			JHElement.fireOn(element().querySelector('input'), 'blur', {});
		});
	});

	webDescribe('with value', '<x-input-date value=\'2017-02-03\'></x-input-date>', function(element) {
		it('should have the value', function() {
			expect(element().querySelector('input').value).toBe('2017-02-03');
		});
	});
});
