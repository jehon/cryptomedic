'use strict';

describe('jh-codage', function() {
  let div;

  beforeEach(function() {
    console.log("before each");
    div = document.createElement("div");
    div.innerHTML = "<jh-codage value='original'></jh-codage>";
    // this._contentHolder = document.createElement("div");
    // this._contentHolder.innerHTML = "<jh-codage value='original'></jh-codage>";

    // document.body.appendChild(this._contentHolder);
    document.body.appendChild(div);
  });

  afterEach(function() {
    console.log("after each");
    // document.body.removeChild(this._contentHolder);
    document.body.removeChild(div);
  });

  it("Check component instantiation.", function(done) {
    // var self = this;

    // TestsHelper.execWhenReady(function() {
    //   return self._contentHolder.querySelector("jh-codage");
    // }, function(el) {
    console.log(div.querySelector('jh-codage'));
    expect(div.querySelector('jh-codage')).not.toBeNull();
    // expect(div.querySelector('jh-codage span#translated').text).toEqual('codage');
    // expect(div.querySelector('jh-codage span#original')  .text).toEqual('original');
    done();
    // }, done);
  });
});
