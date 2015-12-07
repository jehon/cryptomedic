'use strict';

import catalog from 'reducers/catalog';

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  // Call to function not very clean
  catalog._define(action.type, 'CONNECTION_SUCCESS', function() {
    return {
      connected: true,
      authenticated: true
    };
  });

  catalog._define(action.type, 'CONNECTION_EXPIRED', function() {
    return {
      connected: true,
      authenticated: false
    };
  });

  catalog._define(action.type, 'CONNECTION_FAILED', function() {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated
    };
  });

  return state;
}
