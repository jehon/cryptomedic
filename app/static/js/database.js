"use strict";

function plog(p) {
  return p
    .then(function(data) {
      console.log(data);
    }, function(error) {
      console.error(error);
    });
}

Dexie.Promise.on("error", function(e) {
    console.error("Error in Dexie: ", e);
});

/**
 * Build up the db_patients service
 *
 * @param withVersions if true, upgrade the database
 * @returns a db_patients proxy
 */
function build_db(withVersions) {
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

    db.version(5).upgrade(function(trans) {
        trans.patients.toCollection().modify(function(p) {
        if (typeof(p.id) == "number") {
            console.log("deleting", p.id);
            delete this.value;
        }
        p.id = "" + p.id;
        });
    });

    db.version(6).stores({
        patients: '++id,[mainFile.entryyear+mainFile.entryorder]',
        settings: 'key'
    });

    db.open();

    // ------------------ Business functions ------------------------------
    /**
     * Get the folder, with all the currently awaiting modifications applied
     */
    function getFolder(id) {
        return db.patients.get("" + id).then(function(data) {
            if (data) {
            return data;
            } else {
            throw "I say, patient not found";
            }
        });
    }

    /**
     * Get the folder by the reference
     */
    function getByReference(entryyear, entryorder) {
        return db.patients.where("[mainFile.entryyear+mainFile.entryorder]").equals([""+entryyear, ""+entryorder]).toArray(function(data) {
            if (data.length == 1) {
            return getFolder(data[0]['id']);
            } else {
            throw "I say, reference not found";
            }
        });
    }

  // ------------------ Enhanced functions ------------------------------
  function updateCheckpoint(cp) {
    var key = "checkpoint";
    //console.log("updateCheckpoint", cp);
    if (cp == "") {
      return Promise.resolve("");
    }
    if (cp === false) {
      console.log("DB: resetting CP");
      return setSetting(key, "");
    } else {
      return getSetting(key, "").then(function(val) {
        if (!val || val < cp) {
          console.log("Changing checkpoint: ", cp);
          return setSetting(key, cp);
        } else {
          console.log("Not changing checkpoint: ", cp, val);
          return val;
        }
      })
    }
  }

    /**
     * Insert data in bulk, in one transaction (faster than the simple insert)
     *
     * The checkpoint is automatically inserted into the settings table.
     *
     * @param bulk: array of object to be inserted if the bulk[].key = "_deleted",
     *                delete it otherwise, store bulk[].record into the store
     */
    function bulkUpdate(bulk, feedback) {
        var prevPromise = Promise.resolve(); // initial Promise always resolve
        for (var key in bulk) {
            prevPromise = prevPromise.then((function(key) {
                return new Promise(function(iresolve, ireject) {
                    var req;
                    if (bulk[key]['_deleted']) {
                       req = db.patients.delete("" + key);
                    } else {
                       bulk[key]['record']['id'] = "" + bulk[key]['record']['id'];
                       req = db.patients.put(bulk[key]['record']);
                    }
                    req.then(function() {
                       return updateCheckpoint(bulk[key]['checkpoint']);
                    });
                    req.then(function (e) {
                       if (feedback) {
                       feedback(bulk[key]['record']);
                       }
                       iresolve();
                    }, function (ev) {
                       ireject(e);
                    });
                });
            })(key));
        }
        return prevPromise;
    };

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
        'getFolder': getFolder,
        'getByReference': getByReference,
        'bulkUpdate': bulkUpdate,
        'updateCheckpoint': updateCheckpoint,

        'getSetting': getSetting,
        'setSetting': setSetting,
        'clear': clear,
        'version': version,
    };
};
