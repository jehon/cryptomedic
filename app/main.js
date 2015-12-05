'use strict';

import store from 'store';

let transitions = {};

function d(type) {
  transitions[type] = type;
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  }
}

let actions = {
  connection: {
    success:      d('CONNECTION_SUCCESS'),
    failure:      d('CONNECTION_FAILED'),
    expired:      d('CONNECTION_EXPIRED'),
  },
};

export { store, actions, transitions };
