"use strict";

/*
 * expected behavior:
 * - always store what come back from the server in the cache
 * - if offline, this data does not perish
 * - if online, this data perish (see checkId which manage that)
 * 
 * Expected from the server:
 * - if offline, the list of modifications since last time
 * - if online, nothing special
 *
 * Tasks:
 * 1. make this cache async in its calls (return promise)
 * 2. manage the fallback mode: when no indexedDB are available (!db)
 * 3. enrich when receiving data from the server and get from the indexedDB
 * 
 */

//mainApp.factory('service_backend', [ '$http', '$rootScope', '$injector', function($http, $rootScope, $injector) {
mainApp.factory('service_backend', [ '$rootScope', '$injector', function($rootScope, $injector) {
    var pcache = perishableCache(10);
    var rest = "/cryptomedic/rest/public/";
    
    function treatHttp(request, treatResponse) {
	var def = jQuery.Deferred();
	request.success(function(data, status, headers, config) {
	    if (typeof(treatResponse) == 'function') {
		data = treatResponse(data, status, headers, config);
	    }
	    def.resolve(data);
	}).error(function(data, status, headers, config) {
	    def.reject(data);
	});
	return def;
    }

    return {
	/*******************************
	 * Authentification oriented services 
	 */
	'checkLogin': function() {
	    var $http = $injector.get("$http");
	    return $http.get(rest + "/auth/settings?appVersion=" + cryptomedic.version).success(function(data) {
		console.info("broadcast backend_logged_in from checkLogin");
		$rootScope.$broadcast("backend_logged_in");
	    });
	},
	'doLogin': function(username, password) {
	    var $http = $injector.get("$http");
	    // Hack: if no username is given, then checkLogin instead
	    if (username == "") return this.checkLogin();
	    return $http.post(rest + "/auth/mylogin", 
		{ 'username': username, 
			'password': password, 
			'appVersion': cryptomedic.version
		}).success(function(data) {
		    $rootScope.$broadcast("backend_logged_in");
	    	});
	},
	'doLogout': function() {
	    var $http = $injector.get("$http");
	    // TODO SECURITY: more cleanup
	    pcache.clear();
	    return $http.get(rest + "/auth/logout").success(function(data) {
	            $rootScope.$broadcast("backend_logged_out");
	    });
	},

	/*******************************
	 * Data oriented services
	 */

	'getFolder': function(id) {
	    var $http = $injector.get("$http");
	    if (pcache.isCached(id)) {
		return jQuery.Deferred().resolve(pcache.get(id));
	    }
	    return treatHttp($http.get(rest + "/folder/" + id), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'getParent': function(type, id) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/related/" + type + "/" + id), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'searchForPatients': function(params) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/folder", { 'params': params }), function(data) {
		var list = [];
		for(var i in data) {
		    list.push(new application.models.Patient(data[i]));
		}
		return list;
	    });
	},
	'checkReference': function(year, order) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/reference/" + year + "/" + order),
		function(data) {
			if ((typeof(data._type) != 'undefined') && (data._type == 'Folder')) {
			    return data['id'];
			} else {
			    return false;
			}
		});
	},
	'createReference': function(year, order) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.post(rest + "/reference", 
		{ 
			'entryyear': year, 
			'entryorder': order
		}), function(data) {
			pcache.set(data.getMainFile().id, data);
			return data;
		}); 
	},
	'createFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.post(rest + "/fiche/" + data['_type'], data), function(data, status, headers, config) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'saveFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.put(rest + "/fiche/" + data['_type'] + "/" + data['id'], data), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'deleteFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http['delete'](rest + "/fiche/" + data['_type'] + "/" + data['id']), function(data) {
		if (data instanceof application.models.Folder) {
		    pcache.set(data.getMainFile().id, data);
		}
		return data;				
	    });
	},
	'unlockFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.get(rest + "/unfreeze/" + data['_type'] + "/" + data['id']), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'getReport': function(reportName, data, timing) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/reports/" + reportName + (timing ? "/" + timing : ""), { 'params': data }), 
		    function(data) { return data; }
	    	);
	},
    };
}]);

// https://docs.angularjs.org/api/ng/service/$http
// http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
mainApp.factory('sessionInjector', [ '$q', '$injector', 'service_backend', '$rootScope', function($q, $injector, service_backend, $rootScope) {
    return {
        'request': function(config) {
	    // TODO OFFLINE: Add last sync header to the call
            config.headers['X-last-sync'] = "2015-01-01 01:01:01|bills|15";
            return config;
        },
        'response': function(response) {
	    // TODO OFFLINE: Catch the data
            // TODO: Cache the folder data into service_backend?
//	    // do something on success
//	    console.warn(response);
	    return response;
        },
	'responseError': function(rejection) {
	    switch(rejection.status) {
	    case 401: // Unauthorized
		$rootScope.$broadcast("backend_logged_out");
		break;		
	    case 403: // Forbidden
		$rootScope.$broadcast("backend_logged_error");
		break;		
	    default:
		console.warn(rejection);    
	    }
	    return $q.reject(rejection);
	},
    };
}]);

mainApp.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('sessionInjector');
}]);
