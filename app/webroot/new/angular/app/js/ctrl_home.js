"use strict";

mainApp.controller('ctrl_home', [ '$scope', '$location', 'service_rest' , function($scope, $location, service_rest) { 
	if (typeof($scope.entryyear) == "undefined") {
		$scope.searched = false;
		$scope.entryyear = (new Date()).getFullYear();
		$scope.entryorder = "";
		$scope.generate = false;
	}

	$scope.resetSearched = function() {
		$scope.searched = false;
	};
	
	$scope.checkReference = function() {
		var busyEnd = $scope.doBusy("Checking the reference on the server");
		service_rest.checkReference($scope.entryyear, $scope.entryorder)
			.done(function(data) {
				if (data === false) {
					$scope.searched = true;
				} else {
					busyEnd();
					// end the busy mode
					jQuery("#busy").modal('hide');
					setTimeout(function() {
						window.location.hash = "/folder/" + data;
					}, 1);
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
		var busyEnd = $scope.doBusy("Creating the reference on the server");
		service_rest.createReference($scope.entryyear, $scope.entryorder)
			.done(function(data) {
				console.log(data);
				busyEnd();
				// end the busy mode
				jQuery("#busy").modal('hide');
				setTimeout(function() {
					window.location.hash = "/folder/" + data.id + "/patient/edit";
				}, 1);
			})
			.fail(function(data) {
				console.error(data);
			}).always(function() {
				busyEnd();
			});
		$scope.searched = true;
	};
	
}]);
