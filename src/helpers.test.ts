import Folder from "./business/folder";

export const RefFolder1 = {
  name: "FolderTest.test1.json"
};
// export const RefPatient1 = {
//   name: "PatientControllerTest.test1.json",
// };

const refRoot = "../www/api/tests/references/";

export async function loadReference({
  name
}: {
  name: string;
}): Promise<Folder> {
  const valid_respond = await import(refRoot + name);

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }

  return new Folder(valid_respond.default.folder);
}
