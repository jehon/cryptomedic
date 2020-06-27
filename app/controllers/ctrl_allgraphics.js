
import '../elements/widgets/x-graphic-height.js';
import '../elements/widgets/x-graphic-weight.js';
import '../elements/widgets/x-graphic-bmi.js';
import '../elements/widgets/x-graphic-wh.js';

/**
 * @param $scope
 */
export default function ctrl_allGraphics($scope) {
    $scope.hovered = -1;
    $scope.$on('hovered', function (event, i) {
        $scope.hovered = i;
    });
}

ctrl_allGraphics.$inject = ['$scope'];
