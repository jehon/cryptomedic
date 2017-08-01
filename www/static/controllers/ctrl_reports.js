/* global getPref,setPref,date2CanonicString,template,ExcellentExport,jQuery */

function ctrl_reports($scope, $routeParams, $sce) {
  var report = $routeParams['report'];
  $scope.values = getPref('report', {
    center   : '',
    examiner : '',
    period   : 'month',
    activity : '',
    day      : date2CanonicString(new Date(), true),
    month    : date2CanonicString(new Date(), true).substring(0, 7),
    year     : date2CanonicString(new Date(), true).substring(0, 4)
  });
  for(var k in $scope.values) {
    if ($scope.values[k] === null) {
      $scope.values[k] = '';
    }
  }
  if (!$scope.values['period']) {
    $scope.values['period'] = 'month';
  }


  $scope.reports = {
    'activity': {
      name: 'Activity (daily/monthly) Report',
      description: 'If you want to know your activity, choose this report.<br>'
        + 'Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).<br>',
      params: [ 'period', 'center', 'examiner', 'activity' ],
      templateUrl: template('report', 'activity')
    },
    'consultations': {
      name: 'Consultations planned',
      description: 'List of consultations planned on a specific day in a specific center.<br>'
        + 'See also the button in the menu<br>'
        + 'Options: the day and the center.',
      params: [ 'day', 'center' ],
      fixedParams: {
        period: "day"
      },
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
      let n = $scope.reports[report].params[p];
      let v = $scope.values[n];
      if (n == "period") {
        let pn = v;
        let pv = $scope.values[pn];
        prefs[pn] = pv;
      }
      prefs[n] = v
    }
    setPref('report', prefs);

    var dataGenerator = report;
    if (typeof($scope.reports[report].dataGenerator) != 'undefined') {
      dataGenerator = $scope.reports[report].dataGenerator;
    }
    if ($scope.reports[report].fixedParams) {
      Object.assign($scope.values, $scope.reports[report].fixedParams);
    }

    // Check input data:
    if ($scope.isParam('period')) {
      let period = $scope.values['period'];
      let value = $scope.values[period];
      if (!value) {
        $scope.result = true;
        $scope.error = "Invalid period (" + period + ")";
        $scope.safeApply();
        return ;
      }
    }

    // Launch the call
    getDataService('reportService')
      .then(dataService => dataService.getReport(dataGenerator, $scope.values))
      .then((data) => {
        $scope.result = data;
        $scope.error = false;
        $scope.safeApply();
      }, (error) => {
        console.error("here we are in error: ", error);
        $scope.result = true;
        $scope.error = error;
        $scope.safeApply();
      });
  };

  $scope.refresh();

  $scope.generate = function($event) {
    document.querySelectorAll("#report_table .online").forEach(el => el.parentNode.removeChild(el));
    document.querySelectorAll("#report_table jh-codage").forEach(el => el.parentNode.replaceChild(
        document.createRange().createContextualFragment(`<span>${el.getAttribute('calculated-translated')}</span>`), 
        el
      )
    )
    // bug fix here: https://github.com/jmaister/excellentexport/issues/54
    ExcellentExport.excel($event.currentTarget,
      document.getElementById('report_table').getElementsByTagName('table')[0],
      'cryptomedic');
  };
}

ctrl_reports.$inject = [ '$scope', '$routeParams', '$sce' ];

