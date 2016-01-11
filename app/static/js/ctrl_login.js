"use strict";

mainApp.controller("ctrl_login", [ "$scope", function($scope) {
  cryptomedic.settings = {};
  appState().actions.state.clear();
  $scope.details = {};

  $scope.doLogin = function() {
    if ($scope.details.username == "") {
      alert("No username detected");
      return;
    }
    if ($scope.details.password == "") {
      alert("No password detected");
      return;
    }
    $scope.loginError = false;
    var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
    service_backend.login(this.details.username, this.details.password)
      .then(function(data) {
        server.settings = data;
        $scope.loginError = false;
        $scope.logged = true;
        // console.log("Reloading the page");
        // window.location.reload();
        $scope.go("/");
      })
      .catch(function(data) {
        $scope.loginError = true;
      })
      .myFinallyDone(function() {
        $scope.safeApply();
        busyEnd();
      });
  };

  $scope.doLogout = function() {
    var busyEnd = $scope.doBusy("Disconnecting from the remote server", true);
    service_backend.logout()
    .then(function(data) {
      server.settings = false;
      $scope.go("/login");
      $scope.logged = false;
    })
    .myFinallyDone(function(data) {
      $scope.safeApply();
      busyEnd();
    });
  };
}]);
