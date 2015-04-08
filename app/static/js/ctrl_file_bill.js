"use strict";

mainApp.controller('ctrl_file_bill', [ '$scope', 'service_backend', function($scope, service_backend) {
	$scope.$watch("currentFile().Date", function() {
		if ($scope.currentFile() && $scope.currentFile().calculatePriceId) {
			$scope.currentFile().calculatePriceId();
			$scope.safeApply();
		} else {
			console.info($scope);
			$scope.safeApply();
		}
	});
	
	$scope.$watch("currentFile().sl_numberOfHouseholdMembers", function() {
	    $scope.currentFile().calculateSocialLevel();
	});
	
	$scope.$watch("currentFile().sl_familySalary", function() {
	    $scope.currentFile().calculateSocialLevel();
	});
}]);
