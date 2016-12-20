
// Shared database db object...

let Database = (function() {

  let db = false;

  return class Database {
    constructor() {
      if (!db) {
        // https://github.com/dfahlander/db.js/wiki/Version.stores()

        db = new Dexie('cryptomedic');

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
          trans.patients.toCollection().modify((p) => {
            if (typeof(p.id) == 'number') {
              delete this.value;
            }
            p.id = '' + p.id;
          });
        });

        db.version(6).stores({
          patients: '++id,[mainFile.entryyear+mainFile.entryorder]',
          settings: 'key'
        });

        db.version(7).stores({
          patients: '++id,[mainFile.entryyear+mainFile.entryorder]',
          settings: 'key',
          Patient:       'id,[entryyear+entryorder]',
          Appointment:   'id,patient_id,Date,Nextappointment,NextCenter,[Nextappointment+NextCenter]',
          Bill:          'id,patient_id,Date',
          ClubFoot:      'id,patient_id,Date',
          OtherConsult:  'id,patient_id,Date',
          Payment:       'id,bill_id,   Date',
          Picture:       'id,patient_id,Date',
          RicketConsult: 'id,patient_id,Date',
          Surgery:       'id,patient_id,Date',
        });

        // db.version(8).upgrade(function(trans) {
        //   trans.patients.toCollection().modify((p) => {

        //   });
        // });

        db.open();
      }

      // @See https://github.com/dfahlander/db.js/wiki/Table.mapToClass()
      if (typeof(Patient) != "undefined") {
        db.Patient      .mapToClass(Patient);
        db.Appointment  .mapToClass(Appointment);
        db.Bill         .mapToClass(Bill);
        db.ClubFoot     .mapToClass(ClubFoot);
        db.OtherConsult .mapToClass(OtherConsult);
        db.Payment      .mapToClass(Payment);
        db.Picture      .mapToClass(Picture);
        db.RicketConsult.mapToClass(RicketConsult);
        db.Surgery      .mapToClass(Surgery);
      }
    }

    // ------------------ Business functions v2 ------------------------------
    /**
     *
     * Store a record in the correct database
     *
     */
    storeInDB(type, record) {
      // console.log("storeInDB: ", type, record.id);
      return db[type].put(record);
    }

    deleteInDB(type, id) {
      // console.log("deleteInDB: ", type, id);
      return db[type].delete(id);
    }

    checkpointInDB(checkpoint = false) {
      if (checkpoint) {
        // console.log("checkpointInDB: ", checkpoint);
        if (localStorage.syncCheckpoint < checkpoint) {
          localStorage.syncCheckpoint = checkpoint;
        }
      }
      return checkpoint;
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
