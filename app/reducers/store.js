
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
// import { persistStore, autoRehydrate } from 'redux-persist';
// import { devTools, persistState } from 'redux-devtools';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import connection from 'reducers/connectionReducers';
import state from 'reducers/stateReducers';
import database from 'reducers/databaseReducers';
import log from 'reducers/logReducers';

// const loggerMiddleware = createLogger({
//   level: 'info',
//   collapsed: true,
// });

if (typeof(window.__karma__) == 'undefined') {
  // disable logger?
}

let finalCreateStore = compose(
  //enables middleware:
  applyMiddleware(
    // thunkMiddleware,
    // loggerMiddleware
  )
  ,
  // Provides support for DevTools:
  // devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist sessions
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)
(createStore);

// function configureStore(initialState) {
//   const store = autoRehydrate()(finalCreateStore)(
//       combineReducers({
//         connection,
//         state,
//         database
//       })
//     );
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//   return store;
// }
// const store = configureStore();

// persistStore(store, {whitelist: []}, () => {
//   store.dispatch(customRehydrate());
// });


let store = finalCreateStore(combineReducers({
  connection,
  state,
  database,
  log
}));

export default store;
