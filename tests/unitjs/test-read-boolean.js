'use strict';
/* global testComponent */

describe('test-read-boolean', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<read-boolean></read-boolean>").then(el => {
      el.testDone();
      done();
    });
  });

  it("should show false when no value is specified", function(done) {
    testComponent("<read-boolean></read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
      el.testDone();
      done();
    });
  });

  it("should show true only when attribute value=true is specified", function(done) {
    testComponent("<read-boolean value='true'></read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
      el.testDone();
      done();
    });
  });

  it("should update when value is changed", function(done) {
    testComponent("<read-boolean></read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
      el.setAttribute('value', 'true');
      setTimeout(() => {
        expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
        el.testDone();
        done();
      }, 10)
    });
  });
});
