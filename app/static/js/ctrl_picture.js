"use strict";

mainApp.controller('ctrl_picture', [ '$scope', function($scope) {
    $scope.getFileSrc = function() {
	if ($scope.currentFile().file) return "/uploadedPictures/" + $scope.currentFile().file;
	return "static/img/file_not_defined.png";
    }

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

//    $scope.getURLUploadIFrame = function() {
//	return "/rest/upload/pictures/" + $scope.currentFile().id + ".html";
//    }

//  function dataUrlToBlob(dataURI) {
//	var byteString = atob(dataURI.split(',')[1]);
//	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//	var ab = new ArrayBuffer(byteString.length);
//	var dw = new DataView(ab);
//
//	for(var i=0; i<byteString.length; i++) {
//		dw.setUint8(i, byteString.charCodeAt(i));
//	}
//	return new Blob([ab], { type: mimeString });
//}

// Send picture to server:
//    var formData = new FormData();
//    formData.append("OriginalName", file.name);
//    formData.append("fileContent", dataUrlToBlob(dataURI));
//		jQuery.ajax({
//		    url: "?",
//		    data: formData,
//		    type: 'POST',
//		    processData: false,
//		    contentType: false
//		});
}]);
