/* global Database */
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
    return db.getFolder(id)
      .then(function(data) {
        expect(data.id).toBe('' + id);
        return data;
      })
      .then(() => { return db.getByReference(entryyear, entryorder); })
      .then(function(data) {
        expect(data.id).toBe('' + id);
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
      .then(() => { return db.getFolder(123); })
      .then(function(data) {
        expect(data[0] instanceof Patient).toBeTruthy();
        expect(data[0].id).toBe(123);
        expect(data[0].test).toBe(true);
        done();
      })
  });

  it('should delete patient', function(done) {
    db.triageLine(def_deleted)
      .then(() => { return db.getFolder(456); })
      .then(function(data) {
        // Unexpected!!!
        done.fail("The patient should not be found");
      }, function(data) {
        expect(true).toBe(true);
        done();
      });
  });

//   it('should store and get patient by reference', function(done) {
//     db.triageLine(buildRecord(def))
//       .then(function(data) {
//         expect(data.id).toBe('123');
//       })
//       .then(() => db.getByReference(2001, 2323))
//       .then(function(data) {
//         expect(data.id).toBe('123');
//         done();
//       });
//   });

//   // it('should fallback if reference does not exists', function(done) {
//   //   db.getByReference(2999, 9999)
//   //     .then(function() {
//   //       // Unexpected!!!
//   //       expect(true).toBe(false);
//   //       done();
//   //     }, function() {
//   //       expect(true).toBe(true);
//   //       done();
//   //     });
//   // });

//   it('should be able to store any patient', function(done) {
//     // http://localhost/cryptomedic/api/v1.0/sync?cp=
//     loadMock('mock_sync').then(function(json) {
//       var p = db.clear();
//       for(var i in json._offline.data) {
//         p = p.then(() => db.triageLine(json._offline.data[i]));
//       }
//       p
//         .then(() => checkFolder(7, 2001, 4))
//         .then(() => checkFolder(3, 2014, 103))
//         .then(() => checkFolder(4, 2014, 104))
//         .then(() => checkFolder(1, 2000, 1))
//         .then(() => checkFolder(6, 2001, 1))
//         .then(() => checkFolder(5, 2014, 105))
//         .then(() => checkFolder(2, 2014, 107))
//         .then(done);
//     });

//   });
});
