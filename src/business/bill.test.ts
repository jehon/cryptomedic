import { expect } from "expect";
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

  expect(b.getStatic().getModel()).toBe("Bill");
});

test("with folder1", function () {
  const b = f.getByUid("bill.1") as Bill;
  expect(b.getId()).toBe(1);

  // consult_CDC_consultation_physio
  // workshop_BHKAFO_night
  // surgical_osteotomy
  expect(b.items.length).toBe(3);
  expect(b.items[0].key).toBe("consult_CDC_consultation_physio");
  expect(b.items[0].category).toBe("consult");
  expect(b.items[0].value).toBe(1);
  expect(b.items[0].price).toBe(200);

  expect(b.getTotalAlreadyPaid()).toBe(1500);
  // We need to load prices and to set it on this.price
  // expect(b.getTotalFor("consult")).toBe(1500);
});
