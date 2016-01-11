"use strict";

// TODO: manage change in groups

mainApp.controller("ctrl_users", [ "$scope", "$location", "$routeParams" , function($scope, $location, $routeParams) {
  $scope.users = {};
  $scope.edit = false;
  $scope.password = false;

  $scope.refresh = function() {
    appState().actions.state.busy("Getting user list from the server");
    service_backend.usersList()
      .then(function(data) {
        $scope.users = data;
        appState().actions.state.ready();
        $scope.safeApply();
      });
  };

  $scope.emailAll = function() {
    var res = "";
    for(i in $scope.users) {
      if ($scope.users[i].email) {
        res += $scope.users[i].name + "<" + $scope.users[i].email + ">,";
      }
    }
    return res;
  };

  $scope.doAdd = function() {
    $scope.edit = {
      "id" : -1
    };
  };

  // *** EDIT ****
  $scope.doCancel = function() {
    $scope.edit = false;
    $scope.password = false;
    $scope.safeApply();
  };

  $scope.doEdit = function(index) {
    $scope.edit = $scope.users[index]; // Put object here
    $scope.password = false;
  };

  $scope.doSave = function() {
    if ($scope.edit.id >= 0) {
      service_backend.userUpdate($scope.edit)
        .then(function(data) {
          $scope.list = data;
          $scope.$emit("message", { "level": "success", "text": "The user '" + $scope.edit.username + "' has been saved successfully."});
          $scope.doCancel();
        });
    } else {
      service_backend.userAdd($scope.edit)
        .then(function(data) {
          $scope.list = data;
          $scope.$emit("message", { "level": "success", "text": "The user '" + $scope.edit.username + "' has been created successfully."});
          // $scope.doShowPassword();
          $scope.doCancel();
        });
    }
  };

  $scope.doDelete = function() {
    if (confirm("Are you sure you want to delete user '" + $scope.edit.name + "'?")) {
      service_backend.userDelete($scope.edit.id).then(function(data) {
        $scope.$emit("message", { "level": "success", "text": "The user '" + $scope.edit.username + "' has been deleted successfully."});
        $scope.users = data;
        $scope.doCancel();
      });
    }
  };

  // *** Passwords ****

  $scope.doShowPassword = function(index) {
    $scope.password = $scope.users[index];
  };

  $scope.doSavePassword = function() {
    service_backend.userPassword($scope.password.id, $scope.password.newcode).then(function(data) {
      $scope.$emit("message", { "level": "success", "text": "The password of user '" + $scope.password.username + "' has been updated successfully."});
      $scope.doCancel();
      // $scope.safeApply();
    });
  };

  $scope.doCancel();
  $scope.refresh();
}]);
