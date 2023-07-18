import XForm from "../../../legacy/app-old/v2/widgets/func/x-form.js";
import "../../../legacy/app-old/v1/elements/x-write.js";
import "../../../legacy/app-old/v1/elements/x-write-list.js";
import {
  createElementWithTag,
  createElementWithObject
} from "../../../legacy/app-old/v2/js/custom-element.js";
import { fn } from "./athelpers.js";
import XButton from "../../../legacy/app-old/v2/widgets/style/x-button.js";
import XButtons from "../../../legacy/app-old/v2/widgets/func/x-buttons.js";

// import XWrite from '../../legacy/app-old/v1/elements/x-write.js';
// import XWriteList from '../../legacy/app-old/v1/elements/x-write-list.js';

describe(fn(import.meta.url), function () {
  it("should work with HTML Element", function () {
    const element = /** @type {XForm} */ (
      createElementWithObject(XForm, {}, [
        createElementWithTag("input", { name: "n1", value: "n1val" })
      ])
    );

    expect(element.getValues()).toEqual({
      n1: "n1val"
    });
  });

  it("should skip elements disabled", function () {
    const element = /** @type {XForm} */ (
      createElementWithObject(XForm, {}, [
        createElementWithTag("input", {
          name: "n1",
          value: "n1val",
          disabled: true
        })
      ])
    );

    expect(element.getValues()).toEqual({});
  });

  it("should parse int", function () {
    const element = /** @type {XForm} */ (
      createElementWithObject(XForm, {}, [
        createElementWithTag("input", {
          name: "n1",
          value: "14",
          type: "number"
        })
      ])
    );

    expect(element.getValues()).toEqual({
      n1: 14
    });
  });

  it("should skip elements without name", function () {
    const element = /** @type {XForm} */ (
      createElementWithObject(XForm, {}, [
        createElementWithTag("input", { value: "n1val" })
      ])
    );

    expect(element.getValues()).toEqual({});
  });

  describe("with buttons", function () {
    let element;
    let iN1;
    let bQuery;
    let bReset;

    beforeEach(() => {
      element = /** @type {XForm} */ (
        createElementWithObject(XForm, {}, [
          (iN1 = createElementWithTag("input", {
            name: "n1",
            required: true,
            value: "initial"
          })),
          createElementWithObject(XButtons, { slot: "buttons" }, [
            (bQuery = createElementWithObject(XButton, {
              action: XButton.Search
            })),
            (bReset = createElementWithObject(XButton, {
              action: XButton.Reset
            }))
          ])
        ])
      );
      element.connectedCallback();
    });

    it("should submit by enter", function (done) {
      element.addEventListener(XForm.ActionSubmit, (evt) => {
        expect(true).toBeTrue();
        expect(evt.detail).not.toBeNull();
        expect(evt.detail.n1).toBe("initial");
        done();
      });
      iN1.dispatchEvent(
        new KeyboardEvent("keypress", { key: "Enter", bubbles: true })
      );
    });

    it("should reset by click on reset button", function (done) {
      expect(iN1.value).toBe("initial");
      iN1.value = "changed";
      element.addEventListener(XForm.ActionSubmit, () => done.fail());

      bReset.click();
      setTimeout(() => {
        expect(iN1.value).toBe("initial");
        done();
      }, 1);
    });

    it("should submit by click on query button", function (done) {
      element.addEventListener(XForm.ActionSubmit, () => {
        expect(true).toBeTrue();
        done();
      });
      bQuery.click();
    });

    it("should not submit by click on query button if not valid", function (done) {
      iN1.value = "";
      element.addEventListener(XForm.ActionSubmit, () => done.fail());
      bQuery.click();
      expect(true).toBeTrue();
      done();
    });
  });

  describe("with full form", function () {
    let element;

    beforeEach(() => {
      element = /** @type {XForm} */ (
        createElementWithObject(XForm, {}, [
          createElementWithTag("input", { name: "n1" }),
          createElementWithTag("input", {
            name: "n2",
            type: "radio",
            value: "n2val1",
            checked: true
          }),
          createElementWithTag("input", {
            name: "n2",
            type: "radio",
            value: "n2val2"
          }),
          createElementWithTag("select", { name: "n3" }, [
            createElementWithTag("option", { value: "n3val1" }),
            createElementWithTag("option", { value: "n3val2" })
          ])
          // TODO: need XWrite etc... to be migrated to out-of-webDescribe
          // createElementWithObject(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
          // createElementWithObject(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
        ])
      );
    });

    it("should skip empty values", function () {
      expect(element.getValues()).toEqual({
        n2: "n2val1",
        n3: "n3val1"
      });
    });

    describe("with values", function () {
      beforeEach(() => {
        element.setValues({
          n1: "123",
          n2: "n2val2",
          n3: "n3val2"
        });
      });

      it("should set values", function () {
        expect(element.querySelector("[name=n1]").value).toBe("123");
        expect(element.getValues()).toEqual({
          n1: "123",
          n2: "n2val2",
          n3: "n3val2"
        });
      });

      it("should reset", function () {
        element.querySelector("[name=n1]").value = "456";
        element.querySelector('[name=n2][value="n2val1"]').checked = true;
        element.querySelector('[name=n2][value="n2val2"]').checked = false;
        element.querySelector("[name=n3]").value = "n3val1";

        expect(element.getValues()).toEqual({
          n1: "456",
          n2: "n2val1",
          n3: "n3val1"
        });

        element.reset();

        expect(element.getValues()).toEqual({
          n1: "123",
          n2: "n2val2",
          n3: "n3val2"
        });
      });
    });
  });
});
