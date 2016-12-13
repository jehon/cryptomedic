
// window.testComponent = function(tag) {

// }

window.TestsHelper = (function() {
  return {
    /**
     * This method provides a helper for executing test logic once a webcomponent is ready. It facilitates the
     * development of new unit tests which targets custom elements.
     */
    execWhenReady: function(compSelector, testLogic, done) {
      var interval = setInterval(function() {
        var comp = compSelector();

        // console.log(comp, comp.$$);
        if (!comp.$) {
          // console.log("NOT READY: ", comp, comp.$$);
          return;
        }

        console.log("READY");

        testLogic(comp);
        clearInterval(interval);
        console.log("READY TO DONE");
        done();
      }, 100);
    }
  }
})();
