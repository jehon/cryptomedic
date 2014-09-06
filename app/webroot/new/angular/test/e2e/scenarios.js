'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('angularjs homepage', function() {
  // beforeEach(function() {
  browser.get('index.php');
  // });
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Cryptomedic');
  });
  it('should automatically redirect to #/home', function() {
    expect(browser.getLocationAbsUrl()).toMatch("#/home");
  });
  it('should show the login element', function() {
    expect(element.all(by.id('loginForm')).count()).toEqual(1);
    expect(element(by.id('loginForm')).isDisplayed()).toEqual(true);
    expect(element(by.model('username')).isDisplayed()).toEqual(true);
    expect(element(by.model('password')).isDisplayed()).toEqual(true);
  });
});


describe('readonly mode', function() {
  browser.get('index.php');
  it('allow readonly to log in', function() {
    
  });
})
 

//   describe('view1', function() {

//     beforeEach(function() {
//       browser.get('index.html#/view1');
//     });


//     it('should render view1 when user navigates to /view1', function() {
//       expect(element.all(by.css('[ng-view] p')).first().getText()).
//         toMatch(/partial for view 1/);
//     });

//   });


//   describe('view2', function() {

//     beforeEach(function() {
//       browser.get('index.html#/view2');
//     });


//     it('should render view2 when user navigates to /view2', function() {
//       expect(element.all(by.css('[ng-view] p')).first().getText()).
//         toMatch(/partial for view 2/);
//     });

//   });
// });
/*
beforeEach(fn)

element(by).sendKeys()
element(by).click()
element(by).getText()
element().getAttribute()

by.model(ngmodel)
by.binding(variable)
by.id(id)

*/