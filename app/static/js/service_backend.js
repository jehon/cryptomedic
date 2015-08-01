"use strict";

/* Initialize the computer id */
if (!window.localStorage.computer_id) {
	console.log("generate computer_id");
	var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var result = "";
	for (var i = 0; i < 32; i++) {
	    result += mask[Math.floor(Math.random() * mask.length)];
	}
	console.log(result);
	window.localStorage.computer_id = result;
}

/* service_my_backend */
function service_my_backend(options) {
    var rest = "/cryptomedic/rest/public";
    options = jQuery.extend({
	onInternalServerError: function(response) { 
	    console.error("Internal server error: " + response.url);
	    console.error(response.body.text);
	},
	onUnAuthorized: function(response) { 
	    console.error("Unauthorized: " + response.url); 
	},
	onForbidden: function(response) { 
	    console.error("Forbidden: " + response.url); 
	},
	onCacheProgress: function(lastSync, _final) {
	    console.log("Cache progress: " + lastSync + " " + (_final ? " terminated " : " data pending")); 
	}
    }, options);
   
    /** 
     * Manage the indexeddb
     */
    var db = new Dexie("cryptomedic");
    db.version(1).stores({
        patients: '++id',
    });
    db.on('blocked', function () {
	    console.error("DB is blocked");
    });
    db.open();
    
    /**
     * Launch a fetch request
     * 
     * - init Optional
	. method: The request method, e.g., GET, POST.
	. headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
	. body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
	. mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
	. cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
     */
    function getFetch(url, init, data) {
	init = jQuery.extend({
	    headers: new Headers(),
	    method: "GET",
	    credentials: 'include'
	}, init);
	if (data) {
	    if (init.method == "GET") {
		url = url + "?" + jQuery.param(data);
	    } else {
		var fd = new FormData()
		for(var a in data) {
		    fd.append(a, data[a]);
		}
		init.body = fd;
	    }
	}
	init.headers.append("Accept", "application/json, text/plain, */*");
	init.headers.append('X-OFFLINE-CP', localStorage.lastSync);
	
	var req = new Request(url, init);
	return fetch(req).then(function(response) {
	    // Response: ok, status, statusText
	    if (!response.ok) {  
		switch(response.status) {
		case 403: // forbidden
		    options.onForbidden(response);
		    break;
		case 401: // unauthorized
		    console.log(options);
		    options.onUnAuthorized(response);
		    break;
		case 500: // internal server error
		    options.onInternalServerError(response);
		    break;
		}
		throw new Error(response.status);
	    }
	    return response;
	})
	;
    }

    function json(response) { 
	return response.json();
    }
    
    function extractCache(json) {
	if (json._offline) {
	    var lastSync = json._offline._checkpoint;
	    options.onCacheProgress(json._offline._checkpoint, json._offline._final);
	    delete json._offline._checkpoint;
	    delete json._offline._final;
	    var waitme = [];
	    for (var key in json._offline) {
		  if (json._offline.hasOwnProperty(key)) {
		      waitme[key] = db.patients.put(json._offline[key]);
		  }
	    }
	    Promise.all(waitme).then(function() {
		delete json._offline;
		localStorage.lastSync = lastSync;
//		console.log("all is done");
	    });
	}
	return json;
    }
    
    return {
	/* Authentification */
	'login': function(username, password) {
	    return getFetch(rest + "/auth/mylogin", { method: "POST" }, 
		    { 
			'username': username, 
			'password': password, 
			'appVersion': cryptomedic.version,
			'computerId': window.localStorage.computer_id
		    })
	    .then(json)
	    .then(extractCache);
	},
	'checkLogin': function() {
	    return getFetch(rest + "/auth/settings", null, 
		    { 
			'appVersion': cryptomedic.version,
			'computerId': window.localStorage.computer_id
		    }
	    )
	    .then(json)
	    .then(extractCache);
	},
	'logout': function() {
	    // TODO: clean up the cache --> cache managed in other object???
	    return getFetch(rest + "/auth/logout")
	    .then(json);
	},
	/* Data Sync */
	'sync': function() {
	    return getFetch(rest + "/foldersync")
	    .then(json)
	    .then(extractCache)
	    .then(function(data) { return localStorage._final; });
	}
    };
};

/******* OLD INTERFACE **********/

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
	    // do something on success
	    // TODO OFFLINE: Catch the data
            // TODO: Cache the folder data into service_backend?
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




/*
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"

formData.append(name, value, filename);
formData.append('userpic', myFileInput.files[0], 'chris.jpg');
*/

function mytest() {
    return service_my_backend().checkLogin().then(function(data) {
	console.info("my test / then");
	console.info(data);
    }).catch(function(data) {
	console.warn("my test / catch");
	console.warn(data);
    })
}

function l(data) {
    console.log(data);
}
