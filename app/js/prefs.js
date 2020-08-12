
/* istanbul ignore file */
/**
 * @param part
 * @param data
 */
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

/**
 * @param part
 * @param def
 */
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

/**
 * @param object
 */
export function extractPrefsFile(object) {
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
