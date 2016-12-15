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
          'original': 'codage'
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
      expect(div.querySelector('jh-codage')).not.toBeNull();
      expect(div.querySelector('jh-codage').$$('#translated').textContent).toEqual('codage');
      expect(div.querySelector('jh-codage').$$('#original')  .textContent).toEqual('original');
    }, done);
  });
});
