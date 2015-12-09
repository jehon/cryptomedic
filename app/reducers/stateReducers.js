
import catalog from 'reducers/catalog';

catalog._define('STATE_BUSY');
catalog._define('STATE_READY');
catalog._define('STATE_CLEAR');

export default function(state, action) {
  if (!state || action.type == catalog.STATE_CLEAR) {
    state = {
      ready: 0,
      messages: "",
      max: 0
    };
  }
  if (action.type == catalog.STATE_BUSY) {
    return {
      ready: state.ready + 1,
      messages: state.messages + "<br>" + action.payload,
      max: state.max + 1
    };
  };

  if (action.type == catalog.STATE_READY) {
    if (state.ready <= 1) {
      return {
        ready: 0,
        messages: "",
        max: 0
      }
    }
    return {
      ready: state.ready - 1,
      messages: state.messages,
      max: state.max
    };
  };

  return state;
}
