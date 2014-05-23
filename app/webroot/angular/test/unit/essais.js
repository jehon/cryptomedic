'use strict';

describe('essais', function() {
//	  beforeEach(module('app_cryptomedic'));

	describe('expect', function() {
//	    beforeEach(module(function($provide) {
//	      $provide.value('version', 'TEST_VER');
//	    }));

		it('should work as "expect"', function() {
			var a = true;
			expect(a).toBe(true);
			expect(a).toEqual(true);
		});
		
//	    it('should replace VERSION', inject(function(interpolateFilter) {
//	      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
//	    }));
	});
});
