
import catalog from 'reducers/catalog';

let myActions = [
  catalog._define('FOLDER_CLEAR'),
  catalog._define('FOLDER_SELECT'),
  catalog._define('FOLDER_UPDATE_FROM_DB'),
  catalog._define('FOLDER_UPDATE_FROM_SERVER')
];

function defaultState() {
  return {
    // The working id
    id: false,

    // Is the record ready?
    ready: false,

    // Hold the DB record, or the first server record if DB has no result
    // False = not ready
    // Null  = not found
    record: false,

    // The record as found in the database
    // False = not ready
    // Null  = not found
    db: false,

    // Hold the server records, but filtered to receive only unique records
    remote: [],
  };
}

// function calculateLocal(pristine, changes) {
//   let newState = Object.assign({}, pristine);
//   for(let i in changes) {
//     console.log('Applying change ' + i);
//   }
//   return newState;
// }

export default function(state = false, action) {
  if (myActions.indexOf(action) < 0) {
    return state;
  }

  if (action.type == catalog.FOLDER_CLEAR) {
    return defaultState();
  }

  if (action.type == catalog.FOLDER_SELECT) {
    if (state.id == action.payload) {
      // We select the current file, let's keep it...
      return Object.assign({}, state);
    }

    return Object.assign({}, defaultState(), {
      id: action.payload
    });
  }

  // Here, we are working on the current id
  // if (!state.id) {
  //   console.error('No id selected and action is not FOLDER_CLEAR: ', action, state);
  //   throw new Error('No id selected and action is not FOLDER_CLEAR: ', action);
  // }

  if (state.id) {

    // Update from the DB
    if (state.id != action.payload.id) {
      console.error('Updating from DB with wrong id: ', state.id, ' <> ', action.payload.id, ' <= ', action);
      throw new Error('Updating from DB with wrong id: ' + state.id + ' <> ' + action.payload.id);
    }

    if (action.type == catalog.FOLDER_UPDATE_FROM_DB) {
      if (action.payload) {
        state = Object.assign({}, state, {
          record:  Object.assign({}, action.payload),
          db:      Object.assign({}, action.payload),
        });
      } else {
        state = Object.assign({}, state, {
          record:  null,
          db:      null
        });
      }
    }

    // Update from the Server
    if (action.type == catalog.FOLDER_UPDATE_FROM_SERVER) {
      if (action.payload) {
        // Update only if last_update is newer than stored one...
        state = Object.assign({}, state, {
          remote: Object.assign({}, action.payload),
        });
      } else {
        state = Object.assign({}, state, {
          remote: null
        });
      }
    }

    if (state.db === null && state.remote) {
      console.log("Not found in database, found in remote");
      state.record = Object.assign({}, state.remote);
    }

    // Build the change list to be acknowledged
    if (state.db && state.remote) {
      // TODO
    }
  }

  return state;
}
