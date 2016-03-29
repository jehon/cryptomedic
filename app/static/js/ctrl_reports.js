'use strict';

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', '$sce', function($scope, $routeParams, $sce) {
  var report = $routeParams['report'];
  $scope.values = appState().store.getState().prefs.reports;
  for(var k in $scope.values) {
    if ($scope.values[k] === null) {
      $scope.values[k] = '';
    }
  }
  if (!$scope.values['period']) {
    $scope.values['period'] = 'month';
  }

  $scope.reports = {
    'dailyActivity': {
      name: 'Daily Report',
      description: 'If you want to know your daily activity, choose this report.<br>'
        + 'Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).<br>',
      params: [ 'center', 'day', 'examiner', 'activity' ],
      templateUrl: template('report', 'activity')
    },
    'monthlyActivity': {
      name: 'Monthly Report',
      description: 'If you want to know your activity on a month, choose this report<br>'
        + 'Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).<br>',
      params: [ 'center', 'examiner', 'month', 'activity' ],
      templateUrl: template('report', 'activity')
    },
    'consultations': {
      name: 'Consultations planned',
      description: 'List of consultations planned on a specific day in a specific center.<br>'
        + 'See also the button in the menu<br>'
        + 'Options: the day and the center.',
      params: [ 'day', 'center' ],
      templateUrl: template('report', 'consultations')
    },
    'statistical': {
      name: 'Statistical Report',
      description: 'If you want to know the activity of the SARPV CDC on a period, choose this report',
      params: [ 'period', 'center', 'examiner' ],
      dataGenerator: 'statistical',
      templateUrl: template('report', 'statistical')
    },
    'surgical': {
      name: 'Surgical Report',
      description: 'Follow up of the surgical activity of the period',
      params: [ 'period' ],
      dataGenerator: 'surgical',
      templateUrl: template('report', 'surgery')
    }
  };

  for(var r in $scope.reports) {
    // Make the content 'trustable' to be shown as html
    $scope.reports[r].description = $sce.trustAsHtml($scope.reports[r].description);
  }

  $scope.reportName = function() {
    if (!$scope.reports[report]) return false;
    var r = $scope.reports[report];
    var rname = r.name;
    for(var p in r.params) {
      if ($scope.values[r.params[p]]) {
        rname = rname + ' - ' + $scope.values[r.params[p]];
      }
    }
    return rname;
  };

  $scope.getReport = function() {
    if (report) {
      return $scope.reports[report];
    }
    return false;
  };

  $scope.isParam = function(name) {
    if (!$scope.reports[report]) return false;

    if (($scope.reports[report]['params'].indexOf('period') > -1)) {
      if (name == $scope.values['period']) {
        return true;
      }
    }
    return $scope.reports[report]['params'].indexOf(name) > -1;
  };

  $scope.refresh = function() {
    if (!report) {
      return;
    }
    $scope.result = null;

    var prefs = {};
    for(var p in $scope.reports[report].params) {
      var v = $scope.reports[report].params[p];
      prefs[v] = $scope.values[v];
    }
    appState().dispatch(appState().catalog.PREFS_REPORTS, prefs);

    var dataGenerator = report;
    if (typeof($scope.reports[report].dataGenerator) != 'undefined') {
      dataGenerator = $scope.reports[report].dataGenerator;
    }
    service_backend.getReport(dataGenerator,
        $scope.values,
        ($scope.isParam('period') ? $scope.values.period : null)
      )
      .then(function(data) {
        $scope.result = data;
        $scope.safeApply();
      });
  };

  $scope.refresh();

  $scope.generate = function() {
    jQuery('.online').remove();
    ExcellentExport.excel(document.getElementById('download_link'),
      document.getElementById('report_table').getElementsByTagName('table')[0],
      'cryptomedic');
  };
}]);
