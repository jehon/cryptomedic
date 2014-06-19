"use strict";

cryptoApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) {
	$scope.folder = new cryptomedic.models.Folder();
	$scope.page = "";
	$scope.pageIsFile = false;
	var id = parseInt($routeParams['id']);

	$scope.id = function() { 
		return id;
	};

	$scope.select = function(page) {
		$scope.page = page;
		$scope.pageIsFile = false;
		if (parseInt($scope.page) == $scope.page) {
			$scope.page = parseInt($scope.page);
			if (($scope.folder.getSubFiles() != null) && ($scope.page < $scope.folder.getSubFiles().length))
				$scope.pageIsFile = true;
		}
	};
	
	$scope.currentFile = function() {
		if ($scope.pageIsFile) {
			return $scope.folder.getSubFile($scope.page);
		}
		return $scope.folder.getMainFile();
	};
	
	$scope.patient = function() {
		return $scope.folder.getMainFile();
	};
	
	$scope.name = function() {
		if ($scope.pageIsFile) {
			return $scope.folder.getSubFile($scope.page)['type'].toLowerCase();
		}
		if ($scope.page == "") return "Patient";
		if (typeof($scope.page) == "number") return "blank";
		return $scope.page;
	};
	
	$scope.getCachedForExport = function(id) {
		return stringify(service_rest.getCached(id));
	};

	if (typeof($routeParams['page']) != 'undefined') {
		$scope.select($routeParams['page']);
	}
	
	var busyEnd = $scope.doBusy("Getting the file from the server");
	service_rest.getFile(id)
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
