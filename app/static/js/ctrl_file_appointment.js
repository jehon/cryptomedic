"use strict";

mainApp.controller('ctrl_file_appointment', [ '$scope', function($scope) {
  $scope.nextMonth = function(months) {
    console.info($scope.currentFile());
    d = new Date();
    nd = new Date(d.getFullYear(), d.getMonth() + months, d.getDay());

    $scope.currentFile().Nextappointment = date2CanonicString(nd, true);
  }
}]);
