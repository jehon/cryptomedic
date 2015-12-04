'use strict';

import store from 'store';

export function actionList() {
  return {
    CONNECTION_SUCCESS:       'CONNECTION_SUCCESS',
    CONNECTION_FAILED:        'CONNECTION_FAILED',
    CONNECTION_DISCONNECTED:  'CONNECTION_DISCONNECTED'
  };
};

function d(type, payload) {
  return store.dispatch.bind(null, { type: type, payload: payload });
}

let appState = {
  store: store,
  actions: {
      // success:      function()              { store.dispatch({ type: c.CONNECTION_SUCCESS,       payload: null })},
    connection: {
      // success:      d(c.CONNECTION_SUCCESS, null),
      failure:      function(httpErrorCode) { store.dispatch({ type: actionList().CONNECTION_FAILED,        payload: httpErrorCode })},
      disconnected: function()              { store.dispatch({ type: actionList().CONNECTION_DISCONNECTED,  payload: {} })},
    }
  }
}

export default appState;
