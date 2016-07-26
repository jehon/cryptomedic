import catalog         from 'reducers/catalog';
import dispatch        from 'reducers/dispatch';
import { login, logout } from 'actions/authentication';

function ctrl_login($scope) {
console.log("ctrl_login called");

  dispatch(catalog.DATABASE_DOWNLOADED);
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
    // var busyEnd = $scope.doBusy('Checking your login/password with the online server', true);
    login(this.details.username, this.details.password)
      .then(function(data) {
        $scope.go('/');
      // })
      // .myFinallyDone(function() {
      //   $scope.safeApply();
      });
  };

  $scope.doLogout = function() {
    // var busyEnd = $scope.doBusy('Disconnecting from the remote server', true);
    logout()
    .then(function(data) {
      $scope.go('/login');
      return data;
    // })
    // .myFinallyDone(function(data) {
    //   $scope.safeApply();
    //   return data;
    });
  };
}

ctrl_login.$inject = [ "$scope" ];

export default ctrl_login;
