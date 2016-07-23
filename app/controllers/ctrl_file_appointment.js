import mainApp              from 'mainApp';
import date2CanonicString   from 'helpers/date2CanonicString';

mainApp.controller('ctrl_file_appointment', [ '$scope', function($scope) {
  $scope.today = date2CanonicString(new Date(), true);

  $scope.nextMonth = function(months) {
    var d = new Date();
    var nd = new Date(d.getFullYear(), d.getMonth() + months, d.getDate(), 0, 0, 0);

    $scope.currentFile().Nextappointment = date2CanonicString(nd, true);
  };
}]);
