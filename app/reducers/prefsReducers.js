
import catalog            from 'reducers/catalog';
import date2CanonicString from 'helpers/date2CanonicString';

catalog._define('PREFS_CLEAR');
catalog._define('PREFS_FILES');
catalog._define('PREFS_REPORTS');

export default function(state, action) {
  if (!state || action.type == catalog.PREFS_CLEAR) {
    state = {
      files : {
        examiner : '',
        center   : 'Chakaria Disability Center',
        date     : date2CanonicString(new Date(), true),
      },
      reports  : {
        center   : '',
        examiner : '',
        period   : 'month',
        day      : date2CanonicString(new Date(), true),
        month    : date2CanonicString(new Date(), true).substring(0, 7),
        year     : date2CanonicString(new Date(), true).substring(0, 4)
      }
    };
  }

  function setPrefs(part, data) {
    for(var key in action.payload) {
      if (!state[part].hasOwnProperty(key)) {
        console.warn('Setting undefined ' + part + ' pref: ', key);
      }
    }
    var res = {};
    res[part] = data;
    return Object.assign({}, state, res);
  }

  if (action.type == catalog.PREFS_FILES) {
    return setPrefs('files', action.payload);
  }

  if (action.type == catalog.PREFS_REPORTS) {
    return setPrefs('reports', action.payload);
  }

  return state;
}
