
function ctrl_allGraphics($scope) {
  $scope.hovered = -1;
  $scope.$on('hovered', function(event, i) {
    $scope.hovered = i;
  });
}

ctrl_allGraphics.$inject = [ "$scope" ];

export default ctrl_allGraphics;
