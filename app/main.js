'use strict';

import store from 'store';
import * as connection from 'actions/connection';

store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1

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
