import assert from "node:assert";
import test, { beforeEach } from "node:test";
import { loadReference, RefFolder1 } from "../test-helper";
import Appointment from "./appointment";
import ConsultOther from "./consult-other";
import Folder from "./folder";
import Patient from "./patient";
import Payment from "./payment";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReference(RefFolder1);
  assert(f instanceof Folder);
});

test("should instantiate folder", () => {
  const fnew = new Folder();
  assert(fnew.getPatient() instanceof Patient);
  assert.equal(fnew.id, "-1");
});

test("should have loaded Mock data", () => {
  assert(f.getPatient() instanceof Patient);
  assert.equal(f.id, "1");
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

test("should give bill related files", () => {
  const list = f.getFilesRelatedToBill("1");
  assert.equal(list.length, 1);

  let i = -1;
  i++;
  assert(list[i] instanceof Payment);
  assert.equal(list[i].id, 3);
  assert.equal(list[i].bill_id, 1);
});

test("Copy with new file", function () {
  assert.equal(f.id, "1");
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
