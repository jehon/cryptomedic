"use strict";

mainApp.controller('ctrl_folder', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) {
	$scope.folder = new application.models.Folder();
	$scope.page = "patient";
	$scope.pageIsFile = false;
	$scope.mode = $routeParams['mode'];

	var id = parseInt($routeParams['id']);
	var fileCreating = {};
	if (typeof($scope.mode) == "undefined") $scope.mode = "read";

	$scope.id = function() { 
		return id;
	};

	$scope.select = function(page) {
		$scope.page = page;

		if (($scope.page === "") || ($scope.page === undefined) || ($scope.page === null)) {
			console.log("redirect");
			$scope.page = "patient";
		}
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

	function showMe(type, id) {
		for(var i = 0; i < $scope.folder.getSubFiles().length; i++) {
			if (($scope.folder.getSubFile(i)._type == type)
				&& ($scope.folder.getSubFile(i).id == id)) {
				$scope.go("/folder/" + $scope.id() + "/" + i);
				return;
			}
		}
	}
	
	$scope.actionValidate = function() {
		// TODOJH: use this in all modification actions
		// TODOJH: jserror should have an icon before (danger)
		// TODOJH: hide action button if form is not ok
		$scope.valide = true;

		if (!jQuery("#fileForm")[0].checkValidity()) {
			console.log("Form invalid");
			jQuery("#fileFormSubmit").click();
			$scope.valide = false;
		}

		$scope.errors = $scope.currentFile().validate();

		jQuery("input[mycalendar]:visible").each(function(){
			var date = jQuery(this).val();
			var ok = ((new Date(date) !== "Invalid Date" && !isNaN(new Date(date))))
			if (!ok) {
				var uuid = jQuery(this).attr('uuid');
				$scope.errors['date_' + uuid] = true;
				$scope.valide = false;
			}
		});

		if (!jQuery.isEmptyObject($scope.errors)) {
			console.log("Model invalid");
			console.log($scope.errors);
			$scope.valide = false;
		} 

		console.log("Conclusion: " + ($scope.valide ? "ok" : "ko"));
		return $scope.valide;
	};

	$scope.actionCancel = function() {
		refreshFolder();
		$scope.go("/folder/" + $scope.folder.getId() + "/" + $scope.page);
	};

	$scope.actionSave = function() {
		if (!$scope.actionValidate()) {
			alert("You have errors in your data. Please correct them and try again");
			return ;
		}
		var busyEnd = $scope.doBusy("Saving the file to the server");
		var prevId = $scope.currentFile().id;
		var prevType = $scope.currentFile()._type;
		service_rest.saveFile($scope.currentFile(), $scope.id())
			.done(function(data) {
				$scope.folder = data;
				// Find back the original file, if a change in date reorder it somewhere else
				showMe(prevType, prevId);

				$scope.go("/folder/" + $scope.id() + "/" + $scope.page);
				$scope.safeApply();
			}).always(function() {
				busyEnd();
			});
	}

	$scope.actionUnlock = function() {
		var busyEnd = $scope.doBusy("Unlocking the file on the server");
		service_rest.unlockFile($scope.currentFile(), $scope.id())
			.done(function(data) {
				$scope.folder = data;
				$scope.safeApply();
			}).always(function() {
				busyEnd();
			});
	}

	$scope.actionCreate = function() {
		var busyEnd = $scope.doBusy("Creating the file on the server");
		var creatingType = fileCreating._type;
		service_rest.createFile($scope.currentFile(), $scope.id())
			.done(function(data) {
				$scope.folder = data;
				fileCreating = null;

				showMe(creatingType, data.newKey);

				$scope.safeApply();
			}).always(function() {
				busyEnd();
			});
	}

	$scope.actionCancelCreate = function() {
		fileCreating = {};
		$scope.go("/folder/" + $scope.id() + "/");
	}

	$scope.actionDelete = function() {
		if (!confirm("Are you sure you want to delete this file?")) {
			return;
		}

		var busyEnd = $scope.doBusy("Deleting the file on the server");
		service_rest.deleteFile($scope.currentFile(), $scope.id())
			.done(function(data) {
				if ($scope.page == 'Patient') {
					console.log("going home");
					$scope.go("/home");
				} else {
					$scope.folder = data;
					$scope.go("/folder/" + $scope.id() + "/patient");					
				}
				$scope.safeApply();
			}).always(function() {
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
				if (($scope.mode == "add") && (!$scope.fileCreating)) {
					fileCreating = new application.models[$scope.page](null, $scope.folder.getMainFile());
				}
			}).always(function() {
				busyEnd();
			});
	}

	$scope.select($routeParams['page']);
	
	refreshFolder();

	if ($scope.mode == "edit" || $scope.mode == "add") {
		jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
	}
}]);
