'use strict';
/* global testWithComponent */

describe('test jh-codage', function() {
  it("Check component instantiation.", function(done) {
    window.cryptomedic = {
      serverSettings: {
        codes: {
          'original': 'codage'
        }
      }
    };

    testWithComponent("<jh-codage value='original'></jh-codage>", done, function(el, done) {
      expect(el.querySelector('jh-codage')).not.toBeNull();
      expect(el.querySelector('jh-codage').$$('#translated').textContent).toEqual('codage');
      expect(el.querySelector('jh-codage').$$('#original')  .textContent).toEqual('original');
      done();
    });
  });
});
