
import { expect, test } from '@jest/globals';

import Bill from "../bill.js";

test("should give the correct model", function () {
  let b = new Bill();

  expect(b.getModel()).toBe("Bill");
});
