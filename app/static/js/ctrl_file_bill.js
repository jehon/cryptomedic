"use strict";

mainApp.controller('ctrl_file_bill', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.$watch("currentFile().Date", function() {
		if ($scope.currentFile()) {
			$scope.currentFile().calculatePriceId();
			$scope.safeApply();
		}
	});
}]);
