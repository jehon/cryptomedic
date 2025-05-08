import assert from "assert";
import Pojo from "./business/abstracts/pojo";
import Folder from "./business/folder";
import Patient from "./business/patient";
import { string2number } from "./utils/strings";
import { type StringNumber } from "./utils/types";

export const RefFolder1 = {
  name: "FolderTest.test1.json",
  type: Folder
};
export const RefPatient1 = {
  name: "PatientControllerTest.test1.json",
  type: Patient
};

const refRoot = "../www/api/tests/references/";

export async function loadReference<T extends Pojo = Patient>({
  name,
  type
}: {
  name: string;
  type: { new (): Pojo };
}): Promise<T> {
  const valid_respond = await import(refRoot + name);

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }

  const model =
    type == Folder
      ? (new Folder(valid_respond.default.folder) as unknown as T) // Can not build with factory as others
      : ((type as typeof Pojo).factory(valid_respond.default) as T);
  assert.ok(model instanceof type);
  return model;
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
