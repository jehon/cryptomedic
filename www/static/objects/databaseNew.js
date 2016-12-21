/* global Dexie */
/* exported DatabaseNew */

// Shared database db object...

let DatabaseNew = (function() {

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
      return db[type].put(record);
    }

    deleteInDB(type, id) {
      return db[type].delete(id);
    }

    checkpointInDB(checkpoint = false) {
      if (checkpoint) {
        if (localStorage.syncCheckpoint < checkpoint) {
          localStorage.syncCheckpoint = checkpoint;
        }
      }
      return checkpoint;
    }

  }
})();
