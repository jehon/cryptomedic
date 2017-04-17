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
      expect(el.shadowRoot.querySelector('span#securized')).toBeNull();
      JHAuthorized.setAuthorizedList();
      expect(el.shadowRoot.querySelector('span#securized')).toBeNull();
      el.testDone();
      done();
    });
  });

  it("should be enabled when setting the list", function(done) {
    testComponent("<jh-authorized value='secure'><span>securized content</span></jh-authorized>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelector('span#securized')).toBeNull();
      JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
      ShadyDOM.flush();
      expect(el.shadowRoot.querySelector('span#securized')).not.toBeNull();
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
      el.testDone();
      done();
    });
  });

  it("should be enabled when the list is setted before", function(done) {
    JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
    testComponent("<jh-authorized value='secure'>securized content</jh-authorized>").then(el => {
      ShadyDOM.flush();
      expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
      el.testDone();
      done();
    });
  });

  it("should work with inversed tests", function(done) {
    testComponent("<jh-authorized inversed value='secure'>securized content</jh-authorized>").then(el => {
      JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
      ShadyDOM.flush();
      expect(el.shadowRoot.querySelector('span#securized')).toBeNull();
      el.testDone();
      done();
    });
  });

  fit("should work inside angular", function(done) {
    JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
    let mydone = () => {};
    angular
      .module('ngauthorized', [])
      .controller('ngauthorizedctrl', ['$scope', function($scope) {
        $scope.test = function() {
          console.log("test");
          mydone();
        }
      }]);
    testComponent(`<div ng-app='ngauthorized'><div ng-controller='ngauthorizedctrl'>
        <jh-authorized value='secure'>
          <a id='click' ng-click='test()'>click test me</a>
        </jh-authorized>
      </div></div>`)
      .then(el => {
        ShadyDOM.flush();
        mydone = () => {
          el.testDone();
          done();
        }
        // setTimeout(() => {
          el.querySelector("#click").click();
        // }, 100);
      });
  });
});
