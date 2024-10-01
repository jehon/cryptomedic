import duix from "duix";
const SESSION = "session";

function deepFreeze(object) {
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

  duix.set(SESSION, session);

  if (!session) {
    setCurrentFolder();
  }
}

export const getSession = () => duix.get(SESSION);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const onSession = (cb) =>
  duix.subscribe(SESSION, cb, {
    fireImmediately: true
  }); /* TODO: legacy arg name */

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getUsername = (session = getSession()) => session?.username;

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getAuthorized = (key, session = getSession()) =>
  session?.authorized?.includes(key) || false;

const FOLDER = "FOLDER";

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const setCurrentFolder = (value = null) => duix.set(FOLDER, value);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const getCurrentFolder = () => duix.get(FOLDER);

// TODO: used in legacy
// ts-unused-exports:disable-next-line
export const onCurrentFolder = (cb) => duix.subscribe(FOLDER, cb);

setSession();
