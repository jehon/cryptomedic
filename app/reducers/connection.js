'use strict';

import transitions from 'reducers/transitions';

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  // Call to function not very clean
  transitions._define(action.type, state, 'CONNECTION_SUCCESS', function() {
    return {
      connected: true,
      authenticated: true
    };
  });
  // if (action.type == transitions.CONNECTION_EXPIRED) {
  //   return {
  //     connected: true,
  //     authenticated: false
  //   };
  // }
  // if (action.type == transitions.CONNECTION_FAILED) {
  //   return {
  //     connected: Math.max(1, action.payload),
  //     authenticated: state.authenticated
  //   };
  // }
  return state;
}
