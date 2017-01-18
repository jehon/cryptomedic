
import { combineReducers, createStore } from 'redux';
import stateReducers                                              from 'reducers/stateReducers';
import catalog                                                    from 'reducers/catalog';

let store = createStore(
  function(state, action) {
    if (typeof(window.__karma__) == 'undefined') {
      console.log('Action: ', action.type, ' with ', action.payload);
    }

    // Work the state
    state = combineReducers({
      state: stateReducers,
    })(state, action);
    return state;
  }
);

export default store;
