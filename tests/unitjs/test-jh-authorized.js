'use strict';
/* global testComponent */

// TODO: remove fdescribe (focused)

fdescribe('test-jh-authorized', function() {
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

  it("should be enabled when the list is setted before", function(done) {
    testComponent("<jh-authorized value='secure'>securized content</jh-authorized>").then(el => {
      JHAuthorized.setAuthorizedList([ "secure", "anything", "else" ]);
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
      el.testDone();
      done();
    });
  });

  it("should work with inversed tests", function(done) {
    testComponent("<jh-authorized inversed value='secure'>securized content</jh-authorized>").then(el => {
      JHAuthorized.setAuthorizedList([ "secure", "anything", "else" ]);
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).not.toContain("securized");
      el.testDone();
      done();
    });
  });
});
