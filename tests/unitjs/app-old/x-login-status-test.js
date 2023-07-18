import XUserStatus from "../../../legacy/app-old/v2/widgets/x-user-status.js";

import { webDescribe, fireOn, fn } from "./athelpers.js";
import { mockResponseWithSuccess } from "./x-requestor-test.js";
import { setSession } from "../../../legacy/app-old/v2/js/session.js";

// TODO: use constructor instead of webDescribe

describe(fn(import.meta.url), function () {
  const testLoggedIn = function (element, username) {
    expect(element().hasAttribute("requesting")).toBeFalsy();
    expect(element().querySelector("#logout").offsetHeight).toBeGreaterThan(0);
    expect(element().querySelector("#user").innerHTML).toBe(username);
  };

  const testLoggedOut = function (element) {
    expect(element().hasAttribute("requesting")).toBeFalsy();
    expect(element().querySelector("#logout").offsetHeight).toBe(0);
    expect(element().querySelector("#user").innerHTML).toBe("");
  };

  describe("with logged in at initialization", function () {
    webDescribe(
      "*",
      {
        html: "<x-user-status></x-user-status>",
        setupTime: 100
      },
      function (element) {
        beforeEach(function () {
          setSession();
        });

        it("should be hidden when initialized simply", function () {
          testLoggedOut(element);
        });

        it("should show username only when set", function () {
          setSession({ username: "test" });
          testLoggedIn(element, "test");

          setSession();
          testLoggedOut(element);
        });

        describe("with logout", function () {
          it("should logout when clicked", function () {
            setSession({ username: "test" });
            testLoggedIn(element, "test");

            // mock the logout request
            mockResponseWithSuccess();

            spyOn(XUserStatus.prototype, "doLogout").and.callThrough();
            fireOn(element().querySelector("#logout"), "click");
            expect(XUserStatus.prototype.doLogout).toHaveBeenCalled();
          });
        });
      }
    );
  });
});
