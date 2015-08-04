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
function service_my_backend() {
    var rest = "/cryptomedic/rest/public";
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
     * Trigger a custom event
     * 
     * @param name: name of the event to be triggered
     * @param params: additionnal cusom parameters 
     * 
     */
    function triggerEvent(name, params) {
	document.dispatchEvent(new CustomEvent(name, { 'detail' : params}));	
    }
    
    /**
     * Launch a fetch request
     * 
     * - init Optional
     *  . method: The request method, e.g., GET, POST.
     *  . headers: Any headers you want to add to your request, contained within a Headers object or ByteString.
     *  . body: Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body.
     *  . mode: The mode you want to use for the request, e.g., cors, no-cors, or same-origin.
     *  . cache: The cache mode you want to use for the request: default, no-store, reload, no-cache, force-cache, or only-if-cached.
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
	if (!localStorage.lastSync) {
	    localStorage.lastSync = false;
	}
	init.headers.append("Accept", "application/json, text/plain, */*");
	init.headers.append('X-OFFLINE-CP', localStorage.lastSync);
	init.headers.append('X-OFFLINE-N', 50);
	
	var req = new Request(url, init);
	return fetch(req).then(function(response) {
	    // Response: ok, status, statusText
	    if (!response.ok) {  
		switch(response.status) {
		case 403: // forbidden
		    triggerEvent("backend_forbidden");
		    break;
		case 401: // unauthorized
		    triggerEvent("backend_unauthorized");
		    break;
		case 500: // internal server error
		    triggerEvent("backend_internal_server_error");
		    break;
		}
		throw new Error(response.status);
	    }
	    return response;
	});
    }

    function json(response) { 
	return response.json();
    }
    
    window.onbeforeunload = function (e) {
	db.close();
    };
    
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
	    .then(this.extractCache);
	},
	'checkLogin': function() {
	    return getFetch(rest + "/auth/settings", null, 
		    { 
			'appVersion': cryptomedic.version,
			'computerId': window.localStorage.computer_id
		    }
	    )
	    .then(json)
	    .then(this.extractCache);
	},
	'logout': function() {
	    // TODO: clean up the cache --> cache managed in other object???
	    return getFetch(rest + "/auth/logout")
	    .then(this.json);
	},
	/* Data Sync */
	'sync': function() {
	    return getFetch(rest + "/foldersync")
	    .then(json)
	    .then(this.extractCache)
	    .then(function(data) { return localStorage._final; });
	},
	'reset': function() {
	    delete(localStorage.lastSync);
	    db.delete().then(function() {
		alert("Database is erased. Please reload the page.");
		window.location = "/cryptomedic";
	    });
	},
	'extractCache': function(json) {
	    if (json._offline) {
		var lastSync = json._offline._checkpoint;
		var offdata = jQuery.extend(true, {}, json._offline);
		delete json._offline;
		var waitme = [];
		setTimeout(function() {
		    for (var key in offdata) {
			if (key === "_checkpoint" || key == "_final") {
			    continue;
			}
			if (offdata.hasOwnProperty(key)) {
			      waitme[key] = db.patients.put(offdata[key]);
			}
		    }
		    Promise.all(waitme).then(function() {
			// cache progress is triggered only when everything is saved
			// to follow the sync, follow the cache progress callback
			localStorage.lastSync = lastSync;
			triggerEvent("backend_cache_progress", { "checkpoint": offdata._checkpoint, "final": offdata._final });
			if (!offdata._final) {
			    // relaunch the sync upto completion
			    setTimeout(function() {
				service_my_backend().sync();
			    }, 1000);
			}
		    });
		});
	    }
	    return json;
	}
    };
};

/******* OLD INTERFACE **********/

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

    // TODO: migrate all these services to the new infrastructure
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
           config.headers['X-OFFLINE-CP'] = localStorage.lastSync;
            return config;
        },
        'response': function(response) {
	    // Take away the "offline" data with the new service
            if (response.data[0] != "{") return response;
            var d = service_my_backend().extractCache(response.data);
            response.data = d;
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
