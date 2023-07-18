import "../../../legacy/app-old/v2/widgets/x-price-item-edit.js";
import XPriceItemEdit from "../../../legacy/app-old/v2/widgets/x-price-item-edit.js";
import { createElementWithObject } from "../../../legacy/app-old/v2/js/custom-element.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should initalize with value=-1", () => {
    const el = createElementWithObject(XPriceItemEdit, { value: "-1" });

    expect(el.shadowRoot.querySelectorAll("input[type=radio]").length).toBe(3);
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="unused"]').checked
    ).toBeTrue();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="specified"]')
        .checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="open"]').checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector("input[type=number]").style.display
    ).toBe("none");

    expect(el.value).toBe(0);
  });

  it("should initalize with value=1", () => {
    const el = createElementWithObject(XPriceItemEdit, { value: "1" });

    expect(el.shadowRoot.querySelectorAll("input[type=radio]").length).toBe(3);
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="specified"]')
        .checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="unused"]').checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="open"]').checked
    ).toBeTrue();
    expect(
      el.shadowRoot.querySelector("input[type=number]").style.display
    ).toBe("none");

    expect(el.value).toBe(1);
  });

  it("should initalize with value 200", () => {
    const el = createElementWithObject(XPriceItemEdit, { value: "200" });

    expect(el.shadowRoot.querySelectorAll("input[type=radio]").length).toBe(3);
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="specified"]')
        .checked
    ).toBeTrue();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="unused"]').checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector('input[type=radio][choice="open"]').checked
    ).toBeFalse();
    expect(
      el.shadowRoot.querySelector("input[type=number]").style.display
    ).not.toBe("none");
    expect(el.shadowRoot.querySelector("input[type=number]").value).toBe("200");

    expect(el.value).toBe(200);
  });
});
