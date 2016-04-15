'use strict';

mainApp.controller('ctrl_picture', [ '$scope', function($scope) {
  $scope.getFileSrc = function() {
    if ($scope.currentFile().file) {
      return '/api/v1.0/picture/' + $scope.currentFile().id;
    }
    return 'static/img/file_not_defined.png';
  };
}]);
