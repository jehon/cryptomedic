
import catalog from 'reducers/catalog';

catalog._define('STATE_BUSY');
catalog._define('STATE_READY');
catalog._define('STATE_CLEAR');

export default function(state, action) {
  if (!state || action.type == catalog.STATE_CLEAR) {
    state = {
      busy: 0,
      messages: '',
      max: 0
    };
  }
  if (action.type == catalog.STATE_BUSY) {
    return {
      busy: state.busy + 1,
      messages: (state.messages + '<br>' + action.payload).trim(),
      max: state.max + 1
    };
  }

  if (action.type == catalog.STATE_READY) {
    if (state.busy <= 1) {
      return {
        busy: 0,
        messages: '',
        max: 0
      };
    }
    return {
      busy: state.busy - 1,
      messages: state.messages,
      max: state.max
    };
  }

  return state;
}
