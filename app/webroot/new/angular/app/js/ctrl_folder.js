"use strict";

mainApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) {
	$scope.folder = new cryptomedic.models.Folder();
	$scope.page = "";
	$scope.pageIsFile = false;
	var id = parseInt($routeParams['id']);
	var mode = $routeParams['mode'];
	if (typeof(mode) == "undefined") mode = "read";

	if (mode == "edit") {
		jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
	}

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
			return $scope.folder.getSubFile($scope.page)['_type'].toLowerCase();
		}
		if ($scope.page == "") return "Patient";
		if (typeof($scope.page) == "number") return "blank";
		return $scope.page;
	};
	
	if (typeof($routeParams['page']) != 'undefined') {
		$scope.select($routeParams['page']);
	}
	
	$scope.actionCancel =function() {
		refreshFolder();
		$scope.go("/folder/" + $scope.folder.getId() + "/" + $scope.page);
	}

	$scope.actionSave = function() {
		console.log($scope.currentFile());
		var busyEnd = $scope.doBusy("Saving the file to the server");
		service_rest.saveFile($scope.currentFile())
			.done(function(data) {
//				$scope.folder = data;
//				$scope.select($scope.page);
				$scope.safeApply();
			}).always(function() {
				$scope.$broadcast("refresh");
				busyEnd();
			});
	}

	function refreshFolder() {
		var busyEnd = $scope.doBusy("Getting the file from the server");
		service_rest.getFolder(id)
			.done(function(data) {
				$scope.folder = data;
				$scope.select($scope.page);
				$scope.safeApply();
			}).always(function() {
				$scope.$broadcast("refresh");
				busyEnd();
			});
	}
	refreshFolder();
}]);
