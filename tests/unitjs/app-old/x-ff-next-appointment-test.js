import { fn, loadReference, RefFolder1 } from "./athelpers.js";

import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import XFfNextAppointment from "../../../legacy/app-old/v2/widgets/folder/x-ff-next-appointment.js";
import Appointment from "../../../legacy/app-old/v2/models/Appointment.js";

let testFolder;

describe(fn(import.meta.url), function () {
  const na = {
    id: 999,
    created_at: "<timestamp>",
    updated_at: "<timestamp>",
    last_user: "Thierry",
    patient_id: 1,
    Date: "2007-01-10",
    examiner: "Ershad",
    purpose: null,
    Nextappointment: "2999-01-10",
    NextCenter: null
  };

  beforeEach(() => {
    testFolder = new Folder(loadReference(RefFolder1).folder);
  });

  it("should be initialized", function () {
    const el = new XFfNextAppointment();
    expect(el.hasAttribute("blocked")).toBeTrue();
    expect(el._nextAppointment()).toBeNull();
  });

  it("should show no appointment", function (done) {
    const el = new XFfNextAppointment();
    el.folder = testFolder;

    expect(el.hasAttribute("blocked")).toBeFalse();
    setTimeout(() => {
      expect(
        el.shadowRoot
          .querySelector("#withoutAppointment")
          .hasAttribute("hidden")
      ).toBeFalse();
      expect(
        el.shadowRoot.querySelector("#withAppointment").hasAttribute("hidden")
      ).toBeTrue();
      done();
    });
  });

  it("should show appointment", function (done) {
    const el = new XFfNextAppointment();
    testFolder.list.push(new Appointment(na));
    el.folder = testFolder;

    expect(el.hasAttribute("blocked")).toBeFalse();
    setTimeout(() => {
      expect(
        el.shadowRoot
          .querySelector("#withoutAppointment")
          .hasAttribute("hidden")
      ).toBeTrue();
      expect(
        el.shadowRoot.querySelector("#withAppointment").hasAttribute("hidden")
      ).toBeFalse();
      expect(
        el.shadowRoot.querySelector("#withAppointment").innerHTML
      ).toContain("2999-01-10");
      done();
    });
  });

  it("should show the closest appointment", function (done) {
    const el = new XFfNextAppointment();
    let nb = JSON.parse(JSON.stringify(na)); // Make a copy
    nb.Nextappointment = "3999-01-12";
    testFolder.list.push(new Appointment(na));
    testFolder.list.push(new Appointment(nb));
    el.folder = testFolder;

    expect(el.hasAttribute("blocked")).toBeFalse();
    setTimeout(() => {
      expect(
        el.shadowRoot
          .querySelector("#withoutAppointment")
          .hasAttribute("hidden")
      ).toBeTrue();
      expect(
        el.shadowRoot.querySelector("#withAppointment").hasAttribute("hidden")
      ).toBeFalse();
      expect(
        el.shadowRoot.querySelector("#withAppointment").innerHTML
      ).toContain("2999-01-10");
      done();
    });
  });

  it("should click", function () {
    const el = new XFfNextAppointment();
    el.folder = testFolder;
    location.hash = "#/";

    /** @type {import('../../legacy/app-old/v2/widgets/style/x-button.js').default} */
    (el.shadowRoot.querySelector("x-button#add-appointment")).click();
    expect(location.hash).toBe("#/folder/1/file/Appointment");
  });
});
