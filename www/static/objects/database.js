
// Shared database Dexie object...

let Database = (function() {

  let dexie = false;

  return class Database {
    constructor() {
      if (!dexie) {
        dexie = new Dexie('cryptomedic');

        dexie.version(1).stores({
          patients: '++id'
        });

        dexie.version(2).stores({
          patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
        });

        dexie.version(3).stores({
          patients: '++id'
        });

        dexie.version(4).stores({
          // @see
          // dexie.relations.where('[userId1+userId2]').equals([2,3]).or('[userId1+userId2]').equals([3,2])
          // - will give you all the relations that user 1 has to user 2 or user 2
          // has to user 1.
          patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
        });

        dexie.version(5).upgrade(function(trans) {
          trans.patients.toCollection().modify((p) => {
            if (typeof(p.id) == 'number') {
              delete this.value;
            }
            p.id = '' + p.id;
          });
        });

        dexie.version(6).stores({
          patients: '++id,[mainFile.entryyear+mainFile.entryorder]',
          settings: 'key'
        });

        dexie.open();
      }
    }

    // ------------------ Business functions ------------------------------
    /**
     * Get the folder, with all the currently awaiting modifications applied
     */
    getFolder(id) {
      return dexie.patients.get('' + id).then((data) => {
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
      return dexie.patients.where('[mainFile.entryyear+mainFile.entryorder]').equals([''+entryyear, ''+entryorder]).toArray((data) => {
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
        req = dexie.patients.delete('' + record['id']);
        data = '' + record['id'];
      } else {
        record['record']['id'] += '';
        record['record']['mainFile']['entryyear'] += '';
        record['record']['mainFile']['entryorder'] += '';
        req = dexie.patients.put(record['record']);
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
    bulkUpdate(bulk, feedexieack) {
      var prevPromise = Promise.resolve(); // initial Promise always resolve
      for (var key in bulk) {
        prevPromise = prevPromise.then(
          () => {
            return new Promise((iresolve, ireject) => {
              this.storeRecord(bulk[key])
                .then(function (data) {
                  if (feedexieack) {
                    feedexieack(data);
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
      return dexie.settings.get('' + key).then((data) => {
        if (data) {
          return data.value;
        } else {
          def = def || false;
          return def;
        }
      });
    }

    setSetting(key, value) {
      return dexie.settings.put({ key: '' + key, value: value})
        .then(() => value);
    }

    clear() {
      return dexie.patients.clear().then(() => {
        return dexie.settings.clear();
      });
    }

    version() {
      return dexie.verno;
    }
  }
})();
