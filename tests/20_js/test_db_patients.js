import { buildRecord, loadMock } from 'thelpers';
import database from 'helpers/database';

describe('DB/Patients', function() {
  var db = database(true);
  var def = { record: { id: 123, test: true, mainFile: { entryyear: 2001, entryorder: 2323 }}};
  var def_deleted = { id: 456, _deleted: true };

  function checkFolder(id, entryyear, entryorder) {
    return db.getFolder(id)
      .then(function(data) {
        expect(data.id).toBe('' + id);
        return data;
      })
      .then(db.getByReference.bind(db, entryyear, entryorder))
      .then(function(data) {
        expect(data.id).toBe('' + id);
        return data;
      });
  }

  it('should store patient', function(done) {
    db.storeRecord(buildRecord(def))
      .then(function(data) {
        expect(data.id).toBe('123');
        expect(data.test).toBe(true);
      })
      .then(db.getFolder.bind(db, 123))
      .then(function(data) {
        expect(data.id).toBe('123');
        done();
      });
  });

  it('should delete patient', function(done) {
    db.storeRecord(def_deleted)
      .then(function(data) {
        expect(data).toBe('456');
      })
      .then(db.getFolder.bind(db, 456))
      .then(function(data) {
        // Unexpected!!!
        expect(true).toBe(false);
        done();
      }, function(data) {
        expect(true).toBe(true);
        done();
      });
  });

  it('should store and get patient by reference', function(done) {
    db.storeRecord(buildRecord(def))
      .then(function(data) {
        expect(data.id).toBe('123');
      })
      .then(db.getByReference.bind(db, 2001, 2323))
      .then(function(data) {
        expect(data.id).toBe('123');
        done();
      });
  });

  it('should fallback if reference does not exists', function(done) {
    db.getByReference(2999, 9999)
      .then(function(data) {
        // Unexpected!!!
        expect(true).toBe(false);
        done();
      }, function(data) {
        expect(true).toBe(true);
        done();
      });
  });

  it('should be able to store any patient', function(done) {
    // http://localhost/cryptomedic/api/v1.0/sync?cp=
    loadMock('mock_sync.json').then(function(json) {
      var p = db.clear();
      for(var i in json._offline.data) {
        p = p.then(db.storeRecord.bind(db, json._offline.data[i]));
      }
      p
        .then(checkFolder.bind(db, 7, 2001, 4))
        .then(checkFolder.bind(db, 3, 2014, 103))
        .then(checkFolder.bind(db, 4, 2014, 104))
        .then(checkFolder.bind(db, 1, 2000, 1))
        .then(checkFolder.bind(db, 6, 2001, 1))
        .then(checkFolder.bind(db, 5, 2014, 105))
        .then(checkFolder.bind(db, 2, 2014, 107))
        .then(done);
    });

  });

  it('insert in bulk', function(done) {
    // http://localhost/cryptomedic/api/v1.0/sync?cp=
    loadMock('mock_sync.json').then(function(json) {
      db.clear()
        .then(db.bulkUpdate.bind(db, json._offline.data))
        .then(checkFolder.bind(db, 7, 2001, 4), function() { console.error('euh'); })
        .then(checkFolder.bind(db, 3, 2014, 103))
        .then(checkFolder.bind(db, 4, 2014, 104))
        .then(checkFolder.bind(db, 1, 2000, 1))
        .then(checkFolder.bind(db, 6, 2001, 1))
        .then(checkFolder.bind(db, 5, 2014, 105))
        .then(checkFolder.bind(db, 2, 2014, 107))
        .then(done);
    });
  });
});
