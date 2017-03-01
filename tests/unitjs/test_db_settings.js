"use strict";

/* global Database */

describe("DB/Settings", function() {
  var db = new Database();
  it("should get/set settings", function(done) {
    var v = Math.random() * 1000;
    db.setSetting("test", v)
    .then(db.getSetting.bind(db, "test", "mydefaultvalue"))
    .then(function(res) {
      expect(res).toBe(v);
      done();
    });
  });

  it("should handle defaults values too", function(done) {
    db.getSetting("test-" + (new Date()).toISOString(), "mydefaultvalue")
      .then(function(val) {
        expect(val).toBe("mydefaultvalue");
        done();
      });
  });

  it("should be resetted by clear()", function(done) {
    db.setSetting("test", 12345)
      .then(db.clear)
      .then(db.getSetting.bind(db, "test", "mydefaultvalue"))
      .then(function(val) {
        expect(val).toBe("mydefaultvalue");
        done();
      });
  });

  it("should keep track of checkpoints", function(done) {
    db.updateCheckpoint("cp1000")
      .then(db.getSetting.bind(db, "checkpoint"))
      .then(function(val) {
        expect(val).toBe("cp1000");
        done();
      });
  });


  it("should keep track of new checkpoints only", function(done) {
    db.updateCheckpoint("cp1000")
      .then(db.updateCheckpoint.bind(db, "cp0100"))
      .then(db.updateCheckpoint.bind(db, "cp1100"))
      .then(db.getSetting.bind(db, "checkpoint"))
      .then(function(val) {
        expect(val).toBe("cp1100");
        done();
      });
  });

  it("should be reset'd by false", function(done) {
    db.updateCheckpoint("cp1000")
      .then(() => db.updateCheckpoint(false))
      .then(() => db.updateCheckpoint("cp0900"))
      .then(() => db.getCheckpoint())
      .then(function(val) {
        expect(val).toBe("cp0900");
        done();
      });
  });

});
