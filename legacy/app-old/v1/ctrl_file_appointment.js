import date2CanonicString from "../v2/js/date2CanonicString.js";

export default function ctrl_file_appointment($scope) {
  $scope.today = date2CanonicString(new Date(), true);

  $scope.nextMonth = function (months) {
    var d = new Date();
    var nd = new Date(
      d.getFullYear(),
      d.getMonth() + months,
      d.getDate(),
      0,
      0,
      0
    );

    $scope.currentFile().date = date2CanonicString(nd, true);
  };
}

ctrl_file_appointment.$inject = ["$scope"];
