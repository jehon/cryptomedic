"use strict";

mainApp.controller("ctrl_home", [ "$scope", "$location", function($scope, $location) {
	  if (typeof($scope.entryyear) == "undefined") {
		  $scope.searched = false;
		  $scope.entryyear = (new Date()).getFullYear();
		  $scope.entryorder = "";
	}

	  $scope.resetSearched = function() {
		  $scope.searched = false;
	};

	  $scope.checkReference = function() {
		  var busyEnd = $scope.doBusy("Checking the reference on the server");
		  service_backend.checkReference($scope.entryyear, $scope.entryorder)
		.then(function(data) {
			  if (data === false) {
				  $scope.searched = true;
			} else {
				  busyEnd();
				// end the busy mode
				  jQuery("#busy").modal("hide");
				  setTimeout(function() {
					  window.location.hash = "/folder/" + data;
				}, 1);
			}
		}, function(data) {
			  console.error(data);
		}).myFinallyDone(function() {
			  busyEnd();
		});
		  $scope.searched = true;
	};

	  $scope.createReference = function() {
  	var busyEnd = $scope.doBusy("Creating the reference on the server");
		  service_backend.createReference($scope.entryyear, $scope.entryorder)
		.then(function(data) {
			  busyEnd();
			// end the busy mode
			  jQuery("#busy").modal("hide");
			  setTimeout(function() {
				  window.location.hash = "/folder/" + data.id + "/edit";
			}, 1);
		}, function(data) {
			  console.error(data);
		}).myFinallyDone(function() {
			  busyEnd();
		});
		  $scope.searched = true;
	};
	  $scope.generateReference = function() {
	      window.location.hash = "/folder/-1/edit";
	      return;
	};
}]);
