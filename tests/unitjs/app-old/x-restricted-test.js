import XRestricted from "../../../legacy/app-old/v2/widgets/func/x-restricted.js";
import { deepCopy, setSession } from "../../../legacy/app-old/v2/js/session.js";
import { fn, loadReference } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  let el;
  let refSession;

  beforeEach(function () {
    refSession = loadReference("AuthTest.testsLogin.json");
    setSession(refSession);
    el = new XRestricted();
    el.innerHTML = '<div id="content">Content</div>';
    el.connectedCallback();
  });

  afterEach(function () {
    el.disconnectedCallback();
  });

  describe("without restricted-by", function () {
    it("should be hidden", function () {
      expect(el.hasAttribute("authorized")).toBeFalse();
    });

    it("should show on restricted-by change", function () {
      el.setAttribute("restricted-by", "application.open");
      expect(el.hasAttribute("authorized")).toBeTrue();
    });
  });

  describe("with restricted-by not authorized", function () {
    beforeEach(function () {
      el.setAttribute("restricted-by", "anything.forbidden");
    });

    it("should be hidden", function () {
      expect(el.hasAttribute("authorized")).toBeFalse();
    });

    it("should show on restricted-by change", function () {
      el.setAttribute("restricted-by", "application.open");
      expect(el.hasAttribute("authorized")).toBeTrue();
    });

    it("should show when enabled by session", function () {
      const nsession = deepCopy(refSession);
      nsession.authorized.push("anything.forbidden");
      setSession(nsession);
      expect(el.hasAttribute("authorized")).toBeTrue();
    });
  });

  describe("with restricted-by authorized", function () {
    beforeEach(function () {
      el.setAttribute("restricted-by", "application.open");
    });

    it("should be visible", function () {
      expect(el.hasAttribute("authorized")).toBeTrue();
    });

    it("should hide on restricted-by change", function () {
      el.setAttribute("restricted-by", "anything.else");
      expect(el.hasAttribute("authorized")).toBeFalse();
    });

    it("should hide when disabled by session", function () {
      const nsession = deepCopy(refSession);
      nsession.authorized = refSession.authorized.filter(
        (v) => v != "application.open"
      );
      setSession(nsession);
      expect(el.hasAttribute("authorized")).toBeFalse();
    });
  });

  describe("with inverted", function () {
    beforeEach(function () {
      el.setAttribute("restricted-by", "application.open");
      el.setAttribute("inverted", "");
    });

    it("should be hidden", function () {
      expect(el.hasAttribute("authorized")).toBeFalse();
    });

    it("should show on restricted-by change", function () {
      el.setAttribute("restricted-by", "anything.else");
      expect(el.hasAttribute("authorized")).toBeTrue();
    });

    it("should show when disabled by session", function () {
      const nsession = deepCopy(refSession);
      nsession.authorized = refSession.authorized.filter(
        (v) => v != "application.open"
      );
      setSession(nsession);
      expect(el.hasAttribute("authorized")).toBeTrue();
    });
  });
});
