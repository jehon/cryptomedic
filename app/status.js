'use strict';

import 'reducers/transitions';

import store from 'status/store';

function d(type) {
  transitions[type] = type;
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  }
}

export default function() {
  return {
    store: store,
    // actions: actions,
    transitions: transitions
  };
}
