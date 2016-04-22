
import catalog from 'reducers/catalog';

catalog._define('FOLDER_CLEAR');
catalog._define('FOLDER_SELECT');
catalog._define('FOLDER_DOES_NOT_EXISTS');

export default function(state, action) {
  if (!state) {
    state = {
      selected_id: null,
      selected_file: false
    };
  }

  if (action.type == catalog.FOLDER_CLEAR) {
    state = Object.assign({}, state, {
      selected_id: null,
      selected_file: false
    });
  }

  if (action.type == catalog.FOLDER_SELECT) {
    state = Object.assign({}, state, {
      selected_id: action.payload.id,
      selected_file: action.payload,
      exists: true
    });
  }

  if (action.type == catalog.FOLDER_DOES_NOT_EXISTS) {
    state = Object.assign({}, state, {
      selected_file: null,
      exists: false
    });
  }

  return state;
}
