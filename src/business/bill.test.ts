import { expect } from "expect";
import test, { beforeEach } from "node:test";
import { RefFolder1, loadReferenceFolder } from "../test-helper";

import Bill from "./bill.js";
import Folder from "./folder.js";

let f: Folder = new Folder();

beforeEach(async () => {
  f = await loadReferenceFolder(RefFolder1);
  expect(f).toBeInstanceOf(Folder);
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
  expect(b.getTotalAlreadyPaid()).toBe(1500);
  // We need to load prices and to set it on this.price
  // expect(b.getTotalFor("consult")).toBe(1500);
});
