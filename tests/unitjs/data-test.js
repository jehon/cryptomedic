/* eslint-env jasmine */
/* global Data, DataCatch */

describe('tests/unit/data-test.js', function() {
	const data = {
		a: 1,
		b: 'azer',
		c: 0,
		d: '1',
		nullKey: null
	};

	describe('dataCatch', function() {
		it('should catch functions', function() {
			expect(DataCatch(data).assertNumericNotZero('anything')).toBe('Data anything is undefined');
		});
	});

	it('with assertExists', function() {
		expect(() => Data(null).assertExists('anything')).toThrowError('Data not set');
		expect(() => Data(data).assertExists('anything')).toThrowError('Data anything is undefined');
		expect(() => Data(data).assertExists('nullKey')).toThrowError('Data nullKey is undefined');
		expect(Data(data).assertExists('a')).toBeTruthy();
		expect(Data(data).assertExists('b')).toBe('azer');
		expect(Data(data).assertExists('c')).toBe(0);
		expect(Data(data).assertExists('d')).toBe('1');
	});

	it('with assertNumeric', function() {
		expect(() => Data(data).assertNumeric('anything')).toThrowError('Data anything is undefined');
		expect(() => Data(data).assertNumeric('nullKey')).toThrowError('Data nullKey is undefined');
		expect(Data(data).assertNumeric('a')).toBe(1);
		expect(() => Data(data).assertNumeric('b')).toThrowError('Data b is not numeric(azer)');
		expect(Data(data).assertNumeric('c')).toBe(0);
		expect(Data(data).assertNumeric('d')).toBe(1);
	});

	it('with assertNumericNotZero', function() {
		expect(() => Data(data).assertNumericNotZero('anything')).toThrowError('Data anything is undefined');
		expect(() => Data(data).assertNumericNotZero('nullKey')).toThrowError('Data nullKey is undefined');
		expect(Data(data).assertNumericNotZero('a')).toBeTruthy();
		expect(() => Data(data).assertNumericNotZero('b')).toThrowError('Data b is not numeric(azer)');
		expect(() => Data(data).assertNumericNotZero('c')).toThrowError('Data c is not non-zero(0)');
		expect(Data(data).assertNumericNotZero('d')).toBeTruthy();
	});
});
