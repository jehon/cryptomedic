
import '../../app/elements/panels/x-requestor.js';

import { fn, webDescribe } from './athelpers.js';
import JHElement from '../../app/elements/jh-element.js';
import { API_VERSION } from '../../app/config.js';

import axios from '../../app/cjs2esm/axios.js';
import MockAdapter from '../../app/cjs2esm/axios-mock-adapter.js';
import XRequestor, { requestAndFilterBuilder, loginRequestBuilder, loginCheckRequestBuilder } from '../../app/elements/panels/x-requestor.js';

const buildResponse = function (ok = true, status = 200, statusText = false) {
    return {
        response: {
            ok,
            status,
            statusText
        }
    };
};

export function mockNoResponse(cb = () => { }) {
    let result = {};
    spyOn(XRequestor.prototype, '_rawRequest').and.callFake((args) => new Promise((resolve, reject) => {
        result.args = args;
        result.resolve = resolve;
        result.reject = reject;
        return cb(result);
    }));
    return result;
}

export function mockResponseWithSuccess(data) {
    return mockNoResponse(result => result.resolve({
        status: 200,
        ok: true,
        data
    }));
}

export function mockResponseWithSuccessbutCode(code, data = {}) {
    const result = mockNoResponse(result => result.resolve({
        ok: false,
        status: code,
        statusCode: 'error ' + code,
        data
    }));
    return result;
}

export function mockResponseWithFailureCode(code, data = {}) {
    const result = mockNoResponse(result => result.reject({
        ok: false,
        status: code,
        statusCode: 'error ' + code,
        data
    }));
    return result;
}

describe(fn(import.meta.url), function () {
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
                        expect(response.data).toEqual(555);
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
                element().showFailure(buildResponse(false, 404, 'Not found'));
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeTruthy();
                expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Not found');
                expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('404');
            });

            it('should logout on 401 Response messages', function () {
                element().showFailure(buildResponse(false, 401, 'Unauthorized'));
                expect(element().shadowRoot.querySelector('#errorMsg').innerText).toContain('Unauthorized');
                expect(element().shadowRoot.querySelector('#errorContent').innerText).toContain('401');
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
                element().request(requestAndFilterBuilder({ url: '/absolute' }))
                    .then((response) => {
                        expect(response.data).toEqual(123456);
                        expect(response.ok).toBeTruthy();
                        expect(response.status).toBe(200);
                        done();
                    });
            });

            it('should resquestAndFilter with without treated', function (done) {
                element().request(requestAndFilterBuilder({ url: '/absolute' }, [404]));
                setTimeout(() => {
                    expect(element().isFailed()).toBeFalsy();
                    done();
                }, 100);
            });

            it('should resquestAndTreat with with treated', function (done) {
                element().request(requestAndFilterBuilder({ url: '/404' }, [404]));
                setTimeout(() => {
                    expect(element().isFailed()).toBeFalsy();
                    done();
                }, 100);
            });

            it('should resquestAndFilter with filter and have correct results', function (done) {
                element().request(requestAndFilterBuilder({ url: '/404' }, [404]))
                    .then((response) => {
                        expect(response.data).toEqual('Test: data is not found');
                        expect(response.ok).toBeFalsy();
                        expect(response.status).toBe(404);
                        done();
                    });
            });

            it('should resquestAndTreat with with treated', function (done) {
                element().request(requestAndFilterBuilder({ url: '/404' }, [401]));
                setTimeout(() => {
                    expect(element().isFailed()).toBeTruthy();
                    done();
                }, 100);
            });
        });

        describe('mocks', function () {
            it('should accept no response', async (done) => {
                const mock = mockNoResponse();
                const req = element().request({ url: '/anything' });
                expect(mock.args.url).toBe('/anything');
                expect(element().isBlocked()).toBeTruthy();
                req.then(
                    () => done.fail('should not be resolved'),
                    () => done.fail('should not be catched')
                );
                done();
            });

            it('should accept success', async () => {
                const mock = await mockResponseWithSuccess(123);
                const req = await element().request({ url: '/anything' });
                expect(mock.args.url).toBe('/anything');
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeFalsy();
                expect(element().isBlocked()).toBeFalsy();
            });

            it('should accept filtered success', async () => {
                const mock = await mockResponseWithSuccessbutCode(123);
                const req = await element().request({ url: '/anything' });
                expect(mock.args.url).toBe('/anything');
                expect(element().isRequesting()).toBeFalsy();
                expect(element().isFailed()).toBeFalsy();
                expect(element().isBlocked()).toBeFalsy();
            });

            it('should accept error', async (done) => {
                const mock = await mockResponseWithFailureCode(400);
                try {
                    const req = await element().request({ url: '/anything' });
                    done.fail('it should throw an error');
                } catch {
                    expect(mock.args.url).toBe('/anything');
                    expect(element().isRequesting()).toBeFalsy();
                    expect(element().isFailed()).toBeTruthy();
                    expect(element().isBlocked()).toBeTruthy();
                    done();
                }
            });
        });
    });

    describe("with builders", function () {
        it('loginRequestBuilder', function () {
            const bb = loginRequestBuilder('test', 'password');
            expect(bb.method).toBe('POST');
            expect(bb.url).toBe('auth/mylogin');
            expect(bb.data.username).toBe('test');
        });

        it('loginCheckRequestBuilder', function () {
            const bb = loginCheckRequestBuilder();
            expect(bb.url).toBe('auth/settings');
        });
    });
});

