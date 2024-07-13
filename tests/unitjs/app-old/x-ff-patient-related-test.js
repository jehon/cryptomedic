import { fn, loadReference, RefFolder1 } from "./athelpers.js";

import XFfPatientRelated from "../../../legacy/app-old/v2/widgets/folder/x-ff-patient-related.js";
import Folder from "../../../src/business/folder.js";

let testFolder;

describe(fn(import.meta.url), function () {
  let el;
  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
    el = new XFfPatientRelated();
    el.folder = testFolder;
  });

  it("should show", function () {
    expect(el.hasAttribute("blocked")).toBeFalse();
    expect(el.getAttribute("patient-entry-number")).toBe("2000-1");
    expect(el.shadowRoot.querySelector("[name=entry_year]").value).toBe(2000);
    expect(el.shadowRoot.querySelector("[name=entry_order]").value).toBe(1);
    expect(el.shadowRoot.querySelector("[name=name]").value).toBe(
      "rezaul islam"
    );
    expect(el.shadowRoot.querySelector("[name=sex]").value).toBe("Male");
  });

  it("should click", function () {
    location.hash = "#/";
    el.click();
    expect(location.hash)
      .withContext("should move to folder on click")
      .toBe("#/folder/1");
  });
});
