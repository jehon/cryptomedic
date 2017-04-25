'use strict';
/* global testComponent */

describe('test-jh-codage', function() {
  window.cryptomedic = {
    serverSettings: {
      codes: {
        'original': 'codage'
      }
    }
  };

  it("should translate correctly", function(done) {
    testComponent("<jh-codage value='original'></jh-codage>", el => typeof(el.$$) != "undefined").then(el => {
      expect(el).not.toBeNull();
      expect(el.$$('#original')   .textContent).toEqual('original');
      expect(el.$$('#translating').attributes.hidden).toBeUndefined();
      expect(el.$$('#translated') .textContent).toEqual('codage');
      el.testDone();
      done();
    });
  });

  it("should translate invalid codes", function(done) {
    testComponent("<jh-codage value='anything'></jh-codage>", el => typeof(el.$$) != "undefined").then(el => {
      expect(el).not.toBeNull();
      expect(el.$$('#original')  .textContent).toEqual('anything');
      expect(el.$$('#translating').attributes.hidden).not.toBeNull();
      el.testDone();
      done();
    });
  });
});
