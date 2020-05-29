
import '../../app/elements/pages/x-login-form.js';

import { fn, webDescribe } from './athelpers.js';

import * as router from '../../app/js/router.js';
import { setSession, getUsername } from '../../app/js/session.js';

import { mockNoResponse, mockResponseWithSuccess, mockResponseWithSuccessbutCode } from './x-requestor-test.js';
import { mockFormSubmit } from './form-test.js';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        setSession();
        router.setRoute('/login/test');
    });

    webDescribe('initialized', '<x-login-form></x-login-form>', function (element) {
        let submitButton;
        beforeEach(() => {
            element().reset();
            submitButton = element().querySelector('#login');
        });

        it('should be initialized', function () {
            expect(element().querySelector('#login').offsetWidth).toBeGreaterThan(0);
        });

        it('should submit by click', function () {
            element(submitButton.click());
            expect(element().querySelector('x-messages').messagesCount).toBe(1);
            expect(element().querySelector('x-messages').messagesIds).toContain('empty');
        });

        it('should submit by enter', function () {
            // TODO: how to trigger "submit" event on form ?
            mockFormSubmit(element().querySelector('form'));
            // element().querySelector('form').submit();
            expect(element().querySelector('x-messages').messagesCount).toBe(1);
            expect(element().querySelector('x-messages').messagesIds).toContain('empty');
        });

        it('should refuse login when clicking on empty form', function () {
            expect(submitButton.offsetWidth).toBeGreaterThan(0);
            element(submitButton.click());
            expect(element().querySelector('x-messages').messagesCount).toBe(1);
            expect(element().querySelector('x-messages').messagesIds).toContain('empty');
        });

        describe('with user/password', function () {
            beforeEach(() => {
                element().querySelector('input[name="username"]').value = 'user';
                element().querySelector('input[name="password"]').value = 'pass';
            })

            it('should refuse if pending request is running', async function () {
                const mock = mockNoResponse();
                element(submitButton.click());
                await expectAsync(element().doLogin()).toBeResolvedTo(-1);
                mock.resolve();
            });

            it('should login when giving correct infos', async function () {
                mockResponseWithSuccess({ username: "test" });
                await expectAsync(element().doLogin()).toBeResolvedTo(true);
                expect(element().querySelector('x-messages').messagesCount).toBe(1);
                expect(element().querySelector('x-messages').messagesIds).toContain('success');
                expect(getUsername()).toBe('test');
            });

            it('should show a message when incorrect info are fill in', async function () {
                mockResponseWithSuccessbutCode(404);
                await expectAsync(element().doLogin()).toBeResolvedTo(2);
                expect(element().querySelector('x-messages').messagesCount).toBe(1);
                expect(element().querySelector('x-messages').messagesIds).toContain('cred');
            });
        });
    });

    describe("with loginCheck", function () {
        beforeEach(() => {
            mockResponseWithSuccess({ username: 'test' });
        });

        webDescribe('with session', "<x-login-form></x-login-form>", function (element) {
            it('should redirect on login exists', async function () {
                router.setRoute('/login/test');
                await element().doLoginCheck();
                expect(router.getCurrentRoute()).toBe('/test');
            });
        });
    });

    describe("with loginCheck", function () {
        beforeEach(() => {
            mockResponseWithSuccessbutCode(401);
        });

        webDescribe('with session', "<x-login-form></x-login-form>", function (element) {
            it('should show login form if no session is available', async function () {
                router.setRoute('/login/test');
                await element().doLoginCheck();
                expect(router.getCurrentRoute()).toBe('/login/test');
            });
        });
    });
});
