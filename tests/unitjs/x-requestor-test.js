
import '../../app/elements/panels/x-requestor.js';

import { webDescribe } from './athelpers.js';
import JHElement from '../../app/elements/jh-element.js';
import { API_VERSION } from '../../app/config.js';
import store, { ACT_USER_LOGIN } from '../../app/js/store.js';

import axios from '../../app/cjs2esm/axios.js';
import MockAdapter from '../../app/cjs2esm/axios-mock-adapter.js';

describe('tests/unit/x-requestor-test.js', function () {
    var mock;

    beforeEach(function () {
        mock = new MockAdapter(axios);

        mock.onGet('/absolute').reply(200, 123456);
        mock.onGet('/401').reply(401, 'Test: data is forbidden');
        mock.onGet('/404').reply(404, 'Test: data is not found');
        mock.onGet(`/api/${API_VERSION}/relativeUrl`).reply(200, 34567);
        mock.onPut('/put').reply(200, 555);

        mock.onGet('/timeout').timeout();
        mock.onGet('/error').networkError();
        mock.onGet('/delayed').reply(function (_config) {
            return new Promise(function (resolve, _reject) {
                setTimeout(function () {
                    resolve([200, 12123]);
                }, 200);
            });
        });
    });

    afterEach(function () {
        mock.restore();
    });

    const buildErrorResponse = function (status = 200, message = false) {
        return {
            response: {
                status: status,
                statusText: message
            }
        };
    };

    webDescribe('initialized', '<x-requestor><div slot="content" style=\'width: 200px; height: 100px; background-color: red;\'>Content</div></x-requestor>', function (element) {
        const testRequest = function (opts, done) {
            return element()
                .request(opts)
                .catch(response => {
                    console.error(response);
                    done.fail(`in test: url not found '${opts.url}'`);
                    throw response;
                });
        };

        it('should be hidden when initialized simply', function () {
            expect(element().isBlocked()).toBeFalsy();
            expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
            expect(element().hasAttribute('running')).toBeFalsy();
            expect(element().isRequesting()).toBeFalsy();
            expect(element().isFailed()).toBeFalsy();
        });

        describe('should match URL', function () {
            it('should make an absolute request', function (done) {
                testRequest({ url: '/absolute' }, done)
                    .then(response => {
                        expect(response.data).toBe(123456);
                        done();
                    });
            });

            it('should make an absolute request with data', function (done) {
                testRequest({ url: '/absolute', data: { test: 1 } }, done)
                    .then(response => {
                        expect(response.data).toBe(123456);
                        done();
                    });
            });

            it('should make an relative request', function (done) {
                testRequest({ url: 'relativeUrl' }, done)
                    .then(response => {
                        expect(response.data).toBe(34567);
                        done();
                    });
            });
        });

        describe('with success', function () {
            it('should make a get request', function (done) {
                const promise = element().request({ url: '/delayed' });

                expect(element().isBlocked()).toBeTruthy();
                expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
                expect(element().hasAttribute('blocked')).toBeTruthy();
                expect(element().isRequesting()).toBeTruthy();
                expect(element().isFailed()).toBeFalsy();

                promise.then(() => {
                    expect(element().isBlocked()).toBeFalsy();
                    expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
                    expect(element().hasAttribute('running')).toBeFalsy();
                    expect(element().isRequesting()).toBeFalsy();
                    expect(element().isFailed()).toBeFalsy();
                    done();
                });
            });

            it('should make a put request', function (done) {
                testRequest({ url: '/put', data: { test: 1 }, method: 'PUT' }, done)
                    .then(response => {
                        expect(element().isBlocked()).toBeFalsy();
                        expect(element().shadowRoot.querySelector('x-overlay').isBlocked()).toBeFalsy();
                        expect(element().hasAttribute('running')).toBeFalsy();
                        expect(element().isRequesting()).toBeFalsy();
                        expect(element().isFailed()).toBeFalsy();
                        expect(response.asJson).toEqual(555);
                        done();
                    });
            });

            it('should display string messages when requested', function () {
                element().showFailure('Test message');
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeTruthy();
                expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Test message');
            });

            it('should close error messages with button', function () {
                element().showFailure('Test message');
                expect(element().isFailed()).toBeTruthy();
                JHElement.fireOn(element().shadowRoot.querySelector('#closeButton'), 'click');
                expect(element().isFailed()).toBeFalsy();
            });

            it('should display object messages when requested', function () {
                element().showFailure(buildErrorResponse(404, 'Not found'));
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeTruthy();
                expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Not found');
                expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('404');
            });

            it('should logout on 401 Response messages', function () {
                store.dispatch({ type: ACT_USER_LOGIN, payload: 'blabla' });
                expect(store.getState().user).toBe('blabla');
                element().showFailure(buildErrorResponse(401, 'Unauthorized'));
                expect(store.getState().user).toBeFalsy();
            });

            it('should display TypeError messages when requested', function () {
                element().showFailure({ request: { a: 1 } });
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeTruthy();
                expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Network Error');
                expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('Something went very wrong');
            });
        });

        it('should handle time-out requests', function (done) {
            element().request({ url: '/timeout', timeout: 0.001 })
                .then(() => {
                    done.fail('We should be in catch');
                })
                .catch(_error => {
                    expect(element().isBlocked()).toBeTruthy();
                    expect(element().isFailed()).toBeTruthy();
                    expect(element().isRequesting()).toBeFalsy();
                    expect(element().isFailed()).toBeTruthy();
                    done();
                });
        });

        describe('with general error', function () {
            it('should handle time-out requests', function (done) {
                element().request({ url: '/error' })
                    .then(() => {
                        done.fail('We should be in catch');
                    }, () => {
                        expect(element().isBlocked()).toBeTruthy();
                        expect(element().isRequesting()).toBeFalsy();
                        expect(element().isFailed()).toBeTruthy();
                        expect(element().hasAttribute('blocked')).toBeFalsy();
                        done();
                    });
            });
        });

        describe('with request and filter', function () {
            it('should resquestAndFilter with filter and have correct results', function (done) {
                element().requestAndFilter({ url: '/absolute' })
                    .then((response) => {
                        expect(response.data).toEqual(123456);
                        expect(response.ok).toBeTruthy();
                        expect(response.status).toBe(200);
                        done();
                    });
            });

            it('should resquestAndFilter with without treated', function (done) {
                element().requestAndFilter({ url: '/absolute' }, [404]);
                setTimeout(() => {
                    expect(element().isFailed()).toBeFalsy();
                    done();
                }, 100);
            });

            it('should resquestAndTreat with with treated', function (done) {
                element().requestAndFilter({ url: '/404' }, [404]);
                setTimeout(() => {
                    expect(element().isFailed()).toBeFalsy();
                    done();
                }, 100);
            });

            it('should resquestAndFilter with filter and have correct results', function (done) {
                element().requestAndFilter({ url: '/404' }, [404])
                    .then((response) => {
                        expect(response.data).toEqual('Test: data is not found');
                        expect(response.ok).toBeFalsy();
                        expect(response.status).toBe(404);
                        done();
                    });
            });
        });
    });
});
