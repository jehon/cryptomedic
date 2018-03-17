
/* exported setPref,getPref,extractPrefsFile */

function setPref(part, data) {
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

function getPref(part, def = null) {
  let res = {};
  if (sessionStorage.cryptomedicPrefs) {
    res = JSON.parse(sessionStorage.cryptomedicPrefs, (key, val) => {
      if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}.*$/.test(val)) {
        return new Date(val);
      }
      return val;
    });
  }
  if (res[part]) {
    return res[part];
  }
  return def;
}

function extractPrefsFile(object) {
  let prefs = getPref('file', {});
  if (object.Date) {
    prefs.date = object.Date;
  }
  if (object.ExaminerName) {
    prefs.examinerName = object.ExaminerName;
  }
  if (object.Center) {
    prefs.center = object.Center;
  }
  setPref('file', prefs);
}
