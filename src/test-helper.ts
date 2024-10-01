import assert from "assert";
import Folder from "./business/folder";
import { setSession } from "./utils/session";
import { string2number } from "./utils/strings";
import { StringNumber } from "./utils/types";

export const RefFolder1 = "FolderTest.test1.json";
// export const RefFolder1RicketConsult13 = "RicketConsult-13";

const refRoot = "../www/api/tests/references/";

export async function loadReferenceFolder(name: string): Promise<Folder> {
  const valid_respond = await import(refRoot + name);

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }
  const folder = new Folder(valid_respond.default.folder);
  assert.ok(folder instanceof Folder);
  return folder;
}

export async function loadSession() {
  const valid_respond = await import(refRoot + "AuthTest.testsLogin.json");

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }
  const session = valid_respond.default;
  assert.equal(Object.keys(session.prices).length, 3);
  setSession(session);
  return session;
}

export function assertToBeClose(
  val: number | StringNumber,
  ref: number,
  precision: number = 0.01
) {
  if (typeof val == "string") {
    val = string2number(val);
  }

  assert.equal(Math.sign(val), Math.sign(ref));
  assert(Math.abs(val - ref) < precision);
}
