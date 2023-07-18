import {
  getRoute,
  getRouteParameters
} from "../../../legacy/app-old/v2/js/router.js";
import * as router from "../../../legacy/app-old/v2/js/router.js";

import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should handle constant routes", function () {
    const r = "/blabla";
    const p = {};

    const str = getRoute(r, p);
    expect(str).toBe("/blabla");
    expect(getRouteParameters(r, str)).toEqual(p);
  });

  describe("with one parameter", function () {
    const r = "/blabla/[id]";

    it("should handle parametrized routes", function () {
      const p = { id: "123" };

      const str = getRoute(r, p);
      expect(str).toBe("/blabla/123");
      expect(getRouteParameters(r, str)).toEqual(p);
    });

    it("should handle parametrized routes with extra params", function () {
      const p = { id: "123", extra: "something" };

      const str = getRoute(r, p);
      expect(str).toBe("/blabla/123?extra=something");
      expect(getRouteParameters(r, str)).toEqual(p);
    });

    it("should handle errors", function () {
      expect(() => getRoute(r, "/blabla/123")).toThrow();
    });

    it("should detect invalid route", function () {
      expect(() => getRouteParameters(r, "/truc/blabla/123")).toThrow();
    });
  });

  // Legacy routes

  it("should parse login routes", function () {
    {
      router.setRoute("/test");
      const r = router.getCurrentRoute();
      router.routeToLogin();
      expect(router.parseRouteLogin().redirect).toBe(r);
    }

    {
      const r = "/home";
      router.routeToLogin(r);
      expect(router.parseRouteLogin().redirect).toBe(r);
    }

    {
      const r = "/home/test/123";
      router.routeToLogin(r);
      expect(router.parseRouteLogin().redirect).toBe(r);
    }

    {
      router.setRoute("/login/login/test");
      expect(router.parseRouteLogin().redirect).toBe("/test");
    }
  });

  xit("should route to login", function () {
    router.routeToLogin("test");
    expect(router.getCurrentRoute()).toBe("/login/test");
  });
});
