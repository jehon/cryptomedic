"use strict";

cryptoApp.controller('ctrl_home', [ '$scope', '$location', 'service_rest' , function($scope, $location, service_rest) { 
	$scope.searched = false;
	$scope.year = 2001;
	$scope.order = 1;
	$scope.generate = false;

	$scope.resetSearched = function() {
		$scope.searched = false;
	};
	
	$scope.checkReference = function() {
	var busyEnd = $scope.doBusy("Checking the reference on the server");
		service_rest.checkReference($scope.year, $scope.order)
			.done(function(data) {
				if (data === false) {
					$scope.searched = true;
				} else {
					console.log(data);
					window.location.hash = "/patient/" + data;
				}
			})
			.fail(function(data) {
				console.error(data);
			}).always(function() {
				busyEnd();
			});
		$scope.searched = true;
	};
	
	$scope.createReference = function() {
		console.log($scope.year + "-" +  $scope.order);
	};
	
}]);
