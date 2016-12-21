/* global Dexie */
/* exported Database */

// Shared database db object...

let Database = (function() {

  let db = false;

  return class Database {
    constructor() {
      if (!db) {
        // https://github.com/dfahlander/db.js/wiki/Version.stores()

        db = new Dexie('cryptomedic');

        // Structure is managed in DatabaseNew.js

        db.open();
      }
    }

    // ------------------ Business functions ------------------------------
    /**
     * Get the folder, with all the currently awaiting modifications applied
     */
    getFolder(id) {
      return db.patients.get('' + id).then((data) => {
        if (data) {
          return this.applyModificationsOn(data);
        } else {
          throw 'I say, this patient is not found #' + id;
        }
      });
    }

    /**
     * Get the folder by the reference
     */
    getByReference(entryyear, entryorder) {
      return db.patients.where('[mainFile.entryyear+mainFile.entryorder]').equals([''+entryyear, ''+entryorder]).toArray((data) => {
        if (data && data.length == 1) {
          return this.applyModificationsOn(data[0]);
        } else {
          throw 'I say, reference not found #' + entryyear + '.' + entryorder;
        }
      });
    }

    applyModificationsOn(folder) {
      return folder;
    }

    // ------------------ Enhanced functions ------------------------------
    updateCheckpoint(cp) {
      var key = 'checkpoint';
      if (cp === false) {
        return this.setSetting(key, '');
      } else if (cp == '') {
        return Promise.resolve('');
      } else {
        return this.getSetting(key, '').then((val) => {
          if (!val || val < cp) {
            return this.setSetting(key, cp);
          } else {
            return val;
          }
        });
      }
    }

    storeRecord(record, doUpdateCheckpoint = true) {
      var req;
      var data;
      if (record['_deleted']) {
        req = db.patients.delete('' + record['id']);
        data = '' + record['id'];
      } else {
        record['record']['id'] += '';
        record['record']['mainFile']['entryyear'] += '';
        record['record']['mainFile']['entryorder'] += '';
        req = db.patients.put(record['record']);
        data = record['record'];
      }
      if (doUpdateCheckpoint) {
        req.then(() => this.updateCheckpoint(record['checkpoint']));
      }
      // Fix the value in the 'thenable' chain
      return req.then(() => data);
    }

    /**
     * Insert data in bulk, in one transaction (faster than the simple insert)
     *
     * The checkpoint is automatically inserted into the settings table.
     *
     * @param bulk: array of object to be inserted if the bulk[].key = '_deleted',
     *                delete it otherwise, store bulk[].record into the store
                 Come from (json.)_offline.data
     */
    bulkUpdate(bulk, feedback) {
      var prevPromise = Promise.resolve(); // initial Promise always resolve
      for (var key in bulk) {
        prevPromise = prevPromise.then(
          () => {
            return new Promise((iresolve, ireject) => {
              this.storeRecord(bulk[key])
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
        );
      }
      return prevPromise;
    }

    // ------------------ System functions ------------------------------
    getSetting(key, def) {
      return db.settings.get('' + key).then((data) => {
        if (data) {
          return data.value;
        } else {
          def = def || false;
          return def;
        }
      });
    }

    setSetting(key, value) {
      return db.settings.put({ key: '' + key, value: value})
        .then(() => value);
    }

    clear() {
      return db.patients.clear().then(() => {
        return db.settings.clear();
      });
    }

    version() {
      return db.verno;
    }
  }
})();
