
import XLoginStatus from '../../app/elements/x-login-status.js';
import XRequestor from '../../app/elements/x-requestor.js';
import JHElement from '../../app/elements/jh-element.js';
import store, { ACT_USER_LOGOUT, ACT_USER_LOGIN } from '../../app/js/store.js';

import { webDescribe } from './athelpers.js';

describe('tests/unit/x-login-status-test.js', function () {
    const buildResponse = function (status = 200, json = {}) {
        const response = new Response(JSON.stringify(), {
            status: status,
        });
        response.asJson = json;
        return Promise.resolve(response);
    };

    const settingsRequest = buildResponse(200, {
        username: 'test'
    });

    const unauthorizedRequest = buildResponse(401);

    const testLoggedIn = function (element, username) {
        expect(element().hasAttribute('requesting')).toBeFalsy();
        expect(element().shadowRoot.querySelector('#logout').offsetHeight).toBeGreaterThan(0);
        expect(element().shadowRoot.querySelector('#user').innerHTML).toBe(username);
        expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
    };

    const testLoggedOut = function (element) {
        expect(element().hasAttribute('requesting')).toBeFalsy();
        expect(element().shadowRoot.querySelector('#logout').offsetHeight).toBe(0);
        expect(element().shadowRoot.querySelector('#user').innerHTML).toBe('');
        expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeTruthy();
    };

    describe('with spy "then"', function () {
        let nextRequest;
        beforeEach(function () {
            store.dispatch({ type: ACT_USER_LOGOUT });
            nextRequest = settingsRequest;
            spyOn(XRequestor.prototype, 'request').and.callFake(() => nextRequest);
        });

        describe('with logged in at initialization', function () {
            beforeEach(() => {
                nextRequest = settingsRequest;
            });

            webDescribe('*', {
                html: '<x-login-status></x-login-status>',
                setupTime: 100
            }, function (element) {
                describe('with interaction with the store', function () {
                    it('should be hidden when initialized simply', function () {
                        store.dispatch({ type: ACT_USER_LOGOUT });
                        testLoggedOut(element);
                    });

                    it('should show username when set', function () {
                        store.dispatch({ type: ACT_USER_LOGIN, payload: { username: 'test' } });
                        testLoggedIn(element, 'test');

                        store.dispatch({ type: ACT_USER_LOGOUT });
                        testLoggedOut(element);
                    });
                });

                describe('with logout', function () {
                    it('should logout when clicked', function () {
                        store.dispatch({ type: ACT_USER_LOGIN, payload: { username: 'test' } });
                        testLoggedIn(element, 'test');

                        // Logged out request
                        nextRequest = new Promise((resolve) => {
                            resolve(new Response(JSON.stringify(this.ref), {
                                status: 200,
                            }));
                        });

                        spyOn(XLoginStatus.prototype, 'doLogout');
                        JHElement.fireOn(element().shadowRoot.querySelector('#logout'), 'click');
                        expect(XLoginStatus.prototype.doLogout).toHaveBeenCalled();
                    });
                });
            });
        });

        describe('with logged out at initialization', function () {
            beforeEach(() => {
                nextRequest = unauthorizedRequest;
            });

            webDescribe('*', '<x-login-status></x-login-status>', function (element) {
                it('should be hidden when initialized simply', function () {
                    testLoggedOut(element);
                });

                it('should refuse incomplete login', function (done) {
                    nextRequest = buildResponse(401);

                    element().shadowRoot.querySelector('#username').value = 'test2';
                    JHElement.fireOn(element().shadowRoot.querySelector('#login'), 'click');

                    setTimeout(() => {
                        testLoggedOut(element);
                        done();
                    });
                });

                it('should refuse invalid login', function (done) {
                    nextRequest = buildResponse(404);

                    element().shadowRoot.querySelector('#username').value = 'test2';
                    element().shadowRoot.querySelector('#password').value = 'password2';
                    JHElement.fireOn(element().shadowRoot.querySelector('#login'), 'click');

                    setTimeout(() => {
                        testLoggedOut(element);
                        expect(element().shadowRoot.querySelector('x-form').shadowRoot.querySelector('.alert').innerText).toContain('Invalid');
                        done();
                    });
                });

                it('should react to other errors', function (done) {
                    nextRequest = buildResponse(500);

                    element().shadowRoot.querySelector('#username').value = 'test2';
                    element().shadowRoot.querySelector('#password').value = 'password2';
                    JHElement.fireOn(element().shadowRoot.querySelector('#login'), 'click');

                    setTimeout(() => {
                        testLoggedOut(element);
                        done();
                    });
                });

                it('should accept valid login', function (done) {
                    nextRequest = settingsRequest;

                    element().shadowRoot.querySelector('#username').value = 'test';
                    element().shadowRoot.querySelector('#password').value = 'password';
                    JHElement.fireOn(element().shadowRoot.querySelector('#login'), 'click');

                    setTimeout(() => {
                        testLoggedIn(element, 'test');
                        done();
                    });
                });
            });
        });
    });

    describe('with request throw', function () {
        webDescribe('*', '<x-login-status></x-login-status>', function (element) {
            it('should show an error', function (done) {
                spyOn(XRequestor.prototype, 'request').and.callFake(() => Promise.reject('500'));
                const p = element().doLoginCheck();
                // Avoid anoying message "uncatched error"
                p.catch(() => true);
                setTimeout(() => {
                    testLoggedOut(element);
                    done();
                });
            });
        });
    });
});
