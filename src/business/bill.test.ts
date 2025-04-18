import assert from "node:assert";
import test, { beforeEach } from "node:test";
import { RefFolder1, loadReferenceFolder, loadSession } from "../test-helper";
import Bill from "./bill";
import Folder from "./folder";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReferenceFolder(RefFolder1);
  assert.ok(f instanceof Folder);

  await loadSession();
});

test("should give the correct model", function () {
  const b = new Bill();

  assert.equal(b.getStatic().getModel(), "Bill");
});

test("with folder1", function () {
  const b = f.getByUid("bill.1") as Bill;
  assert.equal(b.getId(), 1);
});
