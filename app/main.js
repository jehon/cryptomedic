'use strict';

import store from 'store';

let list = {};

function d(type) {
  list[type] = type;
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  }
}

let appState = {
  store: store,
  actions: {
      // success:      function()              { store.dispatch({ type: c.CONNECTION_SUCCESS,       payload: null })},
    connection: {
      success:      d('CONNECTION_SUCCESS'),
      failure:      d('CONNECTION_FAILED'),
      expired:      d('CONNECTION_EXPIRED'),
      // function(httpErrorCode) { store.dispatch({ type: actionList().CONNECTION_FAILED,        payload: httpErrorCode })},
      // disconnected: function()              { store.dispatch({ type: actionList().CONNECTION_DISCONNECTED,  payload: {} })},
    },
  }
};

appState.transitions = list;

// export var transitions = list;
export function transitions() { return list; }

export default appState;
