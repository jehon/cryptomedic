'use strict';
/* global testComponent */

describe('test-jh-authorized', function() {
  beforeEach(() => {
    JHAuthorized.setAuthorizedList();
  })

  it("should be empty at the beginning", function(done) {
    testComponent("<jh-authorized value='secure'>securized content</jh-authorized>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).not.toContain("securized");
      JHAuthorized.setAuthorizedList();
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).not.toContain("securized");
      el.testDone();
      done();
    });
  });

  it("should be enabled when setting the list", function(done) {
    testComponent("<jh-authorized value='secure'>securized content</jh-authorized>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).not.toContain("securized");
      JHAuthorized.setAuthorizedList([ "secure", "anything", "else" ]);
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
      el.testDone();
      done();
    });
  });

  // it("should translate invalid codes", function(done) {
  //   testComponent("<jh-codage value='anything'></jh-codage>").then(el => {
  //     expect(el).not.toBeNull();
  //     expect(el.$$('#original')  .textContent).toEqual('anything');
  //     expect(el.$$('#translating').attributes.hidden).not.toBeNull();
  //     el.testDone();
  //     done();
  //   });
  // });
});
