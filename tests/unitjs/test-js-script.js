'use strict';
/* global testComponent */

fdescribe('test-jh-script', function() {
  function getFn() {
    let res = `
        if (typeof(this.value) == 'undefined') { 
          this.value = 1;
        }
        this.value++;
      `;
    return res;
  }

  it("should run script", (done) => {
    testComponent(`<jh-script>${getFn()}</jh-script>`).then(el => {
      expect(el).not.toBeNull();
      expect(el.value).toBe(2);
      el.testDone();
      done();
    });
  });

  it("should handle disabled", (done) => {
    testComponent(`<jh-script disabled=1>${getFn()}</jh-script>`).then(el => {
      expect(el).not.toBeNull();
      expect(el.value).toBeUndefined();

      el.setAttribute("disabled", "false");
      expect(el.value).toBe(2);

      el.setAttribute("disabled", "true");
      expect(el.value).toBe(2);

      el.setAttribute("disabled", "false");
      expect(el.value).toBe(3);

      el.testDone();
      done();
    });
  });
});
