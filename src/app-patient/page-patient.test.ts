import assert from "node:assert";
import test from "node:test";
import Folder from "../business/folder";
import { loadReference, RefFolder1 } from "../helpers.test";
import type { Appointment } from "./objects";
import { getLastSeen, getNextAppointment } from "./page-patient";

test("patient related", async function (t) {
  let f: Folder = new Folder();

  t.beforeEach(async () => {
    f = await loadReference(RefFolder1);
  });

  await t.test("getLastSeen", function () {
    assert.equal(getLastSeen(new Folder()), undefined);
    assert.deepStrictEqual(getLastSeen(f), new Date("2014-11-04"));
  });

  await t.test("getNextAppointment", function () {
    assert.equal(getNextAppointment(new Folder()), undefined);

    f.list.push({ _type: "appointment", date: "2100-01-01" } as Appointment);
    assert.deepStrictEqual(getNextAppointment(f), new Date("2100-01-01"));
  });
});
