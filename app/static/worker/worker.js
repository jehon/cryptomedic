/*
 Phases: 
  - hook (ro) checkReference (what if not finish syncing ? -> go directly to server)
  - show conflicts (on folder update) -> simple reload page?
  - hook (ro) searchForPatients 
  - hook (ro) reports 
  - authenticate browser in server
  - authenticate user in browser
  - user are authentified -> no reload of page at beginning 
  - queue changes
  - show conflicts (rich version)
  - advanced reset (indexedDB reset completely)
 
 ** service -> worker (actions): 
  userLogin -> user settings 
  userLogout -> ok 
  getFolder -> folder data 
  folderCreate -> ok/ko 
  fileCreate -> ok/ko 
  fileModify -> ok/ko
  fileDelete -> ok/ko
  
 ** worker -> service (events): 
  -> progress({ sync status, queue length })
  -> folder(data) 
  -> conflict ({ updated: data, modified: data }) (conflict calculation is done in service)
  
 Questions: 
  - how to log in a user? = subscribe on this computer OR check the password in the local database 
  - how to log out a user? = forget from this computer 
  - what happen if the computer key is "forgotten" ? (ex: erased from server) -> reset it ?
 */


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

Dexie.Promise.on("error", function(e) {
    console.error("Error in Dexie: ", e);
});

db.on('blocked', function () {
	console.error("DB is blocked");
});

db.open();
//.then(function() { console.log("opened")}, function(e) { console.error("could not open", e); });

/**
 * Insert data in bulk, in one transaction (faster than the simple insert)
 * 
 * @param bulk: array of object to be inserted if the bulk[].key = "_deleted",
 *                delete it otherwise, store bulk[].record into the store
 */
//db.Table.prototype.bulk = function(bulk) {
//    var self = this;
//    return this._idbstore("readwrite", function (resolve, reject, idbstore) {
//	var thisCtx = {};
//        var prevPromise = Promise.resolve(); // initial Promise always
//						// resolves
//        for (var key in bulk) {
//            prevPromise = prevPromise.then((function(key) {
//        	return new Promise(function(iresolve, ireject) {
//        	    console.log("bulk key", key);
//        	    var req;
//        	    if (bulk[key]['_deleted']) {
//        		req = idbstore.delete(key);
//        	    } else {
//        		req = idbstore.put(bulk[key]['record']);
//        	    }
//        	    req.onerror = function (e) {
//        		ireject(e);
//        	    };
//        	    req.onsuccess = function (ev) {
//        		iresolve();
//        	    };
//        	    
//        	});
//            })(key));
//        }
//        console.log("bulk: end of promised")
//        prevPromise.then(function() { 
//            console.log("bulk; end of then");
//            resolve();
//        }, function(e) { 
//            console.error("bulk: error", e);
//            reject(e); 
//        });
//    });
//};
db.Table.prototype.bulk = function(bulk) {
    var self = this;
    var prevPromise = Promise.resolve(); // initial Promise always resolve
    for (var key in bulk) {
        prevPromise = prevPromise.then((function(key) {
        	return new Promise(function(iresolve, ireject) {
        	   var req;
        	   if (bulk[key]['_deleted']) {
        	       req = self.delete(key);
        	   } else {
        	       req = self.put(bulk[key]['record']);
        	   }
        	   req.then(function (e) {
        	       ireject(e);
        	   }, function (ev) {
        	       iresolve();
        	   });
        	});
        })(key));
    }
    return prevPromise;
};

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
    init = init || {};
    if (!init.method) {
	init.method = "GET";
    }
    if (!init.credentials) {
	init.credentials = "include";
    }

    if (data) {
	if (init.method == "GET") {
	    url = url + "?";
	    for(var a in data) {
		url = url + encodeURIComponent(a) + "=" + encodeURIComponent(data[a]) + "&";
	    }
	} else {
	    var fd = new FormData();
	    for(var a in data) {
		fd.append(a, data[a]);
	    }
	    init.body = fd;
	}
    }

    var req = new Request(url, init);
    return fetch(req).then(function(response) {
	// Response: ok, status, statusText
	if (!response.ok) {  
	    switch(response.status) {
		case 401: // unauthorized
		    mySendEvent("backend_unauthorized");
		    break;
	    	case 403: // forbidden
		    mySendEvent("backend_forbidden");
		    break;
		case 500: // internal server error
		    mySendEvent("backend_internal_server_error");
		    break;
	    }
	    return null;
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
function mySendEvent(name, data) {
    postMessage({ name: name, data: data });
}

var syncTimer = null;
var syncLock = false;
/**
 * Rearm the waiting queue
 * 
 * @param finished 
 * 	if finished, the cron will restart later than if not finished
 * @returns
 */
function setCron(finished) {
    finished = finished | false;
    if (syncTimer) {
	// Cancel currently running timer
	clearTimeout(syncTimer);
    }
    syncTimer = setTimeout(routeSync, (finished ? (60 * 1000) : (500)));
    syncLock = false;
}

/**
 * Store the data present in "offdata" into the indexedDB
 * @param offdata
 * @returns
 */
function doStoreData(offdata) {
    if (syncLock) {
	console.log("Worker: sync is locked");
	return;
    }
    syncLock = true;
    // TODO: rearm sync in all conditions
    if (syncTimer) {
	// Cancel currently running timer
	clearTimeout(syncTimer);
    }

    if (!offdata.remaining) {
	setCron(true);
	return mySendEvent("progress", { 
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
        	// relaunch the sync upto completion
        	setCron(offdata.isfinal);
        	syncLastCheckpoint = offdata.checkpoint;
        	mySendEvent("progress", { 
        	    "checkpoint": offdata.checkpoint, 
        	    "final": offdata.isfinal,
        	    "total": syncTotalToDo,
        	    "remaining": offdata.remaining - offdata.data.length
        	});
        	if (offdata.isfinal) {
        	    syncTotalToDo = 0;
        	}
            }, function(e) { 
        	// Catch error and display it
        	console.error("Error in bulk insert", e); 
        	throw e; 
            });
        });
    }
    return promise;
}

/*
 * 
 * Routing functions
 * 
 */
function routeSync(request) {
    if (request) {
	console.warn("sync with request", request);
    }
    
    try {
        return getFetch(rest + "/sync", {}, {
    		cp: syncLastCheckpoint 
        }).then(function(result) {
            if (result == null) {
        	console.log("unauthenticated?");
        	return;
            }
            return doStoreData(result._offline);
    	});
    } catch(e) {
	console.error("catched error in sync: ", e);
    }
}

function routeGetFolder(id) {
    // TODO if not final, then fallback to server
    db.patients.get("" + id).then(function(data) {
	mySendEvent("folder", data);
    });
}

function routeGetByReference(entryyear, entryorder) {
    // TODO if not final, then fallback to server
    db.patients.where("", {entryyear, entryorder}).then(function(data) {
	console.info(data);
    });
}

/*
 * Handle the routing
 */
function route(e) {
    var name = e.data.name;
    var data = e.data.data;
    console.log("@worker: " + name, data);
    switch(name) {
    	case "init":
    	    syncLastCheckpoint = data.checkpoint;
    	    routeSync();
    	    break;
    	case "storeData":
    	    return doStoreData(data);
    	case "sync":
    	    return routeSync();
    	case "reSync":
    	    syncLastCheckpoint = "";
    	    return routeSync();
    	case "getFolder":
    	    return routeGetFolder(data);
    	case "getByReference":
    	    return routeGetReference(data.entryyear, data.entryorder);
    	case "deleteAll":
    	    db.delete().then(function() {
    		console.log("done");
    	    }, function(e) {
    		console.error(e);
    	    });
    	    break;
    	default:
	    return console.error("unkown message: " + name, data);
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
