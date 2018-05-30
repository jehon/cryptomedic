/* eslint-env jasmine */
/* global Data, DataCatch */

describe('tests/unit/data-test.js', function() {
	const data = {
		a: 1,
		b: 'azer',
		c: 0,
		d: '1',
		nullKey: null,
		dateNum: '2015',
		dateNumInv: '20',
		dateNum6: '2016-02',
		dateObj: new Date()
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

	it('with assertDate', function() {
		expect(() => Data(data).assertDate('anything')).toThrowError('Data anything is undefined');
		expect(() => Data(data).assertDate('nullKey')).toThrowError('Data nullKey is undefined');
		expect(() => Data(data).assertDate('a')).toThrowError('Data a is not a valid date(1)');
		expect(() => Data(data).assertDate('b')).toThrowError('Data b is not a valid date(azer)');
		expect(() => Data(data).assertDate('c')).toThrowError('Data c is not a valid date(0)');
		expect(() => Data(data).assertDate('d')).toThrowError('Data d is not a valid date(1)');

		expect(() => Data(data).assertDate('dateNumInv')).toThrowError('Data dateNumInv is not a valid date(20)');
		expect(Data(data).assertNumericNotZero('d')).toBeTruthy();
	});
});
