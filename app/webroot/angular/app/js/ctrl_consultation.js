"use strict";

cryptoApp.controller('ctrl_consultation', [ '$scope', 'service_rest', function($scope, service_rest) {
	// TODO: calculate age:             dx = v.Date.substr(0, 4) - ajax.Yearofbirth;
	// From application.js # 534
	$scope.stats_base_age = 12;
}]);
