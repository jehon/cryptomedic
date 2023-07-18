import { fn } from "./athelpers.js";
import fireOn from "../../../legacy/app-old/v2/js/fire.js";

describe(fn(import.meta.url), function () {
  it("with default behavior", function () {
    let ok = 0;
    const el = document.querySelector("body");
    el.addEventListener("test-fire-js", (/** @type {CustomEvent} */ evt) => {
      ok = evt.detail;
    });
    fireOn(el, "test-fire-js");
    expect(ok).toBeNull();

    fireOn(el, "test-fire-js", 123);
    expect(ok).toEqual(123);
  });
});
