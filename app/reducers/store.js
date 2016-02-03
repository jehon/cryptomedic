
import { combineReducers, compose, createStore } from 'redux';
import { persistStore, autoRehydrate }                            from 'redux-persist';
// import thunkMiddleware                                         from 'redux-thunk';
// import { DevTools, DebugPanel, LogMonitor }                    from 'redux-devtools/lib/react';

import prefs                                                      from 'reducers/prefsReducers';
import connection                                                 from 'reducers/connectionReducers';
import state                                                      from 'reducers/stateReducers';
import database                                                   from 'reducers/databaseReducers';
import log                                                        from 'reducers/logReducers';

if (typeof(window.__karma__) == 'undefined') {
  // disable logger?
}

let store = autoRehydrate()(createStore)
  (combineReducers({
    prefs,
    connection,
    state,
    database,
    log
  }));

persistStore(store, { whitelist: [ 'prefs' ] });

export default store;
