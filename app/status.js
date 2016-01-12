"use strict";

import catalog from "reducers/catalog";
import store from "reducers/store";
import connection from "actions/connectionActions";
import state from "actions/stateActions";
import database from "actions/databaseActions";

import objectify from "helpers/objectify";
import create from "helpers/create";
import date2CanonicString from "helpers/date2CanonicString";

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
      create,
      date2CanonicString
    }
  };
}
