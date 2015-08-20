"use strict";

/* TODO: Queue principle
  - !! when connecting, a key is generated on the server
  	- we receive it inside the "settings"
  	- ?? if no connection is available, where to retreive it?
  - all changes are stored locally, in a "queue"
  	- the queue is signed with a key received from the server
  	- test it with simple changes (save-and-queue and unlock-and-queue?)
  	- a gui element show the queue status
  - when displaying data, the pending data is shown on screen
  	- could it be modified again?
  - when a connection is made, queue is sent to the server
  	- by url or in one entry point?
  	- server check the key
  	- a status is sent along with the queue
  	- optimistic locking is used
  	- positive feedback is received through the "sync" mechanism
  	- ?? quid on change already made in parallel?
  	
  - TODO: when receiving a message from the worker, first check if it is for us
        - lockFolder(id)?
        - send all messages + controller will see what to do?
 */

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

// TODO-URGENT: this is not a singleton, thus the worker is spanned a lot of times...

/* service_my_backend */
var service_my_backend = (function () {
//    var worker = new Worker("static/worker/worker.js?r=" + Math.random())
//    worker.onmessage = function(e) {
//        console.log('Message received from worker: ' + e.data.name);
//        console.log(e.data.data);
//    }
//
//    function post(name, data) {
//	worker.postMessage({ name: name, data: data });
//    }
//    post("ping", "hehehe");
    
    var rest = "/cryptomedic/rest/public";
    /**
     * Hold, for the current run, the first "remaining" -> idea of a progress
     */
    var thisSyncRemaining = 0;
    /** 
     * Manage the indexeddb
     */
    var db = new Dexie("cryptomedic");
    db.version(1).stores({
        patients: '++id',
    });

    db.version(2).stores({
	//  @see db.relations.where('[userId1+userId2]').equals([2,3]).or('[userId1+userId2]').equals([3,2]) - will give you all the relations that user 1 has to user 2 or user 2 has to user 1.
	patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
    })
    
    db.on('blocked', function () {
	console.error("DB is blocked");
    });
    
    
    // Create a bulk management
    db.Table.prototype.bulk = function(data, oninsert) {
	var self = this,
            creatingHook = this.hook.creating.fire;
        return this._idbstore("readwrite", function (resolve, reject, idbstore, trans) {
            var thisCtx = {};
            var prevPromise = Promise.resolve(); // initial Promise always resolves
            for (var key in data) {
        	prevPromise = prevPromise.then((function(key) {
        	    return new Promise(function(iresolve, ireject) {
        		var req;
        		if (data[key]['_deleted']) {
        		    req = idbstore.delete(key);
        		} else {
        		    req = idbstore.add(data[key]['record']);
        		}
        		req.onerror = function (e) {
        		    console.error(e.originalTarget);
        		    ireject(e);
        		};
        		req.onsuccess = function (ev) {
        		    if (oninsert) {
        			oninsert(data[key]);
        		    }
        		    iresolve();
        		};
        	    });
        	})(key));
            }
            prevPromise.then(function() { resolve(); }, function(e) { reject(e); });
        });
    };
    
    db.open();

    /**
     * Enqueue an action in the waiting queue, with additionnal data (encryption, timestamp, ...)
     * 
     * @param name: name of the action
     * @param data: the additionnal data
     * 
     * @caveat: not all service shall use this. Only "offline" services would go through this.
     */
    function enqueueAction(name, data) {
	request = {
		name: name,
        	created: new Date(),
		data: data,
        	username: "test",
        	hash: "123"
	};
	// TODO: enqueue + send queue in thread
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
	if (!localStorage.cryptomedicLastSync) {
	    localStorage.cryptomedicLastSync = false;
	}
	init.headers.append("Accept", "application/json, text/plain, */*");
	init.headers.append('X-OFFLINE-CP', localStorage.cryptomedicLastSync);
	init.headers.append('X-OFFLINE-N', 100);
	
	var req = new Request(url, init);
	return fetch(req).then(function(response) {
	    // Response: ok, status, statusText
	    if (!response.ok) {  
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
	'resync': function() {
	    localStorage.cryptomedicLastSync = "";
	    this.sync();
	},
	'reset': function() {
	    delete(localStorage.cryptomedicLastSync);
	    db.delete().then(function() {
		alert("Database is erased. Please reload the page.");
		window.location = "/cryptomedic";
	    });
	},
	'extractCache': function(json) {
	    if (json._offline) {
		var offdata = jQuery.extend(true, {}, json._offline);
		delete json._offline;
		if (thisSyncRemaining == 0 || !localStorage.cryptomedicLastSync || thisSyncRemaining < offdata["remaining"]) {
		    thisSyncRemaining = offdata["remaining"];
		    console.log("taking point: " + thisSyncRemaining);
		} else {
		    console.log("progress: " + (1 - (offdata["remaining"] / thisSyncRemaining)));
		}
		
		var lastSync = offdata._checkpoint;
		var promise = Promise.resolve();
		if (offdata.reset) {
		    promise = promise.then(function() { 
			console.log("resetting the patients");
			db.patients.clear(); 
		    });
		}
		promise = promise.then(function() {
		    db.patients.bulk(offdata.data, function(data) {
//			console.info(data);
		    }).then(function() {
//			console.log("after bulk insert (then)");
			localStorage.cryptomedicLastSync = offdata.checkpoint;
			myEvents.trigger("backend_cache_progress", { 
			    "checkpoint": offdata.checkpoint, 
			    "final": offdata.isfinal,
			    "total": thisSyncRemaining,
			    "remaining": offdata.remaining--
			});
			if (!offdata.isfinal) {
			    // relaunch the sync upto completion
			    setTimeout(function() {
				service_my_backend.sync();
			    }, 100);
			}
		    });
		});
	    }
	    return json;
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
	'getFolder': function(id) {
	    var $http = $injector.get("$http");
	    if (pcache.isCached(id)) {
		return jQuery.Deferred().resolve(pcache.get(id));
	    }
	    return treatHttp($http.get(rest + "/folder/" + id)).then(function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
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
        'request': function(config) {
           config.headers['X-OFFLINE-CP'] = localStorage.cryptomedicLastSync;
            return config;
        },
        'response': function(response) {
	    // Take away the "offline" data with the new service
            if (response.data[0] != "{") return response;
            var d = service_my_backend.extractCache(response.data);
            response.data = d;
            return response;
        },
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
    $httpProvider.interceptors.push('sessionInjector');
}]);
