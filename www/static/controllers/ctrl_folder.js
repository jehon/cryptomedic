/* global goThere,Folder,jQuery,calculations,template,date2CanonicString,extractPrefsFile,formGetContent */
function ctrl_folder($scope, $location, $routeParams) {
  /*
   * '/folder/:patient_id/:page?/:subtype?/:subid?/:mode?'
   *
   *  '/folder/123                      view the patient file
   *  '/folder/123/edit                 edit the patient  (page ~> mode)
   *  '/folder/                         add a patient     (page ~> mode)
   *  '/folder/123/file/Bills/456       view the sub file
   *  '/folder/123/file/Bills/456/edit  edit the sub file
   *  '/folder/123/file/Bills           add a bill
   *  '/folder/123/summary
   *  '/folder/123/graphics
   *  '/folder/123/addfile
   *
   */

  // *** ROUTING ***
  /*
    generic:
      patient_id:  (-1 => add patient)
      mode: read / edit / add
      page: null (patient), file (clubfoot, ...), summary / ...

    if page == file:
      subtype: ClubFoot / Bill / ...
      subid: (-1 => add)

   */

  let t = function(val, def = false) {
    if (typeof(val) == "undefined") return def;
    if (val === null) return def;
    return val;
  }

  $scope.patient_id = t($routeParams['patient_id']);
  $scope.page       = t($routeParams['page']);
  $scope.subtype    = t($routeParams['subtype']);
  $scope.subid      = t($routeParams['subid']);
  $scope.mode       = t($routeParams['mode']);

  // PATIENT ROUTE VIEW
  // ex: folder/123
  if (!$scope.page) {
    $scope.mode = 'read';
    $scope.page = false;
  }

  // PATIENT ROUTE EDIT / ADD
  // ex: folder/123/edit
  if ($scope.page == 'edit') {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
    if ($scope.patient_id < 0) {
      $scope.mode = 'add';
    }
  }

  // FICHE ROUTE VIEW / EDIT / ADD
  // ex: folder/123/file/Bill/456
  // ex: folder/123/file/Bill/456/edit
  if ($scope.page == 'file') {
    if (!$scope.mode) {
      $scope.mode = 'read';
    }
    if ($scope.subid === false) {
      // Adding a file
      $scope.mode = 'add';
    }
  }

  $scope.folder = false;
  $scope.age = {};
  var cachedCurrentFile = null;

  //----------------------
  //   Get data from the server
  //----------------------
  // By default, wait for the html element to be ready:
  let getFileThen = getDataService();

  if ($scope.patient_id < 0) {
    getFileThen = getFileThen.then(() => Promise.resolve(new Folder()));
  } else {
    getFileThen = getFileThen.then(dataService => dataService.getFolder($scope.patient_id));
  }
  getFileThen.then(function(folder) {
    if (!folder) {
      $scope.$broadcast('refresh');
      return;
    }

    // Build up data
    if ($scope.page == 'file') {
      // File
      if ($scope.mode == 'add') {
        cachedCurrentFile = Folder.create(folder, $scope.subtype);
        cachedCurrentFile.initFromCachedPreferences();
        cachedCurrentFile.linkPatient(folder.getPatient());
      } else {
        cachedCurrentFile = folder.getByTypeAndId(Folder.string2class($scope.subtype), $scope.subid);
      }
    } else {
      // Patient
      cachedCurrentFile = folder.getPatient();
    }
    $scope.folder = folder;

    // Layout
    if ($scope.mode == 'edit' || $scope.mode == 'add') {
      jQuery('.modeRead').removeClass('modeRead').addClass('modeWrite');
    } else {
      jQuery('.modeWrite').removeClass('modeWrite').addClass('modeRead');
    }

    // Date
    $scope.age = {};
    if (cachedCurrentFile.Yearofbirth) {
      var age = calculations.age.fromBirthDate(cachedCurrentFile.Yearofbirth);
      var r = RegExp('([0-9]+) ?y(ears)? ?([0-9]+) ?m(onths)?').exec(age);
      if (r.length > 3) {
        $scope.age.years = parseInt(r[1]);
        $scope.age.months = parseInt(r[3]);
      }
    }
    $scope.$broadcast('refresh');
    $scope.safeApply();
  });

  // ------------------------
  //  Display helpers
  // ------------------------
  $scope.getTemplateForMe = function() {
    if ($scope.folder === false) {
      return template('waiting');
    }

    if ($scope.page === false) {
      return template('patient', ($scope.mode == 'read' ? 'fiche' : 'write'));
    }

    if ($scope.page == 'file') {
      return template($scope.subtype.toLowerCase(), ($scope.mode == 'read' ? 'fiche' : 'write'));
    }

    return template('folder', $scope.page);
  };

  $scope.currentFile = function() {
    return cachedCurrentFile;
  };

  $scope.getModeEdit = function() {
    switch(this.mode) {
      case "edit":
      case "add":
        return "true";
      default: 
        return "false";
    }
    return "false";
  }

  //----------------------
  //   Actions
  //----------------------
  $scope.errors = {};
  $scope.actionValidate = function(form = '#fileForm') {
    // TODO: jserror should have an icon before (danger)
    // TODO: hide action button if form is not ok
    $scope.valide = true;

    jQuery(form + ' input[type=number][required]').each(function() {
      if (jQuery(this).val() == '') {
        jQuery(this).val(0);
      }
    });

    if (!jQuery(form)[0].checkValidity()) {
      console.log('Form invalid');
      jQuery('#fileFormSubmit').click();
      $scope.valide = false;
    }

    $scope.errors = $scope.currentFile().validate();

    jQuery(form + ' input[mycalendar]:visible').each(function() {
      var date = jQuery(this).val();
      if ((date == '') && !jQuery(this).is('[required]')) {
        return;
      }
      var ok = ((new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))));
      if (!ok) {
        var uuid = jQuery(this).attr('uuid');
        $scope.errors['date_' + uuid] = true;
        $scope.valide = false;
      }
    });

    if (!jQuery.isEmptyObject($scope.errors)) {
      $scope.valide = false;
    }

    // console.log('validation', $scope.errors);
    return $scope.valide;
  };
  $scope.$on('revalidate', $scope.actionValidate);

  $scope.actionCancel = function() {
    // By rerouting, the controller is initialized back
    $scope.folder = null;
    if ($scope.subid) {
      goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + $scope.subid);
    } else {
      goThere('/folder/' + $scope.patient_id);
    }
  };

  $scope.actionSave = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = false;
    $scope.safeApply();

    extractPrefsFile(updatedData);

    getDataService()
      .then(dataService => dataService.saveFile(updatedData, $scope.patient_id))
      .then(function(data) {
        // The data is refreshed by navigating away...
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The ' + $scope.subtype + ' has been saved.'
        });
        goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + $scope.subid);
        $scope.folder = data;
        $scope.safeApply();
      });
  };

  $scope.actionUnlock = function() {
    console.log("action unlock");

    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.unlockFile($scope.currentFile()))
      .then(function(data) {
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The ' + $scope.subtype + ' #' + $scope.subid + ' has been unlocked.'
        });
        // Let's refresh the data
        $scope.folder = data;
        goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + $scope.subid + '/edit');
        $scope.safeApply();
      });
  };

  $scope.actionCreate = function() {
    // Save transversal data for further use later...
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = false;
    $scope.safeApply();

    extractPrefsFile(updatedData);

    getDataService()
      .then(dataService => dataService.createFile(updatedData))
      .then(function(folder) {
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The ' + updatedData.getModel() + ' has been created.'
        });
        // The data is refreshed by navigating away...
        // Let's refresh the data
        $scope.folder = folder;
        goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + folder.getHeader("newKey"));
        $scope.safeApply();
      });
  };

  $scope.actionDelete = function() {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }
    let file = $scope.currentFile();
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.deleteFile(file))
      .then(function(data) {
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The ' + $scope.currentFile().getModel() + ' of ' + $scope.currentFile().Date + ' has been deleted'
        });

        // Let's refresh the data
        $scope.folder = data;
        goThere('/folder/' + $scope.patient_id);
        $scope.safeApply();
      });
  };

  $scope.actionCreatePatient = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.createFile(updatedData))
      .then(function(folder) {
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The patient has been created.'
        });

        // Let's refresh the data
        $scope.folder = folder;
        goThere('/folder/' + folder.getId());
        $scope.safeApply();
      });
  };

  $scope.actionSavePatient = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.saveFile(updatedData, $scope.patient_id))
      .then(function(folder) {
        // The data is refreshed by navigating away...

        // Let's refresh the data
        $scope.folder = folder;
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The patient has been saved.'
        });
        goThere('/folder/' + folder.getId());
      });
  };

  $scope.actionDeletePatient = function() {
    if (!confirm('Are you sure you want to delete this patient?')) {
      return;
    }

    let file = $scope.currentFile();
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.deleteFile(file))
      .then(function() {
        $scope.$emit('message', {
          'level': 'success',
          'text': 'The patient ' + $scope.currentFile().entryyear + '-' + $scope.currentFile().entryorder + ' has been deleted'
        });

        // Let's refresh the data
        $scope.folder = null;
        goThere();
        $scope.safeApply();
      });
  };

  // TODO: push to folder
  $scope.nextAppointment = function() {
    var today = date2CanonicString(new Date(), true);
    var next = false;
    for (var k in $scope.folder.subFiles) {
      var v = $scope.folder.subFiles[k];
      if (v.getModel() == 'Appointment') {
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
      $scope.folder.getPatient().Yearofbirth = date2CanonicString(d2).substring(0, 7);
    }
  }

  $scope.$watch('age.years', function() {
    updateYearOfBirth();
  });

  $scope.$watch('age.months', function() {
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
}

ctrl_folder.$inject = ['$scope', '$location', '$routeParams'];
