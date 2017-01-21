/* global goThere,create,Folder,jQuery,calculations,template,getPref,setPref,date2CanonicString */
function ctrl_folder($scope, $location, $routeParams) {
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
  $scope.mode = $routeParams['mode'];


  if (!$scope.mode) {
    $scope.mode = "read";
  }

  $scope.age = {};

  if ($scope.page == 'edit') {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
  }

  $scope.folder = false;
  var cachedCurrentFile = null;
  if ($scope.page == 'file' && !$scope.subid) {
    // Adding a file
    $scope.mode = 'add';
  }

  //----------------------
  //   Get data from the server
  //----------------------
  // By default, wait for the html element to be ready:
  let getFileThen = getDataService();

  if ($scope.patient_id < 0) {
    getFileThen = getFileThen.then(() => Promise.resolve(new Folder()));
    $scope.mode = 'add';
  } else {
    getFileThen = getFileThen.then(dataService => dataService.getFolder($scope.patient_id));
  }
  getFileThen.then(function(data) {
    $scope.folder = data;
    if (data) {
      if ($scope.page == 'file') {
        if ($scope.mode == 'add') {
          // TODO: Adapt
          cachedCurrentFile = create($scope.subtype, null, $scope.folder);
          cachedCurrentFile.patient_id = $scope.patient_id;
        } else {
          // TODO: Adapt
          for(var i in $scope.folder.getSubFiles()) {
            if (($scope.folder.getSubFile(i).getModel() == $scope.subtype)
                && ($scope.folder.getSubFile(i).id == $scope.subid)) {
              cachedCurrentFile = $scope.folder.getSubFile(i);
            }
          }
        }
      } else {
        // TODO: Adapt
        cachedCurrentFile = $scope.folder.getMainFile();
      }
      if ($scope.mode == 'edit' || $scope.mode == 'add') {
        jQuery('.modeRead').removeClass('modeRead').addClass('modeWrite');
      } else {
        jQuery('.modeWrite').removeClass('modeWrite').addClass('modeRead');
      }

      if (cachedCurrentFile.Yearofbirth) {
        var age = calculations.age.fromBirthDate(cachedCurrentFile.Yearofbirth);
        var r = RegExp('([0-9]+) ?y(ears)? ?([0-9]+) ?m(onths)?').exec(age);
        // console.log(r);
        $scope.age.years = parseInt(r[1]);
        $scope.age.months = parseInt(r[3]);
      }
    }
    $scope.safeApply();
    $scope.$broadcast('refresh');
  });

  // ------------------------
  //  Display helpers
  // ------------------------
  $scope.getTemplateForMe = function() {
    if (!$scope.folder) {
      return template('waiting');
    }
    if (!$scope.page) {
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

  $scope.getPathTo = function(mode, index) {
    var f = cachedCurrentFile;
    if (index) {
      f = $scope.folder.getSubFile(index);
    }
    return '/folder/' + f.patient_id + '/fiche/' + f.getModel() + '/' + f.id + (mode ? '/' + mode : '');
  };

  //----------------------
  //   Actions
  //----------------------
  $scope.errors = {};
  $scope.actionValidate = function() {
  // TODO: jserror should have an icon before (danger)
  // TODO: hide action button if form is not ok
    $scope.valide = true;

    jQuery('input[type=number][required]').each(function() {
      if (jQuery(this).val() == '') {
        jQuery(this).val(0);
      }
    });

    if (!jQuery('#fileForm')[0].checkValidity()) {
      console.log('Form invalid');
      jQuery('#fileFormSubmit').click();
      $scope.valide = false;
    }

    $scope.errors = $scope.currentFile().validate();

    jQuery('input[mycalendar]:visible').each(function(){
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
    if ($scope.subid) {
      goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + $scope.subid);
    } else {
      goThere('/folder/' + $scope.patient_id);
    }
  };

  $scope.actionSave = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.saveFile(cachedCurrentFile, $scope.patient_id))
      .then(function(data) {
        // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The ' + $scope.subtype + ' has been saved.'});
        goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + $scope.subid);
        $scope.folder = data;
        $scope.safeApply();
      });
  };

  $scope.actionUnlock = function() {
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.unlockFile(cachedCurrentFile))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text': 'The ' + $scope.subtype + ' #' + $scope.subid + ' has been unlocked.'});
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
      return ;
    }
    let prefs = getPref('files');
    if (cachedCurrentFile.Date) {
      prefs['date'] = cachedCurrentFile.Date;
    }
    if (cachedCurrentFile.ExaminerName) {
      prefs['examinerName'] = cachedCurrentFile.ExaminerName;
    }
    if (cachedCurrentFile.Center) {
      prefs['center'] = cachedCurrentFile.Center;
    }
    setPref('files', prefs);

    getDataService()
      .then(dataService => dataService.createFile(cachedCurrentFile))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text': 'The ' + cachedCurrentFile.getModel() + ' has been created.'});
      // The data is refreshed by navigating away...
        goThere('/folder/' + $scope.patient_id + '/file/' + $scope.subtype + '/' + data.newKey);
        $scope.safeApply();
      });
  };

  $scope.actionDelete = function() {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.deleteFile($scope.currentFile()))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text':  'The ' + $scope.currentFile().getModel() +  ' of ' + $scope.currentFile().Date + ' has been deleted'});
        $scope.folder = data;
        goThere('/folder/' + $scope.patient_id);
        $scope.safeApply();
      });
  };

  $scope.actionCreatePatient = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }
    $scope.folder = false;
    // $scope.currentFile().getModel() = 'Patient';

    getDataService()
      .then(dataService => dataService.createFile($scope.currentFile()))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text':  'The patient has been created.'});
        $scope.folder = data;
        goThere('/folder/' + data.id);
        $scope.safeApply();
      });
  };

  $scope.actionSavePatient = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.saveFile(cachedCurrentFile, $scope.patient_id))
      .then(function() {
      // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The patient has been saved.'});
        goThere('/folder/' + $scope.patient_id);
      });
  };

  $scope.actionDeletePatient = function() {
    if (!confirm('Are you sure you want to delete this patient?')) {
      return;
    }
    $scope.folder = false;
    $scope.safeApply();

    getDataService()
      .then(dataService => dataService.deleteFile($scope.currentFile()))
      .then(function() {
        $scope.$emit('message', { 'level': 'success', 'text':    'The patient ' + $scope.currentFile().entryyear + '-' + $scope.currentFile().entryorder + ' has been deleted'});
        goThere();
        $scope.safeApply();
      });
  };

  $scope.nextAppointment = function() {
    var today = date2CanonicString(new Date(), true);
    var next = false;
    for(var k in $scope.folder.subFiles) {
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
      $scope.folder.getMainFile().Yearofbirth  = date2CanonicString(d2).substring(0, 7);
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

  $scope.listUpazillas = function(district, current) {
    var list = [ '?' ];
    if ($scope.appStateStore.connection
          && $scope.appStateStore.connection.settings) {
      if ($scope.appStateStore.connection.settings.associations['district.' + district]) {
        list = list.concat($scope.appStateStore.connection.settings.associations['district.' + district]);
      }
      list = list.concat($scope.appStateStore.connection.settings.associations['district.other']);
    }
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };

  $scope.listUnions = function(upazilla, current) {
    var list = [ '?' ];
    if ($scope.appStateStore.connection && $scope.appStateStore.connection.settings) {
      if ($scope.appStateStore.connection.settings.associations['upazilla.' + upazilla]) {
        list = list.concat($scope.appStateStore.connection.settings.associations['upazilla.' + upazilla]);
      }
      list = list.concat($scope.appStateStore.connection.settings.associations['upazilla.other']);
    }
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };
}

ctrl_folder.$inject = [ "$scope", '$location', '$routeParams' ];
