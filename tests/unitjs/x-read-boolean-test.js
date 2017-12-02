'use strict';
/* global testComponent */

describe('x-read-boolean-test', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<x-read-boolean></x-read-boolean>").then(el => {
      el.testDone();
      done();
    });
  });

  it("should show false when no value is specified", function(done) {
    testComponent("<x-read-boolean></x-read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
      el.testDone();
      done();
    });
  });

  it("should show false when 'false' is specified", function(done) {
    testComponent("<x-read-boolean value='false'></x-read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
      el.testDone();
      done();
    });
  });

  it("should show false when invalid json data is given", function(done) {
    testComponent("<x-read-boolean value='{truc'></x-read-boolean>").then(el => {
      // Non empty string is ... "true"
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
      el.testDone();
      done();
    });
  });

  it("should show true only when attribute value=true is specified", function(done) {
    testComponent("<x-read-boolean value='true'></x-read-boolean>").then(el => {
      expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
      el.testDone();
      done();
    });
  });

  it("should update when value is changed", function(done) {
    testComponent("<x-read-boolean></x-read-boolean>").then(el => {
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
