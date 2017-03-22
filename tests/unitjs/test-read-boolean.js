'use strict';
/* global testComponent */

describe('test-read-boolean', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<read-boolean></read-boolean>").then(el => {
      el.testDone();
      done();
    });
  })
});
