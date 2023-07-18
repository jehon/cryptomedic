import XLabel from "../../../legacy/app-old/v2/widgets/style/x-label.js";

import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should instanciate", function () {
    const el = new XLabel();
    el.setAttribute("label", "label");
    expect(true).toBeTrue();
  });
});
