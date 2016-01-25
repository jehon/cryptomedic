"use strict";

mainApp.controller("ctrl_picture", [ "$scope", function($scope) {
  $scope.getFileSrc = function() {
    if ($scope.currentFile().file) return "/uploadedPictures/" + $scope.currentFile().file;
    return "static/img/file_not_defined.png";
  };

  // function checkSize() {
  //   jQuery('#PictureFilecontent')[0].addCustomValidation(function() {
  //     var s = jQuery(':input[type=file]').get(0).files[0].size;
  //     if (s >  (cryptomedic.settings.maxUploadSizeMb * 1024 * 1024)- 1) {
  //       console.log("too big: " + s + " vs " + cryptomedic.maxUploadSizeMb);
  //       jQuery('#PictureFilecontent')[0].setCustomValidity("file is too big. Maximum allowed size is " + cryptomedic.settings.maxUploadSizeMb + "Mb");
  //     } else {
  //       jQuery('#PictureFilecontent')[0].setCustomValidity("");
  //     }
  //   });
  //   jQuery("#maxUploadSizeMb").html(cryptomedic.settings.maxUploadSizeMb);
  // }
}]);
