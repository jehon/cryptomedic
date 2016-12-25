
import { combineReducers, createStore } from 'redux';
// import thunkMiddleware                                         from 'redux-thunk';
// import { DevTools, DebugPanel, LogMonitor }                    from 'redux-devtools/lib/react';

import prefs                                                      from 'reducers/prefsReducers';
import connection                                                 from 'reducers/connectionReducers';
import stateReducers                                              from 'reducers/stateReducers';
import database                                                   from 'reducers/databaseReducers';
import catalog                                                    from 'reducers/catalog';

let store = createStore(
  function(state, action) {
    if (typeof(window.__karma__) == 'undefined') {
      console.log('Action: ', action.type, ' with ', action.payload);
    }

    // Work the state
    state = combineReducers({
      prefs,
      connection,
      state: stateReducers,
      database,
    })(state, action);
    return state;
  }
);

if (sessionStorage.cryptomedicPrefs) {
  console.log('reload with ', JSON.parse(sessionStorage.cryptomedicPrefs));
  store.dispatch({ type: catalog.PREFS_REHYDRATE, payload: JSON.parse(sessionStorage.cryptomedicPrefs) });
}

export default store;
