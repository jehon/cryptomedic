import { test, expect } from "@jest/globals";

import { loadReferenceFolder, RefFolder1 } from "../../test-helper";

import Folder from "../folder.js";
import Appointment from "../appointment.js";
import Bill from "../bill.js";
import ClubFoot from "../club-foot.js";
import OtherConsult from "../other-consult.js";
import Patient from "../patient.js";
import Payment from "../payment.js";
import Picture from "../picture.js";
import RicketConsult from "../ricket-consult.js";
import Surgery from "../surgery.js";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReferenceFolder(RefFolder1);
  expect(f).toBeInstanceOf(Folder);
});

test("sould instanciate folder", () => {
  let fnew = new Folder();
  expect(fnew.getPatient()).toBeInstanceOf(Patient);
  expect(fnew.getId()).toEqual(-1);
});

test("should have loaded Mock data", () => {
  expect(f.getPatient()).toBeInstanceOf(Patient);
  expect(f.getId()).toBe("1");
});

test("should give the patient", function () {
  expect(f.getByUid("Patient")).toBeInstanceOf(Patient);
  expect(f.getPatient()).toBeInstanceOf(Patient);
});

test("should instanciate classes", () => {
  expect(f.getPatient()).toBeInstanceOf(Patient);
  expect(f.getPatient().id).toBe(1);

  expect(Folder.create(f, "Appointment", {})).toBeInstanceOf(Appointment);
  expect(Folder.create(f, "Bill", {})).toBeInstanceOf(Bill);
  expect(Folder.create(f, "ClubFoot", {})).toBeInstanceOf(ClubFoot);
  expect(Folder.create(f, "OtherConsult", {})).toBeInstanceOf(OtherConsult);
  expect(Folder.create(f, "Payment", {})).toBeInstanceOf(Payment);
  expect(Folder.create(f, "Picture", {})).toBeInstanceOf(Picture);
  expect(Folder.create(f, "RicketConsult", {})).toBeInstanceOf(RicketConsult);
  expect(Folder.create(f, "Surgery", {})).toBeInstanceOf(Surgery);

  expect(() => Folder.create(f, "AnythingInvalid", {})).toThrow();
});

test("should query specific element (Otherconsult 1)", () => {
  expect(f.getByTypeAndId(OtherConsult, 1)).toBeInstanceOf(OtherConsult);
  expect(f.getByTypeAndId(OtherConsult, 1)?.id).toBe(1);

  expect(f.getByUid("OtherConsult-1")?.id).toBe(1);
});

test("should return null if element is not found (Otherconsult 0)", () => {
  expect(f.getByTypeAndId(OtherConsult, 0)).toBeNull();
});

test("should give patient related files", () => {
  let list = f.getFilesRelatedToPatient();
  expect(list.length).toBe(6);

  list.forEach((e) => {
    expect(e.getPatient()?.id).toBe(1);
  });

  let i = -1;
  i++;
  expect(list[i]).toBeInstanceOf(Appointment);
  expect(list[i].id).toBe(2);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Appointment).id);

  i++;
  expect(list[i]).toBeInstanceOf(Picture);
  expect(list[i].id).toBe(2);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Picture).id);

  i++;
  expect(list[i]).toBeInstanceOf(RicketConsult);
  expect(list[i].id).toBe(13);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as RicketConsult).id);

  i++;
  expect(list[i]).toBeInstanceOf(Surgery);
  expect(list[i].id).toBe(5);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Surgery).id);

  i++;
  expect(list[i]).toBeInstanceOf(Bill);
  expect(list[i].id).toBe(1);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Bill).id);

  i++;
  expect(list[i]).toBeInstanceOf(OtherConsult);
  expect(list[i].id).toBe(1);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as OtherConsult).id);

  // And out of bounds...
  expect(f.getFileRelatedToPatient(1000)).toBeNull();
});

test("should give bill related files", () => {
  let list = f.getFilesRelatedToBill(1);
  expect(list.length).toBe(1);

  let i = -1;
  i++;
  expect(list[i]).toBeInstanceOf(Payment);
  expect(list[i].id).toBe(3);
  expect((list[i]).bill_id).toBe(1);
});

test("should keep extra data", () => {
  f.setHeader("newKey", 14);
  expect(f.getHeader("newKey")).toBe(14);
});

describe("should order files correctly", function () {
  // const resEqual  = (a, b) => { expect(Folder.ordering(a, b)).toBe(0); };
  const resFirst = (a: Folder, b: Folder) => {
    expect(Folder.ordering(a, a)).toBe(0);
    expect(Folder.ordering(b, b)).toBe(0);

    expect(Folder.ordering(a, Object.assign({}, a))).toBe(0);
    expect(Folder.ordering(b, Object.assign({}, b))).toBe(0);

    expect(Folder.ordering(a, b)).toBeLessThan(0);
    expect(Folder.ordering(b, a)).toBeGreaterThan(0);
  };
  const build = (basis: object, data = {}, model = "anything"): Folder => {
    return Object.assign({}, basis, data, {
      getModel: function () {
        return model;
      }
    }) as Folder;
  };

  test("should sort by id", function() {
    const basis = {};
    const o1 = build(basis, {}) as Folder;
    const o2 = build(basis, { id: "2" }) as Folder;
    const o3 = build(basis, { id: "1" }) as Folder;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);

    // Test string completely...
    resFirst(build(basis, { id: "25" }), o2);
    resFirst(build(basis, { id: "25" }), build(basis, { id: "20" }));
    resFirst(build(basis, { id: "25" }), build(basis, { id: "3" }));
  });

  test("should order about getModel", function () {
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

  test("should order about Date", function () {
    const basis = {};
    const o1 = build(basis, {});
    const o2 = build(basis, { date: "2010-01-01" });
    const o3 = build(basis, { date: "2000-01-01" });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  test("should order about created_at", function () {
    const basis = { id: "1" };
    const o1 = build({});
    const o2 = build(basis, { created_at: "2010-01-01" });
    const o3 = build(basis, { created_at: "2000-01-01" });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  test("should new > date > model > id", function () {
    const basis = {};
    const o1 = build(basis, {});
    const o2 = build(basis, { date: "2000-01-01" });
    const o3 = build(basis, { id: "25" }, "a");
    const o4 = build(basis, { id: "25", date: "2000-01-01" });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
    resFirst(o3, o4);
  });
});
