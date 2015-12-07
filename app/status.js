'use strict';

import catalog from 'reducers/catalog';

import store from 'status/store';

function d(type) {
  transitions[type] = type;
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  }
}

export default function() {
  return {
    store: store,
    // actions: actions,
    catalog: catalog
  };
}
