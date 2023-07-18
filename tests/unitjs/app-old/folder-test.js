import Folder from "../../../legacy/app-old/v2/models/Folder.js";
import Appointment from "../../../legacy/app-old/v2/models/Appointment.js";
import Bill from "../../../legacy/app-old/v2/models/Bill.js";
import ClubFoot from "../../../legacy/app-old/v2/models/ClubFoot.js";
import OtherConsult from "../../../legacy/app-old/v2/models/OtherConsult.js";
import Patient from "../../../legacy/app-old/v2/models/Patient.js";
import Payment from "../../../legacy/app-old/v2/models/Payment.js";
import Picture from "../../../legacy/app-old/v2/models/Picture.js";
import RicketConsult from "../../../legacy/app-old/v2/models/RicketConsult.js";
import Surgery from "../../../legacy/app-old/v2/models/Surgery.js";

import { loadReference, RefFolder1 } from "./athelpers.js";

describe("test-folder", function () {
  let f;

  beforeEach(() => {
    f = new Folder(loadReference(RefFolder1).folder);
    expect(f).toEqual(jasmine.any(Folder));
  });

  it("sould instanciate folder", () => {
    let f = new Folder();
    expect(f).toEqual(jasmine.any(Folder));
    expect(f).toEqual(jasmine.any(Folder));
    expect(f.getPatient()).toEqual(jasmine.any(Patient));
    expect(f.getId()).toEqual(-1);
  });

  it("should have loaded Mock data", () => {
    expect(f).toEqual(jasmine.any(Folder));
    expect(f.getPatient()).toEqual(jasmine.any(Patient));
    expect(f.getId()).toBe("1");
  });

  it("should instanciate classes", () => {
    expect(f.getPatient()).toEqual(jasmine.any(Patient));
    expect(f.getPatient().id).toBe(1);

    expect(Folder.create(f, "Appointment", {})).toEqual(
      jasmine.any(Appointment)
    );
    expect(Folder.create(f, "Bill", {})).toEqual(jasmine.any(Bill));
    expect(Folder.create(f, "ClubFoot", {})).toEqual(jasmine.any(ClubFoot));
    expect(Folder.create(f, "OtherConsult", {})).toEqual(
      jasmine.any(OtherConsult)
    );
    expect(Folder.create(f, "Payment", {})).toEqual(jasmine.any(Payment));
    expect(Folder.create(f, "Picture", {})).toEqual(jasmine.any(Picture));
    expect(Folder.create(f, "RicketConsult", {})).toEqual(
      jasmine.any(RicketConsult)
    );
    expect(Folder.create(f, "Surgery", {})).toEqual(jasmine.any(Surgery));

    expect(() => Folder.create(f, "AnythingInvalid", {})).toThrow();
  });

  it("should give the patient", function () {
    expect(f.getByUid("patient")).toEqual(jasmine.any(Patient));
  });

  it("should query specific element (Otherconsult 1)", () => {
    expect(f.getByTypeAndId(OtherConsult, 1)).toEqual(
      jasmine.any(OtherConsult)
    );
    expect(f.getByTypeAndId(OtherConsult, 1).id).toBe(1);

    expect(f.getByUid("other-consult-1")?.id).toBe(1);
  });

  it("should return null if element is not found (Otherconsult 0)", () => {
    expect(f.getByTypeAndId(OtherConsult, 0)).toBeNull();
  });

  it("should give patient related files", () => {
    let list = f.getFilesRelatedToPatient();
    expect(list.length).toBe(6);

    list.forEach((e) => {
      expect(e.getPatient().id).toBe(1);
    });

    let i = -1;
    i++;
    expect(list[i]).toEqual(jasmine.any(Picture));
    expect(list[i].id).toBe(2);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    i++;
    expect(list[i]).toEqual(jasmine.any(RicketConsult));
    expect(list[i].id).toBe(13);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    i++;
    expect(list[i]).toEqual(jasmine.any(Surgery));
    expect(list[i].id).toBe(5);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    i++;
    expect(list[i]).toEqual(jasmine.any(Bill));
    expect(list[i].id).toBe(1);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    i++;
    expect(list[i]).toEqual(jasmine.any(Appointment));
    expect(list[i].id).toBe(2);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    i++;
    expect(list[i]).toEqual(jasmine.any(OtherConsult));
    expect(list[i].id).toBe(1);
    expect(f.getFilesRelatedToPatient(i).id).toBe(list[i].id);

    // And out of bounds...
    expect(f.getFilesRelatedToPatient(1000)).toBeNull();
  });

  it("should give bill related files", () => {
    let list = f.getFilesRelatedToBill(1);
    expect(list.length).toBe(1);

    let i = -1;
    i++;
    expect(list[i]).toEqual(jasmine.any(Payment));
    expect(list[i].id).toBe(3);
    expect(list[i].bill_id).toBe(1);
  });

  it("should kepp extra data", () => {
    f.setHeader("newKey", 14);
    expect(f.getHeader("newKey")).toBe(14);
  });

  describe("should order files correctly", function () {
    // const resEqual  = (a, b) => { expect(Folder.ordering(a, b)).toBe(0); };
    const resFirst = (a, b) => {
      expect(Folder.ordering(a, a)).toBe(0);
      expect(Folder.ordering(b, b)).toBe(0);

      expect(Folder.ordering(a, Object.assign({}, a))).toBe(0);
      expect(Folder.ordering(b, Object.assign({}, b))).toBe(0);

      expect(Folder.ordering(a, b)).toBeLessThan(0);
      expect(Folder.ordering(b, a)).toBeGreaterThan(0);
    };
    const build = (basis, data, model = "anything") => {
      return Object.assign({}, basis, data, {
        getModel: function () {
          return model;
        }
      });
    };

    it("should order about id", function () {
      const basis = {};
      const o1 = build(basis, {});
      const o2 = build(basis, { id: "2" });
      const o3 = build(basis, { id: "1" });

      resFirst(o1, o2);
      resFirst(o1, o3);
      resFirst(o2, o3);

      // Test string completely...
      resFirst(build(basis, { id: "25" }), o2);
      resFirst(build(basis, { id: "25" }), build(basis, { id: "20" }));
      resFirst(build(basis, { id: "25" }), build(basis, { id: "3" }));
    });

    it("should order about getModel", function () {
      const basis = {};
      const o1 = build(basis, {}, "a");
      const o2 = build(basis, {}, "b");
      const o3 = build(basis, {}, "c");

      resFirst(o1, o2);
      resFirst(o1, o3);
      resFirst(o2, o3);

      // If id is present at one side, it take precedence...
      resFirst(o2, build({ id: "25" }, "a"));
    });

    it("should order about Date", function () {
      const basis = {};
      const o1 = build(basis, {});
      const o2 = build(basis, { Date: "2010-01-01" });
      const o3 = build(basis, { Date: "2000-01-01" });

      resFirst(o1, o2);
      resFirst(o1, o3);
      resFirst(o2, o3);
    });

    it("should order about created_at", function () {
      const basis = { id: "1" };
      const o1 = build({});
      const o2 = build(basis, { created_at: "2010-01-01" });
      const o3 = build(basis, { created_at: "2000-01-01" });

      resFirst(o1, o2);
      resFirst(o1, o3);
      resFirst(o2, o3);
    });

    it("should new > date > model > id", function () {
      const basis = {};
      const o1 = build(basis, {});
      const o2 = build(basis, { Date: "2000-01-01" });
      const o3 = build(basis, { id: "25" }, "a");
      const o4 = build(basis, { id: "25", Date: "2000-01-01" });

      resFirst(o1, o2);
      resFirst(o1, o3);
      resFirst(o2, o3);
      resFirst(o3, o4);
    });
  });
});
