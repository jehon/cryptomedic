'use strict';

describe('Jasmine', function() {
	it('should work as "expect"', function() {
		var a = true;
		expect(a).toBe(true);
		expect(a).toEqual(true);
	});
	
	it('prints jasmine version', function() {
//        console.log('jasmine-version:' + jasmine.getEnv().versionString());
        expect(jasmine.getEnv().versionString()).toMatch("1.3");
	});
});
