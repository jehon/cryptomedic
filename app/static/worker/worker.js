/*
 * Phases: 
 * ok- computer is authentified -> sync read-only (as of today) - same,
 * ok- but in worker 
 * - hook (ro) getFolder (= by entryyear/number? => adapt reports), checkReference (what if not finish syncing ? -> go directly to server)
 * - react to conflicts 
 * - hook (ro) searchForPatients 
 * - hook (ro) reports 
 * - user are authentified -> no reload of page at beginning 
 * - queue changes
 * - reset remotely
 *
 * Interface: postMessage({ name: '*', data: {}})
 * 
 * ** Available requests: 
 * userLogin -> user settings 
 * userLogout -> ok 
 * getFolder -> folder data 
 * folderCreate -> ok/ko 
 * fileCreate -> ok/ko 
 * fileModify -> ok/ko
 * fileDelete -> ok/ko
 * 
 * ** Sending messages: 
 * -> folderUpdated (folder data) 
 * -> conflict (conflict data)
 * -> progress(sync status, queue length, etc...)
 * 
 * Questions: 
 * - how to log in a user? = subscribe on this computer OR check the password in the local database 
 * - how to log out a user? = forget from this computer 
 * - what happen if the computer key is "forgotten" ? (ex: erased from server) -> reset it ?
 */

importScripts("../../bower_components/fetch/fetch.js");
importScripts("../../bower_components/dexie/dist/latest/Dexie.min.js");

/**
 * Hold the last checkpoint synced
 */
var syncLastCheckpoint = null;

/**
 * Hold, for the current run, the first "remaining" -> idea of a progress
 */
var syncTotalToDo = 0;

/**
 * URL of the server
 */
var rest = "/cryptomedic/rest/public";

/*
 * Manage the database
 */
var db = new Dexie("cryptomedic");

Dexie.Promise.on("error", function(e) {
    console.error("Error in Dexie: ", e);
});

db.version(1).stores({
    patients: '++id'
});

db.version(2).stores({
	patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
});

db.version(3).stores({
    patients: '++id'
});

db.version(4).stores({
	// @see
	// db.relations.where('[userId1+userId2]').equals([2,3]).or('[userId1+userId2]').equals([3,2])
	// - will give you all the relations that user 1 has to user 2 or user 2
	// has to user 1.
	patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
});

db.on('blocked', function () {
	console.error("DB is blocked");
});

/**
 * Insert data in bulk, in one transaction (faster than the simple insert)
 * 
 * @param bulk: array of object to be inserted if the bulk[].key = "_deleted",
 *                delete it otherwise, store bulk[].record into the store
 */
db.Table.prototype.bulk = function(bulk) {
    var self = this,
    creatingHook = this.hook.creating.fire;
    return this._idbstore("readwrite", function (resolve, reject, idbstore, trans) {
	var thisCtx = {};
        var prevPromise = Promise.resolve(); // initial Promise always
						// resolves
        for (var key in bulk) {
            prevPromise = prevPromise.then((function(key) {
        	return new Promise(function(iresolve, ireject) {
        	    var req;
        	    if (bulk[key]['_deleted']) {
        		req = idbstore.delete(key);
        	    } else {
        		req = idbstore.put(bulk[key]['record']);
        	    }
        	    req.onerror = function (e) {
        		ireject(e);
        	    };
        	    req.onsuccess = function (ev) {
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
    // TODO: jquery not in page
    init = init || {};
    if (!init.headers) {
	init.headers = new Headers();
    }
    if (!init.method) {
	init.method = "GET";
    }
    if (!init.credentials) {
	init.credentials = "include";
    }
//    init = Object.assign({
//    init = jQuery.extend({
//	headers: new Headers(),
//	method: "GET",
//	credentials: 'include'
//    }, init);
    if (data) {
	if (init.method == "GET") {
	    url = url + "?" + jQuery.param(data);
	} else {
	    var fd = new FormData();
	    for(var a in data) {
		fd.append(a, data[a]);
	    }
	    init.body = fd;
	}
    }

    init.headers.append("Accept", "application/json, text/plain, */*");
    init.headers.append('X-OFFLINE-CP', (syncLastCheckpoint ? syncLastCheckpoint : "false"));
	
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
	return response.json();
    });
}

/**
 * Reply to a call
 * 
 * @param name name of the message
 * @param data data associated with it
 */
function myPostMessage(name, data) {
    postMessage({ name: name, data: data });
}

/*
 * 
 * Routing functions
 * 
 */
var syncTimer = null;
function routeStoreData(offdata) {
    // TODO: rearm sync in all conditions
    if (syncTimer) {
	// Cancel currently running timer
	clearTimeout(syncTimer);
    }
    if (!offdata.remaining) {
	return myPostMessage("progress", { 
    		"checkpoint": syncLastCheckpoint, 
    		"final": 1,
    		"total": syncTotalToDo,
    		"remaining": 0
    	});
    }

    if (syncTotalToDo == 0 || !syncLastCheckpoint || syncLastCheckpoint < offdata["remaining"]) {
	syncTotalToDo = offdata["remaining"];
    }
	
    var lastSync = offdata._checkpoint;
    var promise = Promise.resolve();
    if (offdata.reset) {
	promise = promise.then(function() { 
	    console.log("resetting the database patients");
	    return db.patients.clear(); 
	});
    }
    if (offdata.data) {
        promise = promise.then(function() {
            return db.patients.bulk(offdata.data).then(function() {
        	syncLastCheckpoint = offdata.checkpoint;
        	myPostMessage("progress", { 
        	    "checkpoint": offdata.checkpoint, 
        	    "final": offdata.isfinal,
        	    "total": syncTotalToDo,
        	    "remaining": offdata.remaining - offdata.data.length
        	});
        	if (offdata.isfinal) {
        	    syncTotalToDo = 0;
        	}
        	// relaunch the sync upto completion
        	syncTimer = setTimeout(function() {
        	    routeSync();
        	}, (offdata.isfinal ? 60 * 1000 : 500));
            }, function(e) { 
        	// Catch error and display it
        	console.error("Error in bulk insert", e); 
        	throw e; 
            });
        });
    }
}

function routeSync() {
    return getFetch(rest + "/foldersync").then(function(result) {
	routeStoreData(result._offline);
    });
}

/*
 * Handle the routing
 */
function route(e) {
    console.log("-> worker: " + e.data.name, e.data.data);
    switch(e.data.name) {
    	case "init":
    	    syncLastCheckpoint = e.data.data.checkpoint;
    	    break;
    	case "storeData":
    	    return routeStoreData(e.data.data);
    	case "sync":
    	    return routeSync();
    	default:
	    return console.error("unkown message: " + e.data.name, e.data);
    }
}

// Worker
onmessage = route;

// Shared worker
// onconnect = function(e) {
// // TODO: track all the ports
// console.log("onconnect");
// var port = e.ports[0];
// port.onmessage = reply;
// port.start();
// }

//window.onbeforeunload = function (e) {
//db.close();
//};
