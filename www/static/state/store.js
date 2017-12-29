
const ACT_FOLDER_INVALIDATE = 'ACT_FOLDER_INVALIDATE';
const ACT_FOLDER_STORE      = 'ACT_FOLDER_STORE';

// store API is { subscribe, dispatch, getState }.
const store = (function() {
	const folderReducer = (state = false, action) => {
	  switch (action.type) {
	    case ACT_FOLDER_INVALIDATE:
	    	return false;
	    case ACT_FOLDER_STORE:
	    	return action.payload;
	    default:
	      return state
	  };
	}

	return redux.createStore(
		redux.combineReducers({
				folder: folderReducer
			})
  		// applyMiddleware(...middleware)
	);

	// store.dispatch({ type: 'INCREMENT' })
	// store.subscribe(() =>
	//   console.log(store.getState())
	// )

})();
