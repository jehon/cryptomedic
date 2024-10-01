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

  // consult_CDC_consultation_physio
  // workshop_BHKAFO_night
  // surgical_osteotomy
  assert.equal(b.items.length, 3);
  assert.equal(b.items[0].key, "consult_CDC_consultation_physio");
  assert.equal(b.items[0].category, "consult");
  assert.equal(b.items[0].value, 1);
  assert.equal(b.items[0].price, 200);

  assert.equal(b.getTotalAlreadyPaid(), 1500);
  // We need to load prices and to set it on this.price
  // assert.equal(b.getTotalFor("consult"),1500);
});
