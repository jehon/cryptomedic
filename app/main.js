'use strict';

import store from 'store';
import * as connection from 'actions/connection';

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

let appState = {
  store: store,
  actions: {
    connection: {
      success: () => store.dispatch(connection.success()),
      failure: (httpErrorCode) => store.dispatch(connection.failure(httpErrorCode))
    }
  }
}

export default appState;
