"use strict";

mainApp.controller('ctrl_folder', [ '$scope', '$location', 'service_backend', '$routeParams' , function($scope, $location, service_backend, $routeParams) {
    /*
     * '/folder/:patient_id/:page?/:subtype?/:subid?/:mode?'
     * 
     *  '/folder/123				view the patient file
     *  '/folder/123/edit			edit the patient	(page ~> mode)
     *  '/folder/123/add			add a patient    	(page ~> mode)
     *  '/folder/123/file/Bills/456		view the sub file
     *  '/folder/123/file/Bills/456/edit	edit the sub file
     *  '/folder/123/file/Bills			add a bill
     *  '/folder/123/summary
     *  '/folder/123/graphics
     *  
     */
    
    $scope.patient_id = $routeParams['patient_id'];
    $scope.page = $routeParams['page'];
    $scope.subtype = $routeParams['subtype'];
    $scope.subid = $routeParams['subid'];
    $scope.mode = ($routeParams['mode'] ? $routeParams['mode'] : "read");

    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    if ($scope.page == 'edit' || $scope.page == 'add') {
	$scope.mode = $scope.page;
	$scope.page = false;
    }
    
    //----------------------
    //   Get data from the server
    //----------------------
    $scope.folder = false;
    var cachedCurrentFile = null;
    
    myEvents.on("folder", function(data) {
	if (data.id == $scope.patient_id) {
	    // TODO: detect if already stored and show warning in this case
	    $scope.folder = objectify(data);

	    if ($scope.page == 'file') {
        	    if ($scope.mode == "add") {
        		cachedCurrentFile = new application.models[$scope.subtype](null, $scope.folder);
        		cachedCurrentFile.patient_id = $scope.patient_id;
        	    } else {
        		for(var i in $scope.folder.getSubFiles()) {
        		    if (($scope.folder.getSubFile(i)._type == $scope.subtype)
        			    && ($scope.folder.getSubFile(i).id == $scope.subid)) {
        			cachedCurrentFile = $scope.folder.getSubFile(i); 
        		    }
        		}
        	    }
	    } else {
		cachedCurrentFile = $scope.folder.getMainFile();
	    }
	    if ($scope.mode == "edit" || $scope.mode == "add") {
		jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
	    } else {
		jQuery(".modeWrite").removeClass('modeWrite').addClass('modeRead');
	    }
	    $scope.safeApply();
	    $scope.$broadcast("refresh");
	} else {
	    console.log("skipping ", data);
	}
    });

    function askFolder() {
	service_my_backend.getFolder($scope.patient_id);
    }
    askFolder();

    // ------------------------
    //  Display helpers
    // ------------------------
    $scope.getTemplateName = function() {
	if (!$scope.folder) {
	    return "waiting.html";
	}
	if (!$scope.page) {
	    return ($scope.mode == 'read' ? "fiches" : "writes") + "/patient.html";
	}

	if ($scope.page == 'file') {
	    return ($scope.mode == 'read' ? "fiches" : "writes") + "/" + $scope.subtype.toLowerCase() + ".html";
	}

	return "folder_pages/" + $scope.page + ".html";
    };

    $scope.currentFile = function() {
	return cachedCurrentFile;
    };
	
    //----------------------
    //   Actions
    //----------------------
    $scope.actionCancel = function() {
	// By rerouting, the controller is initialized back
	if ($scope.subid) {
	    $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid);    
	} else {
	    $scope.go("/folder/" + $scope.patient_id);
	}
    };

    $scope.errors = {};
    $scope.actionValidate = function() {
	// TODO: jserror should have an icon before (danger)
	// TODO: hide action button if form is not ok
	$scope.valide = true;

	jQuery("input[type=number][required]").each(function() {
	    if (jQuery(this).val() == "") {
		jQuery(this).val(0);
	    }
	});
		
    	if (!jQuery("#fileForm")[0].checkValidity()) {
    	    console.log("Form invalid");
    	    jQuery("#fileFormSubmit").click();
    	    $scope.valide = false;
    	}
    	
    	$scope.errors = $scope.currentFile().validate();
    
    	jQuery("input[mycalendar]:visible").each(function(){
    	    var date = jQuery(this).val();
    	    if ((date == "") && !jQuery(this).is("[required]")) {
        	return;
    	    }	
    	    var ok = ((new Date(date) !== "Invalid Date" && !isNaN(new Date(date))))
    	    if (!ok) {
        	var uuid = jQuery(this).attr('uuid');
        	$scope.errors['date_' + uuid] = true;
        	$scope.valide = false;
    	    }
        });
    
        if (!jQuery.isEmptyObject($scope.errors)) {
            $scope.valide = false;
        } 

    	console.log($scope.errors);
    	return $scope.valide;
    };
    $scope.$on("revalidate", $scope.actionValidate);
	
    $scope.actionSave = function() {
	if (!$scope.actionValidate()) {
	    alert("You have errors in your data. Please correct them and try again");
	    return ;
	}
	$scope.folder = false;
	service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
	    .done(function(data) {
		// The data is refreshed by navigating away...
		$scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " has been saved."});
		$scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid);
		$scope.safeApply();
	    });
    }

    $scope.actionUnlock = function() {
	$scope.folder = false;
//	var busyEnd = $scope.doBusy("Unlocking the file on the server");
	service_backend.unlockFile(cachedCurrentFile, $scope.patient_id)
	    .done(function(data) {
		$scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " #" + $scope.subid + " has been unlocked."});
		// Let's refresh the data
		$scope.folder = data;
		$scope.safeApply();
//	    }).always(function() {
//		busyEnd();
	    });
    }

    $scope.actionCreate = function() {
	// Save transversal data for further use later...
	if (fileCreating.Date) {
	    service_session_storage().set("date", fileCreating.Date);
	}
	if (fileCreating.ExaminerName) {
	    service_session_storage().set("examinerName", fileCreating.ExaminerName);
	}
	if (fileCreating.Center) {
	    service_session_storage().set("center", fileCreating.Center);
	}

	if (!$scope.actionValidate()) {
	    alert("You have errors in your data. Please correct them and try again");
	    return ;
	}
	service_backend.createFile(cachedCurrentFile, $scope.patient_id)
	    .done(function(data) {
		$scope.$emit("message", { "level": "success", "text": "The " + fileCreating._type + " has been created."});
		// The data is refreshed by navigating away...
		$scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + data.newKey);
		$scope.safeApply();
//	    }).always(function() {
//		busyEnd();
	    });
    }

    // TODO: check

    $scope.actionDelete = function() {
	if (!confirm("Are you sure you want to delete this file?")) {
	    return;
	}
	    
//	var busyEnd = $scope.doBusy("Deleting the file on the server");
	$scope.folder = false;
	service_backend.deleteFile($scope.currentFile(), $scope.patient_id)
	    .done(function(data) {
		if (($scope.page == '') || (!data)) {
		    $scope.$emit("message", { "level": "success", "text":    "The patient " + $scope.currentFile().entryyear + "-" + $scope.currentFile().entryorder + " has been deleted"});
		    $scope.go("/home");
		} else {
		    $scope.$emit("message", { "level": "success", "text":  "The " + $scope.currentFile()._type +  " of " + $scope.currentFile().Date + " has been deleted"});
		    $scope.folder = data;
		    $scope.go("/folder/" + $scope.patient_id);					
		}
		$scope.safeApply();
//		}).always(function() {
//		    busyEnd();
	    });
    }

    $scope.actionCreatePatient = function() {
	if (!$scope.actionValidate()) {
	    alert("You have errors in your data. Please correct them and try again");
	    return ;
	}
	$scope.folder = false;
	$scope.currentFile()._type = "Patient";
	service_backend.createFile($scope.currentFile(), $scope.patient_id)
	    .done(function(data) {
		$scope.$emit("message", { "level": "success", "text":  "The patient has been created."});
		$scope.folder = data;
		$scope.go("/folder/" + data.patient_id);
		$scope.safeApply();
//	    }).always(function() {
//		busyEnd();
	    });
    }
	
    $scope.actionSavePatient = function() {
	if (!$scope.actionValidate()) {
	    alert("You have errors in your data. Please correct them and try again");
	    return ;
	}
	$scope.folder = false;
	service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
	    .done(function(data) {
		// The data is refreshed by navigating away...
		$scope.$emit("message", { "level": "success", "text": "The patient has been saved."});
		$scope.go("/folder/" + $scope.patient_id);
		$scope.folder = data;
		$scope.safeApply();
	    });
    }
    
//    if ($scope.mode == "edit" || $scope.mode == "add") {
//	jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
//    }
}]);
