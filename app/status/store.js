'use strict';

import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connection';

import 'reducers/connection';

let store = createStore(combineReducers({
  connection
}));

store.subscribe(() =>
  console.log("state update", store.getState())
);

export default store;
