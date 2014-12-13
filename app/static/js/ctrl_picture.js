"use strict";

mainApp.controller('ctrl_picture', [ '$scope', 'service_backend', function($scope, service_backend) {
	function checkSize() {
	    jQuery('#PictureFilecontent')[0].addCustomValidation(function() {
	        var s = jQuery(':input[type=file]').get(0).files[0].size;
	        if (s >  (cryptomedic.settings.maxUploadSizeMb * 1024 * 1024)- 1) {
	            console.log("too big: " + s + " vs " + cryptomedic.maxUploadSizeMb);
	            jQuery('#PictureFilecontent')[0].setCustomValidity("file is too big. Maximum allowed size is " + cryptomedic.settings.maxUploadSizeMb + "Mb");
	        } else {
	            jQuery('#PictureFilecontent')[0].setCustomValidity("");
	        }
	    });
	    jQuery("#maxUploadSizeMb").html(cryptomedic.settings.maxUploadSizeMb);
	}

	$scope.getURLUploadIFrame = function() {
		return "/rest/upload/pictures/" + $scope.currentFile().id + ".html";
	}
}]);
