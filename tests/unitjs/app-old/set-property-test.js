import { fn } from "./athelpers.js";
import setPropertyOn from "../../../legacy/app-old/v2/js/set-property.js";

describe(fn(import.meta.url), function () {
  const pattr = "folder";
  const prop = pattr;
  const obj = { a: 123 };

  class XXTestPropertySetForFolder extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `<div id="yes" with-${pattr}=1></div><div id="no"></div>`;
    }
  }
  window.customElements.define(
    "xx-test-property-for-folder-test",
    XXTestPropertySetForFolder
  );

  describe("with folder", function () {
    it("with default behavior", function () {
      const el = document.createElement("div");
      el.setAttribute("x-top", "1");

      const divY = document.createElement("div");
      divY.setAttribute(`with-${pattr}`, "1");
      const divN = document.createElement("div");

      el.insertAdjacentElement("beforeend", divY);
      el.insertAdjacentElement("beforeend", divN);

      expect(el[prop]).toBeUndefined();

      setPropertyOn(el, prop, obj);

      // TODO (angular): workaround for ng-if
      // expect(el[prop]).toBeUndefined();
      expect(divY[prop]).toBe(obj);
      expect(divN[prop]).toBeUndefined();
    });

    it("with default behavior", function () {
      const el = new XXTestPropertySetForFolder();

      expect(el[pattr]).toBeUndefined();

      setPropertyOn(el, prop, obj);

      expect(el[pattr]).toBeUndefined();
      expect(el.shadowRoot.querySelector("div#yes")[prop]).toBe(obj);
      expect(el.shadowRoot.querySelector("div#no")[prop]).toBeUndefined();
    });
  });

  describe("with exception in childerns", function () {
    const pattr = "file";
    const prop = "file";

    const el = document.createElement("div");
    el.setAttribute("x-top", "1");
    const divY = document.createElement("div");
    divY.setAttribute(`with-${pattr}`, "1");
    Object.defineProperty(divY, "file", {
      set: (_v) => {
        throw "error";
      },
      get: () => "error"
    });
    const divN = document.createElement("div");

    el.insertAdjacentElement("beforeend", divY);
    el.insertAdjacentElement("beforeend", divN);

    it("with default behavior", function () {
      expect(el[prop]).toBeUndefined();

      setPropertyOn(el, prop, null);

      // TODO (angular): workaround for ng-if
      // expect(el[pattr]).toBeUndefined();

      expect(divY[prop]).toBe("error");
      expect(divN[prop]).toBeUndefined();
    });
  });

  describe("with exception in shadow childerns", function () {
    const xxTest = new XXTestPropertySetForFolder();
    Object.defineProperty(xxTest, prop, {
      set: (_v) => {
        throw "error";
      },
      get: () => "error"
    });

    const divY = document.createElement("div");
    divY.setAttribute(`with-${pattr}`, "1");
    Object.defineProperty(divY, prop, {
      set: (_v) => {
        throw "error";
      },
      get: () => "error"
    });
    const divN = document.createElement("div");

    xxTest.shadowRoot.append(divY, divN);

    it("with default behavior", function () {
      setPropertyOn(xxTest, prop, null);

      expect(xxTest[prop]).toBe("error");
      expect(divY[prop]).toBe("error");
      expect(divN[prop]).toBeUndefined();
    });
  });
});
