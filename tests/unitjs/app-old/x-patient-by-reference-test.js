import { fn } from "./athelpers.js";
import XPatientByReference from "../../../legacy/app-old/v2/pages/blocks/x-patient-by-reference.js";
import { mockResponseWithSuccess } from "./x-requestor-test.js";
import {
  getCurrentRoute,
  getRouteToFolderPatient
} from "../../../legacy/app-old/v2/js/router.js";

describe(fn(import.meta.url), function () {
  let element;
  beforeEach(() => {
    element = new XPatientByReference();
  });

  it("should redirect when found", async function () {
    expect(true).toBeTrue();
    mockResponseWithSuccess({ id: 123 });

    element.querySelector("[name=entryyear]").value = "2000";
    element.querySelector("[name=entryorder]").value = "2100";
    await element.search();
    expect(element.getAttribute("status")).toBe("found");
    expect(getCurrentRoute()).toBe(getRouteToFolderPatient(123));
  });

  it("should propose the creation when not found", async function () {
    expect(true).toBeTrue();
    mockResponseWithSuccess({});

    element.querySelector("[name=entryyear]").value = "2000";
    element.querySelector("[name=entryorder]").value = "2100";
    await element.search();
    expect(element.getAttribute("status")).toBe("creation-proposed");

    mockResponseWithSuccess({ id: 456 });
    await element.createReference();
    expect(element.getAttribute("status")).toBe("creation-requested");
    expect(getCurrentRoute()).toBe(getRouteToFolderPatient(456, true));
  });
});
