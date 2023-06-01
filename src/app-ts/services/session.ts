type SessionData = {
  username: string;
  group: string;
  name: string;
  email: string;
  authorized: string[];
  prices: object;
  lists: object;
  codes: object;
  associations: object;
};

/**
 * Returns the session data.
 */
export function getSessionData(): SessionData {
  return window.localStorage.session;
}

export function getSessionOrRedirect(): SessionData {
  const sd = getSessionData();
  // if (!sd) {
  // }
  return sd;
}

export function setSessionData(data: SessionData): SessionData {
  window.localStorage.session = data;
  return data;
}
