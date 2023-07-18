import { fn } from "./athelpers.js";
import XI18n from "../../../legacy/app-old/v2/widgets/func/x-i18n.js";

describe(fn(import.meta.url), function () {
  it("without value", function () {
    const el = new XI18n();
    expect(el.innerHTML).toBe("");
  });

  it("with value empty", function () {
    const el = new XI18n();
    el.setAttribute("value", "");
    expect(el.innerHTML).toBe("");
  });

  it('with value "original"', function () {
    const el = new XI18n();
    el.setAttribute("value", "original");
    expect(el.innerHTML).toBe("original");
  });

  it('with value "orignalThere"', function () {
    const el = new XI18n();
    el.setAttribute("value", "originalThere");
    expect(el.innerHTML).toBe("original There");
  });

  it('with value "123"', function () {
    const el = new XI18n();
    el.setAttribute("value", "123");
    expect(el.innerHTML).toBe("123");
  });
});
