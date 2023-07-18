import XDisplayDate from "../../../legacy/app-old/v2/widgets/style/x-display-date.js";

import { fn } from "./athelpers.js";

describe(fn(import.meta.url), function () {
  it("should instanciate", function () {
    const el = new XDisplayDate();
    el.attributeChangedCallback("value", "", "2018-01-21");
    expect(el.innerHTML).toBe("21-01-2018");
  });
});
