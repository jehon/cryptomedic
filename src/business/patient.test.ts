import assert from "assert";
import test, { beforeEach } from "node:test";
import { loadReference, RefPatient1 } from "../test-helper";
import PatientRelated from "./abstracts/patient-related";
import { filterById } from "./abstracts/pojo";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Patient, { yearOfBirthPattern } from "./patient";
import Payment from "./payment";
import Picture from "./picture";
import Surgery from "./surgery";

// DELETE is tested in generate-patient.spec.ts

let p: Patient = new Patient();

test("year of birth pattern", () => {
  const yofRegex = new RegExp("^" + yearOfBirthPattern + "$", "mv");
  // Normal cases
  assert.ok(yofRegex.test("1999"));
  assert.ok(yofRegex.test("1999-1"));
  assert.ok(yofRegex.test("1999-01"));
  assert.ok(yofRegex.test("2010"));
  assert.ok(yofRegex.test("2024-01"));

  // KO
  assert.ok(!yofRegex.test("1969"));
  assert.ok(!yofRegex.test("2030"));

  assert.ok(!yofRegex.test("2000-13"));
  assert.ok(!yofRegex.test("2000-25"));

  assert.ok(!yofRegex.test("19999"));
  assert.ok(!yofRegex.test("19999-01"));
});

beforeEach(async () => {
  p = await loadReference(RefPatient1);
  assert(p instanceof Patient);
});

test("should instantiate patient", () => {
  const pNew = new Patient();
  assert.equal(pNew.getId(), undefined);
});

test("should have loaded Mock data", () => {
  assert.equal(p.getId(), "1");
});

test("should give patient related files", () => {
  const list = p.getChildren();
  assert.equal(list.length, 6);

  let i = -1;
  i++;
  assert(list[i] instanceof Appointment);
  assert.equal(list[i].id, 2);
  assert.equal(p.getChildren()[i].id, (list[i] as Appointment).id);

  i++;
  assert(list[i] instanceof Picture);
  assert.equal(list[i].id, 2);
  assert.equal(p.getChildren()[i].id, (list[i] as Picture).id);

  i++;
  assert(list[i] instanceof ConsultRicket);
  assert.equal(list[i].id, 13);
  assert.equal(p.getChildren()[i].id, (list[i] as ConsultRicket).id);

  i++;
  assert(list[i] instanceof Surgery);
  assert.equal(list[i].id, 5);
  assert.equal(p.getChildren()[i].id, (list[i] as Surgery).id);

  i++;
  assert(list[i] instanceof Bill);
  assert.equal(list[i].id, 1);
  assert.equal(p.getChildren()[i].id, (list[i] as Bill).id);
  const bill = p.getChildren()[i] as Bill;
  assert(bill.payment[0] instanceof Payment);
  assert.equal(bill.payment[0].getId(), "3");

  i++;
  assert(list[i] instanceof ConsultOther);
  assert.equal(list[i].id, 1);
  assert.equal(p.getChildren()[i].id, (list[i] as ConsultOther).id);
});

test("order", async function (t) {
  const resFirst = (a: PatientRelated, b: PatientRelated) => {
    assert.equal(Patient.ordering(a, a), 0);
    assert.equal(Patient.ordering(b, b), 0);

    assert(Patient.ordering(a, b) < 0);
    assert(Patient.ordering(b, a) > 0);
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
  assert.equal(new Patient().getNextAppointment(), undefined);

  p.appointment.push(
    Appointment.factory({ date: "2100-01-01" }) as Appointment
  );
  assert.deepStrictEqual(p.getNextAppointment(), new Date("2100-01-01"));
});

test("getLastSeen", function () {
  assert.equal(new Patient().getLastSeen(), undefined);
  assert.deepStrictEqual(p.getLastSeen(), new Date("2014-11-04"));
});

test("Copy with new file", function () {
  assert.equal(p.getId(), "1");
  const fap = filterById(p.appointment, "2");
  assert(fap instanceof Appointment);
  assert.equal(fap.id, 2);
  assert.equal(fap.purpose, null);

  const p2 = p.withFile(
    Appointment.factory({
      id: "2",
      examiner: "test",
      purpose: "test"
    })
  );

  assert(p2 instanceof Patient);
  const fap2 = filterById(p2.appointment, "2");
  assert(fap2 instanceof Appointment);
  assert.equal(fap2.examiner, "test");
  assert.equal(fap2.purpose, "test");

  // Initial is not changed
  const fap3 = filterById(p.appointment, "2");
  assert(fap3 instanceof Appointment);
  assert.equal(fap3.purpose, null);
});
