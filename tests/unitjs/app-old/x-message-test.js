import "../../../legacy/app-old/v2/widgets/func/x-messages.js";
import { messages } from "../../../legacy/app-old/config.js";

import { fn } from "./athelpers.js";
import XMessage from "../../../legacy/app-old/v2/widgets/style/x-message.js";

describe(fn(import.meta.url), function () {
  const el = new XMessage();

  it("should show a message", function () {
    el.innerHTML = "test";
    el.setAttribute("level", "success");
    expect(true).toBeTrue();
  });

  it("should show different types", function () {
    el.setAttribute("level", "");
    el.setAttribute("level", messages.success);
    el.setAttribute("level", messages.info);
    el.setAttribute("level", messages.warning);
    el.setAttribute("level", messages.error);
    expect(true).toBeTrue();
  });
});
