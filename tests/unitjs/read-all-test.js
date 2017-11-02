'use strict';
/* global testComponent */

describe('test-read-all', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<read-all name='test'></read-all>").then(el => {
      el.testDone();
      done();
    });
  });


  it("should manage unknown type", function(done) {
    spyOn(console, "error").and.returnValue(null);

    testComponent(`<read-all name='test' type='anything'></read-all>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toContain("unknown");
      expect(console.error).toHaveBeenCalledTimes(1);

      el.testDone();
      done();
    });
  })


  it("should manage timestamp", function(done) {
    let date = new Date(Date.parse("2017-07-07 18:30:25.432"));
    testComponent(`<read-all name='test' type='timestamp' value='${date.toISOString()}'></read-all>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe(date.toLocaleDateString() + " " + date.toLocaleTimeString());

      el.setAttribute("value", "");
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe("");

      el.testDone();
      done();
    });

    // Invalid date
    testComponent(`<read-all name='test' type='timestamp' value='aaaa-13-01'></read-all>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe("");

      el.testDone();
      done();
    });
  })

  it("should manage boolean", function(done) {
    testComponent("<read-all name='test' type='boolean' value='true'></read-all>").then(el => {
      expect(el.querySelector("read-boolean[value=true]")).not.toBeNull();
      expect(el.querySelector("read-boolean[value=false]")).toBeNull();

      el.setAttribute("value", "false");

      expect(el.querySelector("read-boolean[value=true]")).toBeNull();
      expect(el.querySelector("read-boolean[value=false]")).not.toBeNull();

      el.testDone();
      done();
    });
  });

  [ "list", "date", "numeric", "char", "text" ].forEach(type => {
    it(`should manage ${type}`, function(done) {
      testComponent(`<read-all name='test' type='${type}' value='hello'></read-all>`).then(el => {
        expect(el.querySelector("span[name=test]")).not.toBeNull();
        expect(el.querySelector("span[name=test]").innerHTML).toBe("hello");

        el.setAttribute("value", "");

        let span = el.querySelector("span[name=test]");

        expect(span).not.toBeNull();
        expect(span.innerHTML).toBe("");

        el.testDone();
        done();
      });
    });

  })
});
