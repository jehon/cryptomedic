/* eslint-env jasmine */
/* global date2Display */

describe('date2Display-test', function() {
	it('should treat empty', function() {
		expect(date2Display(null)).toBe('');
	});

	it('should treat Date objects', function() {
		expect(date2Display(new Date(2010, 10, 15), true)).toBe('15-11-2010');
		expect(date2Display(new Date(2010, 10, 15, 1, 2, 3), true)).toBe('15-11-2010');
	});

	it('should treat string objects', function() {
		expect(date2Display('2015-11-10')).toBe('10-11-2015');
		expect(date2Display('')).toBe('');
		expect(date2Display('2015-25-10')).toBe(date2Display.invalid);
		expect(date2Display('azerty')).toBe(date2Display.invalid);
	});
});
