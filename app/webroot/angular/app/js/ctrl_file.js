"use strict";

cryptoApp.controller('ctrl_file', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) { 
	$scope.files = [];
	$scope.page = 0;
	$scope.patientId = $routeParams['id'];
	if (typeof($routeParams['page']) != 'undefined') {
		$scope.page = $routeParams['page'];
	}
	
	$scope.select = function(page) {
		$scope.page = page;
	};
	
	$scope.selected = function(i) {
		if (i == $scope.page) {
			return "btn-warning";
		}
		return "";
	};

	$scope.name = function() {
		if (parseInt($scope.page) == $scope.page) {
			if ($scope.page < $scope.files.length) {
				console.log($scope.files[$scope.page]);
				return $scope.files[$scope.page]['type'].toLowerCase();
			} else {
				return "blank";
			}
		}
		return $scope.page;
	};
	
	var busyEnd = $scope.doBusy("Getting the file from the server");
	service_rest.getFile($scope.patientId)
		.done(function(data) {
			$scope.files = data['files'];
			$scope.Patient = data['Patient'];
			$scope.safeApply();
		})
		.fail(function(data) {
			console.error(data);
		}).always(function() {
			busyEnd();
		});
}]);
