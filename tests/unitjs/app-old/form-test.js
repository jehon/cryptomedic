import { formGetContent } from "../../../legacy/app-old/v2/js/form.js";
import "../../../legacy/app-old/v1/elements/x-write.js";
import "../../../legacy/app-old/v1/elements/x-write-list.js";
import { createElementWithTag } from "../../../legacy/app-old/v2/js/custom-element.js";
// import XWrite from '../../legacy/app-old/v1/elements/x-write.js';
// import XWriteList from '../../legacy/app-old/v1/elements/x-write-list.js';

export function mockFormSubmit(form) {
  form.dispatchEvent(
    new CustomEvent("submit", { bubbles: true, cancelable: true })
  );
}

describe("form-test", function () {
  it("should work with HTML Element", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { name: "n1", value: "n1val" })
    ]);
    expect(formGetContent(element)).toEqual({
      n1: "n1val"
    });
  });

  it("should skip elements disabled", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", {
        name: "n1",
        value: "n1val",
        disabled: true
      })
    ]);

    expect(formGetContent(element)).toEqual({});
  });

  it("should parse int", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { name: "n1", value: "14", type: "number" })
    ]);
    expect(formGetContent(element)).toEqual({
      n1: 14
    });
  });

  it("should work with NodeList", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { name: "n1", value: "n1val" })
    ]);
    expect(formGetContent(element.querySelectorAll("input"))).toEqual({
      n1: "n1val"
    });
  });

  it("should skip elements without name", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { value: "n1val" })
    ]);
    expect(formGetContent(element.querySelectorAll("input"))).toEqual({});
  });

  it("should skip empty values", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { name: "n1", value: "" }),
      createElementWithTag("input", {
        name: "n2",
        type: "radio",
        value: "n2val"
      }),
      createElementWithTag("select", { name: "n3" }, [
        createElementWithTag("option", { value: "n3val1", selected: true }),
        createElementWithTag("option", { value: "n3val2" })
      ])
      // TODO: need XWrite etc... to be migrated to out-of-webDescribe
      // createElementWithObject(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
      // createElementWithObject(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
    ]);

    expect(formGetContent(element)).toEqual({
      n3: "n3val1"
    });

    expect(formGetContent(element, { n1: "template value" })).toEqual({
      n3: "n3val1"
    });
  });

  it("should extract info from fields", function () {
    const element = createElementWithTag("form", {}, [
      createElementWithTag("input", { name: "n1", value: "n1val" }),
      createElementWithTag("input", {
        name: "n2",
        type: "radio",
        value: "n2val",
        checked: true
      }),
      createElementWithTag("select", { name: "n3" }, [
        createElementWithTag("option", { value: "n3val1", selected: true }),
        createElementWithTag("option", { value: "n3val2" })
      ])
      // TODO: need XWrite etc... to be migrated to out-of-webDescribe
      // createElementWithObject(XWrite, { name: 'n4', type: 'list', list: ['n4val1', 'n4val2', 'n4val3'] }),
      // createElementWithObject(XWriteList, { name: 'n5', list: ['n5val1', 'n5val2', 'n5val3'] }),
    ]);

    expect(formGetContent(element)).toEqual({
      n1: "n1val",
      n2: "n2val",
      n3: "n3val1"
      // n4: 'n4val2',
      // n5: 'n5val2',
      // n6: 'n6val2',
      // n7: 'n7val'
    });
  });
});
