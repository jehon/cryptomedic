"use strict";

// Test cryptographic:
// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

/* Initialize the computer id */
if (!window.localStorage.cryptomedicComputerId) {
	console.log("generate cryptomedic_computer_id");
	var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var result = "";
	for (var i = 0; i < 32; i++) {
	    result += mask[Math.floor(Math.random() * mask.length)];
	}
	window.localStorage.cryptomedicComputerId = result;
}

/* service_my_backend */
var service_my_backend = (function () {
    var rest = "/cryptomedic/rest/public";
    var worker = new Worker("static/worker/worker.js?r=" + Math.random());
    worker.onerror = function(e) {
	console.error("@service: Error in worker: ", e);
    };
    
    worker.onmessage = function(e) {
        var name = e.data.name;
        var data = e.data.data;
        console.log('@service: ' + name + ': ', data);
        switch(name) {
        	case "progress":
        	    localStorage.cryptomedicLastSync = data.checkpoint;
        	    myEvents.trigger("backend_cache_progress", data);
    	    	    break;
        	case "folder":
        	    console.log("hehehe");
        	    break;
        	default:
    	    	    console.error("Unknown message: " + name, data);
        }
    };

    function mySendAction(name, data) {
	worker.postMessage({ name: name, data: data });
    }

    mySendAction("init", {
	checkpoint: (localStorage.cryptomedicLastSync ? localStorage.cryptomedicLastSync : "") 
    });
    
    /**
     * Launch a fetch request
     * 
     * - init Optional
     *  . method: The request method, e.g., GET, POST.
     *  . headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
     *  . body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
     *  . mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
     *  . cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
     *  
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
	init.headers.append('X-OFFLINE-CP', localStorage.cryptomedicLastSync);
	
	var req = new Request(url, init);

	return fetch(req).then(function(response) {
	    // Response: ok, status, statusText
	    if (!response.ok) {  
		console.log("getFetch 5", response.status);
		switch(response.status) {
		case 403: // forbidden
		    myEvents.trigger("backend_forbidden");
		    break;
		case 401: // unauthorized
		    myEvents.trigger("backend_unauthorized");
		    break;
		case 500: // internal server error
		    myEvents.trigger("backend_internal_server_error");
		    break;
		}
		throw new Error(response.status);
	    }
	    return response;
	}, function(e) {
	    console.error("Fetch error: ", e);
	    return null;
	});
    }

    function json(response) {
	return response.json();
    }
        
    return {
	/* Authentification */
	'login': function(username, password) {
	    return getFetch(rest + "/auth/mylogin", { method: "POST" }, 
		    { 
			'username': username, 
			'password': password, 
			'appVersion': cryptomedic.version,
			'computerId': window.localStorage.cryptomedicComputerId
		    })
	    .then(json)
	    .then(this.extractCache);
	},
	'checkLogin': function() {
	    return getFetch(rest + "/auth/settings", null, 
		    { 
			'appVersion': cryptomedic.version,
			'computerId': window.localStorage.cryptomedicComputerId
		    }
	    )
	    .then(json)
	    .then(this.extractCache)
	},
	'logout': function() {
	    // TODO: clean up the cache --> cache managed in other object???
	    return getFetch(rest + "/auth/logout")
	    .then(this.json);
	},

	'sync': function() {
	    console.log("sync start");
	    mySendAction("sync");
	    console.log("sync end");
	},
	'reSync': function() {
	    mySendAction("reSync");
	},
	'getFolder': function(id) {
	    return new Promise(function(resolve, reject) {
        	    mySendAction("getFolder", id).then(function(data) {
        		console.log("receiving data", data);
        	    }, function(e) {
        		console.error("problem receiving data", e);
        	    });
	    });
	},

	// Temp function
	'extractCache': function(json) {
	    if (json._offline) {
		var offdata = jQuery.extend(true, {}, json._offline);
		delete json._offline;
		mySendAction("storeData", offdata);
	    }
	    return json;
	},
	'deleteAll': function() {
	    mySendAction("deleteAll");
	},	
	'getReport': function(reportName, data, timing) {
	    return getFetch(rest + "/reports/" + reportName + (timing ? "/" + timing : ""), null, data)
	    	.then(json)
	    	.then(this.extractCache);
	},
    };
})();

/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/

// TODO: use the new "queue" system
mainApp.factory('service_backend', [ '$rootScope', '$injector', function($rootScope, $injector) {
    var pcache = perishableCache(10);
    var rest = "/cryptomedic/rest/public/";
    
    // Transform the $http request into a promise
    function treatHttp(request) {
	var def = jQuery.Deferred();
	request.success(function(data, status, headers, config) {
	    def.resolve(data);
	}).error(function(data, status, headers, config) {
	    def.reject(data);
	});
	return def;
    }

    // TODO: migrate all these services to the new infrastructure
    return {
	/*******************************
	 * Data oriented services
	 */
// READONLY -> when sync is done, this is to be managed on the idb !!!
	'searchForPatients': function(params) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/folder", { 'params': params })).then(function(data) {
		var list = [];
		for(var i in data) {
		    list.push(new application.models.Patient(data[i]));
		}
		return list;
	    });
	},
	'checkReference': function(year, order) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.get(rest + "/reference/" + year + "/" + order)).then(function(data) {
			if ((typeof(data._type) != 'undefined') && (data._type == 'Folder')) {
			    return data['id'];
			} else {
			    return false;
			}
		});
	},

// READWRITE
	'createReference': function(year, order) {
	    var $http = $injector.get("$http");
	    return treatHttp($http.post(rest + "/reference", 
		{ 
			'entryyear': year, 
			'entryorder': order
		})).then(function(data) {
			pcache.set(data.getMainFile().id, data);
			return data;
		}); 
	},
	'createFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.post(rest + "/fiche/" + data['_type'], data)).then(function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'saveFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.put(rest + "/fiche/" + data['_type'] + "/" + data['id'], data)).then(function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'deleteFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http['delete'](rest + "/fiche/" + data['_type'] + "/" + data['id'])).then(function(data) {
		if (data instanceof application.models.Folder) {
		    pcache.set(data.getMainFile().id, data);
		}
		return data;				
	    });
	},
	'unlockFile': function(data, folderId) {
	    var $http = $injector.get("$http");
	    pcache.perish(folderId);
	    return treatHttp($http.get(rest + "/unfreeze/" + data['_type'] + "/" + data['id'])).then(function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	}
    };
}]);

// https://docs.angularjs.org/api/ng/service/$http
// http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
mainApp.factory('sessionInjector', [ '$q', '$injector', 'service_backend', '$rootScope', function($q, $injector, service_backend, $rootScope) {
    return {
	'responseError': function(rejection) {
	    switch(rejection.status) {
	    case 401: // Unauthorized
		$rootScope.$broadcast("backend_logged_out");
		break;		
	    default:
		console.warn(rejection);    
	    }
	    return $q.reject(rejection);
	},
    };
}]);

mainApp.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.defaults.transformResponse.push(function(responseData){
	if (typeof responseData !== "object") {
	    return responseData;
	}
	return objectify(responseData);
    });
    $httpProvider.defaults.transformRequest.unshift(function(requestData){
	if (typeof requestData !== "object") {
	    return requestData;
	}
	return stringify(requestData);
    });
    $httpProvider.interceptors.push('sessionInjector');
}]);
