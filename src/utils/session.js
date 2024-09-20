import duix from "duix";
import { deepFreeze } from "./objects.js";
const SESSION = "session";

/**
 * @param {object} session - the object to be stored
 */
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

/**
 * @returns {object} the session
 */
export const getSession = () => duix.get(SESSION);

/**
 *
 * @param {function(object):any} cb - a callback that will be called on session change
 * @returns {function(void):void} unregistering function
 */
export const onSession = (cb) =>
  duix.subscribe(SESSION, cb, {
    fireImmediately: true
  }); /* TODO: legacy arg name */

/*
 * Functions
 */

export const getUsername = (session = getSession()) => session?.username;
export const getAuthorized = (key, session = getSession()) =>
  session?.authorized?.includes(key) || false;

/**
 * Current folder (TODO: legacy)
 */
const FOLDER = "FOLDER";
export const setCurrentFolder = (value = null) => duix.set(FOLDER, value);
/* TODO: temp function */ /* istanbul ignore next */
export const getCurrentFolder = () => duix.get(FOLDER);
/* TODO: temp function */ /* istanbul ignore next */
export const onCurrentFolder = (cb) => duix.subscribe(FOLDER, cb);

setSession();
