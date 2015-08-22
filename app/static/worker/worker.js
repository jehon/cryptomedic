/**
 * Phases: 
 *   ok- computer is authentified -> sync read-only (as of today)
 *   - same, but in worker
 *   - hook (ro) getFolder, checkReference
 *   - hook (ro) searchForPatients
 *   - hook (ro) reports
 *   - user are authentified -> no reload of page at beginning
 *   - queue changes
 * 
 * Interface:
 * postMessage({ name: '*', data: {}})
 * 
 * Available requests:
 *    userLogin		-> user settings
 *    userLogout	-> ok
 *    getFolder 	-> folder data
 *    folderCreate	-> ok/ko
 *    fileCreate 	-> ok/ko
 *    fileModify 	-> ok/ko
 *    fileDelete 	-> ok/ko
 *    
 * Sending messages:
 *    folderUpdated (folder data)
 *    conflict (conflict data)
 *    progress(sync status, queue length, etc...)
 * 
 * Questions:
 *    - how to log in a user? = subscribe on this computer OR check the password in the local database
 *    - how to log out a user? = forget from this computer
 *    - what happen if the computer key is "forgotten" ? (ex: erased from server)
 */

importScripts("../../bower_components/fetch/fetch.js");
importScripts("../../bower_components/dexie/dist/latest/Dexie.min.js");

function myPostMessage(name, data) {
    postMessage({ name: name, data: data });
}

function route(e) {
    console.log('Message received from main script');
    console.log(e.data);
    switch(e.data.name) {
    	case "ping": 
    	    return myPostMessage("pong", e.data.data);
	default:
	    return console.log("unkown message: " + e.data.name);
    }
}

console.log("worker");
// Worker
onmessage = route;

// Shared worker
//onconnect = function(e) {
//    // TODO: track all the ports
//    console.log("onconnect");
//    var port = e.ports[0];
//    port.onmessage = reply;
//    port.start();
//  }
