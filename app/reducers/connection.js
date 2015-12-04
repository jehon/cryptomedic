'use strict';

import { actionList } from 'main';

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  switch (action.type) {
    case actionList().CONNECTION_SUCCESS:
      return {
        connected: true,
        authenticated: true
      };
    case actionList().CONNECTION_FAILED:
      return {
        connected: Math.max(1, action.payload),
        authenticated: state.authenticated
      };
    case actionList().CONNECTION_DISCONNECTED:
      return {
        connected: false,
        authenticated: false
      };
    default:
      return state;
  }
}
