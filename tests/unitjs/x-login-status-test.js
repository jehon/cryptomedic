
import XLoginStatus from '../../app/elements/x-login-status.js';

import { webDescribe, fireOn } from './athelpers.js';
import { mockResponseWithSuccess } from './x-requestor-test.js';
import { setSession } from '../../app/js/session.js';

describe('tests/unit/x-login-status-test.js', function () {
    const testLoggedIn = function (element, username) {
        expect(element().hasAttribute('requesting')).toBeFalsy();
        expect(element().shadowRoot.querySelector('#logout').offsetHeight).toBeGreaterThan(0);
        expect(element().shadowRoot.querySelector('#user').innerHTML).toBe(username);
    };

    const testLoggedOut = function (element) {
        expect(element().hasAttribute('requesting')).toBeFalsy();
        expect(element().shadowRoot.querySelector('#logout').offsetHeight).toBe(0);
        expect(element().shadowRoot.querySelector('#user').innerHTML).toBe('');
    };

    describe('with logged in at initialization', function () {
        webDescribe('*', {
            html: '<x-login-status></x-login-status>',
            setupTime: 100
        }, function (element) {

            beforeEach(function () {
                setSession();
            });

            it('should be hidden when initialized simply', function () {
                testLoggedOut(element);
            });

            it('should show username only when set', function () {
                setSession({ username: 'test' });
                testLoggedIn(element, 'test');

                setSession();
                testLoggedOut(element);
            });

            describe('with logout', function () {
                it('should logout when clicked', function () {
                    setSession({ username: 'test' });
                    testLoggedIn(element, 'test');

                    // mock the logout request
                    mockResponseWithSuccess();

                    spyOn(XLoginStatus.prototype, 'doLogout');
                    fireOn(element().shadowRoot.querySelector('#logout'), 'click');
                    expect(XLoginStatus.prototype.doLogout).toHaveBeenCalled();
                });
            });
        });
    });
});
