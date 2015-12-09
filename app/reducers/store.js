
import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connectionReducers';
import state from 'reducers/stateReducers';
import database from 'reducers/databaseReducers';

let store = createStore(combineReducers({
  connection,
  state,
  database
}));

export default store;
