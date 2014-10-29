'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('angularjs homepage', function() {
    browser.get('index.php');
    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Cryptomedic');
    });
    
    it('should automatically redirect to #/home', function() {
        expect(browser.getLocationAbsUrl()).toMatch("#/home");
    });

    it('should show the login element', function() {
        expect(element.all(by.id('loginForm')).count()).toEqual(1);
        expect(element(by.id('loginForm')).isDisplayed()).toEqual(true);
        expect(element(by.id('login_username')).isDisplayed()).toEqual(true);
        expect(element(by.id('login_password')).isDisplayed()).toEqual(true);
    });

    describe('Try to login', function() {
        element(by.id('login_username')).sendKeys("test");
        element(by.id('login_password')).sendKeys("test");
        element(by.id('login.go')).click();
        expect(element(by.id('login_error')).isDisplayed()).toEqual(true);
    });
});

describe('restore database', function() {
    browser.get("/rest/system/index.html");
    // element(by.id('login_username')).sendKeys('testadmin');
    // element(by.id('login_password')).sendKeys('testadmin');
    // element(by.id('login_submit')).click();
    
});

// describe('readonly mode', function() {  
//     beforeEach(function() {
//         browser.get('index.php');
//         element(by.id('login.username')).sendKeys("readonly");
//         element(by.id('login.password')).sendKeys("readonly");
//         element(by.id('login.go')).click();
//     });

//     it('allow readonly to log in', function() {
//         expect(element(by.id('login.logged.username')).getText()).toEqual("readonly");
//     });
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