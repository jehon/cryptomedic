'use strict';
/* global testWithComponent */

describe('test jh-codage', function() {
  window.cryptomedic = {
    serverSettings: {
      codes: {
        'original': 'codage'
      }
    }
  };

  it("shouw work with the new system", function(done) {
    testComponent("<jh-codage value='original'></jh-codage>").then(el => {
      expect(el).not.toBeNull();
      expect(el.$$('#original')  .textContent).toEqual('original');
      expect(el.$$('#translating').attributes.hidden).toBeUndefined();
      expect(el.$$('#translated').textContent).toEqual('codage');
      done();
    });
  });

  testWithComponent("jh-codage", "<jh-codage value='original'></jh-codage>", function(el, done) {
    expect(el).not.toBeNull();
    expect(el.$$('#original')  .textContent).toEqual('original');
    expect(el.$$('#translating').attributes.hidden).toBeUndefined();
    expect(el.$$('#translated').textContent).toEqual('codage');
    done();
  });

  testWithComponent("jh-codage", "<jh-codage value='anything'></jh-codage>", function(el, done) {
    expect(el).not.toBeNull();
    expect(el.$$('#original')  .textContent).toEqual('anything');
    expect(el.$$('#translating').attributes.hidden).not.toBeNull();
    done();
  });
});
