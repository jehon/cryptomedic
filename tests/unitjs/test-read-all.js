'use strict';
/* global testComponent */

fdescribe('test-read-all', function() {
  // Test click on span for radio
  it("should be instantiated", function(done) {
    testComponent("<read-all name='test'></read-all>").then(el => {
      el.testDone();
      done();
    });
  });


  it("should manage unknown type", function(done) {
    testComponent(`<read-all name='test' type='anything'></read-all>`).then(el => {
      expect(el.shadowRoot.querySelector("span[name='test']")).not.toBeNull();
      expect(el.shadowRoot.querySelector("span[name='test']").innerHTML).toContain("unknown");
      el.testDone();
      done();
    });
  })


  it("should manage timestamp", function(done) {
    let date = new Date(Date.parse("2017-07-07 18:30:25.432"));
    testComponent(`<read-all name='test' type='timestamp' value='${date.toISOString()}'></read-all>`).then(el => {
      expect(el.shadowRoot.querySelector("span[name='test']")).not.toBeNull();
      expect(el.shadowRoot.querySelector("span[name='test']").innerHTML).toBe(date.toLocaleDateString() + " " + date.toLocaleTimeString());

      el.setAttribute("value", "");
      expect(el.shadowRoot.querySelector("span[name='test']")).not.toBeNull();
      expect(el.shadowRoot.querySelector("span[name='test']").innerHTML).toBe("");

      el.testDone();
      done();
    });
  })

  it("should manage boolean", function(done) {
    testComponent("<read-all name='test' type='boolean' value='true'></read-all>").then(el => {
      expect(el.shadowRoot.querySelector("read-boolean[value=true]")).not.toBeNull();
      expect(el.shadowRoot.querySelector("read-boolean[value=false]")).toBeNull();

      el.setAttribute("value", "false");

      expect(el.shadowRoot.querySelector("read-boolean[value=true]")).toBeNull();
      expect(el.shadowRoot.querySelector("read-boolean[value=false]")).not.toBeNull();

      el.testDone();
      done();
    });
  });

  // it("should show false when no value is specified", function(done) {
  //   testComponent("<read-all></read-all>").then(el => {
  //     expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should show false when invalid json data is given", function(done) {
  //   testComponent("<read-boolean value='{truc'></read-boolean>").then(el => {
  //     // Non empty string is ... "true"
  //     expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should show true only when attribute value=true is specified", function(done) {
  //   testComponent("<read-boolean value='true'></read-boolean>").then(el => {
  //     expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should update when value is changed", function(done) {
  //   testComponent("<read-boolean></read-boolean>").then(el => {
  //     expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-false.gif/i);
  //     el.setAttribute('value', 'true');
  //     setTimeout(() => {
  //       expect(el.shadowRoot.querySelector("img").getAttribute('src')).toMatch(/-true.gif/i);
  //       el.testDone();
  //       done();
  //     }, 10)
  //   });
  // });
});
