import XPageLogin from "../../../legacy/app-old/v2/pages/x-page-login.js";

import { fn } from "./athelpers.js";

import * as router from "../../../legacy/app-old/v2/js/router.js";
import {
  setSession,
  getUsername
} from "../../../legacy/app-old/v2/js/session.js";

import { mockNoResponse, mockResponseWithSuccess } from "./x-requestor-test.js";

/**
 * @typedef {import('../../legacy/app-old/v2/widgets/func/x-form.js').default} XForm
 */
describe(fn(import.meta.url), function () {
  let element;
  let submitButton;
  let xmessages;

  beforeEach(() => {
    element = new XPageLogin();
    setSession();
    element.reset();
    submitButton = element.querySelector("#submit");
    xmessages = element
      .querySelector("x-form")
      .shadowRoot.querySelector("x-messages");
    /** @type {XForm} */ (element.querySelector("x-form")).connectedCallback();
  });

  it("should be initialized", function () {
    expect(element.querySelector("x-requestor").isBlocked()).toBeFalse();
  });

  it("should submit by click", function () {
    submitButton.click();
    expect(xmessages.messagesCount).toBe(1);
    expect(xmessages.messagesIds).toContain("form-invalid");
  });

  it("should refuse login when clicking on empty form", function () {
    submitButton.click();
    expect(xmessages.messagesCount).toBe(1);
    expect(xmessages.messagesIds).toContain("form-invalid");
  });

  describe("with user/password", function () {
    let xrequestor;

    beforeEach(() => {
      element.querySelector('[name="username"]').value = "user";
      element.querySelector('[name="password"]').value = "pass";
      xrequestor = element.querySelector("x-requestor");
      expect(xrequestor).toBeDefined();
    });

    it("should refuse if pending request is running", async function () {
      const mock = mockNoResponse();

      // Async -> this will block the next request
      element.doLogin();
      expect(xrequestor.isRequesting()).toBeTrue();

      await expectAsync(element.doLogin()).toBeResolvedTo(-1);
      mock.resolve();
    });

    it("should login when giving correct infos", async function () {
      mockResponseWithSuccess({ username: "test" });
      await expectAsync(element.doLogin()).toBeResolvedTo(true);
      expect(xmessages.messagesCount).toBe(1);
      expect(xmessages.messagesIds).toContain("success");
      expect(getUsername()).toBe("test");
    });

    it("should show a message when incorrect info are fill in", async function () {
      mockResponseWithSuccess({}, 404);
      await expectAsync(element.doLogin()).toBeResolvedTo(2);
      expect(xmessages.messagesCount).toBe(1);
      expect(xmessages.messagesIds).toContain("invalid-credentials");
    });
  });

  describe("with loginCheck", function () {
    it("should redirect on login exists", async function () {
      mockResponseWithSuccess({ username: "test" });
      router.setRoute("/login/test");
      await element.doLoginCheck();
      expect(router.getCurrentRoute()).toBe("/test");
    });

    it("should show login form if no session is available", async function () {
      mockResponseWithSuccess({}, 401);
      router.setRoute("/login/test");
      await element.doLoginCheck();
      expect(router.getCurrentRoute()).toBe("/login/test");
    });
  });
});
