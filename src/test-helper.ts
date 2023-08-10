import Folder from "./app-folder/business/folder";

export const RefFolder1 = "FolderTest.test1.json";
export const RefFolder1RicketConsult13 = "ricket-consult-13";

export async function loadReference(name: string): Promise<Folder> {
  // Thanks to http://stackoverflow.com/a/27830579/1954789
  let valid_respond = await fetch("www/api/tests/references/" + name).then(
    (response) => response.json()
  );

  if (valid_respond == null) {
    throw new Error("The reference " + name + " is empty or not found");
  }
  return valid_respond as Folder;
}
