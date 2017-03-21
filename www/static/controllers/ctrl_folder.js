/* global goThere,create,Folder,jQuery,calculations,template,date2CanonicString,extractPrefsFile */
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

  $scope.age = {};

  // folder/123
  if (!$scope.page) {
    $scope.mode = "read";
    $scope.page = false;
  }

  // folder/123/edit
  if ($scope.page == 'edit') {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
    if ($scope.patient_id < 0) {
      $scope.mode = 'add';
    }
  }

  if ($scope.page == 'file') {
    if (!$scope.mode) {
      $scope.mode = "read";
    }
    if (!$scope.subid) {
      // Adding a file
      $scope.mode = 'add';
    }
  }

  $scope.folder = false;
  var cachedCurrentFile = null;

  //----------------------
  //   Get data from the server
  //----------------------
  // By default, wait for the html element to be ready:
  let getFileThen = getDataService();

  if ($scope.patient_id < 0) {
    getFileThen = getFileThen.then(() => Promise.resolve(new Folder()));
    $scope.mode = 'add';
  } else {
    getFileThen = getFileThen.then(dataService => dataService.getFolder('Patient', $scope.patient_id));
  }
  getFileThen.then(function(data) {
    if (data) {
      if ($scope.page == 'file') {
        if ($scope.mode == 'add') {
          // TODO: Adapt
          cachedCurrentFile = create($scope.subtype, null, data);
          cachedCurrentFile.patient_id = $scope.patient_id;
        } else {
          // TODO: Adapt
          for(var i in data.getSubFiles()) {
            if ((data.getSubFile(i).getModel() == $scope.subtype)
                && (data.getSubFile(i).id == $scope.subid)) {
              cachedCurrentFile = data.getSubFile(i);
            }
          }
        }
      } else {
        // TODO: Adapt
        cachedCurrentFile = data.getMainFile();
      }
      if ($scope.mode == 'edit' || $scope.mode == 'add') {
        jQuery('.modeRead').removeClass('modeRead').addClass('modeWrite');
      } else {
        jQuery('.modeWrite').removeClass('modeWrite').addClass('modeRead');
      }

      if (cachedCurrentFile.Yearofbirth) {
        var age = calculations.age.fromBirthDate(cachedCurrentFile.Yearofbirth);
        var r = RegExp('([0-9]+) ?y(ears)? ?([0-9]+) ?m(onths)?').exec(age);
        if (r.length > 3) {
          $scope.age.years = parseInt(r[1]);
          $scope.age.months = parseInt(r[3]);
        }
      }
    }
    $scope.folder = data;
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
    var f = $scope.currentFile();
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

  $scope.getFormContent = function(basis = {}) {
    let updatedData = new basis.constructor();
    Object.assign(updatedData, basis);
    for(let i of document.querySelector("#fileForm").querySelectorAll("input:not(.jh-select), jh-select")) {
      // Skip hidden input
      if (i.clientHeight == 0) {
        continue;
      }

      if (typeof(i.value) == "undefined") {
        i.value = null;
        continue;
      }

      let name = i.getAttribute('name');
      let value = i.value;

      if (typeof(value) == 'object') {
        Object.assign(updatedData, value);
        continue;
      }

      if (value === "") {
        value = null;
        continue;
      }

      switch(i.type) {
        case "number":
          updatedData[name] = Number.parseInt(value);
          break;
        case "file":
          // http://blog.teamtreehouse.com/uploading-files-ajax
          // We can pass the "File" object to FormData, it will handle it for us....
          // var file = ; //document.getElementById("fileForUpload").files[0];
          updatedData[name] = i.files[0];
          break;
        default:
          updatedData[name] = value;
          break;
      }
    }
    return updatedData;
  }

  $scope.actionSave = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }
    $scope.folder = false;
    $scope.safeApply();

    let updatedData = this.getFormContent($scope.currentFile());
    extractPrefsFile(updatedData);

    getDataService()
      .then(dataService => dataService.saveFile(updatedData, $scope.patient_id))
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
      .then(dataService => dataService.unlockFile($scope.currentFile()))
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

    let updatedData = this.getFormContent($scope.currentFile());
    extractPrefsFile(updatedData);

    getDataService()
      .then(dataService => dataService.createFile(updatedData))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text': 'The ' + updatedData.getModel() + ' has been created.'});
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

    let updatedData = this.getFormContent($scope.currentFile());

    getDataService()
      .then(dataService => dataService.createFile(updatedData))
      .then(function(data) {
        $scope.$emit('message', { 'level': 'success', 'text':  'The patient has been created.'});
        $scope.folder = data;
        goThere('/folder/' + data.newKey);
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

    let updatedData = this.getFormContent($scope.currentFile());

    getDataService()
      .then(dataService => dataService.saveFile(updatedData, $scope.patient_id))
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
    if (cryptomedic.serverSettings && cryptomedic.serverSettings.associations) {
      if (cryptomedic.serverSettings.associations['district.' + district]) {
        list = list.concat(cryptomedic.serverSettings.associations['district.' + district]);
      }
      list = list.concat(cryptomedic.serverSettings.associations['district.other']);
    }
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };

  $scope.listUnions = function(upazilla, current) {
    var list = [ '?' ];
    if (cryptomedic.serverSettings && cryptomedic.serverSettings.associations) {
      if (cryptomedic.serverSettings.associations['upazilla.' + upazilla]) {
        list = list.concat(cryptomedic.serverSettings.associations['upazilla.' + upazilla]);
      }
      list = list.concat(cryptomedic.serverSettings.associations['upazilla.other']);
    }
    if (list.indexOf(current) < 0) {
      list = [ current ].concat(list);
    }
    return list;
  };
}

ctrl_folder.$inject = [ "$scope", '$location', '$routeParams' ];
