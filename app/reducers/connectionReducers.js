
import catalog from 'reducers/catalog';

// TODO: check all this usage
catalog._define('CONNECTION_SUCCESS');      // connection ok
catalog._define('CONNECTION_EXPIRED');      // Forbidden (need to login again) -> the reducer?? redirect to login
catalog._define('CONNECTION_FAILED');
catalog._define('CONNECTION_NOT_FOUND');
catalog._define('CONNECTION_SERVER_ERROR'); // 500
catalog._define('CONNECTION_SETTINGS');     // Login/loginCheck success, here are my connections settings
catalog._define('CONNECTION_AUTH_FAILED');  // Login failed

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false,
      serverError: false,
      settings: false
    };
  }
  if (action.type == catalog.CONNECTION_SUCCESS) {
    return {
      connected: true,
      authenticated: true,
      serverError: false,
      settings: state.settings
    };
  }

  if (action.type == catalog.CONNECTION_SETTINGS) {
    return Object.assign({}, state, { settings: action.payload });
  }

  if (action.type == catalog.CONNECTION_EXPIRED) {
    return {
      connected: true,
      authenticated: false,
      serverError: false,
      settings: false
    };
  }

  if (action.type == catalog.CONNECTION_AUTH_FAILED) {
    return {
      connected: true,
      authenticated: false,
      serverError: action.payload,
      settings: false
    };
  }

  if ((action.type == catalog.CONNECTION_FAILED)
      || (action.type == catalog.CONNECTION_SERVER_ERROR)
      || (action.type == catalog.CONNECTION_NOT_FOUND)) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated,
      serverError: (action.type == catalog.CONNECTION_FAILED ? false : action.payload),
      settings: state.settings
    };
  }

  return state;
}
