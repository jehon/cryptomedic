import XIoNumeric from "../../../legacy/app-old/v2/widgets/io/x-io-numeric.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should set attribute", function () {
    const el = new XIoNumeric();
    el.setAttribute("value", "123");
    expect(el.value).toBe(123);

    el.setAttribute("input", "input");
    expect(el.value).toBe(123);
  });

  it("should set value", function () {
    const el = new XIoNumeric();
    el.value = 123;
    expect(el.value).toBe(123);

    el.setAttribute("input", "input");
    expect(el.value).toBe(123);
  });

  it("should handle NaN", function () {
    const el = new XIoNumeric();
    el.value = "abcd";
    expect(isNaN(el.value)).toBeTrue();

    el.setAttribute("input", "input");
    expect(isNaN(el.value)).toBeTrue();
  });

  it("should handle radix", function () {
    const el = new XIoNumeric();
    el.value = 1.234;
    expect(el.value).toBe(1);

    el.setAttribute("radix", "0");
    el.value = 1.234;
    expect(el.value).toBe(1);

    el.setAttribute("radix", "1");
    el.value = 1.234;
    expect(el.value).toBe(1.2);

    el.setAttribute("input", "input");
    expect(el.value).toBe(1.2);
  });
});
