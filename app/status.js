"use strict";

import catalog from "reducers/catalog";
import store from "reducers/store";
import connection from "actions/connectionActions";
import state from "actions/stateActions";
import database from "actions/databaseActions";

import objectify from "helpers/objectify";
import create from "helpers/create";

function d(type) {
  return function(payload) {
    return store.dispatch({ type: type, payload: payload });
  };
}

export default function() {
  return {
    store: store,
    actions: {
      connection,
      state,
      database
    },
    catalog: catalog,
    helpers: {
      objectify,
      create
    }
  };
}
