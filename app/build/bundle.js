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
	module.exports = __webpack_require__(8);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./application.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./application.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/* div[ng-cloak], div.ng-cloak {\r\n  background-color: red;\r\n  width: 100px;\r\n  height: 100px;\r\n  display: block;\r\n}\r\n */\r\n/*\r\n * Globals\r\n */\r\n\r\n::-webkit-calendar-picker-indicator {\r\n  color: red;\r\n  background-image: url(" + __webpack_require__(4) + ");\r\n}\r\n\r\n.debug {\r\n\t/* color: white; */\r\n\t/* background-color: yellow; */\r\n\tborder-left: solid 15px yellow;\r\n\tborder-right: solid 15px yellow;\r\n \tborder-color: yellow;\r\n}\r\n\r\n.debug_infos {\r\n  font-size: xx-small; \r\n  font-style: italic;\r\n  color: lightgray;\r\n  text-align: right;\r\n}\r\n\r\n\r\n.toberemoved {\r\n  background-color: red;\r\n}\r\n\r\n.loading {\r\n\ttext-align: center;\r\n}\r\n\r\n.loading:before {\r\n\tcontent: url(" + __webpack_require__(5) + ");\r\n}\r\n\r\n/*\r\n * Base structure\r\n */\r\n\r\nhtml, body {\r\n  height: 100%;\r\n}\r\n\r\nbody > div.container {\r\n \tpadding-bottom: 60px;\r\n}\r\n\r\n.submenu {\r\n  background-color: lightgray;\r\n}\r\n\r\nh1 > img {\r\n  height: 35px;\r\n  margin-right: 20px;\r\n}\r\n/********************************************\r\n * Reports\r\n */\r\n\r\ntable.reporting > thead {\r\n  border: black 2px solid;\r\n  color: white;\r\n}\r\n\r\ntable.reporting > thead > tr > th {\r\n  background-color: gray;\r\n}\r\n\r\ntable.reporting > thead > tr > th.b_right {\r\n    border-right: white 1px solid;\r\n}\r\n\r\ntable.reporting > thead > tr > th.b_left {\r\n    border-left: white 1px solid;\r\n}\r\n\r\ntable.reporting > thead > tr > th.b_bottom {\r\n    border-bottom: white 1px solid;\r\n}\r\n\r\ntable.reporting > thead > tr > th.b_top {\r\n    border-top: white 1px solid;\r\n}\r\n\r\ntable.reporting > thead > tr > th.b_all {\r\n    border: white 1px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td, table.reporting > thead > tr > th {\r\n   text-align: center;\r\n}\r\n\r\ntable.reporting > tbody {\r\n  border: black 2px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td:nth-child(1) {\r\n  text-align: left;\r\n}\r\n\r\ntable.reporting > tbody > tr:nth-child(odd) {\r\n  background-color: lightgray;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.subheader {\r\n  background-color: gray;\r\n  padding: 5px;\r\n  padding-top: 10px;\r\n  text-align: center;\r\n  font-weight: bold;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.b_right {\r\n    border-right: gray 1px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.b_left {\r\n    border-left: gray 1px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.b_bottom {\r\n    border-bottom: gray 1px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.b_top {\r\n    border-top: gray 1px solid;\r\n}\r\n\r\ntable.reporting > tbody > tr > td.b_all {\r\n    border: gray 1px solid;\r\n}\r\n\r\n/********************************************\r\n * Data display (modes, emtpyValues)\r\n */\r\n.summary .emptyValue {\r\n  display: none;\r\n}\r\n\r\n.related .emptyValue {\r\n  display: none;\r\n}\r\n\r\n.modeRead .emptyValue {\r\n  color: lightgray;\r\n  font-size: smaller;\r\n  background-color: white;\r\n}\r\n\r\n.modeRead .notModeRead {\r\n  display: none;\r\n}\r\n\r\n.modeWrite .notModeWrite {\r\n  display: none;\r\n}\r\n\r\n.catchedError {\r\n  color: rgb(180,0,0);\r\n}\r\n\r\n.emptyValue .catchedError {\r\n  color: lightgray;\r\n}\r\n/**********************************************\r\n * Fieldsets (databoxes)\r\n */\r\nfieldset {\r\n  border-radius: 10px;\r\n  padding: 10px;\r\n  border-style:solid; \r\n  border-width:2px; \r\n  border-color:#002060; \r\n}\r\n\r\nfieldset > legend {\r\n  font-size: 120%;\r\n  color: #004A94;\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  width: auto;\r\n  margin-bottom: 0px;\r\n}\r\n\r\nfieldset > legend > label {\r\n  padding: 0px;\r\n}\r\n\r\nfieldset > table {\r\n  width: 100%;\r\n}\r\n\r\nfieldset > table > thead {\r\n  font-style: italic;\r\n}\r\n\r\nfieldset > table > tbody > tr:nth-child(odd) {\r\n  background-color: rgb(230, 230, 230);\r\n}\r\n\r\nfieldset > table > tbody > tr > td:nth-of-type(1) { /*Setting the width of column 1.*/\r\n  width: 120px;\r\n  font-weight: 700;\r\n}\r\n\r\nfieldset > table > tbody > tr > td:nth-of-type(3), fieldset > table > thead > tr > th:nth-of-type(3) { /*Setting the width of column 1.*/\r\n\tborder-left: solid blue 1px;\r\n\tpadding-left: 5px;\r\n}\r\n\r\n/********************************************\r\n * Input\r\n */\r\ninput.ng-required {\r\n  border: 1px solid blue;\r\n}\r\n\r\ninput.ng-invalid, .error {\r\n  border: 3px solid red;\r\n}\r\n\r\ninput[type=date] {\r\n  /*line-height: inherit !important; */\r\n  line-height: normal !important;  /* Workaround bootstrap */\r\n}\r\n\r\ninput[type=checkbox].form-control {\r\n  width: auto;\r\n}\r\n\r\n.jserror {\r\n  \tcolor: red;\r\n  \tmin-height: 20px;\r\n  \tbackground-image: url(" + __webpack_require__(6) + ");\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-size: 20px;\r\n\tpadding-left: 25px; \r\n}\r\n\r\n.ui-datepicker-month, .ui-datepicker-year {\r\n\tcolor: black;\r\n}\r\n\r\n/********************************************\r\n * Menu / buttons\r\n */\r\nbutton img {\r\n\theight: 17px;\r\n}\r\n\r\n.left-menu-button {\r\n  width: 100%; \r\n  white-space: normal;\r\n  line-height: 1;\r\n}\r\n\r\n.navbar img {\r\n\theight: \t\t25px;\r\n\tpadding-right:  10px;\t\r\n} \r\n\r\n/********************************************\r\n *  Marks and graphics\r\n */\r\n.markContainer {\r\n  /* position: absolute -> relative to the first non-static element -> relative to 0,0 = pseudo-static */\r\n  position: relative;\r\n}\r\n\r\n.mark {\r\n  color: red;\r\n  position: absolute;\r\n  margin: 0;\r\n  padding: 0;\r\n  border: 0;  \r\n  margin-top: -10px;\r\n}\r\n\r\n.mark span {\r\n  margin-left: -50%;       \r\n}\r\n\r\n.mark.hovered > span {\r\n  background-color: red;\r\n  color: white;\r\n  z-index: 100;\r\n}\r\n\r\ntr.hovered {\r\n  background-color: gray;\r\n}\r\n\r\n/********************************************\r\n *  Overlays \r\n */\r\n.site-wrapper {\r\n\tdisplay: table;\r\n\twidth: 100%;\r\n\theight: 100%; /* For at least Firefox */\r\n\tmin-height: 100%;\r\n\tposition: absolute;\r\n\ttext-align: center;\r\n  \tbackground: rgba(3, 3, 3, 0.6);\r\n/* \tbackground-color: #333; */\r\n\tcolor: #fff;\r\n\tz-index: 500;\r\n}\r\n\r\n.site-wrapper-inner {\r\n\tdisplay: table-cell;\r\n\tvertical-align: top;\r\n\tbackground-color: #333;  \r\n/*  \tbackground: rgba(3, 3, 3, 1); */\r\n}\r\n\r\n.cover-container {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n}\r\n\r\n/* Padding for spacing */\r\n.inner {\r\n  padding: 30px;\r\n}\r\n\r\n/**********************************************\r\n * Summary\r\n */\r\ntable.summary table > tbody > tr > td:nth-of-type(1) { /*Setting the width of column 1.*/\r\n  width: 120px;\r\n  font-weight: 700;\r\n  padding-right: 10px;\r\n}\r\n\r\n/*******************************************\r\n/* Data Legend\r\n */\r\ntable.datalegend {\r\n    font-size: 9px;\r\n    padding: 0px;\r\n    width: 100%;\r\n}\r\n\r\ntable.datalegend > thead > tr> th {\r\n    font-size: 9px;\r\n    padding: 2px;\r\n}\r\n\r\n/********************************************\r\n/******************************************** OLD\r\n/********************************************/\r\n\r\n/*\r\n * Affix and center\r\n */\r\n\r\n@media (min-width: 768px) {\r\n  /* Pull out the header and footer */\r\n  .masthead {\r\n    position: fixed;\r\n    top: 0;\r\n  }\r\n  .mastfoot {\r\n    position: fixed;\r\n    bottom: 0;\r\n  }\r\n  /* Start the vertical centering */\r\n  .site-wrapper-inner {\r\n    vertical-align: middle;\r\n  }\r\n  /* Handle the widths */\r\n  .masthead,\r\n  .mastfoot,\r\n  .cover-container {\r\n    width: 100%; /* Must be percentage or pixels for horizontal alignment */\r\n  }\r\n}\r\n\r\n@media (min-width: 992px) {\r\n  .masthead,\r\n  .mastfoot,\r\n  .cover-container {\r\n    width: 700px;\r\n  }\r\n}\r\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/cal.gif"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/waiting.gif"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "img/error.png"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(9)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	__webpack_require__(10);

	var _statusStore = __webpack_require__(11);

	var _statusStore2 = _interopRequireDefault(_statusStore);

	function d(type) {
	  transitions[type] = type;
	  return function (payload) {
	    return _statusStore2['default'].dispatch({ type: type, payload: payload });
	  };
	}

	exports['default'] = function () {
	  return {
	    store: _statusStore2['default'],
	    actions: actions,
	    transitions: transitions
	  };
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9zdGF0dXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7OztRQUVOLHNCQUFzQjs7MkJBRVgsY0FBYzs7OztBQUVoQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDZixhQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFNBQU8sVUFBUyxPQUFPLEVBQUU7QUFDdkIsV0FBTyx5QkFBTSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0dBQ3pELENBQUE7Q0FDRjs7cUJBRWMsWUFBVztBQUN4QixTQUFPO0FBQ0wsU0FBSywwQkFBTztBQUNaLFdBQU8sRUFBRSxPQUFPO0FBQ2hCLGVBQVcsRUFBRSxXQUFXO0dBQ3pCLENBQUM7Q0FDSCIsImZpbGUiOiIvdmFyL3d3dy9jcnlwdG9tZWRpYy9hcHAvc3RhdHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ3JlZHVjZXJzL3RyYW5zaXRpb25zJztcblxuaW1wb3J0IHN0b3JlIGZyb20gJ3N0YXR1cy9zdG9yZSc7XG5cbmZ1bmN0aW9uIGQodHlwZSkge1xuICB0cmFuc2l0aW9uc1t0eXBlXSA9IHR5cGU7XG4gIHJldHVybiBmdW5jdGlvbihwYXlsb2FkKSB7XG4gICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzdG9yZTogc3RvcmUsXG4gICAgYWN0aW9uczogYWN0aW9ucyxcbiAgICB0cmFuc2l0aW9uczogdHJhbnNpdGlvbnNcbiAgfTtcbn1cbiJdfQ==

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var transitions = {
	  _define: function _define(actionType, constant, fn) {
	    this[constant] = constant;
	    if (actionType == constant) {
	      return fn(state);
	    }
	  }
	};

	exports["default"] = transitions;
	module.exports = exports["default"];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9yZWR1Y2Vycy90cmFuc2l0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFJLFdBQVcsR0FBRztBQUNoQixTQUFPLEVBQUUsaUJBQVMsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7QUFDMUMsUUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQztBQUMxQixRQUFJLFVBQVUsSUFBSSxRQUFRLEVBQUU7QUFDMUIsYUFBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEI7R0FDRjtDQUNGLENBQUM7O3FCQUVhLFdBQVciLCJmaWxlIjoiL3Zhci93d3cvY3J5cHRvbWVkaWMvYXBwL3JlZHVjZXJzL3RyYW5zaXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5sZXQgdHJhbnNpdGlvbnMgPSB7XG4gIF9kZWZpbmU6IGZ1bmN0aW9uKGFjdGlvblR5cGUsIGNvbnN0YW50LCBmbikge1xuICAgIHRoaXNbY29uc3RhbnRdID0gY29uc3RhbnQ7XG4gICAgaWYgKGFjdGlvblR5cGUgPT0gY29uc3RhbnQpIHtcbiAgICAgIHJldHVybiBmbihzdGF0ZSk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2l0aW9ucztcbiJdfQ==

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(9)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _redux = __webpack_require__(12);

	var _reducersConnection = __webpack_require__(22);

	var _reducersConnection2 = _interopRequireDefault(_reducersConnection);

	__webpack_require__(22);

	var store = (0, _redux.createStore)((0, _redux.combineReducers)({
	  connection: _reducersConnection2['default']
	}));

	store.subscribe(function () {
	  return console.log("state update", store.getState());
	});

	exports['default'] = store;
	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9zdGF0dXMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7OztxQkFFZSxPQUFPOztrQ0FHWixxQkFBcUI7Ozs7UUFFckMscUJBQXFCOztBQUU1QixJQUFJLEtBQUssR0FBRyx3QkFBWSw0QkFBZ0I7QUFDdEMsWUFBVSxpQ0FBQTtDQUNYLENBQUMsQ0FBQyxDQUFDOztBQUVKLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Q0FBQSxDQUM5QyxDQUFDOztxQkFFYSxLQUFLIiwiZmlsZSI6Ii92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9zdGF0dXMvc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgY29ubmVjdGlvbiBmcm9tICdyZWR1Y2Vycy9jb25uZWN0aW9uJztcblxuaW1wb3J0ICdyZWR1Y2Vycy9jb25uZWN0aW9uJztcblxubGV0IHN0b3JlID0gY3JlYXRlU3RvcmUoY29tYmluZVJlZHVjZXJzKHtcbiAgY29ubmVjdGlvblxufSkpO1xuXG5zdG9yZS5zdWJzY3JpYmUoKCkgPT5cbiAgY29uc29sZS5sb2coXCJzdGF0ZSB1cGRhdGVcIiwgc3RvcmUuZ2V0U3RhdGUoKSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xuIl19

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(13);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(15);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(19);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(20);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(21);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(14);

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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(13);

	var _utilsIsPlainObject = __webpack_require__(14);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(17);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(18);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(17);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(21);

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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(9)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _reducersTransitions = __webpack_require__(10);

	var _reducersTransitions2 = _interopRequireDefault(_reducersTransitions);

	console.log(_reducersTransitions2['default']);

	exports['default'] = function (state, action) {
	  if (!state) {
	    state = {
	      connected: false,
	      authenticated: false
	    };
	  }
	  _reducersTransitions2['default']._define(action.type, state, 'CONNECTION_SUCCESS', function () {
	    return {
	      connected: true,
	      authenticated: true
	    };
	  });
	  // if (action.type == transitions.CONNECTION_EXPIRED) {
	  //   return {
	  //     connected: true,
	  //     authenticated: false
	  //   };
	  // }
	  // if (action.type == transitions.CONNECTION_FAILED) {
	  //   return {
	  //     connected: Math.max(1, action.payload),
	  //     authenticated: state.authenticated
	  //   };
	  // }
	  return state;
	};

	module.exports = exports['default'];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2NyeXB0b21lZGljL2FwcC9yZWR1Y2Vycy9jb25uZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7bUNBRVcsc0JBQXNCOzs7O0FBRTlDLE9BQU8sQ0FBQyxHQUFHLGtDQUFhLENBQUM7O3FCQUVWLFVBQVMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxNQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1YsU0FBSyxHQUFHO0FBQ04sZUFBUyxFQUFFLEtBQUs7QUFDaEIsbUJBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7R0FDSDtBQUNELG1DQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxZQUFXO0FBQ3ZFLFdBQU87QUFDTCxlQUFTLEVBQUUsSUFBSTtBQUNmLG1CQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0dBQ0gsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7O0FBYUYsU0FBTyxLQUFLLENBQUM7Q0FDZCIsImZpbGUiOiIvdmFyL3d3dy9jcnlwdG9tZWRpYy9hcHAvcmVkdWNlcnMvY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zaXRpb25zIGZyb20gJ3JlZHVjZXJzL3RyYW5zaXRpb25zJztcblxuY29uc29sZS5sb2codHJhbnNpdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gIGlmICghc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIGNvbm5lY3RlZDogZmFsc2UsXG4gICAgICBhdXRoZW50aWNhdGVkOiBmYWxzZVxuICAgIH07XG4gIH1cbiAgdHJhbnNpdGlvbnMuX2RlZmluZShhY3Rpb24udHlwZSwgc3RhdGUsICdDT05ORUNUSU9OX1NVQ0NFU1MnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAgICAgYXV0aGVudGljYXRlZDogdHJ1ZVxuICAgIH07XG4gIH0pXG4gIC8vIGlmIChhY3Rpb24udHlwZSA9PSB0cmFuc2l0aW9ucy5DT05ORUNUSU9OX0VYUElSRUQpIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgY29ubmVjdGVkOiB0cnVlLFxuICAvLyAgICAgYXV0aGVudGljYXRlZDogZmFsc2VcbiAgLy8gICB9O1xuICAvLyB9XG4gIC8vIGlmIChhY3Rpb24udHlwZSA9PSB0cmFuc2l0aW9ucy5DT05ORUNUSU9OX0ZBSUxFRCkge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBjb25uZWN0ZWQ6IE1hdGgubWF4KDEsIGFjdGlvbi5wYXlsb2FkKSxcbiAgLy8gICAgIGF1dGhlbnRpY2F0ZWQ6IHN0YXRlLmF1dGhlbnRpY2F0ZWRcbiAgLy8gICB9O1xuICAvLyB9XG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdfQ==

/***/ }
/******/ ]);