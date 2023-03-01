/* istanbul ignore file */
/* eslint-disable */

export function setPref(part, data) {
  let res = {};
  if (sessionStorage.cryptomedicPrefs) {
    res = JSON.parse(sessionStorage.cryptomedicPrefs);
  }

  res[part] = data;

  var newState = Object.assign({}, data, res);

  // Store the pref state
  sessionStorage.cryptomedicPrefs = JSON.stringify(newState);

  return newState;
}

export function getPref(part, def = null) {
  let res = {};
  if (sessionStorage.cryptomedicPrefs) {
    res = JSON.parse(sessionStorage.cryptomedicPrefs);
  }
  if (res[part]) {
    return res[part];
  }
  return def;
}

export function extractPrefsFile(object) {
  let prefs = getPref("file", {});
  if (object.Date) {
    prefs.date = object.Date;
  }
  if (object.ExaminerName) {
    prefs.examinerName = object.ExaminerName;
  }
  if (object.Center) {
    prefs.center = object.Center;
  }
  setPref("file", prefs);
}
