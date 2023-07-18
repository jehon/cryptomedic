import { fn } from "./athelpers.js";

import XRequestor, {
  requestAndFilterBuilder,
  ServerRequestError,
  TransportRequestError
} from "../../../legacy/app-old/v2/widgets/func/x-requestor.js";

import axios from "../../../legacy/built/axios.js";
import MockAdapter from "../../../legacy/built/axios-mock-adapter.js";
import { getSession } from "../../../legacy/app-old/v2/js/session.js";
import {
  loginCheckRequestBuilder,
  loginRequestBuilder
} from "../../../legacy/app-old/v2/widgets/func/requests-authenticator.js";

const buildResponse = function (ok = true, status = 200, statusText = "") {
  return {
    ok,
    status,
    statusText
  };
};

/**
 * @param cb
 */
export function mockNoResponse(cb = (_result) => ({})) {
  let result = {};

  if (!("calls" in XRequestor.prototype._rawRequest)) {
    /* eslint-disable-next-line jasmine/no-unsafe-spy */
    spyOn(XRequestor.prototype, "_rawRequest");
  }

  /** @type {jasmine.Spy} */ (XRequestor.prototype._rawRequest).and.callFake(
    (args) =>
      new Promise((resolve, reject) => {
        result.args = args;
        result.resolve = (data = {}) =>
          resolve({
            ok: true,
            status: 200,
            data,
            ...data
          });
        result.reject = (data = {}) =>
          reject(
            new ServerRequestError({
              ok: false,
              status: 404,
              statusCode: "default error",
              data,
              ...data
            })
          );
        return cb(result);
      })
  );
  return result;
}

/**
 * @param {object} data to be set
 * @param {number?} status to be set
 */
export function mockResponseWithSuccess(data, status = 200) {
  return mockNoResponse((result) =>
    result.resolve({
      status,
      ok: true,
      data
    })
  );
}

/**
 * @param code
 * @param data
 */
export function mockResponseWithFailureCode(code, data = {}) {
  const result = mockNoResponse((result) =>
    result.reject({
      ok: false,
      status: code,
      statusCode: "error " + code,
      data
    })
  );
  return result;
}

describe(fn(import.meta.url), function () {
  var mock;

  beforeEach(function () {
    mock = new MockAdapter(axios);

    mock.onGet("/absolute").reply(200, 123456);
    mock.onGet("/401").reply(401, "Test: data is forbidden");
    mock.onGet("/404").reply(404, "Test: data is not found");
    mock.onGet("/api/relativeUrl").reply(200, 34567);
    mock.onPut("/put").reply(200, 555);

    mock.onGet("/timeout").timeout();
    mock.onGet("/error").networkError();
    mock.onGet("/delayed").reply(function (_config) {
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

  describe("initialize", function () {
    let element;
    beforeEach(() => {
      element = new XRequestor();
      element.innerHTML =
        "<div slot=\"content\" style='width: 200px; height: 100px; background-color: red;'>Content</div>";
    });

    const testRequest = function (opts, done) {
      return element.request(opts).catch((response) => {
        console.error(response);
        done.fail(`in test: url not found '${opts.url}'`);
        throw response;
      });
    };

    it("should be hidden when initialized simply", function () {
      expect(element.isBlocked()).toBeFalsy();
      expect(element.hasAttribute("running")).toBeFalsy();
      expect(element.isRequesting()).toBeFalsy();
      expect(element.isFailed()).toBeFalsy();
    });

    describe("should match URL", function () {
      it("should make an absolute request", function (done) {
        testRequest({ url: "/absolute" }, done)
          .then((response) => {
            expect(response.data).toBe(123456);
            done();
          })
          .catch(done.fail);
      });

      it("should make an absolute request with data", function (done) {
        testRequest({ url: "/absolute", data: { test: 1 } }, done)
          .then((response) => {
            expect(response.data).toBe(123456);
            done();
          })
          .catch(done.fail);
      });

      it("should make an relative request", function (done) {
        testRequest({ url: "relativeUrl" }, done)
          .then((response) => {
            expect(response.data).toBe(34567);
            done();
          })
          .catch(done.fail);
      });
    });

    describe("with success", function () {
      it("should make a get request", function (done) {
        const promise = element.request({ url: "/delayed" });

        expect(element.isBlocked()).toBeTrue();
        expect(element.isRequesting()).toBeTrue();
        expect(element.isFailed()).toBeFalse();

        promise
          .then(() => {
            expect(element.isBlocked()).toBeFalsy();
            expect(element.hasAttribute("running")).toBeFalsy();
            expect(element.isRequesting()).toBeFalsy();
            expect(element.isFailed()).toBeFalsy();
            done();
          })
          .catch(done.fail);
      });

      it("should make a put request", function (done) {
        testRequest({ url: "/put", data: { test: 1 }, method: "PUT" }, done)
          .then((response) => {
            expect(element.isBlocked()).toBeFalsy();
            expect(element.hasAttribute("running")).toBeFalsy();
            expect(element.isRequesting()).toBeFalsy();
            expect(element.isFailed()).toBeFalsy();
            expect(response.data).toEqual(555);
            done();
          })
          .catch(done.fail);
      });

      xit("should close error messages with button", async function () {
        element.showFailure(new TransportRequestError({}));

        expect(element.isFailed()).toBeTruthy();
        document.querySelector("x-overlay.acknowledge x-button").click();

        expect(element.isFailed()).toBeFalsy();
      });

      xit("should display TransportRequestError messages when requested", function () {
        element.showFailure(new TransportRequestError({}));

        expect(element.isRequesting()).toBeFalsy();
        expect(element.isFailed()).toBeTruthy();
        // expect(element.querySelector('#errorMsg').innerText).toContain('Network Error');
      });

      xit("should display object messages when requested", function () {
        element.showFailure(
          new ServerRequestError(buildResponse(false, 404, "Not found"))
        );

        expect(element.isRequesting()).toBeFalsy();
        expect(element.isFailed()).toBeTruthy();
        // expect(element.querySelector('#errorMsg').innerText).toContain('Not found');
        // expect(element.querySelector('#errorContent').innerText).toContain('404');
      });

      xit("should logout on 401 Response messages", function () {
        element.showFailure(
          new ServerRequestError(buildResponse(false, 401, "Unauthorized"))
        );

        // expect(element.querySelector('#errorMsg').innerText).toContain('Unauthorized');
        // expect(element.querySelector('#errorContent').innerText).toContain('401');
        expect(getSession()).toBeFalsy();
      });

      xit("should display TypeError messages when requested", function () {
        element.showFailure(new Error("Something went very wrong"));

        expect(element.isRequesting()).toBeFalsy();
        expect(element.isFailed()).toBeTruthy();
        // expect(element.querySelector('#errorMsg').innerText).toContain('Network Error');
        // expect(element.querySelector('#errorContent').innerText).toContain('Something went very wrong');
      });
    });

    it("should handle time-out requests", function (done) {
      element
        .request({ url: "/timeout", timeout: 0.001 })
        .then(() => {
          done.fail("We should be in catch");
        })
        .catch((_error) => {
          expect(element.isBlocked()).toBeTruthy();
          expect(element.isFailed()).toBeTruthy();
          expect(element.isRequesting()).toBeFalsy();
          expect(element.isFailed()).toBeTruthy();
          done();
        });
    });

    describe("with general error", function () {
      it("should handle time-out requests", function (done) {
        element
          .request({ url: "/error" })
          .then(
            () => {
              done.fail("We should be in catch");
            },
            () => {
              expect(element.isBlocked()).toBeTruthy();
              expect(element.isRequesting()).toBeFalsy();
              expect(element.isFailed()).toBeTruthy();
              done();
            }
          )
          .catch(done.fail);
      });
    });

    describe("with request and filter", function () {
      it("should resquestAndFilter with filter and have correct results", async function () {
        await element
          .request(requestAndFilterBuilder({ url: "/absolute" }))
          .then((response) => {
            expect(response.data).toEqual(123456);
            expect(response.ok).toBeTruthy();
            expect(response.status).toBe(200);
          });
      });

      it("should resquestAndFilter with without treated", async function () {
        await element.request(
          requestAndFilterBuilder({ url: "/absolute" }, [404])
        );

        expect(element.isFailed()).toBeFalsy();
      });

      it("should resquestAndTreat with with treated", async function () {
        await element.request(requestAndFilterBuilder({ url: "/404" }, [404]));

        expect(element.isFailed()).toBeFalsy();
      });

      it("should resquestAndFilter with filter and have correct results", async function () {
        await element
          .request(requestAndFilterBuilder({ url: "/404" }, [404]))
          .then((response) => {
            expect(response.data).toEqual("Test: data is not found");
            expect(response.ok).toBeFalsy();
            expect(response.status).toBe(404);
          });
      });

      it("should resquestAndTreat with with treated", async function () {
        await expectAsync(
          element.request(requestAndFilterBuilder({ url: "/404" }, [401]))
        ).toBeRejected();

        expect(element.isFailed()).toBeTruthy();
      });
    });

    describe("mocks", function () {
      it("should accept no response", function (done) {
        const mock = mockNoResponse();
        const req = element.request({ url: "/anything" });

        expect(mock.args.url).toBe("/anything");
        expect(element.isBlocked()).toBeTruthy();
        req
          .then(
            () => done.fail("should not be resolved"),
            () => done.fail("should not be catched")
          )
          .catch(done.fail);
        done();
      });

      it("should accept success", async function () {
        const mock = await mockResponseWithSuccess(123);
        const _req = await element.request({ url: "/anything" });

        expect(mock.args.url).toBe("/anything");
        expect(element.isRequesting()).toBeFalsy();
        expect(element.isFailed()).toBeFalsy();
        expect(element.isBlocked()).toBeFalsy();
      });

      it("should accept filtered success", async function () {
        const mock = await mockResponseWithSuccess({}, 123);
        await element.request({ url: "/anything" });

        expect(mock.args.url).toBe("/anything");
        expect(element.isRequesting()).toBeFalsy();
        expect(element.isFailed()).toBeFalsy();
        expect(element.isBlocked()).toBeFalsy();
      });

      it("should accept error", async function () {
        const mock = await mockResponseWithFailureCode(400);
        try {
          const _req = await element.request({ url: "/anything" });
          throw "it should throw an error";
        } catch {
          expect(mock.args.url).toBe("/anything");
          expect(element.isRequesting()).toBeFalsy();
          expect(element.isFailed()).toBeTruthy();
          expect(element.isBlocked()).toBeTruthy();
        }
      });
    });
  });

  it("build loginRequestBuilder", function () {
    const bb = loginRequestBuilder("test", "password");
    expect(bb.method).toBe("POST");
    expect(bb.url).toBe("auth/mylogin");
    expect(bb.data.username).toBe("test");
  });

  it("build loginCheckRequestBuilder", function () {
    const bb = loginCheckRequestBuilder();
    expect(bb.url).toBe("auth/settings");
  });
});
