/* global Dexie */
/* global Patient, Appointment, Bill, ClubFoot, OtherConsult, Payment, Picture, RicketConsult, Surgery */
/* exported Database */

// Shared database db object...

let Database = (function() {

  let db = false;

  return class Database {
    constructor() {
      if (!db) {
        // https://github.com/dfahlander/db.js/wiki/Version.stores()

        db = new Dexie('cryptomedic');

        // Old version history not important here anymore,
        // so let's skip it

        // Version 6 = latest from old system, so it is copied in old database.js file
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
    triageLine(line) {
      let finished = Promise.resolve();
      if (line.type == "Deleted") {
        finished = finished.then(() => this.deleteInDB(line.record.entity_type, line.record.entity_id));
      } else {
        finished = finished.then(() => this.storeInDB(line.type, line.record));
      }
      finished = finished.then(() => this.checkpointInDB(line.checkpoint));
      return finished;
    }

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

    clear() {
      return Promise.all([
        db.Patient.clear(),
        db.Appointment.clear(),
        db.Bill.clear(),
        db.ClubFoot.clear(),
        db.OtherConsult.clear(),
        db.Payment.clear(),
        db.Picture.clear(),
        db.RicketConsult.clear(),
        db.Surgery.clear()
      ]);
    }

  }
})();
