
import { createStore } from 'redux';
import counter from 'actions/counter';

console.log("here");
console.info("here", counter);

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
);

export default store;
