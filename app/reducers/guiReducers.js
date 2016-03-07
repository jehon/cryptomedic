
import catalog from 'reducers/catalog';

catalog._define('GUI_CLEAR_SELECTED_FILE');
catalog._define('GUI_SET_SELECT_FILE');

export default function(state, action) {
  if (!state) {
    state = {
      selected_file: false
    };
  }
  if (action.type == catalog.GUI_CLEAR_SELECTED_FILE) {
    state = Object.assign({}, state, { selected_file: false });
  }

  if (action.type == catalog.GUI_SET_SELECT_FILE) {
    state = Object.assign({}, state, { selected_file: action.payload });
  }

  return state;
}
