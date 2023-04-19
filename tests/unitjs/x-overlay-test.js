import XOverlay from "../../src/app-old/widgets/func/x-overlay.js";

import { fn } from "./athelpers.js";

import {
  createElementWithObject,
  createElementWithTag
} from "../../src/app-old/js/custom-element.js";

describe(fn(import.meta.url), function () {
  let element;
  beforeEach(() => {
    element = createElementWithObject(XOverlay, {}, [
      createElementWithTag("div", {}, "Content"),
      createElementWithTag("div", { slot: "overlay" }, "Overlay")
    ]);
  });

  it("should be hidden when initialized simply", function () {
    expect(element.isBlocked()).toBeFalsy();
  });

  it("should block()", function () {
    element.block();
    expect(element.isBlocked()).toBeTruthy();
  });

  it("should free()", function () {
    element.free();
    expect(element.isBlocked()).toBeFalsy();
  });
});
