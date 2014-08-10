"use strict";

mainApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) {
	$scope.folder = new cryptomedic.models.Folder();
	$scope.page = "";
	$scope.pageIsFile = false;
	$scope.mode = $routeParams['mode'];

	var id = parseInt($routeParams['id']);
	var fileCreating = null;
	if (typeof($scope.mode) == "undefined") $scope.mode = "read";

	if ($scope.mode == "edit" || $scope.mode == "add") {
		jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
	}

	if ($scope.mode == "add") {
		// TODO: Create the file
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
		if ($scope.mode == "add") {
			return fileCreating;
		}
		if ($scope.pageIsFile) {
			return $scope.folder.getSubFile($scope.page);
		}
		return $scope.folder.getMainFile();
	};
	
	$scope.getPatient = function() {
		return $scope.folder.getMainFile();
	};
	
	$scope.name = function() {
		if ($scope.pageIsFile) {
			return $scope.folder.getSubFile($scope.page)['_type'].toLowerCase();
		}
		if ($scope.page == "") return "patient";
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
				$scope.folder = data;
				$scope.safeApply();
			}).always(function() {
				// $scope.$broadcast("refresh");
				busyEnd();
			});
	}

	$scope.actionUnlock = function() {
		var busyEnd = $scope.doBusy("Unlocking the file on the server");
		service_rest.unlockFile($scope.currentFile())
			.done(function(data) {
				$scope.folder = data;
				$scope.safeApply();
			}).always(function() {
				// $scope.$broadcast("refresh");
				busyEnd();
			});
	}

	$scope.actionCreate = function() {
		// TODO
		fileCreating = {};
	}

	$scope.actionCancelCreate = function() {
		fileCreating = null;
		$scope.go("/folder/" + $scope.id() + "/");
	}

	function refreshFolder() {
		var busyEnd = $scope.doBusy("Getting the file from the server");
		service_rest.getFolder(id)
			.done(function(data) {
				$scope.folder = data;
				$scope.select($scope.page);
				$scope.safeApply();
			}).always(function() {
				// $scope.$broadcast("refresh");
				busyEnd();
			});
	}
	refreshFolder();
}]);
