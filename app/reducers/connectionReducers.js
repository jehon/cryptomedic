
import catalog from 'reducers/catalog';

catalog._define('CONNECTION_SUCCESS');
catalog._define('CONNECTION_EXPIRED');
catalog._define('CONNECTION_FAILED');
catalog._define('CONNECTION_SERVER_ERROR');

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false,
      serverError: false
    };
  }
  if (action.type == catalog.CONNECTION_SUCCESS) {
    return {
      connected: true,
      authenticated: true,
      serverError: false
    };
  };

  if (action.type == catalog.CONNECTION_EXPIRED) {
    return {
      connected: true,
      authenticated: false,
      serverError: false
    };
  };

  if (action.type == catalog.CONNECTION_FAILED) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated,
      serverError: false
    };
  };

  if (action.type == catalog.CONNECTION_SERVER_ERROR) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated,
      serverError: action.payload
    };
  };

  return state;
}
