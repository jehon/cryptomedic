"use strict";

cryptoApp.controller('ctrl_search', [ "$scope", "service_rest", function($scope, service_rest) {
	if (typeof($scope.params) == 'undefined')
		$scope.params = {};
	
	if (typeof($scope.listing) == 'undefined')
		$scope.listing = [];

	$scope.page = function() {
		// TODO: paginate this
		$scope.currentPage = $scope.listing;
	}

	$scope.submit = function() {
		var busyEnd = $scope.doBusy("Searching for matching patients");

		console.log($scope.params);

		service_rest.searchForPatients($scope.params)
			.done(function(data) {
				console.log(data);
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
