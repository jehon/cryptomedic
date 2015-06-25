"use strict";

mainApp.controller('ctrl_search', [ "$scope", "service_backend", function($scope, service_backend) {
	if (typeof($scope.params) == 'undefined')
		$scope.params = {};
	
	if (typeof($scope.listing) == 'undefined')
		$scope.listing = [];

	$scope.page = function() {
		// TODO GUI: render the results in pages of 20 ?
		$scope.currentPage = $scope.listing;
	}

	$scope.submit = function() {
		var busyEnd = $scope.doBusy("Searching for matching patients");

		service_backend.searchForPatients($scope.params)
			.done(function(data) {
				$scope.listing = data;
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
