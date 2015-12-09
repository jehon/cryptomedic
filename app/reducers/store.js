
import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connectionReducers';
import state from 'reducers/stateReducers';

let store = createStore(combineReducers({
  connection,
  state
}));

store.subscribe(function() {
  console.log("state updated to: ", store.getState())
});

export default store;
