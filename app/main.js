'use strict';

import store from 'store';
// import * as connection from 'actions/connection';

const catalog = {
  CONNECTION_SUCCESS:       'CONNECTION_SUCCESS',
  CONNECTION_FAILED:        'CONNECTION_FAILED',
  CONNECTION_DISCONNECTED:  'CONNECTION_DISCONNECTED',
}

let appState = {
  store: store,
  actions: {
    connection: {
      success:      function() { store.dispatch({ type: catalog.CONNECTION_SUCCESS, payload: null })},
      failure:      function(httpErrorCode) { store.dispatch({ type: catalog.CONNECTION_FAILED, payload: httpErrorCode })},
      disconnected: function() { store.dispatch({ type: catalog.CONNECTION_DISCONNECTED, payload: null })},
    }
  }
}

export default appState;
