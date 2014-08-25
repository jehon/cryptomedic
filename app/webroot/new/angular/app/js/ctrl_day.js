"use strict";

mainApp.controller('ctrl_day', [ "$scope", "$routeParams", "service_rest", function($scope, $routeParams, service_rest) {
	if (typeof($scope.listing) == 'undefined')
		$scope.listing = [];
	else 
		$scope.searched = false;

	if (!$scope.day) {
		$scope.day = new Date();
	}

	$scope.page = function() {
		// TODO: paginate this
		$scope.currentPage = $scope.listing;
	}

	$scope.submit = function() {
		var busyEnd = $scope.doBusy("Searching for matching consultations");
		// Put it in the url ?

		service_rest.searchForConsultations($scope.day, $scope.Center)
			.done(function(data) {
				$scope.listing = data;
				$scope.searched = true;
				$scope.page();
				$scope.safeApply();
			})
			.fail(function(data) {
				console.error(data);
			}).always(function() {
				busyEnd();
			});
	}
}]);
