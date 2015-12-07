"use strict";

mainApp.controller('ctrl_login', [ "$scope", function($scope) {
  cryptomedic.settings = {};

  $scope.doLogin = function() {
    $scope.username = jQuery("#login_username").val();
    $scope.password = jQuery("#login_password").val();
    if ($scope.username == "") {
        alert("No username detected");
        return;
    }
    if ($scope.password == "") {
        alert("No password detected");
        return;
    }
    $scope.loginError = false;
    var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
    service_backend.login(this.username, this.password)
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
