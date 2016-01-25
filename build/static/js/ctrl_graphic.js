"use strict";

mainApp.controller("ctrl_graphic", [ "$scope", "$element", function($scope, $element) {
  // This controller is intended for ONE graphic only
  var x, y;
  // var stats;

  $scope.getVariableX = function() { return x; };
  $scope.getVariableY = function() { return y; };

  $scope.getImageName = function() {
    if (x == null) return "";
    if (typeof($scope.folder.getMainFile().sexStr) == "undefined") return "";
    var name = "";
    if (x == "ageAtConsultTime") {
      if (y == "Heightcm") name += "height";
      if (y == "Weightkg") name += "weight";
      if (y == "bmi") name += "bmi";
    } else {
      name += "wh";
    }
    name += "-" + $scope.folder.getMainFile().sexStr();
    return name;
  };

  $scope.axis = function(x_, y_) {
    x = x_;
    y = y_;
  };

  var imgDimension = function(what) {
    return $scope.folder.graphic_dimensions(x, y)[what];
  };

  $scope.getValidity = function($index) {
    if (x == null) return "?";
    var vx = $scope.getValue($index, x);
    var vy = $scope.getValue($index, y);
    if (typeof(vx) != "number") return "Invalid " + x;
    if (typeof(vy) != "number") return "Invalid " + y;
    if (vx < imgDimension("vleft")) return x + " to low";
    if (vx > imgDimension("vright")) return x + " to high";
    if (vy < imgDimension("vbottom")) return y + " to low";
    if (vy > imgDimension("vtop")) return y + " to high";

    return "v";
  };

  $scope.getValue = function($index, field) {
    if (field == "ageAtConsultTime" || typeof($scope.folder.getSubFile($index)[field]) == "function") {
      try {
        if (field == "ageAtConsultTime") {
          return calculations.age.atConsultTime($scope.folder.getSubFile($index), $scope.folder.getMainFile());
        } else {
          return $scope.folder.getSubFile($index)[field]();
        }
      } catch(e) {
        if (e instanceof DataMissingException) {
          return "#Error";
        }
        throw e;
      }
    }
    if (typeof($scope.folder.getSubFile($index)[field]) == "undefined") return "undefined";
    if ($scope.folder.getSubFile($index)[field] == null) return "#NA";
    return $scope.folder.getSubFile($index)[field];
  };

  $scope.getAbscisse = function($index) {
    if (!$scope.getValidity($index)) return 0;

    var v = $scope.getValue($index, x);
    var p = (v - imgDimension("vleft")) / (imgDimension("vright") - imgDimension("vleft"));
    return (p * (imgDimension("right") - imgDimension("left")) + imgDimension("left")) * 100;
  };

  $scope.getOrdonnee = function($index) {
    if (!$scope.getValidity($index)) return 0;

    var v = $scope.getValue($index, y);
    var p = (v - imgDimension("vbottom")) / (imgDimension("vtop") - imgDimension("vbottom"));
    return (p* (imgDimension("top") - imgDimension("bottom")) + imgDimension("bottom")) * 100;
  };

  $scope.hover = function($index) {
    $scope.$emit("hovered", $index);
  };

  $scope.$on("refresh", function() {
    $scope.$apply();
  });
}]);
