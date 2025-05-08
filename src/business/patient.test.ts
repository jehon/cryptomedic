import assert from "assert";
import test, { beforeEach } from "node:test";
import { loadReference, RefPatient1 } from "../test-helper";
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
