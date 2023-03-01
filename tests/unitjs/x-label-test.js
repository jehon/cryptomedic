import XLabel from "../../app/widgets/style/x-label.js";

import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should instanciate", function () {
    const el = new XLabel();
    el.setAttribute("label", "label");
    expect(true).toBeTrue();
  });
});
