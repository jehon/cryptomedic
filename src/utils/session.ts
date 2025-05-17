import duix from "duix";
const SESSION = "session";

type DuixCallback = (arg0: any, arg1: any) => void;
const DuixDefaultOptions = { checkForChangesInTheValue: true };

function deepFreeze(object: any) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export function setSession(session = null) {
  if (!session || Object.keys(session).length < 1) {
    session = null;
  } else {
    deepFreeze(session);
  }

  duix.set(SESSION, session, DuixDefaultOptions);

  if (!session) {
    setCurrentFolder();
  }
}

export const getSession = () => duix.get(SESSION);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const onSession = (cb: DuixCallback) =>
  duix.subscribe(SESSION, cb, {
    fireImmediately: true
  }); /* TODO: legacy arg name */

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getUsername = (session = getSession()) => session?.username;

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getAuthorized = (key: string, session = getSession()) =>
  session?.authorized?.includes(key) || false;

const FOLDER = "FOLDER";

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const setCurrentFolder = (value = null) =>
  duix.set(FOLDER, value, DuixDefaultOptions);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getCurrentFolder = () => duix.get(FOLDER);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const onCurrentFolder = (cb: DuixCallback) => duix.subscribe(FOLDER, cb);

setSession();

export function getList(listName: string): string[] {
  if (!getSession()) {
    throw new Error(
      `Config(getList): Trying to get list too early: ${listName}`
    );
  }

  if (listName == "") {
    return ["list-is-empty"];
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
