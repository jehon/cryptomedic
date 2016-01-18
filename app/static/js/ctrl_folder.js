"use strict";

mainApp.controller("ctrl_folder", [ "$scope", "$location", "$routeParams" , function($scope, $location, $routeParams) {
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

  $scope.patient_id = $routeParams["patient_id"];
  $scope.page = $routeParams["page"];
  $scope.subtype = $routeParams["subtype"];
  $scope.subid = $routeParams["subid"];
  $scope.mode = ($routeParams["mode"] ? $routeParams["mode"] : "read");

  $scope.age = {};

  if ($scope.page == "edit") {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
  }

  $scope.folder = false;
  var cachedCurrentFile = null;
  if ($scope.page == "file" && !$scope.subid) {
    // Adding a file
    $scope.mode = "add";
  }

  //----------------------
  //   Get data from the server
  //----------------------

  service_backend.getFolder($scope.patient_id).then(function(data) {
    $scope.folder = data;

    if ($scope.page == "file") {
      if ($scope.mode == "add") {
        cachedCurrentFile = appState().helpers.create($scope.subtype, null, $scope.folder);
        cachedCurrentFile.patient_id = $scope.patient_id;
      } else {
        for(var i in $scope.folder.getSubFiles()) {
          if (($scope.folder.getSubFile(i).getModel() == $scope.subtype)
              && ($scope.folder.getSubFile(i).id == $scope.subid)) {
            cachedCurrentFile = $scope.folder.getSubFile(i);
          }
        }
      }
    } else {
      cachedCurrentFile = $scope.folder.getMainFile();
    }
    if ($scope.mode == "edit" || $scope.mode == "add") {
      jQuery(".modeRead").removeClass("modeRead").addClass("modeWrite");
    } else {
      jQuery(".modeWrite").removeClass("modeWrite").addClass("modeRead");
    }

    if (cachedCurrentFile.Yearofbirth) {
      var age = calculations.age.fromBirthDate(cachedCurrentFile.Yearofbirth);
      var r = RegExp("([0-9]+) ?y(ears)? ?([0-9]+) ?m(onths)?").exec(age);
      // console.log(r);
      $scope.age.years = parseInt(r[1]);
      $scope.age.months = parseInt(r[3]);
    }

    $scope.safeApply();
    $scope.$broadcast("refresh");
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
      return "waiting.php";
    }
    if (!$scope.page) {
      return ($scope.mode == "read" ? "fiches" : "writes") + "/patient.php";
    }

    if ($scope.page == "file") {
      return ($scope.mode == "read" ? "fiches" : "writes") + "/" + $scope.subtype.toLowerCase() + ".php";
    }

    return "folder_pages/" + $scope.page + ".html";
  };

  $scope.currentFile = function() {
    return cachedCurrentFile;
  };

  $scope.getPathTo = function(mode, index) {
    var f = cachedCurrentFile;
    if (index) {
      f = $scope.folder.getSubFile(index);
    }
    return "/folder/" + f.patient_id + "/fiche/" + f.getModel() + "/" + f.id + (mode ? "/" + mode : "");
  };

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
      var ok = ((new Date(date) !== "Invalid Date" && !isNaN(new Date(date))));
      if (!ok) {
        var uuid = jQuery(this).attr("uuid");
        $scope.errors["date_" + uuid] = true;
        $scope.valide = false;
      }
    });

    if (!jQuery.isEmptyObject($scope.errors)) {
      $scope.valide = false;
    }

    // console.log("validation", $scope.errors);
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
    appState().actions.state.busy("Saving file on the server");
    $scope.folder = false;
    $scope.safeApply();
    service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
      .then(function(data) {
        // The data is refreshed by navigating away...
        $scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " has been saved."});
        $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid);
        $scope.folder = data;
        appState().actions.state.ready();
        $scope.safeApply();
      });
  };

  $scope.actionUnlock = function() {
    appState().actions.state.busy("Unlocking files on the server");
    $scope.folder = false;
    $scope.safeApply();
    service_backend.unlockFile(cachedCurrentFile)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The " + $scope.subtype + " #" + $scope.subid + " has been unlocked."});
      // Let's refresh the data
      $scope.folder = data;
      $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + $scope.subid + "/edit");
      appState().actions.state.ready();
      $scope.safeApply();
    });
  };

  $scope.actionCreate = function() {
    // Save transversal data for further use later...
    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return ;
    }
    appState().actions.state.busy("Creating files on the server");
    if (cachedCurrentFile.Date) {
      service_session_storage().set("date", cachedCurrentFile.Date);
    }
    if (cachedCurrentFile.ExaminerName) {
      service_session_storage().set("examinerName", cachedCurrentFile.ExaminerName);
    }
    if (cachedCurrentFile.Center) {
      service_session_storage().set("center", cachedCurrentFile.Center);
    }

    service_backend.createFile(cachedCurrentFile)
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The " + cachedCurrentFile.getModel() + " has been created."});
      // The data is refreshed by navigating away...
      $scope.go("/folder/" + $scope.patient_id + "/file/" + $scope.subtype + "/" + data.newKey);
      appState().actions.state.ready();
      $scope.safeApply();
    });
  };

  $scope.actionDelete = function() {
    if (!confirm("Are you sure you want to delete this file?")) {
      return;
    }
    appState().actions.state.busy("Deleting file on the server");
    $scope.folder = false;
    $scope.safeApply();
    service_backend.deleteFile($scope.currentFile())
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":  "The " + $scope.currentFile().getModel() +  " of " + $scope.currentFile().Date + " has been deleted"});
      $scope.folder = data;
      $scope.go("/folder/" + $scope.patient_id);
      appState().actions.state.ready();
      $scope.safeApply();
    });
  };

  $scope.actionCreatePatient = function() {
    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return ;
    }
    appState().actions.state.busy("Creating the patient on the server");
    $scope.folder = false;
    // $scope.currentFile().getModel() = "Patient";
    service_backend.createFile($scope.currentFile())
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":  "The patient has been created."});
      $scope.folder = data;
      $scope.go("/folder/" + data.id);
      appState().actions.state.ready();
      $scope.safeApply();
    });
  };

  $scope.actionSavePatient = function() {
    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return ;
    }
    $scope.folder = false;
    appState().actions.state.busy("Saving files on the server");
    $scope.safeApply();
    service_backend.saveFile(cachedCurrentFile, $scope.patient_id)
    .then(function(data) {
      // The data is refreshed by navigating away...
      $scope.$emit("message", { "level": "success", "text": "The patient has been saved."});
      appState().actions.state.ready();
      $scope.go("/folder/" + $scope.patient_id);
    });
  };

  $scope.actionDeletePatient = function() {
    if (!confirm("Are you sure you want to delete this patient?")) {
      return;
    }
    $scope.folder = false;
    appState().actions.state.busy("Deleting patient on the server");
    $scope.safeApply();
    service_backend.deleteFile($scope.currentFile())
    .then(function(data) {
      $scope.$emit("message", { "level": "success", "text":    "The patient " + $scope.currentFile().entryyear + "-" + $scope.currentFile().entryorder + " has been deleted"});
      $scope.go("/home");
      appState().actions.state.ready();
      $scope.safeApply();
    });
  };

  $scope.nextAppointment = function() {
    var today = appState().helpers.date2CanonicString(new Date(), true);
    var next = false;
    for(var k in $scope.folder.subFiles) {
      var v = $scope.folder.subFiles[k];
      if (v.getModel() == "Appointment") {
        if (v.Nextappointment > today) {
          if (!next || v.Nextappointment < next) {
            next = v.Nextappointment;
          }
        }
      }
    }
    return next;
  };

  function updateYearOfBirth() {
    if ($scope.folder) {
      var d = new Date();
      var d2 = new Date(d.getFullYear() - $scope.age.years, d.getMonth() - $scope.age.months, 10);
      $scope.folder.getMainFile().Yearofbirth  = appState().helpers.date2CanonicString(d2).substring(0, 7);
    }
  }

  $scope.$watch("age.years", function() {
    updateYearOfBirth();
  });

  $scope.$watch("age.months", function() {
    while ($scope.age.months >= 12) {
      $scope.age.months -= 12;
      $scope.age.years++;
    }
    while ($scope.age.months < 0) {
      $scope.age.months += 12;
      $scope.age.years--;
    }
    updateYearOfBirth();
  });

  $scope.listUpazillas = function(district, current) {
    var list = [ "?" ];
    if ($scope.appStateStore.connection && $scope.appStateStore.connection.settings) {
      if ($scope.appStateStore.connection.settings.associations["district." + district]) {
        list = list.concat($scope.appStateStore.connection.settings.associations["district." + district]);
      }
    }
    list = list.concat($scope.appStateStore.connection.settings.associations["district.other"]);
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };

  $scope.listUnions = function(upazilla, current) {
    var list = [ "?" ];
    if ($scope.appStateStore.connection && $scope.appStateStore.connection.settings) {
      if ($scope.appStateStore.connection.settings.associations["upazilla." + upazilla]) {
        list = list.concat($scope.appStateStore.connection.settings.associations["upazilla." + upazilla]);
      }
    }
    list = list.concat($scope.appStateStore.connection.settings.associations["upazilla.other"]);
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };
}]);
