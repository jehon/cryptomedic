/*
 Phases: 
  - show conflicts (on folder update) -> simple reload page?
  - authenticate browser in server
  - authenticate user in browser
  - user are authentified -> no reload of page at beginning 
  - queue changes
  - show conflicts (rich version)
  - advanced reset (indexedDB reset completely)
  - manage http error (timeout, etc...)
 
 ** service -> worker (actions): 
  init 		-> / (launch first sync) ==> temp?
  userLogin 	-> user settings 
  userLogout 	-> ok 
  
 ** worker -> service (events): 
  -> progress({ sync status, queue length })
  -> folderUpdate(data) 
  -> conflict ({ updated: data, modified: data }) (conflict calculation is done in service)
  
 Questions: 
  - how to log in a user? = subscribe on this computer OR check the password in the local database 
  - how to log out a user? = forget from this computer 
  - what happen if the computer key is "forgotten" ? (ex: erased from server) -> reset it ?

 Signing Queue principle
  - when connecting, a key is generated
  - all changes are stored locally, in a "queue"
  	- the queue is signed with a key received from the server
  	- test it with simple changes (save-and-queue and unlock-and-queue?)
  	- a gui element show the queue status
  - when displaying data, the pending data is shown on screen
  - when a connection is made, queue is sent to the server
  	- optimistic locking is used
  	- positive feedback is received through the "sync" mechanism
 */

importScripts("../../bower_components/fetch/fetch.js");
importScripts("../../bower_components/dexie/dist/latest/Dexie.min.js");
importScripts("../js/database.js");
importScripts("../js/myfetch.js");

var db = build_db();

/**
 * URL of the server
 */
var rest = "/cryptomedic/rest/public";

/**
 * How much remain to be synced
 */
var syncRemaining = 0;

/**
 * Timer of the next sync
 */
var syncTimer = null;

/**
 * SyncLock track if a sync is already running
 */
var syncLock = false;

/**
 * Reply to a call
 * 
 * @param name name of the message
 * @param data data associated with it
 */
function mySendEvent(name, data) {
    postMessage({ name: name, data: data });
}

/**
 * Store the data into the indexedDB (the _offdata record of the reply)
 * @param offdata
 * @returns
 */
function storeData(offdata) {
    var lastSync = offdata._checkpoint;
    var promise = Promise.resolve();
    if (offdata.reset) {
        promise = promise.then(function() { 
            console.info("Worker: resetting the database patients");
            return db.clear();
        });
    }
    if (offdata.data) {
        promise = promise.then(function() {
            return db.bulkUpdate(offdata.data, function(data) {
                mySendEvent("folder", data);
            }).then(function() {
        	// relaunch the sync upto completion
                syncRemaining = offdata.remaining;
                if (offdata.isfinal) {
                    syncRemaining = 0;
                }
                mySendEvent("progress", { 
                    "checkpoint": 	offdata.checkpoint, 
                    "isfinal": 		offdata.isfinal,
                    "remaining": 	parseInt(offdata.remaining),
                    "done":		parseInt(offdata.data.length)
                });
            }, function(e) { 
        	// Catch error and display it
                console.error("Error in bulk insert", e); 
                throw e; 
            });
        });
    }
    return promise;
}

var syncRunning = false;
function reprogram() {
    if (syncTimer) {
	// Cancel currently running timer
	clearTimeout(syncTimer);
    }
    // reprogram the timer...
    syncRunning = false;
    syncTimer = setTimeout(routeSync, (syncRemaining > 0 ? (500) : (60 * 1000)));
    return Promise.resolve();
}

function running() {
    // Cancel currently running timer
    if (syncTimer) {
	clearTimeout(syncTimer);
	syncTimer = false;
    }
    syncRunning = true;
    return Promise.resolve();
}

function routeStoreData(offdata) {
    running()
    	.then(function() { storeData(offdata); })
    	.then(reprogram, reprogram);
}

/*
 * 
 * Routing functions
 * 
 */
function routeSync() {
    running()
    	.then(function() {
    	    return db.getSetting("checkpoint")
    	})
    	.then(function(cp) {
    	    return myFetch(rest + "/sync", {}, {
    		cp: cp
    	    });
    	})
    	.then(function(result) {
            if (result == null) {
                console.warn("unauthenticated?");
                return;
            }
            return storeData(result._offline);
    	})
    	.then(reprogram, reprogram);
}

// Worker
onmessage = function(message) {
    var name = message.data.name;
    var data = message.data.data;
    
    switch(name) {
    case "init":
        return routeSync();
    case "storeData":
        return routeStoreData(data);
    case "sync":
        return routeSync();
    case "resync":
	db.updateCheckpoint(false);
	return routeSync();
    default:
        return console.error("unkown message: " + name, data);
    }
}

var catchAllCron = setInterval(function() {
    if (!syncTimer && !syncRunning) {
	console.info("Worker: catchAll reprogram");
	reprogram();
    }
}, 10 * 1000);
