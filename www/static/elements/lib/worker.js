/* eslint-env worker */

console.log("Worker: start");

importScripts("../../../bower_components/dexie/dist/dexie.min.js");
importScripts("database.js");

/* global Database */
let db = new Database();

/* es-lint skip-next-line */
onmessage = function(event) {
  let data = event.data;
  console.log("Worker: received ", data);
  db.triageList(data.data, true)
    .then(() => {
      console.log("Worker: update cp");
      // Store the final checkpoint
      // in case the last line is also present in online, and thus pruned
      // by the optimization...

      return db.updateCheckpoint(data.checkpoint);
    })
    .then(() => {
      console.log("Worker: post message: remaining = ", data.remaining);
      postMessage({
        remaining: data.remaining
      });
    })
}
