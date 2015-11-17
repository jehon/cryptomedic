"use strict";

mainApp.controller('ctrl_folder', [ '$scope', '$location', '$routeParams' , function($scope, $location, $routeParams) {
  /*
   * '/folder/:patient_id/:page?/:subtype?/:subid?/:mode?'
   *
   *  '/folder/123        view the patient file
   *  '/folder/123/edit     edit the patient  (page ~> mode)
   *  '/folder/       add a patient     (page ~> mode)
   *  '/folder/123/file/Bills/456   view the sub file
   *  '/folder/123/file/Bills/456/edit  edit the sub file
   *  '/folder/123/file/Bills     add a bill
   *  '/folder/123/summary
   *  '/folder/123/graphics
   *  '/folder/123/addfile
   *
   */

  $scope.patient_id = $routeParams['patient_id'];
  $scope.page = $routeParams['page'];
  $scope.subtype = $routeParams['subtype'];
  $scope.subid = $routeParams['subid'];
  $scope.mode = ($routeParams['mode'] ? $routeParams['mode'] : "read");

  if ($scope.page == 'edit') {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
  }

  $scope.folder = false;
  var cachedCurrentFile = null;
  if ($scope.page == 'file' && !$scope.subid) {
    // Adding a file
    console.log("adding a file");
    $scope.mode = 'add';
  }

    //----------------------
    //   Get data from the server
    //----------------------

    service_backend.getFolder($scope.patient_id).then(function(data) {
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
    });

    /**
     * When the data is updated, and the sync receive something...
     */
    myEvents.on("folderUpdate", function(data) {
      if (data.id == $scope.patient_id) {
        // TODO: detect if already stored and show warning in this case
        console.error("TODO: how to react to folderUpdate ?");
      }
    });

    function askFolder() {
      service_backend.getFolder($scope.patient_id);
    }
    // TODO: is it ok?
    // if (!$scope.folder) {
    //   console.log("ask folder");
      askFolder();
    // }

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

  $scope.getPathTo = function(mode, index) {
    var f = cachedCurrentFile;
    if (index) {
        f = folder.getSubFile(index);
    }
    return "/folder/" + f.patient_id + "/fiche/" + f._type + "/" + f.id + (mode ? "/" + mode : "");
  }

    //----------------------
    //   Actions
    //----------------------
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

      console.log("validation", $scope.errors);
      return $scope.valide;
    };
    $scope.$on("revalidate", $scope.actionValidate);

  $scope.actionCancel = function() {
    // By rerouting, the controller is initialized back
    if ($scope.subid) {
      $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid);
    } else {
      $scope.go("/folder/" + $scope.patient_id);
    }
  };

  $scope.actionSave = function() {
    if (!$scope.actionValidate()) {
        alert("You have errors in your data. Please correct them and try again");
        return ;
    }
    $scope.folder = false;
    $scope.safeApply();
    service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
      .then(function(data) {
        // The data is refreshed by navigating away...
        $scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " has been saved."});
        $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid);
        $scope.folder = data;
        $scope.safeApply();
      });
  }

  $scope.actionUnlock = function() {
    $scope.folder = false;
    $scope.safeApply();
    service_backend.unlockFile(cachedCurrentFile, $scope.patient_id)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " #" + $scope.subid + " has been unlocked."});
      // Let's refresh the data
      $scope.folder = data;
      $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid + "/edit");
      $scope.safeApply();
    });
  }

  $scope.actionCreate = function() {
    // Save transversal data for further use later...
    if (cachedCurrentFile.Date) {
        service_session_storage().set("date", cachedCurrentFile.Date);
    }
    if (cachedCurrentFile.ExaminerName) {
        service_session_storage().set("examinerName", cachedCurrentFile.ExaminerName);
    }
    if (cachedCurrentFile.Center) {
        service_session_storage().set("center", cachedCurrentFile.Center);
    }

    if (!$scope.actionValidate()) {
        alert("You have errors in your data. Please correct them and try again");
        return ;
    }
    service_backend.createFile(cachedCurrentFile, $scope.patient_id)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The " + cachedCurrentFile._type + " has been created."});
      // The data is refreshed by navigating away...
      $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + data.newKey);
      $scope.safeApply();
    });
  }

  $scope.actionDelete = function() {
    if (!confirm("Are you sure you want to delete this file?")) {
        return;
    }
    $scope.folder = false;
    $scope.safeApply();
    service_backend.deleteFile($scope.currentFile(), $scope.patient_id)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":  "The " + $scope.currentFile()._type +  " of " + $scope.currentFile().Date + " has been deleted"});
      $scope.folder = data;
      $scope.go("/folder/" + $scope.patient_id);
      $scope.safeApply();
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
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":  "The patient has been created."});
      $scope.folder = data;
      $scope.go("/folder/" + data.patient_id);
      $scope.safeApply();
    });
  }

  $scope.actionSavePatient = function() {
    if (!$scope.actionValidate()) {
        alert("You have errors in your data. Please correct them and try again");
        return ;
    }
    $scope.folder = false;
    $scope.safeApply();
    service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
    .then(function(data) {
      // The data is refreshed by navigating away...
      $scope.$emit("message", { "level": "success", "text": "The patient has been saved."});
      $scope.go("/folder/" + $scope.patient_id);
    });
  }

  $scope.actionDeletePatient = function() {
    if (!confirm("Are you sure you want to delete this patient?")) {
        return;
    }
    $scope.folder = false;
    $scope.safeApply();
    service_backend.deleteFile($scope.currentFile(), $scope.patient_id)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":    "The patient " + $scope.currentFile().entryyear + "-" + $scope.currentFile().entryorder + " has been deleted"});
      $scope.go("/home");
      $scope.safeApply();
    });
  }

//    if ($scope.mode == "edit" || $scope.mode == "add") {
//  jQuery(".modeRead").removeClass('modeRead').addClass('modeWrite');
//    }
}]);
