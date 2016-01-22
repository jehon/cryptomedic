"use strict";

function plog(p) {
  return p
    .then(function(data) {
      console.log(data);
    }, function(error) {
      console.error(error);
    });
}

// Dexie.Promise.on("error", function(e) {
//   console.error("Error in Dexie: ", e);
//   throw e;
// });

/**
 * Build up the db_patients service
 *
 * @param withVersions if true, upgrade the database
 * @returns a db_patients proxy
 */
function build_db(withVersions) {
  var db = new Dexie("cryptomedic");

  db.version(1).stores({
    patients: "++id"
  });

  db.version(2).stores({
    patients: "++id,[mainFile.entryyear+mainFile.entryorder]"
  });

  db.version(3).stores({
    patients: "++id"
  });

  db.version(4).stores({
    // @see
    // db.relations.where('[userId1+userId2]').equals([2,3]).or('[userId1+userId2]').equals([3,2])
    // - will give you all the relations that user 1 has to user 2 or user 2
    // has to user 1.
    patients: "++id,[mainFile.entryyear+mainFile.entryorder]"
  });

  db.version(5).upgrade(function(trans) {
    trans.patients.toCollection().modify(function(p) {
      if (typeof(p.id) == "number") {
        // console.log("deleting", p.id);
        delete this.value;
      }
      p.id = "" + p.id;
    });
  });

  db.version(6).stores({
    patients: "++id,[mainFile.entryyear+mainFile.entryorder]",
    settings: "key"
  });

  db.open();

  // ------------------ Business functions ------------------------------
  /**
   * Get the folder, with all the currently awaiting modifications applied
   */
  function getFolder(id) {
    return db.patients.get("" + id).then(function(data) {
      if (data) {
        return applyModificationsOn(data);
      } else {
        throw "I say, this patient is not found #" + id;
      }
    });
  }

  /**
   * Get the folder by the reference
   */
  function getByReference(entryyear, entryorder) {
    return db.patients.where("[mainFile.entryyear+mainFile.entryorder]").equals([""+entryyear, ""+entryorder]).toArray(function(data) {
      if (data && data.length == 1) {
        return applyModificationsOn(data[0]);
      } else {
        throw "I say, reference not found #" + entryyear + "." + entryorder;
      }
    });
  }

  function applyModificationsOn(folder) {
    return folder;
  }

  // ------------------ Enhanced functions ------------------------------
  function updateCheckpoint(cp) {
    var key = "checkpoint";
    if (cp === false) {
      return setSetting(key, "");
    } else if (cp == "") {
      return Promise.resolve("");
    } else {
      return getSetting(key, "").then(function(val) {
        if (!val || val < cp) {
          return setSetting(key, cp);
        } else {
          return val;
        }
      });
    }
  }

  function storeRecord(record) {
    var req;
    var data;
    if (record["_deleted"]) {
      req = db.patients.delete("" + record["id"]);
      data = "" + record["id"];
    } else {
      record["record"]["id"] += "";
      record["record"]["mainFile"]["entryyear"] += "";
      record["record"]["mainFile"]["entryorder"] += "";
      req = db.patients.put(record["record"]);
      data = record["record"];
    }
    req.then(function(data) {
      return updateCheckpoint(record["checkpoint"]);
    });
    // Fix the value in the "thenable" chain
    return req.then(function() {
      return data;
    });
  }

  /**
   * Insert data in bulk, in one transaction (faster than the simple insert)
   *
   * The checkpoint is automatically inserted into the settings table.
   *
   * @param bulk: array of object to be inserted if the bulk[].key = "_deleted",
   *                delete it otherwise, store bulk[].record into the store
               Come from (json.)_offline.data
   */
  function bulkUpdate(bulk, feedback) {
    var prevPromise = Promise.resolve(); // initial Promise always resolve
    for (var key in bulk) {
      prevPromise = prevPromise.then(
        (function(key) {
          return new Promise(function(iresolve, ireject) {
            storeRecord(bulk[key])
              .then(function (data) {
                if (feedback) {
                  feedback(data);
                }
                iresolve();
              }, function (e) {
                ireject(e);
              });
          });
        }
        )(key)
      );
    }
    return prevPromise;
  }

  // ------------------ System functions ------------------------------
  function getSetting(key, def) {
    return db.settings.get("" + key).then(function(data) {
      if (data) {
        return data.value;
      } else {
        def = def || false;
        return def;
      }
    });
  }

  function setSetting(key, value) {
    return db.settings.put({ key: "" + key, value: value})
      .then(function(data) {
        // Prefer to return the value than the key
        return value;
      });
  }

  function clear() {
    return db.patients.clear().then(function() {
      return db.settings.clear();
    });
  }

  function version() {
    return db.verno;
  }

  return {
    "getFolder": getFolder,
    "getByReference": getByReference,
    "storeRecord": storeRecord,
    "bulkUpdate": bulkUpdate,

    "updateCheckpoint": updateCheckpoint,
    "getSetting": getSetting,
    "setSetting": setSetting,
    "clear": clear,
    "version": version,
  };
}
