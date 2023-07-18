import XIoBill from "../../../legacy/app-old/v2/widgets/io/x-io-bill.js";
import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should set attribute", function () {
    const el = new XIoBill();
    el.setAttribute("value", "123");
    expect(el.value).toBe(123);
    expect(el.total).toBe(0);
    expect(el.hasAttribute("unavailable")).toBeTrue();

    el.setAttribute("price", "0");
    expect(el.total).toBe(0);
    expect(el.hasAttribute("unavailable")).toBeTrue();

    el.setAttribute("price", "-1");
    expect(el.total).toBe(0);
    expect(el.hasAttribute("unavailable")).toBeTrue();

    el.setAttribute("price", "2");
    expect(el.value).toBe(123);
    expect(el.total).toBe(246);
    expect(el.hasAttribute("unavailable")).toBeFalse();

    el.setAttribute("input", "input");
    expect(el.value).toBe(123);
    expect(el.total).toBe(246);
  });

  it("should set value", function () {
    const el = new XIoBill();
    el.value = 123;
    expect(el.value).toBe(123);
    expect(el.total).toBe(0);

    el.setAttribute("price", "2");
    expect(el.value).toBe(123);
    expect(el.total).toBe(246);

    el.setAttribute("input", "input");
    expect(el.value).toBe(123);
    expect(el.total).toBe(246);
  });
});
