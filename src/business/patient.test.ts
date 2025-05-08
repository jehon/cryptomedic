import assert from "assert";
import test, { beforeEach } from "node:test";
import { loadReference, RefPatient1 } from "../test-helper";
import { filterById } from "./abstracts/pojo";
import Appointment from "./appointment";
import Patient from "./patient";

// DELETE is tested in generate-patient.spec.ts

let p: Patient = new Patient();

beforeEach(async () => {
  p = await loadReference(RefPatient1);
  assert(p instanceof Patient);
});

test("should instantiate patient", () => {
  const pNew = new Patient();
  assert.equal(pNew.id, undefined);
});

test("should have loaded Mock data", () => {
  assert.equal(p.id, "1");
});

test("Copy with new file", function () {
  assert.equal(p.id, "1");
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
