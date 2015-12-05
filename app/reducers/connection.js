'use strict';

import transitions from 'reducers/transitions';

console.log(transitions);

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  transitions._define(action.type, 'CONNECTION_SUCCESS', function(state) {
    return {
      connected: true,
      authenticated: true
    };
  })
  if (action.type == transitions.CONNECTION_EXPIRED) {
    return {
      connected: true,
      authenticated: false
    };
  }
  if (action.type == transitions.CONNECTION_FAILED) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated
    };
  }
  return state;
}
