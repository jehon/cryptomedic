'use strict';

import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connection';
import counter from 'reducers/counter';

import 'reducers/connection';

let store = createStore(combineReducers({
  connection,
  counter
}));

store.subscribe(() =>
  console.log("state update", store.getState())
);

export default store;
