
import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connectionReducers';
import state from 'reducers/stateReducers';

let store = createStore(combineReducers({
  connection,
  state
}));

export default store;
