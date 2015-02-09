"use strict";

// https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache

mainApp.controller('ctrl_offline', [ '$scope', 'service_backend', function($scope, service_backend) {
    $scope.info_available = false;
    $scope.offline = "";
    $scope.refreshAvailable = false;
		
    window.applicationCache.onprogress = function(progress) {
	$scope.info_available = true;
	$scope.offline = "Downloading next version";
	if (progress.total) $sope.offline += " " + progress.loaded + " of " + progress.total;
	$scope.safeApply();
    };

    window.applicationCache.onupdateready = function(event) {
	if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
	    window.applicationCache.swapCache();
	    console.log('swap cache has been called');
	}

        $scope.info_available = true;
	$scope.offline = "A new version of the application is available.";
	$scope.refreshAvailable = true;
	$scope.safeApply();
    };

    window.applicationCache.oncached = function(progress) {
	console.info("on cached");
	$scope.info_available = false;
	$scope.safeApply();
    };
	
    window.applicationCache.onerror = function(event) {
	console.error("Sorry, you have an error in your offline application.");
    }
    
    window.applicationCache.onnoupdate = function(event) {
	console.info("on no update");
    }

    $scope.applicationRefresh = function() {
	console.log("let's go !");
	window.location.reload();
    }
    
    if (window.applicationCache) {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            console.log('swap cache has been called');
        }
    }
}]);



/* Debugging offline cache following 
 * https://jonathanstark.com/blog/debugging-html-5-offline-application-cache?filename=2009/09/27/debugging-html-5-offline-application-cache/
 **/
applicationCache.myDebug = function() {
    var cacheStatusValues = [];
    cacheStatusValues[0] = 'uncached';
    cacheStatusValues[1] = 'idle';
    cacheStatusValues[2] = 'checking';
    cacheStatusValues[3] = 'downloading';
    cacheStatusValues[4] = 'updateready';
    cacheStatusValues[5] = 'obsolete';
    
    var cache = window.applicationCache;
    cache.addEventListener('cached', logEvent, false);
    cache.addEventListener('checking', logEvent, false);
    cache.addEventListener('downloading', logEvent, false);
    cache.addEventListener('error', logEvent, false);
    cache.addEventListener('noupdate', logEvent, false);
    cache.addEventListener('obsolete', logEvent, false);
    cache.addEventListener('progress', logEvent, false);
    cache.addEventListener('updateready', logEvent, false);
    
    function logEvent(e) {
        var online, status, type, message;
        online = (navigator.onLine) ? 'yes' : 'no';
        status = cacheStatusValues[cache.status];
        type = e.type;
        message = 'online: ' + online;
        message+= ', event: ' + type;
        message+= ', status: ' + status;
        if (type == 'error' && navigator.onLine) {
            message+= ' (prolly a syntax error in manifest)';
        }
        console.warn(message);
    }
    
    window.applicationCache.addEventListener(
        'updateready', 
        function(){
            window.applicationCache.swapCache();
            console.log('swap cache has been called');
        }, 
        false
    );    
//    setInterval(function(){cache.update()}, 5 *1000);
}
