import XInputList from "../../../legacy/app-old/v2/widgets/data/x-input-list.js";

import { createElementWithObject } from "../../../legacy/app-old/v2/js/custom-element.js";
import fireOn from "../../../legacy/app-old/v2/js/fire.js";
import { setSession } from "../../../legacy/app-old/v2/js/session.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  const listRadio = ["truc", "brol", "machin", "chose"];
  const listSelect = ["truc", "brol", "machin", "chose", "bazar", "ça", "là"];

  describe("with lists initialized", function () {
    beforeEach(function () {
      setSession({
        lists: {
          listRadio: listRadio,
          listSelect: listSelect
        }
      });
    });

    it("with empty list", function () {
      const el = createElementWithObject(XInputList, { list: "" });
      expect(el.getAttribute("mode")).toBe("empty");
      expect(el.shadowRoot.querySelector("input[type=radio]")).toBeNull();
      expect(el.shadowRoot.querySelector("select")).toBeNull();
    });

    it("with empty list-name", function () {
      const el = createElementWithObject(XInputList, { listName: "" });

      expect(el.getAttribute("mode")).toBe("empty");
      expect(el.shadowRoot.querySelector("input[type=radio]")).toBeNull();
      expect(el.shadowRoot.querySelector("select")).toBeNull();
    });

    describe("in radio mode", function () {
      const check = (el, v) => {
        // Are we set?
        expect(el.getAttribute("mode")).toBe("radio");
        expect(
          el.shadowRoot.querySelectorAll("input[type=radio]").length
        ).toBeGreaterThan(0);
        expect(el.shadowRoot.querySelectorAll("select").length).toBe(0);

        el.value = v;

        // Check the value
        expect(el.value).toBe(v);
        expect(
          el.shadowRoot.querySelector(
            'input[type=radio][value="' + (v ?? "") + '"]'
          )
        ).not.toBeNull();
        expect(
          el.shadowRoot.querySelector(
            'input[type=radio][value="' + (v ?? "") + '"]'
          ).checked
        ).toBeTruthy();
      };

      it("should instanciated", function () {
        const el = createElementWithObject(XInputList, { list: listRadio });
        check(el, "machin");
      });

      it("should fire event", function () {
        const el = createElementWithObject(XInputList, { list: listRadio });
        el.value = "machin";

        let eli = el.shadowRoot.querySelector('input[value="brol"]');
        expect(eli).not.toBeNull();
        let res = "";
        el.addEventListener("change", () => {
          res = "test";
        });
        eli.setAttribute("checked", "checked");
        fireOn(el, "change", "test");
        expect(res).toBe("test");
        expect(el.value).toBe("brol");
      });

      it("nullable", function () {
        const el = createElementWithObject(XInputList, {
          list: listRadio,
          nullable: true
        });

        expect(
          el.shadowRoot.querySelector('input[type=radio][value=""]')
        ).not.toBeNull();
        check(el, "machin");
      });

      it("nullable with null value", function () {
        const el = createElementWithObject(XInputList, {
          list: listRadio,
          nullable: true
        });
        check(el, null);
      });

      it("should handle RADIO Span click", function () {
        const el = createElementWithObject(XInputList, {
          list: listRadio,
          value: "",
          nullable: true
        });

        check(el, "machin");
        el.shadowRoot.querySelector("span[to=truc").click();
        check(el, "truc");
      });

      it("should handle named list", function () {
        spyOn(console, "error");
        const el = createElementWithObject(XInputList, {
          listName: "unknownList"
        });
        expect(el.getAttribute("mode")).toBe("empty");
        // xx-eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
        expect(console.error).toHaveBeenCalled();
      });

      it("should handle named list", function () {
        const el = createElementWithObject(XInputList, {
          listName: "listRadio"
        });
        check(el, "machin");
      });
    });

    describe("in select mode", function () {
      const check = (el, v) => {
        // Are we set?
        expect(el.getAttribute("mode")).toBe("select");
        expect(el.shadowRoot.querySelectorAll("input[type=radio]").length).toBe(
          0
        );
        expect(el.shadowRoot.querySelectorAll("select").length).toBeGreaterThan(
          0
        );

        el.value = v;

        // Check the value
        expect(el.shadowRoot.querySelector("select").value).toBe(v ?? "");
        expect(el.value).toBe(v);
      };

      it("should instanciated", function () {
        const el = createElementWithObject(XInputList, { list: listSelect });
        check(el, "machin");
      });

      it("should fire event", function () {
        const el = createElementWithObject(XInputList, { list: listSelect });

        let eli = el.shadowRoot.querySelector("select");
        expect(eli).not.toBeNull();
        let res = "";
        el.addEventListener("change", () => {
          res = "test";
        });
        eli.value = "brol";
        fireOn(el, "change", "test");
        expect(res).toBe("test");
        expect(el.value).toBe("brol");
      });

      it("nullable", function () {
        const el = createElementWithObject(XInputList, {
          list: listSelect,
          nullable: true
        });
        expect(
          el.shadowRoot.querySelector('select option[value=""]')
        ).not.toBeNull();
      });

      it("nullable with no vlaue", function () {
        const el = createElementWithObject(XInputList, {
          list: listSelect,
          value: "",
          nullable: true
        });
        check(el, null);
      });
    });
  });
});
