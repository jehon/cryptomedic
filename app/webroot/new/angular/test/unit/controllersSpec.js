'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
	beforeEach(module('app_main'));

	it('should load ctrl_home', inject(function($controller) {
		// spec body
		var myCtrl1 = $controller('ctrl_home', {
			$scope : {}
		});
		expect(myCtrl1).toBeDefined();
	}));

//	it('should load ctrl_file', inject(function($controller) {
//		// spec body
//		var myCtrl2 = $controller('ctrl_file', {
//			$scope : {}
//		});
//		expect(myCtrl2).toBeDefined();
//	}));
});
