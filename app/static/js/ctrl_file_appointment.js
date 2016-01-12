"use strict";

mainApp.controller("ctrl_file_appointment", [ "$scope", function($scope) {
  $scope.today = appState().helpers.date2CanonicString(new Date(), true);

  $scope.nextMonth = function(months) {
    var d = new Date();
    var nd = new Date(d.getFullYear(), d.getMonth() + months, d.getDate(), 0, 0, 0);

    $scope.currentFile().Nextappointment = appState().helpers.date2CanonicString(nd, true);
  };
}]);
