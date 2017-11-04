'use strict';
/* global testComponent */

describe('x-read-test', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<x-read name='test'></x-read>").then(el => {
      el.testDone();
      done();
    });
  });


  it("should manage unknown type", function(done) {
    spyOn(console, "error").and.returnValue(null);

    testComponent(`<x-read name='test' type='anything'></x-read>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toContain("unknown");
      expect(console.error).toHaveBeenCalledTimes(1);

      el.testDone();
      done();
    });
  })


  it("should manage timestamp", function(done) {
    let date = new Date(Date.parse("2017-07-07 18:30:25.432"));
    testComponent(`<x-read name='test' type='timestamp' value='${date.toISOString()}'></x-read>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe(date.toLocaleDateString() + " " + date.toLocaleTimeString());

      el.setAttribute("value", "");
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe("");

      el.testDone();
      done();
    });

    // Invalid date
    testComponent(`<x-read name='test' type='timestamp' value='aaaa-13-01'></x-read>`).then(el => {
      expect(el.querySelector("span[name='test']")).not.toBeNull();
      expect(el.querySelector("span[name='test']").innerHTML).toBe("");

      el.testDone();
      done();
    });
  })

  it("should manage boolean", function(done) {
    testComponent("<x-read name='test' type='boolean' value='true'></x-read>").then(el => {
      expect(el.querySelector("x-read-boolean[value=true]")).not.toBeNull();
      expect(el.querySelector("x-read-boolean[value=false]")).toBeNull();

      el.setAttribute("value", "false");

      expect(el.querySelector("x-read-boolean[value=true]")).toBeNull();
      expect(el.querySelector("x-read-boolean[value=false]")).not.toBeNull();

      el.testDone();
      done();
    });
  });

  [ "list", "date", "numeric", "char", "text" ].forEach(type => {
    it(`should manage ${type}`, function(done) {
      testComponent(`<x-read name='test' type='${type}' value='hello'></x-read>`).then(el => {
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
