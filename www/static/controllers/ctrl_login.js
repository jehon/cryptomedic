
function ctrl_login($scope) {
  $scope.details = {
    username: '',
    password: ''
  };
  $scope.loginError = false;

  $scope.doLogin = function() {
    if ($scope.details.username == '') {
      alert('No username detected');
      return;
    }
    if ($scope.details.password == '') {
      alert('No password detected');
      return;
    }
    getDataService()
      .then((dataService) => {
        return dataService.doLogin(this.details.username, this.details.password);
      })
      .then(() => {
        $scope.loginError = false;
      })
      .catch(error => {
        console.log("Login error: ", error);
        $scope.loginError = true;
        $scope.safeApply();
      })
  };
}

ctrl_login.$inject = [ "$scope" ];
