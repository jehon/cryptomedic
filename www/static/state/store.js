
import { createStore, combineReducers } from '../../../node_modules/redux/es/redux.mjs';

export const ACT_FOLDER_INVALIDATE = 'ACT_FOLDER_INVALIDATE';
export const ACT_FOLDER_STORE      = 'ACT_FOLDER_STORE';

export const ACT_USER_LOGIN        = 'ACT_USER_LOGIN';
export const ACT_USER_LOGOUT       = 'ACT_USER_LOGOUT';

export const ACT_DEFINITIONS_STORE = 'ACT_DEFINITIONS_STORE';

// TODO: should deep-clone a bit more

// store API is { subscribe, dispatch, getState }.
const folderReducer = (state = false, action) => {
	switch (action.type) {
		case ACT_USER_LOGOUT:
		case ACT_FOLDER_INVALIDATE:
			return false;
		case ACT_FOLDER_STORE:
			if (!action.payload) {
				return false;
			}
			// Test empty object
			// https://stackoverflow.com/a/32108184/1954789
			if (Object.keys(action.payload).length === 0 && action.payload.constructor === Object) {
				return false;
			}

			// if (!(action.payload instanceof Folder)) {
			// 	console.error('ACT_FOLDER_STORE expect a \'Folder\' class object');
			// 	return false;
			// }
			return action.payload;
		default:
			return state;
	}
};

const userReducer = (state = false, action) => {
	switch (action.type) {
		case ACT_USER_LOGOUT:
			return false;
		case ACT_USER_LOGIN:
			return action.payload;
		default:
			return state;
	}
};

const definitionsReducer = (state = false, action) => {
	switch (action.type) {
		case ACT_USER_LOGOUT:
			return false;
		case ACT_DEFINITIONS_STORE:
		case ACT_USER_LOGIN:
			// Untill now, we have the same object on both user and definitions
			return action.payload;
		default:
			return state;
	}
};

// Integration with dev-tools
// https://github.com/zalmoxisus/redux-devtools-extension#usage
/* eslint-disable no-underscore-dangle */
/* istanbul ignore next */
const store = createStore(
	combineReducers({
		folder:      folderReducer,
		user:        userReducer,
		definitions: definitionsReducer
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// applyMiddleware(...middleware)
);
/* eslint-enable */

export default store;
