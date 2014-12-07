"use strict";

mainApp.controller('ctrl_day', [ "$scope", "$routeParams", "service_backend", function($scope, $routeParams, service_backend) {
	if (typeof($scope.listing) == 'undefined')
		$scope.listing = [];
	else 
		$scope.searched = false;

	$scope.page = function() {
		// TODO: paginate this
		$scope.currentPage = $scope.listing;
	}

	$scope.submit = function() {
		var busyEnd = $scope.doBusy("Searching for matching consultations");
		// Put it in the url ?

		service_backend.searchForConsultations($scope.day, $scope.Center)
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

	if ($routeParams.day) {
		$scope.day = new Date($routeParams.day);
		$scope.submit();
	}

	if (!$scope.day) {
		$scope.day = new Date();
	}

}]);
