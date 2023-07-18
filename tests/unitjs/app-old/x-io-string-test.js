import XIoString from "../../../legacy/app-old/v2/widgets/io/x-io-string.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should set attribute", function () {
    const el = new XIoString();
    el.setAttribute("value", "text");
    expect(el.value).toBe("text");

    el.setAttribute("input", "input");
    expect(el.value).toBe("text");

    expect(el.hasAttribute("empty")).toBeFalse();

    el.removeAttribute("value");
    expect(el.hasAttribute("empty")).toBeTrue();
  });

  it("should set value", function () {
    const el = new XIoString();
    el.value = "text";
    expect(el.value).toBe("text");

    el.setAttribute("input", "input");
    expect(el.value).toBe("text");
  });
});
