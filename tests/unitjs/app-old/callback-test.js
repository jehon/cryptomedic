import { fn } from "./athelpers.js";
import createCallback from "../../../legacy/app-old/v2/js/callback.js";

describe(fn(import.meta.url), function () {
  it("with default behavior", function () {
    const cb = createCallback();
    expect(cb.get()).toBeUndefined();
    cb.set(1);
    expect(cb.get()).toBe(1);
    let ok = 0;
    const u = cb.onChange((data) => {
      ok = data;
    });
    expect(ok).toBe(1);

    cb.set(2);
    expect(ok).toBe(2);

    u();

    cb.set(3);
    expect(ok).toBe(2);
  });

  it("with key", function () {
    const cb = createCallback("test");
    expect(cb).not.toBeNull();
  });
});
