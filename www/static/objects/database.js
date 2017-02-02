/* global Dexie */
/* global Patient, Appointment, Bill, ClubFoot, OtherConsult, Payment, Picture, RicketConsult, Surgery */
/* exported Database */

// Shared database db object...

let Database = (function() {

  let db = false;

  //************************************************************************************/
  //**** Generic helper functions
  function sortRecordByTimestamp(a, b) {
    // -1 => a come first
    if (a.checkpoint == b.checkpoint) {
      return 0;
    }
    if (!a.checkpoint) {
      return 1;
    }
    if (!b.checkpoint) {
      return -1;
    }
    if (a.checkpoint < b.checkpoint) {
      return -1
    }
    return 1;
  }

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
    getDB(type) {
      return db[type];
    }

    /**
     *
     * Store a list of records in the correct database
     *
     */
    triageList(list, withCheckpoint = true) {
      let finished = Promise.resolve();

      // Run around the offline data, but after all this, send back the ORIGINAL json for treatment...
      list.sort(sortRecordByTimestamp);

      for(let rec of list) {
        // Bind to keep the actual value of "rec"
        finished = finished.then(this.triageLine.bind(this, rec, withCheckpoint))
      }

      return finished;
    }

    /**
     *
     * Store a record in the correct database
     *
     */
    triageLine(line, withCheckpoint = true) {
      let finished = Promise.resolve();
      if (line.type == "Deleted") {
        finished = finished.then(() => this.deleteInDB(line.record.entity_type, line.record.entity_id));
      } else {
        finished = finished.then(() => this.storeInDB(line.type, line.record));
      }
      if (withCheckpoint) {
        finished = finished.then(() => this.checkpointInDB(line.checkpoint));
      }
      return finished;
    }

    storeInDB(type, record) {
      // Transform id to string, to unify the recuperation
      record.id = '' + record.id;
      if (record.patient_id) {
        record.patient_id = '' + record.patient_id;
      }
      if (record.bill_id) {
        record.bill_id = '' + record.bill_id;
      }
      return this.getDB(type).put(record);
    }

    deleteInDB(type, id) {
      return this.getDB(type).delete('' + id);
    }

    checkpointInDB(checkpoint = false) {
      if (checkpoint) {
        if (localStorage.syncCheckpoint < checkpoint) {
          localStorage.syncCheckpoint = checkpoint;
        }
      }
      return checkpoint;
    }

    getCheckpoint() {
      return localStorage.syncCheckpoint;
    }

    clear() {
      console.log("Resetting the database");
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
      ])
    }

    getFolder(type, id) {
      id =  '' + id;
      // Get everywhere... or get related???
      return this.getDB(type).get(id).then((mainFile) => {
        if (!mainFile) {
          throw type + " not found: " + id;
        }
        /* global Folder */
        let folder = new Folder();
        folder.setMainFile(mainFile);

        let subs = [];
        for(let k of Object.keys(mainFile.getRelated())) {
          subs.push(this.getDB(k).where(mainFile.getRelated()[k]).equals(id).toArray(list => { return list; }));
        }

        return Promise.all(subs)
        .then((byTable) => {
          let list = [].concat(...byTable);
          for(let line of list) {
            folder.addSubFile(line);
          }
          folder.sort();
          return folder;
        });
      })
    }

    getPatientByReference(year, order) {
      return db.Patient
        .where('[entryyear+entryorder]')
        .equals([ year, order ])
        .first()
        .then((patient) => {
          if (!patient) {
            throw "Not found";
          }
          return patient;
        });
    }

  }
})();
