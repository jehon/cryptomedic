import assert from "node:assert";
import test, { beforeEach } from "node:test";
import { loadReference, RefFolder1 } from "../test-helper";
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
