"use strict";

mainApp.controller('ctrl_file_bill', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.$watch("currentFile().Date", function() {
		$scope.currentFile().calculatePriceId();
		$scope.safeApply();
	});
}]);
