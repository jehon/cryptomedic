
import amd_stats from '../js/amd_stats.js';
import { atConsultTime } from '../js/age.js';
import { DataMissingException } from '../js/exceptions.js';

export default function ctrl_graphic($scope) {
    // This controller is intended for ONE graphic only
    var x, y;
    // var stats;

    $scope.getVariableX = function () { return x; };
    $scope.getVariableY = function () { return y; };

    $scope.getImageName = function () {
        if (x == null) return '';
        if (typeof ($scope.folder.getPatient().sexStr) == 'undefined') return '';
        var name = '';
        if (x == 'ageAtConsultTime') {
            if (y == 'Heightcm') name += 'height';
            if (y == 'Weightkg') name += 'weight';
            if (y == 'bmi') name += 'bmi';
        } else {
            name += 'wh';
        }
        name += '-' + $scope.folder.getPatient().sexStr();
        return name;
    };

    $scope.axis = function (x_, y_) {
        x = x_;
        y = y_;
    };

    var imgDimension = function (what) {
        return amd_stats.dimensions[x + '_' + y + '_' + $scope.folder.getPatient().sexStr()][what];
    };

    $scope.getValidity = function (file) {
        if (x == null) return '?';
        var vx = $scope.getValue(file, x);
        var vy = $scope.getValue(file, y);
        if (typeof (vx) != 'number') return 'Invalid ' + x;
        if (typeof (vy) != 'number') return 'Invalid ' + y;
        if (vx < imgDimension('vleft')) return x + ' to low';
        if (vx > imgDimension('vright')) return x + ' to high';
        if (vy < imgDimension('vbottom')) return y + ' to low';
        if (vy > imgDimension('vtop')) return y + ' to high';

        return 'v';
    };

    $scope.getValue = function (file, field) {
        if (field == 'ageAtConsultTime' || typeof (file[field]) == 'function') {
            try {
                if (field == 'ageAtConsultTime') {
                    return atConsultTime(file, $scope.folder.getPatient());
                } else {
                    return file[field]();
                }
            } catch (e) {
                if (e instanceof DataMissingException) {
                    return '#Error';
                }
                throw e;
            }
        }
        if (typeof (file[field]) == 'undefined') return 'undefined';
        if (file[field] == null) return '#NA';
        return file[field];
    };

    $scope.getAbscisse = function (file) {
        if (!$scope.getValidity(file)) return 0;

        var v = $scope.getValue(file, x);
        var p = (v - imgDimension('vleft')) / (imgDimension('vright') - imgDimension('vleft'));
        return (p * (imgDimension('right') - imgDimension('left')) + imgDimension('left')) * 100;
    };

    $scope.getOrdonnee = function (file) {
        if (!$scope.getValidity(file)) return 0;

        var v = $scope.getValue(file, y);
        var p = (v - imgDimension('vbottom')) / (imgDimension('vtop') - imgDimension('vbottom'));
        return (p * (imgDimension('top') - imgDimension('bottom')) + imgDimension('bottom')) * 100;
    };

    $scope.hover = function ($index) {
        $scope.$emit('hovered', $index);
    };

    $scope.$on('refresh', function () {
        $scope.$apply();
    });
}

ctrl_graphic.$inject = ['$scope'];
