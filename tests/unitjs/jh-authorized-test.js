'use strict';

// TODO: remove fdescribe (focused)

describe('test-jh-authorized-raw', function() {
    beforeEach(() => {
      JHAuthorized.setAuthorizedList();
    })

    it("should manage the callback", function() {
        let res = null;
        JHAuthorized.addCallback((data) => { res = data });

        expect(res).toEqual([]);

        JHAuthorized.setAuthorizedList([ "a", "b" ]);
        expect(res).toEqual([ "a", "b" ]);
    })

  // it("should be empty at the beginning", function(done) {
  //   testComponent("<jh-authorized-raw value='secure'>securized content</jh-authorized-raw>").then(el => {
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).not.toBeNull();
  //     JHAuthorized.setAuthorizedList();
  //     ShadyDOM.flush();
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).toBeUndefined();
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should be enabled when setting the list", function(done) {
  //   testComponent("<jh-authorized-raw value='secure'><span>securized content</span></jh-authorized-raw>").then(el => {
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).not.toBeNull();
  //     JHAuthorized.setAuthorizedList();
  //     ShadyDOM.flush();
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).not.toBeNull();
  //     JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
  //     ShadyDOM.flush();
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).toBeUndefined();
  //     expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should be enabled when the list is setted before", function(done) {
  //   JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
  //   testComponent("<jh-authorized-raw value='secure'>securized content</jh-authorized-raw>").then(el => {
  //     ShadyDOM.flush();
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).toBeUndefined();
  //     expect(el.shadowRoot.querySelector('span#securized').innerHTML.trim()).toContain("securized");
  //     el.testDone();
  //     done();
  //   });
  // });

  // it("should work with inversed tests", function(done) {
  //   testComponent("<jh-authorized-raw inversed value='secure'>securized content</jh-authorized-raw>").then(el => {
  //     JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
  //     ShadyDOM.flush();
  //     expect(el.shadowRoot.querySelector('span#securized').attributes.hidden).not.toBeNull();
  //     el.testDone();
  //     done();
  //   });
  // });

  // // Test it manually only
  // // This test only work when used alone, but God knows why...
  // // it("should work inside angular", function(done) {
  // //   JHAuthorized.setAuthorizedList(["secure", "anything", "else"]);
  // //   ShadyDOM.flush();
  // //   let mydone = () => {};
  // //   angular
  // //     .module('ngauthorized', [])
  // //     .controller('ngauthorizedctrl', ['$scope', function($scope) {
  // //       $scope.test = function() {
  // //         console.log("test");
  // //         mydone();
  // //       }
  // //     }]);
  // //   testComponent(`<div ng-app='ngauthorized'><div ng-controller='ngauthorizedctrl'>
  // //       <jh-authorized-raw value='secure'>
  // //         <a id='click' ng-click='test()'>click test me</a>
  // //       </jh-authorized-raw>
  // //     </div></div>`)
  // //     .then(el => {
  // //       ShadyDOM.flush();
  // //       mydone = () => {
  // //         el.testDone();
  // //         done();
  // //       }
  // //       // setTimeout(() => {
  // //         el.querySelector("#click").click();
  // //       // }, 100);
  // //     });
  // // });
});
