'use strict';

mainApp.controller('ctrl_picture', [ '$scope', function($scope) {
  $scope.getFileSrc = function() {
    if ($scope.currentFile().file) return '/uploadedPictures/' + $scope.currentFile().file;
    return 'static/img/file_not_defined.png';
  };
}]);
