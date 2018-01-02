
const ACT_FOLDER_INVALIDATE = 'ACT_FOLDER_INVALIDATE';
const ACT_FOLDER_STORE      = 'ACT_FOLDER_STORE';

// store API is { subscribe, dispatch, getState }.
const store = (function() {
	const folderReducer = (state = false, action) => {
	  switch (action.type) {
	    case ACT_FOLDER_INVALIDATE:
	    	return false;
	    case ACT_FOLDER_STORE:
	    	if (!action.payload) {
	    		return false;
	    	}
	    	// https://stackoverflow.com/a/32108184/1954789
	    	if (Object.keys(action.payload).length === 0 && action.payload.constructor === Object) {
	    		return false;
	    	}
	    	return action.payload;
	    default:
	      return state
	  };
	}

	// Integration with dev-tools
	// https://github.com/zalmoxisus/redux-devtools-extension#usage
	/* eslint-disable no-underscore-dangle */
	/* istanbul ignore next */
	return redux.createStore(
		redux.combineReducers({
				folder: folderReducer
			}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  		// applyMiddleware(...middleware)
	);
	/* eslint-enable */

	// store.subscribe(() =>
	//   console.log(store.getState())
	// )
})();
