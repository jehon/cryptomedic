"use strict";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache

// Firefox: about:cache
//    Tools -> Options -> Advanced -> Network -> Offline data
// Chrome:  chrome://appcache-internals/

mainApp.controller("ctrl_offline", [ "$scope", function($scope) {
  $scope.info_available = false;
  $scope.offline = "";
  $scope.refreshAvailable = false;

  window.applicationCache.addEventListener("progress", function(progress) {
    if (progress.total) {
      console.log(progress.loaded + "/" + progress.total);
    }
  });

  window.applicationCache.addEventListener("updateready", function(event) {
    $scope.info_available = true;
    $scope.offline = "A new version of the application is available.";
    $scope.refreshAvailable = true;
    $scope.safeApply();
  });

  window.applicationCache.addEventListener("cached", function(progress) {
    console.info("on cached");
    $scope.info_available = false;
    $scope.safeApply();
  });

  window.applicationCache.addEventListener("error", function(event) {
    console.error("Sorry, you have an error in your offline application.");
    $scope.info_available = false;
    $scope.safeApply();
  });

  $scope.applicationRefresh = function() {
    console.log("let's go !");
    window.location.reload();
  };

  if (window.applicationCache) {
    if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
      window.applicationCache.swapCache();
      console.log("swap cache has been called");
    }
  }

/*  */
  var cacheStatusValues = [];
  cacheStatusValues[0] = "uncached";
  cacheStatusValues[1] = "idle";
  cacheStatusValues[2] = "checking";
  cacheStatusValues[3] = "downloading";
  cacheStatusValues[4] = "updateready";
  cacheStatusValues[5] = "obsolete";

  window.applicationCache.addEventListener("cached", logEvent, false);
  window.applicationCache.addEventListener("checking", logEvent, false);
  window.applicationCache.addEventListener("downloading", logEvent, false);
  window.applicationCache.addEventListener("error", logEvent, false);
  window.applicationCache.addEventListener("noupdate", logEvent, false);
  window.applicationCache.addEventListener("obsolete", logEvent, false);
  window.applicationCache.addEventListener("progress", logEvent, false);
  window.applicationCache.addEventListener("updateready", logEvent, false);

  function logEvent(e) {
      var online, status, type, message;
      online = (navigator.onLine) ? "yes" : "no";
      status = cacheStatusValues[window.applicationCache.status];
      type = e.type;
      message = "online: " + online;
      message+= ", event: " + type;
      message+= ", status: " + status;
      if (type == "error" && navigator.onLine) {
          message+= " (prolly a syntax error in manifest)";
        }
      console.warn(message);
    }
/* */
}]);
