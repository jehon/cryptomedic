
import catalog from 'reducers/catalog';

catalog._define('CONNECTION_SUCCESS');
catalog._define('CONNECTION_EXPIRED');
catalog._define('CONNECTION_FAILED');
catalog._define('CONNECTION_SERVER_ERROR');
catalog._define('CONNECTION_SETTINGS');

export default function(state, action) {
  if (!state) {
    state = {
      connected: false,
      authenticated: false,
      serverError: false,
      settings: false
    };
  }
  if ((action.type == catalog.CONNECTION_SUCCESS)
      || (action.type == catalog.CONNECTION_SETTINGS)) {
    return {
      connected: true,
      authenticated: true,
      serverError: false,
      settings: (action.type == catalog.CONNECTION_SETTINGS ? action.payload : state.settings)
    };
  }

  if (action.type == catalog.CONNECTION_EXPIRED) {
    return {
      connected: true,
      authenticated: false,
      serverError: false,
      settings: false
    };
  }

  if ((action.type == catalog.CONNECTION_FAILED)
      || (action.type == catalog.CONNECTION_SERVER_ERROR)) {
    return {
      connected: Math.max(1, action.payload),
      authenticated: state.authenticated,
      serverError: (action.type == catalog.CONNECTION_SERVER_ERROR ? action.payload : false),
      settings: state.settings
    };
  }

  return state;
}
