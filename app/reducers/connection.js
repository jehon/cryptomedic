'use strict';

import transitions from 'status/transitions';

console.log(transitions);

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  switch (action.type) {
    // case status.transitions.CONNECTION_SUCCESS:
    //   return {
    //     connected: true,
    //     authenticated: true
    //   };
    // case status.transitions.CONNECTION_EXPIRED:
    //   return {
    //     connected: true,
    //     authenticated: false
    //   };
    // case status.transitions.CONNECTION_FAILED:
    //   return {
    //     connected: Math.max(1, action.payload),
    //     authenticated: state.authenticated
    //   };
    default:
      return state;
  }
}
