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

  testWithComponent("jh-codage", "<jh-codage value='original'></jh-codage>", function(el, done) {
    // console.log("Running tests");
    expect(el).not.toBeNull();
    expect(el.$$('#translated').textContent).toEqual('codage');
    expect(el.$$('#original')  .textContent).toEqual('original');
    done();
  });
});
