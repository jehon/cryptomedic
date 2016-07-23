import mainApp         from 'mainApp';

mainApp.controller('ctrl_allGraphics', [ '$scope', function($scope) {
  $scope.hovered = -1;
  $scope.$on('hovered', function(event, i) {
    $scope.hovered = i;
  });
}]);
