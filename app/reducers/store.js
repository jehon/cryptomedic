
import { createStore } from 'redux';
import { combineReducers } from 'redux';

import connection from 'reducers/connectionReducers';

let store = createStore(combineReducers({
  connection
}));

store.subscribe(() =>
  console.log("state updated to: ", store.getState())
);

export default store;
