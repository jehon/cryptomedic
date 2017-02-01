/* global Database, buildRecord, Patient, Folder, loadMock */
describe('DB/Generic', function() {
  var db = new Database();
  var def = {
    record: { id: 123, test: true, entryyear: 2001, entryorder: 2323 },
    type: "Patient"
  };
  var def_deleted = { id: 456, type: "Deleted",
    record: { entity_type: 'Patient', entity_id:  123 }
  };

  function checkFolder(id, entryyear, entryorder) {
    return db.getFolder('Patient', id)
      .then(function(data) {
        expect(data[0].id).toBe('' + id);
        return data;
      })
      .then(() => { return db.getByReference(entryyear, entryorder); })
      .then(function(data) {
        expect(data[0].id).toBe('' + id);
        return data;
      })
      .catch((e) => {
        // console.error('It failed: ', e);
        return e;
      })
      ;
  }

  it('should store patient', function(done) {
    db.triageLine(Object.assign({}, def))
      .then(() => { return db.getFolder('Patient', 123); })
      .then(function(folder) {
        expect(folder instanceof Folder).toBeTruthy();
        expect(folder.getMainFile() instanceof Patient).toBeTruthy();
        expect(folder.getMainFile().id).toBe('' + 123);
        expect(folder.getMainFile().test).toBe(true);
        done();
      })
  });

  it('should delete patient', function(done) {
    db.triageLine(def_deleted)
      .then(() => { return db.getFolder('Patient', 456); })
      .then(function() {
        // Unexpected!!!
        done.fail("The patient should not be found");
      }, function() {
        expect(true).toBe(true);
        done();
      });
  });

  it('should store and get patient by reference', function(done) {
    db.triageLine(buildRecord(def))
      .then(() => db.getPatientByReference(2001, 2323))
      .then(function(patient) {
        expect(patient.id).toBe('' + 123);
        done();
      });
  });

  it('should fallback if reference does not exists', function(done) {
    db.getPatientByReference(2999, 9999)
      .then(function() {
        // Unexpected!!!
        done.fail("Received something while the patient does not exists.");
      }, function() {
        done();
      });
  });

  it('should be able to store any patient', function(done) {
    // http://localhost/cryptomedic/api/v1.1/sync?cp=
    loadMock('mock_sync').then(function(json) {
      var p = db.clear();
      p
        .then(() => { return db.triageList(json._offline.data, true); })
        .then(() => checkFolder(7, 2001, 4))
        .then(() => checkFolder(3, 2014, 103))
        .then(() => checkFolder(4, 2014, 104))
        .then(() => checkFolder(1, 2000, 1))
        .then(() => checkFolder(6, 2001, 1))
        .then(() => checkFolder(5, 2014, 105))
        .then(() => checkFolder(2, 2014, 107))
        .then(() => {
          return db.getFolder('Patient', 1)
            .then((folder) => {
              expect(folder.getSubFileByType('Appointment', 2)).not.toBeNull();
              expect(folder.getSubFileByType('Bill', 1)).not.toBeNull();
              expect(folder.getSubFileByType('Picture', 2)).not.toBeNull();
              expect(folder.getSubFileByType('OtherConsult', 1)).not.toBeNull();

              expect(folder.getSubFileByType('Appointment', 1)).toBeNull();
              expect(folder.getSubFileByType('Bill', 2)).toBeNull();
              expect(folder.getSubFileByType('Picture', 1)).toBeNull();
              expect(folder.getSubFileByType('OtherConsult', 2)).toBeNull();
            })
        })
        .then(done);
    });

  });
});
