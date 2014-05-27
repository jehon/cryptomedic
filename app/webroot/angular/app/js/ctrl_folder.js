"use strict";

cryptoApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) { 
	$scope.folder = new cryptomedic.models.Folder();
	$scope.page = 0;
	$scope.patientId = $routeParams['id'];
	if (typeof($routeParams['page']) != 'undefined') {
		$scope.page = $routeParams['page'];
		if (parseInt($routeParams['page']) == $routeParams['page'])
			$scope.page = parseInt($routeParams['page']); 
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
			if ($scope.page < $scope.folder.files.length) {
				return $scope.folder.files[$scope.page]['type'].toLowerCase();
			} else {
				return "blank";
			}
		}
		return $scope.page;
	};
	
	$scope.getCached = function(id) {
		return service_rest.getCached(id);
	};
	
	var busyEnd = $scope.doBusy("Getting the file from the server");
	service_rest.getFile($scope.patientId)
		.done(function(data) {
			$scope.folder = data;
			$scope.safeApply();
		})
		.fail(function(data) {
			console.error(data);
		}).always(function() {
			busyEnd();
		});
}]);
