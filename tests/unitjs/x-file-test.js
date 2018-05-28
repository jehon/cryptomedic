/* eslint-env jasmine */
/* global webDescribe, JHElement */

describe('tests/unit/x-file-test.js', function() {
	webDescribe('initialized', '<x-file></x-file>', function(element) {
		const f = { a: 1 };
		it('should be blocked when initialized', function() {
			expect(element().value).toBeFalsy();
			expect(element().isBlocked()).toBeTruthy();
		});

		it('should free when value is set', function() {
			element().value = f;
			expect(element().value).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
		});

		it('should free when value is set and call adapt', function() {
			spyOn(element(), 'adapt');
			element().value = f;
			expect(element().value).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
			expect(element().adapt).toHaveBeenCalled();
		});

		it('should free when value is set and not call adapt if not initialized', function() {
			spyOn(element(), 'adapt');
			spyOn(element(), 'isInitialized').and.returnValue(false);
			element().value = f;
			expect(element().value).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
			expect(element().adapt).not.toHaveBeenCalled();
		});

		it('should block when value is null', function() {
			spyOn(element(), 'adapt');
			element().value = null;
			expect(element().value).toBeFalsy();
			expect(element().isBlocked()).toBeTruthy();
			expect(element().adapt).not.toHaveBeenCalled();
		});
	});
});
