var bundle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css/application.css"

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(3)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.transitions = transitions;

	var _store = __webpack_require__(4);

	var _store2 = _interopRequireDefault(_store);

	var list = {};

	function d(type) {
	  list[type] = type;
	  return function (payload) {
	    return _store2['default'].dispatch({ type: type, payload: payload });
	  };
	}

	var appState = {
	  store: _store2['default'],
	  actions: {
	    // success:      function()              { store.dispatch({ type: c.CONNECTION_SUCCESS,       payload: null })},
	    connection: {
	      success: d('CONNECTION_SUCCESS'),
	      failure: d('CONNECTION_FAILED'),
	      expired: d('CONNECTION_EXPIRED')
	    }
	  }
	};

	// function(httpErrorCode) { store.dispatch({ type: actionList().CONNECTION_FAILED,        payload: httpErrorCode })},
	// disconnected: function()              { store.dispatch({ type: actionList().CONNECTION_DISCONNECTED,  payload: {} })},
	appState.transitions = list;

	// export var transitions = list;

	function transitions() {
	  return list;
	}

	exports['default'] = appState;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7O3FCQUVLLE9BQU87Ozs7QUFFekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNmLE1BQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsU0FBTyxVQUFTLE9BQU8sRUFBRTtBQUN2QixXQUFPLG1CQUFNLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7R0FDekQsQ0FBQTtDQUNGOztBQUVELElBQUksUUFBUSxHQUFHO0FBQ2IsT0FBSyxvQkFBTztBQUNaLFNBQU8sRUFBRTs7QUFFUCxjQUFVLEVBQUU7QUFDVixhQUFPLEVBQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0FBQ3JDLGFBQU8sRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUM7QUFDcEMsYUFBTyxFQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztLQUd0QztHQUNGO0NBQ0YsQ0FBQzs7OztBQUVGLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7O0FBR3JCLFNBQVMsV0FBVyxHQUFHO0FBQUUsU0FBTyxJQUFJLENBQUM7Q0FBRTs7cUJBRS9CLFFBQVEiLCJmaWxlIjoiL3Zhci93d3cvY3J5cHRvbWVkaWMvYXBwL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBzdG9yZSBmcm9tICdzdG9yZSc7XG5cbmxldCBsaXN0ID0ge307XG5cbmZ1bmN0aW9uIGQodHlwZSkge1xuICBsaXN0W3R5cGVdID0gdHlwZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHBheWxvYWQpIHtcbiAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiB0eXBlLCBwYXlsb2FkOiBwYXlsb2FkIH0pO1xuICB9XG59XG5cbmxldCBhcHBTdGF0ZSA9IHtcbiAgc3RvcmU6IHN0b3JlLFxuICBhY3Rpb25zOiB7XG4gICAgICAvLyBzdWNjZXNzOiAgICAgIGZ1bmN0aW9uKCkgICAgICAgICAgICAgIHsgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBjLkNPTk5FQ1RJT05fU1VDQ0VTUywgICAgICAgcGF5bG9hZDogbnVsbCB9KX0sXG4gICAgY29ubmVjdGlvbjoge1xuICAgICAgc3VjY2VzczogICAgICBkKCdDT05ORUNUSU9OX1NVQ0NFU1MnKSxcbiAgICAgIGZhaWx1cmU6ICAgICAgZCgnQ09OTkVDVElPTl9GQUlMRUQnKSxcbiAgICAgIGV4cGlyZWQ6ICAgICAgZCgnQ09OTkVDVElPTl9FWFBJUkVEJyksXG4gICAgICAvLyBmdW5jdGlvbihodHRwRXJyb3JDb2RlKSB7IHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogYWN0aW9uTGlzdCgpLkNPTk5FQ1RJT05fRkFJTEVELCAgICAgICAgcGF5bG9hZDogaHR0cEVycm9yQ29kZSB9KX0sXG4gICAgICAvLyBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkgICAgICAgICAgICAgIHsgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBhY3Rpb25MaXN0KCkuQ09OTkVDVElPTl9ESVNDT05ORUNURUQsICBwYXlsb2FkOiB7fSB9KX0sXG4gICAgfSxcbiAgfVxufTtcblxuYXBwU3RhdGUudHJhbnNpdGlvbnMgPSBsaXN0O1xuXG4vLyBleHBvcnQgdmFyIHRyYW5zaXRpb25zID0gbGlzdDtcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2l0aW9ucygpIHsgcmV0dXJuIGxpc3Q7IH1cblxuZXhwb3J0IGRlZmF1bHQgYXBwU3RhdGU7XG4iXX0=

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(3)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _redux = __webpack_require__(5);

	var _reducersConnection = __webpack_require__(15);

	var _reducersConnection2 = _interopRequireDefault(_reducersConnection);

	var _reducersCounter = __webpack_require__(16);

	var _reducersCounter2 = _interopRequireDefault(_reducersCounter);

	__webpack_require__(15);

	var store = (0, _redux.createStore)((0, _redux.combineReducers)({
	  connection: _reducersConnection2['default'],
	  counter: _reducersCounter2['default']
	}));

	store.subscribe(function () {
	  return console.log("state update", store.getState());
	});

	exports['default'] = store;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9zdG9yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7Ozs7O3FCQUVlLE9BQU87O2tDQUdaLHFCQUFxQjs7OzsrQkFDeEIsa0JBQWtCOzs7O1FBRS9CLHFCQUFxQjs7QUFFNUIsSUFBSSxLQUFLLEdBQUcsd0JBQVksNEJBQWdCO0FBQ3RDLFlBQVUsaUNBQUE7QUFDVixTQUFPLDhCQUFBO0NBQ1IsQ0FBQyxDQUFDLENBQUM7O0FBRUosS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztDQUFBLENBQzlDLENBQUM7O3FCQUVhLEtBQUsiLCJmaWxlIjoiL3Zhci93d3cvY3J5cHRvbWVkaWMvYXBwL3N0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IGNvbm5lY3Rpb24gZnJvbSAncmVkdWNlcnMvY29ubmVjdGlvbic7XG5pbXBvcnQgY291bnRlciBmcm9tICdyZWR1Y2Vycy9jb3VudGVyJztcblxuaW1wb3J0ICdyZWR1Y2Vycy9jb25uZWN0aW9uJztcblxubGV0IHN0b3JlID0gY3JlYXRlU3RvcmUoY29tYmluZVJlZHVjZXJzKHtcbiAgY29ubmVjdGlvbixcbiAgY291bnRlclxufSkpO1xuXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgY29uc29sZS5sb2coXCJzdGF0ZSB1cGRhdGVcIiwgc3RvcmUuZ2V0U3RhdGUoKSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xuIl19

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(6);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(8);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(12);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(13);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(14);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(7);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(6);

	var _utilsIsPlainObject = __webpack_require__(7);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(10);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(11);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_utilsIsPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(10);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(14);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _main = __webpack_require__(2);

	console.warn(_main.transitions);

	exports['default'] = function (state, action) {
	  if (!state) {
	    state = {
	      connected: false,
	      authenticated: false
	    };
	  }
	  switch (action.type) {
	    case _main.transitions.CONNECTION_SUCCESS:
	      return {
	        connected: true,
	        authenticated: true
	      };
	    case _main.transitions.CONNECTION_EXPIRED:
	      return {
	        connected: true,
	        authenticated: false
	      };
	    case _main.transitions.CONNECTION_FAILED:
	      return {
	        connected: Math.max(1, action.payload),
	        authenticated: state.authenticated
	      };
	    default:
	      return state;
	  }
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9yZWR1Y2Vycy9jb25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O29CQUVlLE1BQU07O0FBRWxDLE9BQU8sQ0FBQyxJQUFJLG1CQUFhLENBQUM7O3FCQUVYLFVBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxNQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1YsU0FBSyxHQUFHO0FBQ04sZUFBUyxFQUFFLEtBQUs7QUFDaEIsbUJBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7R0FDSDtBQUNELFVBQVEsTUFBTSxDQUFDLElBQUk7QUFDakIsU0FBSyxrQkFBWSxrQkFBa0I7QUFDakMsYUFBTztBQUNMLGlCQUFTLEVBQUUsSUFBSTtBQUNmLHFCQUFhLEVBQUUsSUFBSTtPQUNwQixDQUFDO0FBQUEsQUFDSixTQUFLLGtCQUFZLGtCQUFrQjtBQUNqQyxhQUFPO0FBQ0wsaUJBQVMsRUFBRSxJQUFJO0FBQ2YscUJBQWEsRUFBRSxLQUFLO09BQ3JCLENBQUM7QUFBQSxBQUNKLFNBQUssa0JBQVksaUJBQWlCO0FBQ2hDLGFBQU87QUFDTCxpQkFBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDdEMscUJBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtPQUNuQyxDQUFDO0FBQUEsQUFDSjtBQUNFLGFBQU8sS0FBSyxDQUFDO0FBQUEsR0FDaEI7Q0FDRiIsImZpbGUiOiIvdmFyL3d3dy9jcnlwdG9tZWRpYy9hcHAvcmVkdWNlcnMvY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgdHJhbnNpdGlvbnMgfSBmcm9tICdtYWluJztcblxuY29uc29sZS53YXJuKHRyYW5zaXRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICBpZiAoIXN0YXRlKSB7XG4gICAgc3RhdGUgPSB7XG4gICAgICBjb25uZWN0ZWQ6IGZhbHNlLFxuICAgICAgYXV0aGVudGljYXRlZDogZmFsc2VcbiAgICB9O1xuICB9XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIHRyYW5zaXRpb25zLkNPTk5FQ1RJT05fU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgYXV0aGVudGljYXRlZDogdHJ1ZVxuICAgICAgfTtcbiAgICBjYXNlIHRyYW5zaXRpb25zLkNPTk5FQ1RJT05fRVhQSVJFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICAgICAgYXV0aGVudGljYXRlZDogZmFsc2VcbiAgICAgIH07XG4gICAgY2FzZSB0cmFuc2l0aW9ucy5DT05ORUNUSU9OX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbm5lY3RlZDogTWF0aC5tYXgoMSwgYWN0aW9uLnBheWxvYWQpLFxuICAgICAgICBhdXRoZW50aWNhdGVkOiBzdGF0ZS5hdXRoZW50aWNhdGVkXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiJdfQ==

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function counter(state, action) {
	  if (state === undefined) state = 0;

	  switch (action.type) {
	    case 'INCREMENT':
	      return state + 1;
	    case 'DECREMENT':
	      return state - 1;
	    default:
	      return state;
	  }
	}

	exports['default'] = counter;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9yZWR1Y2Vycy9jb3VudGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBTSxNQUFNLEVBQUU7TUFBbkIsS0FBSyxnQkFBTCxLQUFLLEdBQUcsQ0FBQzs7QUFDeEIsVUFBUSxNQUFNLENBQUMsSUFBSTtBQUNuQixTQUFLLFdBQVc7QUFDZCxhQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7QUFBQSxBQUNuQixTQUFLLFdBQVc7QUFDZCxhQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7QUFBQSxBQUNuQjtBQUNFLGFBQU8sS0FBSyxDQUFDO0FBQUEsR0FDZDtDQUNGOztxQkFFYyxPQUFPIiwiZmlsZSI6Ii92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9yZWR1Y2Vycy9jb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBjb3VudGVyKHN0YXRlID0gMCwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgY2FzZSAnSU5DUkVNRU5UJzpcbiAgICByZXR1cm4gc3RhdGUgKyAxO1xuICBjYXNlICdERUNSRU1FTlQnOlxuICAgIHJldHVybiBzdGF0ZSAtIDE7XG4gIGRlZmF1bHQ6XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50ZXI7XG4iXX0=

/***/ }
/******/ ]);