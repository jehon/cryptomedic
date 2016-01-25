
import { createStore } from "redux";
import counter from "actions/counter";

let store = createStore(counter);

// store.subscribe(() =>
//   console.log("State updated", store.getState())
// );

export default store;
