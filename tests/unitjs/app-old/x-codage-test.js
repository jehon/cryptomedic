import { fn } from "./athelpers.js";

import "../../../legacy/app-old/v2/widgets/func/x-codage.js";
import { setSession } from "../../../legacy/app-old/v2/js/session.js";
import XCodage from "../../../legacy/app-old/v2/widgets/func/x-codage.js";

describe(fn(import.meta.url), function () {
  let el;

  beforeEach(() => {
    el = new XCodage();
  });

  describe("without definitions", function () {
    beforeEach(function () {
      setSession();
    });

    it("should handle empty values", function () {
      expect(el).not.toBeNull();
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("");
    });

    it("should use value as translated value", function () {
      el.setAttribute("value", "original");
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("original");
    });

    it("should use overriden value", function () {
      el.setAttribute("value", "original");
      el.setAttribute("translated", "transformed");
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("transformed");
    });
  });

  describe("with session", function () {
    beforeEach(function () {
      setSession({
        codes: {
          original: "codage"
        }
      });
    });

    it("should use global as translated value", function () {
      el.setAttribute("value", "original");
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("codage");
    });

    it("should use overriden value", function () {
      el.setAttribute("value", "original");
      el.setAttribute("translated", "transformed");
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("transformed");
    });

    it("should handle value not in the global", function () {
      el.setAttribute("value", "not-found");
      expect(el.querySelector("span > span")).not.toBeNull();
      expect(el.querySelector("span > span").textContent).toBe("not-found");
    });
  });
});
