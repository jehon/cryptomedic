
import catalog from 'reducers/catalog';

catalog._define('CONNECTION_SUCCESS');
catalog._define('CONNECTION_EXPIRED');
catalog._define('CONNECTION_FAILED');

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false
    };
  }
  if (action.type == catalog.CONNECTION_SUCCESS) {
    return {
      connected: true,
      authenticated: true
    };
  };

  if (action.type == catalog.CONNECTION_EXPIRED) {
    return {
      connected: true,
      authenticated: false
    };
  };

  if (action.type == catalog.CONNECTION_FAILED) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated
    };
  };

  return state;
}
