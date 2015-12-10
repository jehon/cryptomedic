"use strict";

mainApp.controller('ctrl_users', [ '$scope', '$location', '$routeParams' , function($scope, $location, $routeParams) {
  $scope.users = {};
  $scope.details = {
    newcode: 'test'
  }

  $scope.refresh = function() {
    appState().actions.state.busy("Getting user list from the server");
    service_backend.usersList()
      .then(function(data) {
        $scope.users = data;
        appState().actions.state.ready();
      });
  }

  $scope.doEdit = function(id) {
    $scope.edit = id;
  }

  $scope.doCancel = function() {
    $scope.edit = -1;
    $scope.password = false;
    $scope.details.newcode = '';
  }

  $scope.doSave = function() {
    console.log("saving user ", $scope.edit);
  }

  $scope.doShowPassword = function() {
    $scope.password = true;
    $scope.details.newcode = '';
  }

  $scope.doSavePassword = function() {
    service_backend.usersPassword($scope.edit, $scope.details.newcode).then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The password of user '" + $scope.users[$scope.edit].username + "' has been updated correctly."});
      $scope.users = data;
      $scope.password = false;
      $scope.details.newcode = '';
      $scope.safeApply();
    });
  }

  $scope.refresh();
  $scope.doCancel();
}]);
