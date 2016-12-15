'use strict';

describe('test jh-codage', function() {
  let div;

  beforeEach(function() {
    div = document.createElement("div");
    div.innerHTML = "<jh-codage value='original'></jh-codage>";
    document.body.appendChild(div);
    window.cryptomedic = {
      serverSettings: {
        codes: {
          'key': 'value'
        }
      }
    };
  });

  afterEach(function() {
    document.body.removeChild(div);
  });

  it("Check component instantiation.", function(done) {
    TestsHelper.execWhenReady(() => {
      return div.querySelector("jh-codage");
    }, (el)  => {
      console.log("let's test it", div.querySelector('jh-codage'));
      expect(div.querySelector('jh-codage')).not.toBeNull();
      console.log("expected 1");
      // expect(div.querySelector('jh-codage').$$('span#translated').text).toEqual('codage');
      console.log("expected ok");
    // expect(div.querySelector('jh-codage span#original')  .text).toEqual('original');
    }, done);
  });
});
