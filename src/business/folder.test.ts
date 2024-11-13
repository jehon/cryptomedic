import assert from "node:assert";
import test, { beforeEach } from "node:test";
import { loadReferenceFolder, RefFolder1 } from "../test-helper";
import PatientRelated from "./abstracts/patient-related";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Folder from "./folder";
import Patient from "./patient";
import Payment from "./payment";
import Picture from "./picture";
import Surgery from "./surgery";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReferenceFolder(RefFolder1);
  assert(f instanceof Folder);
});

test("should instantiate folder", () => {
  const fnew = new Folder();
  assert(fnew.getPatient() instanceof Patient);
  assert.equal(fnew.getId(), "-1");
});

test("should have loaded Mock data", () => {
  assert(f.getPatient() instanceof Patient);
  assert.equal(f.getId(), "1");
});

test("should give the patient", function () {
  assert(f.getByUid("patient.1") instanceof Patient);
  assert(f.getPatient() instanceof Patient);
});

test("should query specific element (consult_other.1)", () => {
  assert(f.getByTypeAndId(ConsultOther, "1") instanceof ConsultOther);
  assert.equal(f.getByTypeAndId(ConsultOther, "1")?.id, 1);

  assert.equal(f.getByUid("consult_other.1")?.id, 1);
});

test("should return null if element is not found (consult_other.0)", () => {
  assert.throws(() => f.getByTypeAndId(ConsultOther, "0"));
});

test("should give patient related files", () => {
  const list = f.getChildren();
  assert.equal(list.length, 6);

  list.forEach((e) => {
    assert.equal(e.getPatient()?.id, 1);
  });

  let i = -1;
  i++;
  assert(list[i] instanceof Appointment);
  assert.equal(list[i].id, 2);
  assert.equal(f.getChildren()[i].id, (list[i] as Appointment).id);

  i++;
  assert(list[i] instanceof Picture);
  assert.equal(list[i].id, 2);
  assert.equal(f.getChildren()[i].id, (list[i] as Picture).id);

  i++;
  assert(list[i] instanceof ConsultRicket);
  assert.equal(list[i].id, 13);
  assert.equal(f.getChildren()[i].id, (list[i] as ConsultRicket).id);

  i++;
  assert(list[i] instanceof Surgery);
  assert.equal(list[i].id, 5);
  assert.equal(f.getChildren()[i].id, (list[i] as Surgery).id);

  i++;
  assert(list[i] instanceof Bill);
  assert.equal(list[i].id, 1);
  assert.equal(f.getChildren()[i].id, (list[i] as Bill).id);

  i++;
  assert(list[i] instanceof ConsultOther);
  assert.equal(list[i].id, 1);
  assert.equal(f.getChildren()[i].id, (list[i] as ConsultOther).id);
});

test("should give bill related files", () => {
  const list = f.getFilesRelatedToBill("1");
  assert.equal(list.length, 1);

  let i = -1;
  i++;
  assert(list[i] instanceof Payment);
  assert.equal(list[i].id, 3);
  assert.equal(list[i].bill_id, 1);
});

test("order", async function (t) {
  const resFirst = (a: PatientRelated, b: PatientRelated) => {
    assert.equal(Folder.ordering(a, a), 0);
    assert.equal(Folder.ordering(b, b), 0);

    assert(Folder.ordering(a, b) < 0);
    assert(Folder.ordering(b, a) > 0);
  };

  await t.test("order by id", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ id: 2 }) as PatientRelated;
    const o3 = PatientRelated.factory({ id: 1 }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);

    // Test string completely...
    const o25 = PatientRelated.factory({ id: "25" }) as PatientRelated;
    resFirst(o25, o2);
  });

  await t.test("order by Date", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ date: "2010-01-01" }) as PatientRelated;
    const o3 = PatientRelated.factory({ date: "2000-01-01" }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by created_at", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated; // New element
    const o2 = PatientRelated.factory({
      id: 1,
      created_at: "2010-01-01"
    }) as PatientRelated;
    const o3 = PatientRelated.factory({
      id: 1,
      created_at: "2000-01-01"
    }) as PatientRelated;
    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
  });

  await t.test("order by new > date > model > id", function () {
    const o1 = PatientRelated.factory({}) as PatientRelated;
    const o2 = PatientRelated.factory({ date: "2000-01-01" }) as PatientRelated;
    const o3 = PatientRelated.factory({ id: "25" }) as PatientRelated;
    const o4 = PatientRelated.factory({
      id: "25",
      date: "2000-01-01"
    }) as PatientRelated;

    resFirst(o1, o2);
    resFirst(o1, o3);
    resFirst(o2, o3);
    resFirst(o3, o4);
  });
});

test("getNextAppointment", function () {
  assert.equal(new Folder().getNextAppointment(), undefined);

  // f.list.push(new Appointment({ date: "2100-01-01" }));
  f.list.push(Appointment.factory({ date: "2100-01-01" }) as Appointment);
  assert.deepStrictEqual(f.getNextAppointment(), new Date("2100-01-01"));
});

test("getLastSeen", function () {
  assert.equal(new Folder().getLastSeen(), undefined);
  assert.deepStrictEqual(f.getLastSeen(), new Date("2014-11-04"));
});

test("Copy with new file", function () {
  assert.equal(f.getId(), "1");
  const fap = f.getByUid<Appointment>("appointment.2");
  assert(fap instanceof Appointment);
  assert.equal(fap.purpose, "");

  const f2 = f.withFileOLD(
    Appointment.factory({
      id: "2",
      examiner: "test",
      purpose: "test"
    })
  );
  assert(f2 instanceof Folder);
  const fap2 = f2.getByUid<Appointment>("appointment.2");
  assert(fap2 instanceof Appointment);
  assert.equal(fap2.purpose, "test");
  assert.equal(fap2.purpose, "test");

  // Initial
  const fap3 = f.getByUid<Appointment>("appointment.2");
  assert(fap3 instanceof Appointment);
  assert.equal(fap3.purpose, "");
});
