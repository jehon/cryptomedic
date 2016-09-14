import catalog         from 'reducers/catalog';
import dispatch        from 'reducers/dispatch';
import { login, logout } from 'actions/authentication';

function ctrl_login($scope) {
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
    login(this.details.username, this.details.password);
  };

  $scope.doLogout = function() {
    logout();
  };
}

ctrl_login.$inject = [ "$scope" ];

export default ctrl_login;
