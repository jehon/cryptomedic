"use strict";

mainApp.controller("ctrl_file_bill", [ "$scope", function($scope) {
  $scope.$watch(function() {
    return server.settings;
  }, function() {
    $scope.currentFile().calculatePriceId();
    $scope.safeApply();
  });

  $scope.$watch("currentFile().Date", function() {
    if ($scope.currentFile() && $scope.currentFile().calculatePriceId) {
      $scope.currentFile().calculatePriceId();
      $scope.safeApply();
    } else {
      $scope.safeApply();
    }
  });

  $scope.$watch("currentFile().sl_numberOfHouseholdMembers", function() {
    $scope.currentFile().ratioSalary();
  });

  $scope.$watch("currentFile().sl_familySalary", function() {
    $scope.currentFile().ratioSalary();
  });
}]);
