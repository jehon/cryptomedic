import { expect } from "expect";
import test, { beforeEach } from "node:test";

import { loadReferenceFolder, RefFolder1 } from "../test-helper";

import assert from "node:assert";
import PatientRelated from "./abstracts/patient-related";
import Appointment from "./appointment";
import Bill from "./bill.js";
import ConsultOther from "./consult-other.js";
import ConsultRicket from "./consult-ricket.js";
import Folder from "./folder";
import Patient from "./patient";
import Payment from "./payment.js";
import Picture from "./picture.js";
import Surgery from "./surgery.js";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReferenceFolder(RefFolder1);
  expect(f).toBeInstanceOf(Folder);
});

test("sould instanciate folder", () => {
  const fnew = new Folder();
  expect(fnew.getPatient()).toBeInstanceOf(Patient);
  expect(fnew.getId()).toEqual("-1");
});

test("should have loaded Mock data", () => {
  expect(f.getPatient()).toBeInstanceOf(Patient);
  expect(f.getId()).toBe("1");
});

test("should give the patient", function () {
  expect(f.getByUid("patient.1")).toBeInstanceOf(Patient);
  expect(f.getPatient()).toBeInstanceOf(Patient);
});

test("should query specific element (consult_other.1)", () => {
  expect(f.getByTypeAndId(ConsultOther, "1")).toBeInstanceOf(ConsultOther);
  expect(f.getByTypeAndId(ConsultOther, "1")?.id).toBe(1);

  expect(f.getByUid("consult_other.1")?.id).toBe(1);
});

test("should return null if element is not found (consult_other.0)", () => {
  assert.throws(() => f.getByTypeAndId(ConsultOther, "0"));
});

test("should give patient related files", () => {
  const list = f.getFilesRelatedToPatient();
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
  expect(list[i]).toBeInstanceOf(ConsultRicket);
  expect(list[i].id).toBe(13);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as ConsultRicket).id);

  i++;
  expect(list[i]).toBeInstanceOf(Surgery);
  expect(list[i].id).toBe(5);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Surgery).id);

  i++;
  expect(list[i]).toBeInstanceOf(Bill);
  expect(list[i].id).toBe(1);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as Bill).id);

  i++;
  expect(list[i]).toBeInstanceOf(ConsultOther);
  expect(list[i].id).toBe(1);
  expect(f.getFileRelatedToPatient(i)?.id).toBe((list[i] as ConsultOther).id);

  // And out of bounds...
  assert.throws(() => f.getFileRelatedToPatient(1000));
});

test("should give bill related files", () => {
  const list = f.getFilesRelatedToBill("1");
  expect(list.length).toBe(1);

  let i = -1;
  i++;
  expect(list[i]).toBeInstanceOf(Payment);
  expect(list[i].id).toBe(3);
  expect(list[i].bill_id).toBe(1);
});

test("order", async function (t) {
  const resFirst = (a: PatientRelated, b: PatientRelated) => {
    expect(Folder.ordering(a, a)).toBe(0);
    expect(Folder.ordering(b, b)).toBe(0);

    expect(Folder.ordering(a, b)).toBeLessThan(0);
    expect(Folder.ordering(b, a)).toBeGreaterThan(0);
  };

  await t.test("order by id", function () {
    const o1 = new PatientRelated();
    const o2 = new PatientRelated({ id: 2 });
    const o3 = new PatientRelated({ id: 1 });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);

    // Test string completely...
    const o25 = new PatientRelated({ id: "25" });
    resFirst(o25, o2);
  });

  await t.test("order by Date", function () {
    const o1 = new PatientRelated({});
    const o2 = new PatientRelated({ date: "2010-01-01" });
    const o3 = new PatientRelated({ date: "2000-01-01" });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by created_at", function () {
    const o1 = new PatientRelated({}); // New element
    const o2 = new PatientRelated({ id: 1, created_at: "2010-01-01" });
    const o3 = new PatientRelated({ id: 1, created_at: "2000-01-01" });
    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by new > date > model > id", function () {
    const o1 = new PatientRelated({});
    const o2 = new PatientRelated({ date: "2000-01-01" });
    const o3 = new PatientRelated({ id: "25" });
    const o4 = new PatientRelated({ id: "25", date: "2000-01-01" });

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
    resFirst(o3, o4);
  });
});

test("getNextAppointment", function () {
  expect(new Folder().getNextAppointment()).toBeUndefined();

  f.list.push(new Appointment({ date: "2100-01-01" }));
  expect(f.getNextAppointment()).toEqual(new Date("2100-01-01"));
});

test("getLastSeen", function () {
  expect(new Folder().getLastSeen()).toBeUndefined();
  expect(f.getLastSeen()).toEqual(new Date("2014-11-04"));
});

test("Copy with new file", function () {
  expect(f.getId()).toBe("1");
  const fap = f.getByUid<Appointment>("appointment.2");
  expect(fap).toBeInstanceOf(Appointment);
  assert.equal(fap.purpose, "");

  // TODO: use <> in factory to ease type mapping
  const f2 = f.withFile(
    Appointment.factory({
      id: "2",
      examiner: "test",
      purpose: "test"
    }) as any as Appointment
  );
  expect(f2).toBeInstanceOf(Folder);
  const fap2 = f2.getByUid<Appointment>("appointment.2");
  expect(fap2).toBeInstanceOf(Appointment);
  expect(fap2.purpose).toBe("test");
  expect(fap2.purpose).toBe("test");

  // Initial
  const fap3 = f.getByUid<Appointment>("appointment.2");
  expect(fap3).toBeInstanceOf(Appointment);
  assert.equal(fap3.purpose, "");
});
