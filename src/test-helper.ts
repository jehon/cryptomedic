import Folder from "./business/folder";

export const RefFolder1 = "FolderTest.test1.json";
// export const RefFolder1RicketConsult13 = "RicketConsult-13";

const refRoot = "../www/api/tests/references/";

export async function loadReferenceFolder(name: string): Promise<Folder> {
  const valid_respond = await import(refRoot + name);

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }
  return new Folder(valid_respond.default.folder);
}
