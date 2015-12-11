"use strict";

mainApp.controller('ctrl_users', [ '$scope', '$location', '$routeParams' , function($scope, $location, $routeParams) {
  $scope.users = {};
  $scope.pwd = {
    newcode: 'test'
  }
  $scope.edit = false;

  $scope.refresh = function() {
    appState().actions.state.busy("Getting user list from the server");
    service_backend.usersList()
      .then(function(data) {
        $scope.users = data;
        appState().actions.state.ready();
        $scope.safeApply();
      });
  }

  $scope.doCancel = function() {
    $scope.edit = false;
    $scope.password = false;
    $scope.pwd.newcode = '';
  }

  $scope.doEdit = function(index) {
    $scope.edit = $scope.users[index]; // Put object here
    $scope.password = false;
    $scope.pwd.newcode = '';
  }

  $scope.doSave = function() {
    console.log("saving user ", $scope.edit);
  }

  $scope.doShowPassword = function() {
    $scope.password = true;
    $scope.pwd.newcode = '';
  }

  $scope.doSavePassword = function() {
    service_backend.usersPassword($scope.edit.id, $scope.pwd.newcode).then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The password of user '" + $scope.edit.username + "' has been updated correctly."});
      $scope.users = data;
      $scope.password = false;
      $scope.pwd.newcode = '';
      $scope.safeApply();
    });
  }

  $scope.doCancel();
  $scope.refresh();
}]);
