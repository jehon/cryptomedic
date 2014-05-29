"use strict";

cryptoApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) {
	$scope.folder = new cryptomedic.models.Folder();
	$scope.page = "summary";
	$scope.pageIsFile = false;
	$scope.patientId = parseInt($routeParams['id']);
	
	$scope.select = function(page) {
		$scope.page = page;
		$scope.pageIsFile = false;
		if (parseInt($scope.page) == $scope.page) {
			$scope.page = parseInt($scope.page);
			if ($scope.page < $scope.folder.files.length)
				$scope.pageIsFile = true;
			console.log($scope.currentFile());
		}
	};
	
	$scope.selected = function(i) {
		if (i == $scope.page) {
			return "btn-warning";
		}
		return "";
	};

	$scope.currentFile = function() {
		if ($scope.pageIsFile) {
			return $scope.folder.files[$scope.page];
		}
		console.log("default to patient");
		return $scope.patient();
	};
	
	$scope.patient = function() {
		if ($scope.folder.files.count == 0) return null;
		return $scope.folder.getPatient();
	};
	
	$scope.name = function() {
		if ($scope.pageIsFile) {
			return $scope.folder.files[$scope.page]['type'].toLowerCase();
		}
		if (typeof($scope.page) == "number") return "blank";
		return $scope.page;
	};
	
	$scope.getCached = function(id) {
		return service_rest.getCached(id);
	};

	if (typeof($routeParams['page']) != 'undefined') {
		$scope.select($routeParams['page']);
	}
	
	var busyEnd = $scope.doBusy("Getting the file from the server");
	service_rest.getFile($scope.patientId)
		.done(function(data) {
			$scope.folder = data;
			$scope.select($scope.page);
			$scope.safeApply();
		})
		.fail(function(data) {
			console.error(data);
		}).always(function() {
			$scope.$broadcast("refresh");
			busyEnd();
		});
}]);
