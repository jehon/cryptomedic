"use strict";

describe("DB/Patients", function() {
  var db = build_db(true);
  var def = { record: { id: 123, test: true, mainFile: { entryyear: 2001, entryorder: 2323 }}};
  var def_deleted = { id: 456, _deleted: true };

  it("should store patient", function(done) {
    db.storeRecord(buildRecord(def))
      .then(function(data) {
        expect(data.id).toBe("123");
        expect(data.test).toBe(true);
      })
      .then(db.getFolder.bind(db, 123))
      .then(function(data) {
        expect(data.id).toBe("123")
        done();
      });
  });

  it("should delete patient", function(done) {
    db.storeRecord(def_deleted)
      .then(function(data) {
        expect(data).toBe("456");
      })
      .then(db.getFolder.bind(db, 456))
      .then(function(data) {
        // Unexpected!!!
        expect(false).toBe(true);
        done();
      }, function(data) {
        expect(true).toBe(true);
        done();
      });
  });

  it("should store and get patient by reference", function(done) {
    db.storeRecord(buildRecord(def))
      .then(function(data) {
        expect(data.id).toBe("123")
      })
      .then(db.getByReference.bind(db, 2001, 2323))
      .then(function(data) {
        expect(data.id).toBe("123")
        done();
      });
  });

  it("should fallback if reference does not exists", function(done) {
    db.getByReference(2999, 9999)
      .then(function(data) {
        expect(true).toBe(false);
        done();
      }, function(data) {
        expect(true).toBe(true);
        done();
      });
  });

  // it("should load correctly load_test.json and store it", function(done) {
  //   var data = new application.models.Data();
  //   data.loadFrom(rootMock + "/mock_load_test.json").done(function(data) {
  //     // expect(data.data1).toBe("data1");
  //     // expect(data.dataArray).toContain(1);
  //     // expect(data.dataArray).toContain(2);
  //     // expect(data.dataArray).toContain(3);
  //     // expect(data.dataArray).not.toContain(4);
  //     // expect(data.anything).toBeUndefined();
  //     done();
  //   });
  // });

});
