
import catalog            from 'reducers/catalog';
import date2CanonicString from 'helpers/date2CanonicString';

catalog._define('PREFS_SET');

export default function(state, action) {
  if (!state) {
    state = {
      examiner : '',
      center   : 'Chakaria Disability Center',
      period   : 'month',
      day      : date2CanonicString(new Date(), true),
      month    : date2CanonicString(new Date(), true).substring(0, 7),
      year     : date2CanonicString(new Date(), true).substring(0, 4)
    };
  }

  if (action.type == catalog.PREFS_SET) {
    for(var key in action.payload) {
      if (!state.hasOwnProperty(key)) {
        console.warn('Setting undefined prefs: ', key);
      }
    }
    return Object.assign({}, state, action.payload);
  }

  return state;
}
