!function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(9),e.exports=n(13)},function(e,t){"use strict";t["default"]=function(e){return e&&e.__esModule?e:{"default":e}},t.__esModule=!0},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={CONNECTION_SUCCESS:"CONNECTION_SUCCESS",CONNECTION_FAILED:"CONNECTION_FAILED"};t["default"]=n,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(1)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(2),o=r(u);t["default"]=function(e,t){switch(void 0===e&&(e=0),t.type){case o["default"].CONNECTION_SUCCESS:return 0;case o["default"].CONNECTION_FAILED:return Math.max(1,t.payload.httpStatusCode);default:return e}},e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){function n(){return s}function r(e){f.push(e);var t=!0;return function(){if(t){t=!1;var n=f.indexOf(e);f.splice(n,1)}}}function u(e){if(!i["default"](e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"==typeof e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,s=c(s,e)}finally{d=!1}return f.slice().forEach(function(e){return e()}),e}function o(e){c=e,u({type:a.INIT})}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var c=e,s=t,f=[],d=!1;return u({type:a.INIT}),{dispatch:u,subscribe:r,getState:n,replaceReducer:o}}t.__esModule=!0,t["default"]=u;var o=n(6),i=r(o),a={INIT:"@@redux/INIT"};t.ActionTypes=a},function(e,t){"use strict";function n(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},function(e,t){"use strict";function n(e){if(!e||"object"!=typeof e)return!1;var t="function"==typeof e.constructor?Object.getPrototypeOf(e):Object.prototype;if(null===t)return!0;var n=t.constructor;return"function"==typeof n&&n instanceof n&&r(n)===r(Object)}t.__esModule=!0,t["default"]=n;var r=function(e){return Function.prototype.toString.call(e)};e.exports=t["default"]},function(e,t){"use strict";function n(e,t){return Object.keys(e).reduce(function(n,r){return n[r]=t(e[r],r),n},{})}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return{type:a["default"].CONNECTION_SUCCESS,payload:e}}function u(e){return{type:a["default"].CONNECTION_FAILED,payload:e}}var o=n(1)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.success=r,t.failure=u;var i=n(2),a=o(i)},function(e,t,n){"use strict";var r=n(1)["default"],u=n(12)["default"];Object.defineProperty(t,"__esModule",{value:!0});var o=n(11),i=r(o),a=n(8),c=u(a);i["default"].dispatch({type:"INCREMENT"}),i["default"].dispatch({type:"INCREMENT"}),i["default"].dispatch({type:"DECREMENT"});var s={store:i["default"],actions:{connection:{success:function(){return i["default"].dispatch(c.success())},failure:function(e){return i["default"].dispatch(c.failure(e))}}}};window.appState=s,t["default"]=s,e.exports=t["default"]},function(e,t){"use strict";function n(e,t){switch(void 0===e&&(e=0),t.type){case"INCREMENT":return e+1;case"DECREMENT":return e-1;default:return e}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(1)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(14),o=n(3),i=r(o),a=n(10),c=r(a);n(3);var s=(0,u.createStore)((0,u.combineReducers)({connection:i["default"],counter:c["default"]}));s.subscribe(function(){return console.log("state update",s.getState())}),t["default"]=s,e.exports=t["default"]},function(e,t){"use strict";t["default"]=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t},t.__esModule=!0},function(e,t,n){e.exports=n.p+"css/application.css"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var u=n(4),o=r(u),i=n(17),a=r(i),c=n(16),s=r(c),f=n(15),d=r(f),l=n(5),p=r(l);t.createStore=o["default"],t.combineReducers=a["default"],t.bindActionCreators=s["default"],t.applyMiddleware=d["default"],t.compose=p["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return function(e){return function(n,r){var u=e(n,r),i=u.dispatch,c=[],s={getState:u.getState,dispatch:function(e){return i(e)}};return c=t.map(function(e){return e(s)}),i=a["default"].apply(void 0,c)(u.dispatch),o({},u,{dispatch:i})}}}t.__esModule=!0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t["default"]=u;var i=n(5),a=r(i);e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){return function(){return t(e.apply(void 0,arguments))}}function o(e,t){if("function"==typeof e)return u(e,t);if("object"!=typeof e||null===e||void 0===e)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===e?"null":typeof e)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');return a["default"](e,function(e){return u(e,t)})}t.__esModule=!0,t["default"]=o;var i=n(7),a=r(i);e.exports=t["default"]},function(e,t,n){(function(r){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){var n=t&&t.type,r=n&&'"'+n.toString()+'"'||"an action";return'Reducer "'+e+'" returned undefined handling '+r+". To ignore an action, you must explicitly return the previous state."}function i(e,t,n){var r=Object.keys(t),u=n&&n.type===s.ActionTypes.INIT?"initialState argument passed to createStore":"previous state received by the reducer";if(0===r.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!d["default"](e))return"The "+u+' has unexpected type of "'+{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+r.join('", "')+'"');var o=Object.keys(e).filter(function(e){return r.indexOf(e)<0});return o.length>0?"Unexpected "+(o.length>1?"keys":"key")+" "+('"'+o.join('", "')+'" found in '+u+". ")+"Expected to find one of the known reducer keys instead: "+('"'+r.join('", "')+'". Unexpected keys will be ignored.'):void 0}function a(e){Object.keys(e).forEach(function(t){var n=e[t],r=n(void 0,{type:s.ActionTypes.INIT});if("undefined"==typeof r)throw new Error('Reducer "'+t+'" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');var u="@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".");if("undefined"==typeof n(void 0,{type:u}))throw new Error('Reducer "'+t+'" returned undefined when probed with a random type. '+("Don't try to handle "+s.ActionTypes.INIT+' or other actions in "redux/*" ')+"namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")})}function c(e){var t,n=h["default"](e,function(e){return"function"==typeof e});try{a(n)}catch(u){t=u}var c=p["default"](n,function(){return void 0});return function(e,u){if(void 0===e&&(e=c),t)throw t;var a=!1,s=p["default"](n,function(t,n){var r=e[n],i=t(r,u);if("undefined"==typeof i){var c=o(n,u);throw new Error(c)}return a=a||i!==r,i});if("production"!==r.env.NODE_ENV){var f=i(e,s,u);f&&console.error(f)}return a?s:e}}t.__esModule=!0,t["default"]=c;var s=n(4),f=n(6),d=u(f),l=n(7),p=u(l),y=n(18),h=u(y);e.exports=t["default"]}).call(t,n(19))},function(e,t){"use strict";function n(e,t){return Object.keys(e).reduce(function(n,r){return t(e[r])&&(n[r]=e[r]),n},{})}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},function(e,t){function n(){s=!1,i.length?c=i.concat(c):f=-1,c.length&&r()}function r(){if(!s){var e=setTimeout(n);s=!0;for(var t=c.length;t;){for(i=c,c=[];++f<t;)i&&i[f].run();f=-1,t=c.length}i=null,s=!1,clearTimeout(e)}}function u(e,t){this.fun=e,this.array=t}function o(){}var i,a=e.exports={},c=[],s=!1,f=-1;a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new u(e,t)),1!==c.length||s||setTimeout(r,0)},u.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=o,a.addListener=o,a.once=o,a.off=o,a.removeListener=o,a.removeAllListeners=o,a.emit=o,a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}}]);