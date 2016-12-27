
function ctrl_login($scope) {
  $scope.details = {};

  $scope.doLogin = function() {
    if ($scope.details.username == '') {
      alert('No username detected');
      return;
    }
    if ($scope.details.password == '') {
      alert('No password detected');
      return;
    }
    dataService.doLogin(this.details.username, this.details.password);
  };
}

ctrl_login.$inject = [ "$scope" ];

export default ctrl_login;
