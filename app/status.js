'use strict';

import catalog from 'reducers/catalog';
import store from 'reducers/store';
import connection from 'actions/connectionActions';

function d(type) {
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  }
}

export default function() {
  return {
    store: store,
    actions: {
      connection
    },
    catalog: catalog
  };
}
