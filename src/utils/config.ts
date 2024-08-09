import { getSession } from "../../legacy/app-old/v2/js/session";

export function getList(listName: string): string[] {
  if (!getSession()) {
    throw new Error(
      `Config(getList): Trying to get list too early: ${listName}`
    );
  }

  const allLists: Record<string, string[]> = (getSession() as any).lists;
  if (listName in allLists) {
    return allLists[listName];
  }

  const allAssociations: Record<string, string[]> = (getSession() as any)
    .associations;
  if (listName in allAssociations) {
    return allAssociations[listName];
  }

  throw new Error(
    `Config(getList): List not available: ${listName}: L=[${Object.keys(allLists).join(",")}] A=[${Object.keys(allAssociations).join(",")}]`
  );
}
