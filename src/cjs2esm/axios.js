var module = {
  exports: {}
};
var exports = module.exports;
(function () {
  // Axios v1.3.6 Copyright (c) 2023 Matt Zabriskie and contributors
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.axios = factory());
  })(this, function () {
    'use strict';

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    } // utils is a library of generic helper functions non-specific to axios


    var toString = Object.prototype.toString;
    var getPrototypeOf = Object.getPrototypeOf;

    var kindOf = function (cache) {
      return function (thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(Object.create(null));

    var kindOfTest = function kindOfTest(type) {
      type = type.toLowerCase();
      return function (thing) {
        return kindOf(thing) === type;
      };
    };

    var typeOfTest = function typeOfTest(type) {
      return function (thing) {
        return _typeof(thing) === type;
      };
    };
    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */


    var isArray = Array.isArray;
    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */

    var isUndefined = typeOfTest('undefined');
    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */

    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }
    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */


    var isArrayBuffer = kindOfTest('ArrayBuffer');
    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */

    function isArrayBufferView(val) {
      var result;

      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }

      return result;
    }
    /**
     * Determine if a value is a String
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */


    var isString = typeOfTest('string');
    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */

    var isFunction = typeOfTest('function');
    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */

    var isNumber = typeOfTest('number');
    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */

    var isObject = function isObject(thing) {
      return thing !== null && _typeof(thing) === 'object';
    };
    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */


    var isBoolean = function isBoolean(thing) {
      return thing === true || thing === false;
    };
    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */


    var isPlainObject = function isPlainObject(val) {
      if (kindOf(val) !== 'object') {
        return false;
      }

      var prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };
    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */


    var isDate = kindOfTest('Date');
    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */

    var isFile = kindOfTest('File');
    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */

    var isBlob = kindOfTest('Blob');
    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */

    var isFileList = kindOfTest('FileList');
    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */

    var isStream = function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    };
    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */


    var isFormData = function isFormData(thing) {
      var kind;
      return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' || // detect form-data instance
      kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
    };
    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */


    var isURLSearchParams = kindOfTest('URLSearchParams');
    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */

    var trim = function trim(str) {
      return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {any}
     */


    function forEach(obj, fn) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$allOwnKeys = _ref.allOwnKeys,
          allOwnKeys = _ref$allOwnKeys === void 0 ? false : _ref$allOwnKeys; // Don't bother if no value provided


      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      var i;
      var l; // Force an array if not already something iterable

      if (_typeof(obj) !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        var keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        var len = keys.length;
        var key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    function findKey(obj, key) {
      key = key.toLowerCase();
      var keys = Object.keys(obj);
      var i = keys.length;

      var _key;

      while (i-- > 0) {
        _key = keys[i];

        if (key === _key.toLowerCase()) {
          return _key;
        }
      }

      return null;
    }

    var _global = function () {
      /*eslint no-undef:0*/
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
    }();

    var isContextDefined = function isContextDefined(context) {
      return !isUndefined(context) && context !== _global;
    };
    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     *
     * @returns {Object} Result of all merge properties
     */


    function
    /* obj1, obj2, obj3, ... */
    merge() {
      var _ref2 = isContextDefined(this) && this || {},
          caseless = _ref2.caseless;

      var result = {};

      var assignValue = function assignValue(val, key) {
        var targetKey = caseless && findKey(result, key) || key;

        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };

      for (var i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }

      return result;
    }
    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */


    var extend = function extend(a, b, thisArg) {
      var _ref3 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
          allOwnKeys = _ref3.allOwnKeys;

      forEach(b, function (val, key) {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {
        allOwnKeys: allOwnKeys
      });
      return a;
    };
    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */


    var stripBOM = function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }

      return content;
    };
    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */


    var inherits = function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };
    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */


    var toFlatObject = function toFlatObject(sourceObj, destObj, filter, propFilter) {
      var props;
      var i;
      var prop;
      var merged = {};
      destObj = destObj || {}; // eslint-disable-next-line no-eq-null,eqeqeq

      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;

        while (i-- > 0) {
          prop = props[i];

          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }

        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };
    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */


    var endsWith = function endsWith(str, searchString, position) {
      str = String(str);

      if (position === undefined || position > str.length) {
        position = str.length;
      }

      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */


    var toArray = function toArray(thing) {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      var i = thing.length;
      if (!isNumber(i)) return null;
      var arr = new Array(i);

      while (i-- > 0) {
        arr[i] = thing[i];
      }

      return arr;
    };
    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names


    var isTypedArray = function (TypedArray) {
      // eslint-disable-next-line func-names
      return function (thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));
    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */


    var forEachEntry = function forEachEntry(obj, fn) {
      var generator = obj && obj[Symbol.iterator];
      var iterator = generator.call(obj);
      var result;

      while ((result = iterator.next()) && !result.done) {
        var pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };
    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */


    var matchAll = function matchAll(regExp, str) {
      var matches;
      var arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };
    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */


    var isHTMLForm = kindOfTest('HTMLFormElement');

    var toCamelCase = function toCamelCase(str) {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      });
    };
    /* Creating a function that will check if an object has a property. */


    var hasOwnProperty = function (_ref4) {
      var hasOwnProperty = _ref4.hasOwnProperty;
      return function (obj, prop) {
        return hasOwnProperty.call(obj, prop);
      };
    }(Object.prototype);
    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */


    var isRegExp = kindOfTest('RegExp');

    var reduceDescriptors = function reduceDescriptors(obj, reducer) {
      var descriptors = Object.getOwnPropertyDescriptors(obj);
      var reducedDescriptors = {};
      forEach(descriptors, function (descriptor, name) {
        if (reducer(descriptor, name, obj) !== false) {
          reducedDescriptors[name] = descriptor;
        }
      });
      Object.defineProperties(obj, reducedDescriptors);
    };
    /**
     * Makes all methods read-only
     * @param {Object} obj
     */


    var freezeMethods = function freezeMethods(obj) {
      reduceDescriptors(obj, function (descriptor, name) {
        // skip restricted props in strict mode
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
          return false;
        }

        var value = obj[name];
        if (!isFunction(value)) return;
        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = function () {
            throw Error('Can not rewrite read-only method \'' + name + '\'');
          };
        }
      });
    };

    var toObjectSet = function toObjectSet(arrayOrString, delimiter) {
      var obj = {};

      var define = function define(arr) {
        arr.forEach(function (value) {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
      return obj;
    };

    var noop = function noop() {};

    var toFiniteNumber = function toFiniteNumber(value, defaultValue) {
      value = +value;
      return Number.isFinite(value) ? value : defaultValue;
    };

    var ALPHA = 'abcdefghijklmnopqrstuvwxyz';
    var DIGIT = '0123456789';
    var ALPHABET = {
      DIGIT: DIGIT,
      ALPHA: ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };

    var generateString = function generateString() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
      var alphabet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ALPHABET.ALPHA_DIGIT;
      var str = '';
      var length = alphabet.length;

      while (size--) {
        str += alphabet[Math.random() * length | 0];
      }

      return str;
    };
    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */


    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
    }

    var toJSONObject = function toJSONObject(obj) {
      var stack = new Array(10);

      var visit = function visit(source, i) {
        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }

          if (!('toJSON' in source)) {
            stack[i] = source;
            var target = isArray(source) ? [] : {};
            forEach(source, function (value, key) {
              var reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });
            stack[i] = undefined;
            return target;
          }
        }

        return source;
      };

      return visit(obj, 0);
    };

    var utils = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isBoolean: isBoolean,
      isObject: isObject,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isRegExp: isRegExp,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isTypedArray: isTypedArray,
      isFileList: isFileList,
      forEach: forEach,
      merge: merge,
      extend: extend,
      trim: trim,
      stripBOM: stripBOM,
      inherits: inherits,
      toFlatObject: toFlatObject,
      kindOf: kindOf,
      kindOfTest: kindOfTest,
      endsWith: endsWith,
      toArray: toArray,
      forEachEntry: forEachEntry,
      matchAll: matchAll,
      isHTMLForm: isHTMLForm,
      hasOwnProperty: hasOwnProperty,
      hasOwnProp: hasOwnProperty,
      // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors: reduceDescriptors,
      freezeMethods: freezeMethods,
      toObjectSet: toObjectSet,
      toCamelCase: toCamelCase,
      noop: noop,
      toFiniteNumber: toFiniteNumber,
      findKey: findKey,
      global: _global,
      isContextDefined: isContextDefined,
      ALPHABET: ALPHABET,
      generateString: generateString,
      isSpecCompliantForm: isSpecCompliantForm,
      toJSONObject: toJSONObject
    };
    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */

    function AxiosError(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }

    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils.toJSONObject(this.config),
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype$1 = AxiosError.prototype;
    var descriptors = {};
    ['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL' // eslint-disable-next-line func-names
    ].forEach(function (code) {
      descriptors[code] = {
        value: code
      };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {
      value: true
    }); // eslint-disable-next-line func-names

    AxiosError.from = function (error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype$1);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, function (prop) {
        return prop !== 'isAxiosError';
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.cause = error;
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    }; // eslint-disable-next-line strict


    var httpAdapter = null;
    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */

    function isVisitable(thing) {
      return utils.isPlainObject(thing) || utils.isArray(thing);
    }
    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */


    function removeBrackets(key) {
      return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }
    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */


    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }
    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */


    function isFlatArray(arr) {
      return utils.isArray(arr) && !arr.some(isVisitable);
    }

    var predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });
    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */

    function toFormData(obj, formData, options) {
      if (!utils.isObject(obj)) {
        throw new TypeError('target must be an object');
      } // eslint-disable-next-line no-param-reassign


      formData = formData || new FormData(); // eslint-disable-next-line no-param-reassign

      options = utils.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils.isUndefined(source[option]);
      });
      var metaTokens = options.metaTokens; // eslint-disable-next-line no-use-before-define

      var visitor = options.visitor || defaultVisitor;
      var dots = options.dots;
      var indexes = options.indexes;

      var _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;

      var useBlob = _Blob && utils.isSpecCompliantForm(formData);

      if (!utils.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils.isDate(value)) {
          return value.toISOString();
        }

        if (!useBlob && utils.isBlob(value)) {
          throw new AxiosError('Blob is not supported. Use a Buffer instead.');
        }

        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }
      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */


      function defaultVisitor(value, key, path) {
        var arr = value;

        if (value && !path && _typeof(value) === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2); // eslint-disable-next-line no-param-reassign

            value = JSON.stringify(value);
          } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);
            arr.forEach(function each(el, index) {
              !(utils.isUndefined(el) || el === null) && formData.append( // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
      }

      var stack = [];
      var exposedHelpers = Object.assign(predicates, {
        defaultVisitor: defaultVisitor,
        convertValue: convertValue,
        isVisitable: isVisitable
      });

      function build(value, path) {
        if (utils.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);
        utils.forEach(value, function each(el, key) {
          var result = !(utils.isUndefined(el) || el === null) && visitor.call(formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers);

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });
        stack.pop();
      }

      if (!utils.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);
      return formData;
    }
    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */


    function encode$1(str) {
      var charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }
    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */


    function AxiosURLSearchParams(params, options) {
      this._pairs = [];
      params && toFormData(params, this, options);
    }

    var prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      var _encode = encoder ? function (value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };
    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */


    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    }
    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @param {?object} options
     *
     * @returns {string} The formatted url
     */


    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var _encode = options && options.encode || encode;

      var serializeFn = options && options.serialize;
      var serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    var InterceptorManager = /*#__PURE__*/function () {
      function InterceptorManager() {
        _classCallCheck(this, InterceptorManager);

        this.handlers = [];
      }
      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */


      _createClass(InterceptorManager, [{
        key: "use",
        value: function use(fulfilled, rejected, options) {
          this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
          });
          return this.handlers.length - 1;
        }
        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         *
         * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
         */

      }, {
        key: "eject",
        value: function eject(id) {
          if (this.handlers[id]) {
            this.handlers[id] = null;
          }
        }
        /**
         * Clear all interceptors from the stack
         *
         * @returns {void}
         */

      }, {
        key: "clear",
        value: function clear() {
          if (this.handlers) {
            this.handlers = [];
          }
        }
        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         *
         * @returns {void}
         */

      }, {
        key: "forEach",
        value: function forEach(fn) {
          utils.forEach(this.handlers, function forEachHandler(h) {
            if (h !== null) {
              fn(h);
            }
          });
        }
      }]);

      return InterceptorManager;
    }();

    var InterceptorManager$1 = InterceptorManager;
    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
    var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;
    var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;
    var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;
    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     *
     * @returns {boolean}
     */

    var isStandardBrowserEnv = function () {
      var product;

      if (typeof navigator !== 'undefined' && ((product = navigator.product) === 'ReactNative' || product === 'NativeScript' || product === 'NS')) {
        return false;
      }

      return typeof window !== 'undefined' && typeof document !== 'undefined';
    }();
    /**
     * Determine if we're running in a standard browser webWorker environment
     *
     * Although the `isStandardBrowserEnv` method indicates that
     * `allows axios to run in a web worker`, the WebWorker will still be
     * filtered out due to its judgment standard
     * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
     * This leads to a problem when axios post `FormData` in webWorker
     */


    var isStandardBrowserWebWorkerEnv = function () {
      return typeof WorkerGlobalScope !== 'undefined' && // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
    }();

    var platform = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      isStandardBrowserEnv: isStandardBrowserEnv,
      isStandardBrowserWebWorkerEnv: isStandardBrowserWebWorkerEnv,
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
    };

    function toURLEncodedForm(data, options) {
      return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function visitor(value, key, path, helpers) {
          if (platform.isNode && utils.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }
    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */


    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils.matchAll(/\w+|\[(\w*)]/g, name).map(function (match) {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }
    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */


    function arrayToObject(arr) {
      var obj = {};
      var keys = Object.keys(arr);
      var i;
      var len = keys.length;
      var key;

      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }

      return obj;
    }
    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */


    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        var name = path[index++];
        var isNumericKey = Number.isFinite(+name);
        var isLast = index >= path.length;
        name = !name && utils.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils.isObject(target[name])) {
          target[name] = [];
        }

        var result = buildPath(path, value, target[name], index);

        if (result && utils.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
        var obj = {};
        utils.forEachEntry(formData, function (name, value) {
          buildPath(parsePropPath(name), value, obj, 0);
        });
        return obj;
      }

      return null;
    }

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': undefined
    };
    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */

    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    var defaults = {
      transitional: transitionalDefaults,
      adapter: ['xhr', 'http'],
      transformRequest: [function transformRequest(data, headers) {
        var contentType = headers.getContentType() || '';
        var hasJSONContentType = contentType.indexOf('application/json') > -1;
        var isObjectPayload = utils.isObject(data);

        if (isObjectPayload && utils.isHTMLForm(data)) {
          data = new FormData(data);
        }

        var isFormData = utils.isFormData(data);

        if (isFormData) {
          if (!hasJSONContentType) {
            return data;
          }

          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }

        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }

        if (utils.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        var isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            var _FormData = this.env && this.env.FormData;

            return toFormData(isFileList ? {
              'files[]': data
            } : data, _FormData && new _FormData(), this.formSerializer);
          }
        }

        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var JSONRequested = this.responseType === 'json';

        if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
          var silentJSONParsing = transitional && transitional.silentJSONParsing;
          var strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }

              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*'
        }
      }
    };
    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    var defaults$1 = defaults; // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers

    var ignoreDuplicateOf = utils.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);
    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */

    var parseHeaders = function (rawHeaders) {
      var parsed = {};
      var key;
      var val;
      var i;
      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || parsed[key] && ignoreDuplicateOf[key]) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });
      return parsed;
    };

    var $internals = Symbol('internals');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      var tokens = Object.create(null);
      var tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      var match;

      while (match = tokensRE.exec(str)) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    var isValidHeaderName = function isValidHeaderName(str) {
      return /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
    };

    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (isHeaderNameFilter) {
        value = header;
      }

      if (!utils.isString(value)) return;

      if (utils.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, function (w, _char, str) {
        return _char.toUpperCase() + str;
      });
    }

    function buildAccessors(obj, header) {
      var accessorName = utils.toCamelCase(' ' + header);
      ['get', 'set', 'has'].forEach(function (methodName) {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function value(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    var AxiosHeaders = /*#__PURE__*/function (_Symbol$iterator, _Symbol$toStringTag) {
      function AxiosHeaders(headers) {
        _classCallCheck(this, AxiosHeaders);

        headers && this.set(headers);
      }

      _createClass(AxiosHeaders, [{
        key: "set",
        value: function set(header, valueOrRewrite, rewrite) {
          var self = this;

          function setHeader(_value, _header, _rewrite) {
            var lHeader = normalizeHeader(_header);

            if (!lHeader) {
              throw new Error('header name must be a non-empty string');
            }

            var key = utils.findKey(self, lHeader);

            if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
              self[key || _header] = normalizeValue(_value);
            }
          }

          var setHeaders = function setHeaders(headers, _rewrite) {
            return utils.forEach(headers, function (_value, _header) {
              return setHeader(_value, _header, _rewrite);
            });
          };

          if (utils.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders(header), valueOrRewrite);
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }

          return this;
        }
      }, {
        key: "get",
        value: function get(header, parser) {
          header = normalizeHeader(header);

          if (header) {
            var key = utils.findKey(this, header);

            if (key) {
              var value = this[key];

              if (!parser) {
                return value;
              }

              if (parser === true) {
                return parseTokens(value);
              }

              if (utils.isFunction(parser)) {
                return parser.call(this, value, key);
              }

              if (utils.isRegExp(parser)) {
                return parser.exec(value);
              }

              throw new TypeError('parser must be boolean|regexp|function');
            }
          }
        }
      }, {
        key: "has",
        value: function has(header, matcher) {
          header = normalizeHeader(header);

          if (header) {
            var key = utils.findKey(this, header);
            return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }

          return false;
        }
      }, {
        key: "delete",
        value: function _delete(header, matcher) {
          var self = this;
          var deleted = false;

          function deleteHeader(_header) {
            _header = normalizeHeader(_header);

            if (_header) {
              var key = utils.findKey(self, _header);

              if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                delete self[key];
                deleted = true;
              }
            }
          }

          if (utils.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }

          return deleted;
        }
      }, {
        key: "clear",
        value: function clear(matcher) {
          var keys = Object.keys(this);
          var i = keys.length;
          var deleted = false;

          while (i--) {
            var key = keys[i];

            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }

          return deleted;
        }
      }, {
        key: "normalize",
        value: function normalize(format) {
          var self = this;
          var headers = {};
          utils.forEach(this, function (value, header) {
            var key = utils.findKey(headers, header);

            if (key) {
              self[key] = normalizeValue(value);
              delete self[header];
              return;
            }

            var normalized = format ? formatHeader(header) : String(header).trim();

            if (normalized !== header) {
              delete self[header];
            }

            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }
      }, {
        key: "concat",
        value: function concat() {
          var _this$constructor;

          for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
            targets[_key] = arguments[_key];
          }

          return (_this$constructor = this.constructor).concat.apply(_this$constructor, [this].concat(targets));
        }
      }, {
        key: "toJSON",
        value: function toJSON(asStrings) {
          var obj = Object.create(null);
          utils.forEach(this, function (value, header) {
            value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
          });
          return obj;
        }
      }, {
        key: _Symbol$iterator,
        value: function value() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
      }, {
        key: "toString",
        value: function toString() {
          return Object.entries(this.toJSON()).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                header = _ref2[0],
                value = _ref2[1];

            return header + ': ' + value;
          }).join('\n');
        }
      }, {
        key: _Symbol$toStringTag,
        get: function get() {
          return 'AxiosHeaders';
        }
      }], [{
        key: "from",
        value: function from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }
      }, {
        key: "concat",
        value: function concat(first) {
          var computed = new this(first);

          for (var _len2 = arguments.length, targets = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            targets[_key2 - 1] = arguments[_key2];
          }

          targets.forEach(function (target) {
            return computed.set(target);
          });
          return computed;
        }
      }, {
        key: "accessor",
        value: function accessor(header) {
          var internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          var accessors = internals.accessors;
          var prototype = this.prototype;

          function defineAccessor(_header) {
            var lHeader = normalizeHeader(_header);

            if (!accessors[lHeader]) {
              buildAccessors(prototype, _header);
              accessors[lHeader] = true;
            }
          }

          utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }
      }]);

      return AxiosHeaders;
    }(Symbol.iterator, Symbol.toStringTag);

    AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);
    utils.freezeMethods(AxiosHeaders.prototype);
    utils.freezeMethods(AxiosHeaders);
    var AxiosHeaders$1 = AxiosHeaders;
    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */

    function transformData(fns, response) {
      var config = this || defaults$1;
      var context = response || config;
      var headers = AxiosHeaders$1.from(context.headers);
      var data = context.data;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });
      headers.normalize();
      return data;
    }

    function isCancel(value) {
      return !!(value && value.__CANCEL__);
    }
    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */


    function CanceledError(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */

    function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;

      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
      }
    }

    var cookies = platform.isStandardBrowserEnv ? // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    }() : // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    }();
    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */

    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }
    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */


    function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
    }
    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */


    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }

      return requestedURL;
    }

    var isURLSameOrigin = platform.isStandardBrowserEnv ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;
      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */

      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);
      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */

      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();

    function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }
    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */


    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      var bytes = new Array(samplesCount);
      var timestamps = new Array(samplesCount);
      var head = 0;
      var tail = 0;
      var firstSampleTS;
      min = min !== undefined ? min : 1000;
      return function push(chunkLength) {
        var now = Date.now();
        var startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;
        var i = tail;
        var bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        var passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    function progressEventReducer(listener, isDownloadStream) {
      var bytesNotified = 0;

      var _speedometer = speedometer(50, 250);

      return function (e) {
        var loaded = e.loaded;
        var total = e.lengthComputable ? e.total : undefined;
        var progressBytes = loaded - bytesNotified;

        var rate = _speedometer(progressBytes);

        var inRange = loaded <= total;
        bytesNotified = loaded;
        var data = {
          loaded: loaded,
          total: total,
          progress: total ? loaded / total : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
          event: e
        };
        data[isDownloadStream ? 'download' : 'upload'] = true;
        listener(data);
      };
    }

    var isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

    var xhrAdapter = isXHRAdapterSupported && function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
        var responseType = config.responseType;
        var onCanceled;

        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }

          if (config.signal) {
            config.signal.removeEventListener('abort', onCanceled);
          }
        }

        if (utils.isFormData(requestData) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv)) {
          requestHeaders.setContentType(false); // Let the browser set it
        }

        var request = new XMLHttpRequest(); // HTTP basic authentication

        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
        }

        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          } // Prepare the response


          var responseHeaders = AxiosHeaders$1.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
          var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response); // Clean up request

          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            } // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request


            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            } // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'


            setTimeout(onloadend);
          };
        } // Handle browser request cancellation (as opposed to a manual cancellation)


        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request)); // Clean up request

          request = null;
        }; // Handle low level network errors


        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request)); // Clean up request

          request = null;
        }; // Handle timeout


        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
          var transitional = config.transitional || transitionalDefaults;

          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }

          reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request)); // Clean up request

          request = null;
        }; // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.


        if (platform.isStandardBrowserEnv) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

          if (xsrfValue) {
            requestHeaders.set(config.xsrfHeaderName, xsrfValue);
          }
        } // Remove Content-Type if data is undefined


        requestData === undefined && requestHeaders.setContentType(null); // Add headers to the request

        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        } // Add withCredentials to request if needed


        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        } // Add responseType to request if needed


        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        } // Handle progress if needed


        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
        } // Not all browsers support upload events


        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
        }

        if (config.cancelToken || config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = function onCanceled(cancel) {
            if (!request) {
              return;
            }

            reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          config.cancelToken && config.cancelToken.subscribe(onCanceled);

          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
          }
        }

        var protocol = parseProtocol(fullPath);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
          return;
        } // Send the request


        request.send(requestData || null);
      });
    };

    var knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter
    };
    utils.forEach(knownAdapters, function (fn, value) {
      if (fn) {
        try {
          Object.defineProperty(fn, 'name', {
            value: value
          });
        } catch (e) {// eslint-disable-next-line no-empty
        }

        Object.defineProperty(fn, 'adapterName', {
          value: value
        });
      }
    });
    var adapters = {
      getAdapter: function getAdapter(adapters) {
        adapters = utils.isArray(adapters) ? adapters : [adapters];
        var _adapters = adapters,
            length = _adapters.length;
        var nameOrAdapter;
        var adapter;

        for (var i = 0; i < length; i++) {
          nameOrAdapter = adapters[i];

          if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
            break;
          }
        }

        if (!adapter) {
          if (adapter === false) {
            throw new AxiosError("Adapter ".concat(nameOrAdapter, " is not supported by the environment"), 'ERR_NOT_SUPPORT');
          }

          throw new Error(utils.hasOwnProp(knownAdapters, nameOrAdapter) ? "Adapter '".concat(nameOrAdapter, "' is not available in the build") : "Unknown adapter '".concat(nameOrAdapter, "'"));
        }

        if (!utils.isFunction(adapter)) {
          throw new TypeError('adapter is not a function');
        }

        return adapter;
      },
      adapters: knownAdapters
    };
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */

    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError(null, config);
      }
    }
    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */


    function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = AxiosHeaders$1.from(config.headers); // Transform request data

      config.data = transformData.call(config, config.transformRequest);

      if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
      }

      var adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config); // Transform response data

        response.data = transformData.call(config, config.transformResponse, response);
        response.headers = AxiosHeaders$1.from(response.headers);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config); // Transform response data

          if (reason && reason.response) {
            reason.response.data = transformData.call(config, config.transformResponse, reason.response);
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    var headersToObject = function headersToObject(thing) {
      return thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
    };
    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */


    function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};

      function getMergedValue(target, source, caseless) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge.call({
            caseless: caseless
          }, target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }

        return source;
      } // eslint-disable-next-line consistent-return


      function mergeDeepProperties(a, b, caseless) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(a, b, caseless);
        } else if (!utils.isUndefined(a)) {
          return getMergedValue(undefined, a, caseless);
        }
      } // eslint-disable-next-line consistent-return


      function valueFromConfig2(a, b) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(undefined, b);
        }
      } // eslint-disable-next-line consistent-return


      function defaultToConfig2(a, b) {
        if (!utils.isUndefined(b)) {
          return getMergedValue(undefined, b);
        } else if (!utils.isUndefined(a)) {
          return getMergedValue(undefined, a);
        }
      } // eslint-disable-next-line consistent-return


      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(undefined, a);
        }
      }

      var mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: function headers(a, b) {
          return mergeDeepProperties(headersToObject(a), headersToObject(b), true);
        }
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(config1[prop], config2[prop], prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    }

    var VERSION = "1.3.6";
    var validators$1 = {}; // eslint-disable-next-line func-names

    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
      validators$1[type] = function validator(thing) {
        return _typeof(thing) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });
    var deprecatedWarnings = {};
    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */

    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      } // eslint-disable-next-line func-names


      return function (value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true; // eslint-disable-next-line no-console

          console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };
    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */


    function assertOptions(options, schema, allowUnknown) {
      if (_typeof(options) !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
      }

      var keys = Object.keys(options);
      var i = keys.length;

      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];

        if (validator) {
          var value = options[opt];
          var result = value === undefined || validator(value, opt, options);

          if (result !== true) {
            throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }

          continue;
        }

        if (allowUnknown !== true) {
          throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions: assertOptions,
      validators: validators$1
    };
    var validators = validator.validators;
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */

    var Axios = /*#__PURE__*/function () {
      function Axios(instanceConfig) {
        _classCallCheck(this, Axios);

        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager$1(),
          response: new InterceptorManager$1()
        };
      }
      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */


      _createClass(Axios, [{
        key: "request",
        value: function request(configOrUrl, config) {
          /*eslint no-param-reassign:0*/
          // Allow for axios('example/url'[, config]) a la fetch API
          if (typeof configOrUrl === 'string') {
            config = config || {};
            config.url = configOrUrl;
          } else {
            config = configOrUrl || {};
          }

          config = mergeConfig(this.defaults, config);
          var _config = config,
              transitional = _config.transitional,
              paramsSerializer = _config.paramsSerializer,
              headers = _config.headers;

          if (transitional !== undefined) {
            validator.assertOptions(transitional, {
              silentJSONParsing: validators.transitional(validators["boolean"]),
              forcedJSONParsing: validators.transitional(validators["boolean"]),
              clarifyTimeoutError: validators.transitional(validators["boolean"])
            }, false);
          }

          if (paramsSerializer != null) {
            if (utils.isFunction(paramsSerializer)) {
              config.paramsSerializer = {
                serialize: paramsSerializer
              };
            } else {
              validator.assertOptions(paramsSerializer, {
                encode: validators["function"],
                serialize: validators["function"]
              }, true);
            }
          } // Set config.method


          config.method = (config.method || this.defaults.method || 'get').toLowerCase();
          var contextHeaders; // Flatten headers

          contextHeaders = headers && utils.merge(headers.common, headers[config.method]);
          contextHeaders && utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (method) {
            delete headers[method];
          });
          config.headers = AxiosHeaders$1.concat(contextHeaders, headers); // filter out skipped interceptors

          var requestInterceptorChain = [];
          var synchronousRequestInterceptors = true;
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
              return;
            }

            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
          });
          var responseInterceptorChain = [];
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          });
          var promise;
          var i = 0;
          var len;

          if (!synchronousRequestInterceptors) {
            var chain = [dispatchRequest.bind(this), undefined];
            chain.unshift.apply(chain, requestInterceptorChain);
            chain.push.apply(chain, responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);

            while (i < len) {
              promise = promise.then(chain[i++], chain[i++]);
            }

            return promise;
          }

          len = requestInterceptorChain.length;
          var newConfig = config;
          i = 0;

          while (i < len) {
            var onFulfilled = requestInterceptorChain[i++];
            var onRejected = requestInterceptorChain[i++];

            try {
              newConfig = onFulfilled(newConfig);
            } catch (error) {
              onRejected.call(this, error);
              break;
            }
          }

          try {
            promise = dispatchRequest.call(this, newConfig);
          } catch (error) {
            return Promise.reject(error);
          }

          i = 0;
          len = responseInterceptorChain.length;

          while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
          }

          return promise;
        }
      }, {
        key: "getUri",
        value: function getUri(config) {
          config = mergeConfig(this.defaults, config);
          var fullPath = buildFullPath(config.baseURL, config.url);
          return buildURL(fullPath, config.params, config.paramsSerializer);
        }
      }]);

      return Axios;
    }(); // Provide aliases for supported request methods


    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method: method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url: url,
            data: data
          }));
        };
      }

      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
    });
    var Axios$1 = Axios;
    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */

    var CancelToken = /*#__PURE__*/function () {
      function CancelToken(executor) {
        _classCallCheck(this, CancelToken);

        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        var token = this; // eslint-disable-next-line func-names

        this.promise.then(function (cancel) {
          if (!token._listeners) return;
          var i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }

          token._listeners = null;
        }); // eslint-disable-next-line func-names

        this.promise.then = function (onfulfilled) {
          var _resolve; // eslint-disable-next-line func-names


          var promise = new Promise(function (resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError(message, config, request);
          resolvePromise(token.reason);
        });
      }
      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */


      _createClass(CancelToken, [{
        key: "throwIfRequested",
        value: function throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        }
        /**
         * Subscribe to the cancel signal
         */

      }, {
        key: "subscribe",
        value: function subscribe(listener) {
          if (this.reason) {
            listener(this.reason);
            return;
          }

          if (this._listeners) {
            this._listeners.push(listener);
          } else {
            this._listeners = [listener];
          }
        }
        /**
         * Unsubscribe from the cancel signal
         */

      }, {
        key: "unsubscribe",
        value: function unsubscribe(listener) {
          if (!this._listeners) {
            return;
          }

          var index = this._listeners.indexOf(listener);

          if (index !== -1) {
            this._listeners.splice(index, 1);
          }
        }
        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */

      }], [{
        key: "source",
        value: function source() {
          var cancel;
          var token = new CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token: token,
            cancel: cancel
          };
        }
      }]);

      return CancelToken;
    }();

    var CancelToken$1 = CancelToken;
    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     *
     * @returns {Function}
     */

    function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }
    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */


    function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    }

    var HttpStatusCode = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511
    };
    Object.entries(HttpStatusCode).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      HttpStatusCode[value] = key;
    });
    var HttpStatusCode$1 = HttpStatusCode;
    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */

    function createInstance(defaultConfig) {
      var context = new Axios$1(defaultConfig);
      var instance = bind(Axios$1.prototype.request, context); // Copy axios.prototype to instance

      utils.extend(instance, Axios$1.prototype, context, {
        allOwnKeys: true
      }); // Copy context to instance

      utils.extend(instance, context, null, {
        allOwnKeys: true
      }); // Factory for creating new instances

      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };

      return instance;
    } // Create the default instance to be exported


    var axios = createInstance(defaults$1); // Expose Axios class to allow class inheritance

    axios.Axios = Axios$1; // Expose Cancel & CancelToken

    axios.CanceledError = CanceledError;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel;
    axios.VERSION = VERSION;
    axios.toFormData = toFormData; // Expose AxiosError class

    axios.AxiosError = AxiosError; // alias for CanceledError for backward compatibility

    axios.Cancel = axios.CanceledError; // Expose all/spread

    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread; // Expose isAxiosError

    axios.isAxiosError = isAxiosError; // Expose mergeConfig

    axios.mergeConfig = mergeConfig;
    axios.AxiosHeaders = AxiosHeaders$1;

    axios.formToJSON = function (thing) {
      return formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
    };

    axios.HttpStatusCode = HttpStatusCode$1;
    axios["default"] = axios;
    return axios;
  });
}).call(module.exports);
export default module.exports;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3MuanMiLCJuYW1lcyI6WyJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwid3JhcCIsImFwcGx5IiwiYXJndW1lbnRzIiwidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsImtpbmRPZiIsInN0ciIsImNhbGwiLCJ0aGluZyIsImNhY2hlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsImNyZWF0ZSIsImtpbmRPZlRlc3QiLCJ0eXBlIiwidHlwZU9mVGVzdCIsImlzQXJyYXkiLCJBcnJheSIsImlzVW5kZWZpbmVkIiwiaXNCdWZmZXIiLCJ2YWwiLCJjb25zdHJ1Y3RvciIsImlzRnVuY3Rpb24iLCJpc0FycmF5QnVmZmVyIiwiaXNBcnJheUJ1ZmZlclZpZXciLCJyZXN1bHQiLCJBcnJheUJ1ZmZlciIsImlzVmlldyIsImJ1ZmZlciIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc09iamVjdCIsImlzQm9vbGVhbiIsImlzUGxhaW5PYmplY3QiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIml0ZXJhdG9yIiwiaXNEYXRlIiwiaXNGaWxlIiwiaXNCbG9iIiwiaXNGaWxlTGlzdCIsImlzU3RyZWFtIiwicGlwZSIsImlzRm9ybURhdGEiLCJraW5kIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJpc1VSTFNlYXJjaFBhcmFtcyIsInRyaW0iLCJyZXBsYWNlIiwiZm9yRWFjaCIsIm9iaiIsImFsbE93bktleXMiLCJpIiwibCIsImxlbmd0aCIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwibGVuIiwia2V5IiwiZmluZEtleSIsIl9rZXkiLCJfZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsInNlbGYiLCJ3aW5kb3ciLCJnbG9iYWwiLCJpc0NvbnRleHREZWZpbmVkIiwiY29udGV4dCIsIm1lcmdlIiwiY2FzZWxlc3MiLCJhc3NpZ25WYWx1ZSIsInRhcmdldEtleSIsImV4dGVuZCIsImEiLCJiIiwic3RyaXBCT00iLCJjb250ZW50IiwiY2hhckNvZGVBdCIsImluaGVyaXRzIiwic3VwZXJDb25zdHJ1Y3RvciIsInByb3BzIiwiZGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiYXNzaWduIiwidG9GbGF0T2JqZWN0Iiwic291cmNlT2JqIiwiZGVzdE9iaiIsImZpbHRlciIsInByb3BGaWx0ZXIiLCJwcm9wIiwibWVyZ2VkIiwiZW5kc1dpdGgiLCJzZWFyY2hTdHJpbmciLCJwb3NpdGlvbiIsIlN0cmluZyIsInVuZGVmaW5lZCIsImxhc3RJbmRleCIsImluZGV4T2YiLCJ0b0FycmF5IiwiYXJyIiwiaXNUeXBlZEFycmF5IiwiVHlwZWRBcnJheSIsIlVpbnQ4QXJyYXkiLCJmb3JFYWNoRW50cnkiLCJnZW5lcmF0b3IiLCJuZXh0IiwiZG9uZSIsInBhaXIiLCJtYXRjaEFsbCIsInJlZ0V4cCIsIm1hdGNoZXMiLCJleGVjIiwicHVzaCIsImlzSFRNTEZvcm0iLCJ0b0NhbWVsQ2FzZSIsInJlcGxhY2VyIiwibSIsInAxIiwicDIiLCJ0b1VwcGVyQ2FzZSIsImhhc093blByb3BlcnR5IiwiaXNSZWdFeHAiLCJyZWR1Y2VEZXNjcmlwdG9ycyIsInJlZHVjZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwicmVkdWNlZERlc2NyaXB0b3JzIiwiZGVzY3JpcHRvciIsIm5hbWUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZnJlZXplTWV0aG9kcyIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsInNldCIsIkVycm9yIiwidG9PYmplY3RTZXQiLCJhcnJheU9yU3RyaW5nIiwiZGVsaW1pdGVyIiwiZGVmaW5lIiwic3BsaXQiLCJub29wIiwidG9GaW5pdGVOdW1iZXIiLCJkZWZhdWx0VmFsdWUiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsIkFMUEhBIiwiRElHSVQiLCJBTFBIQUJFVCIsIkFMUEhBX0RJR0lUIiwiZ2VuZXJhdGVTdHJpbmciLCJzaXplIiwiYWxwaGFiZXQiLCJNYXRoIiwicmFuZG9tIiwiaXNTcGVjQ29tcGxpYW50Rm9ybSIsInRvSlNPTk9iamVjdCIsInN0YWNrIiwidmlzaXQiLCJzb3VyY2UiLCJ0YXJnZXQiLCJyZWR1Y2VkVmFsdWUiLCJoYXNPd25Qcm9wIiwiQXhpb3NFcnJvciIsIm1lc3NhZ2UiLCJjb2RlIiwiY29uZmlnIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJ1dGlscyIsInRvSlNPTiIsImRlc2NyaXB0aW9uIiwibnVtYmVyIiwiZmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwic3RhdHVzIiwiZnJvbSIsImVycm9yIiwiY3VzdG9tUHJvcHMiLCJheGlvc0Vycm9yIiwiY2F1c2UiLCJpc1Zpc2l0YWJsZSIsInJlbW92ZUJyYWNrZXRzIiwicmVuZGVyS2V5IiwicGF0aCIsImRvdHMiLCJjb25jYXQiLCJtYXAiLCJlYWNoIiwidG9rZW4iLCJqb2luIiwiaXNGbGF0QXJyYXkiLCJzb21lIiwicHJlZGljYXRlcyIsInRlc3QiLCJ0b0Zvcm1EYXRhIiwiZm9ybURhdGEiLCJvcHRpb25zIiwiVHlwZUVycm9yIiwibWV0YVRva2VucyIsImluZGV4ZXMiLCJkZWZpbmVkIiwib3B0aW9uIiwidmlzaXRvciIsImRlZmF1bHRWaXNpdG9yIiwiX0Jsb2IiLCJCbG9iIiwidXNlQmxvYiIsImNvbnZlcnRWYWx1ZSIsInRvSVNPU3RyaW5nIiwiQnVmZmVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImVsIiwiaW5kZXgiLCJleHBvc2VkSGVscGVycyIsImJ1aWxkIiwicG9wIiwiZW5jb2RlIiwiY2hhck1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1hdGNoIiwiQXhpb3NVUkxTZWFyY2hQYXJhbXMiLCJwYXJhbXMiLCJfcGFpcnMiLCJlbmNvZGVyIiwiX2VuY29kZSIsImJ1aWxkVVJMIiwidXJsIiwic2VyaWFsaXplRm4iLCJzZXJpYWxpemUiLCJzZXJpYWxpemVkUGFyYW1zIiwiaGFzaG1hcmtJbmRleCIsIkludGVyY2VwdG9yTWFuYWdlciIsImhhbmRsZXJzIiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJzeW5jaHJvbm91cyIsInJ1bldoZW4iLCJpZCIsImZvckVhY2hIYW5kbGVyIiwiaCIsInNpbGVudEpTT05QYXJzaW5nIiwiZm9yY2VkSlNPTlBhcnNpbmciLCJjbGFyaWZ5VGltZW91dEVycm9yIiwiVVJMU2VhcmNoUGFyYW1zIiwiaXNTdGFuZGFyZEJyb3dzZXJFbnYiLCJwcm9kdWN0IiwibmF2aWdhdG9yIiwiZG9jdW1lbnQiLCJpc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiIsIldvcmtlckdsb2JhbFNjb3BlIiwiaW1wb3J0U2NyaXB0cyIsImlzQnJvd3NlciIsImNsYXNzZXMiLCJwcm90b2NvbHMiLCJ0b1VSTEVuY29kZWRGb3JtIiwiZGF0YSIsInBsYXRmb3JtIiwiaGVscGVycyIsImlzTm9kZSIsInBhcnNlUHJvcFBhdGgiLCJhcnJheVRvT2JqZWN0IiwiZm9ybURhdGFUb0pTT04iLCJidWlsZFBhdGgiLCJpc051bWVyaWNLZXkiLCJpc0xhc3QiLCJlbnRyaWVzIiwiREVGQVVMVF9DT05URU5UX1RZUEUiLCJzdHJpbmdpZnlTYWZlbHkiLCJyYXdWYWx1ZSIsInBhcnNlciIsInBhcnNlIiwiZSIsImRlZmF1bHRzIiwidHJhbnNpdGlvbmFsIiwidHJhbnNpdGlvbmFsRGVmYXVsdHMiLCJhZGFwdGVyIiwidHJhbnNmb3JtUmVxdWVzdCIsImhlYWRlcnMiLCJjb250ZW50VHlwZSIsImdldENvbnRlbnRUeXBlIiwiaGFzSlNPTkNvbnRlbnRUeXBlIiwiaXNPYmplY3RQYXlsb2FkIiwic2V0Q29udGVudFR5cGUiLCJmb3JtU2VyaWFsaXplciIsIl9Gb3JtRGF0YSIsImVudiIsInRyYW5zZm9ybVJlc3BvbnNlIiwiSlNPTlJlcXVlc3RlZCIsInJlc3BvbnNlVHlwZSIsInN0cmljdEpTT05QYXJzaW5nIiwiRVJSX0JBRF9SRVNQT05TRSIsInRpbWVvdXQiLCJ4c3JmQ29va2llTmFtZSIsInhzcmZIZWFkZXJOYW1lIiwibWF4Q29udGVudExlbmd0aCIsIm1heEJvZHlMZW5ndGgiLCJ2YWxpZGF0ZVN0YXR1cyIsImNvbW1vbiIsImZvckVhY2hNZXRob2ROb0RhdGEiLCJtZXRob2QiLCJmb3JFYWNoTWV0aG9kV2l0aERhdGEiLCJpZ25vcmVEdXBsaWNhdGVPZiIsInBhcnNlZCIsInJhd0hlYWRlcnMiLCJsaW5lIiwic3Vic3RyaW5nIiwiJGludGVybmFscyIsIm5vcm1hbGl6ZUhlYWRlciIsImhlYWRlciIsIm5vcm1hbGl6ZVZhbHVlIiwicGFyc2VUb2tlbnMiLCJ0b2tlbnMiLCJ0b2tlbnNSRSIsImlzVmFsaWRIZWFkZXJOYW1lIiwibWF0Y2hIZWFkZXJWYWx1ZSIsImlzSGVhZGVyTmFtZUZpbHRlciIsImZvcm1hdEhlYWRlciIsInciLCJjaGFyIiwiYnVpbGRBY2Nlc3NvcnMiLCJhY2Nlc3Nvck5hbWUiLCJtZXRob2ROYW1lIiwiYXJnMSIsImFyZzIiLCJhcmczIiwiY29uZmlndXJhYmxlIiwiQXhpb3NIZWFkZXJzIiwidmFsdWVPclJld3JpdGUiLCJyZXdyaXRlIiwic2V0SGVhZGVyIiwiX3ZhbHVlIiwiX2hlYWRlciIsIl9yZXdyaXRlIiwibEhlYWRlciIsInNldEhlYWRlcnMiLCJwYXJzZUhlYWRlcnMiLCJtYXRjaGVyIiwiZGVsZXRlZCIsImRlbGV0ZUhlYWRlciIsImZvcm1hdCIsIm5vcm1hbGl6ZWQiLCJ0YXJnZXRzIiwiYXNTdHJpbmdzIiwiZmlyc3QiLCJjb21wdXRlZCIsImludGVybmFscyIsImFjY2Vzc29ycyIsImRlZmluZUFjY2Vzc29yIiwiYWNjZXNzb3IiLCJ0cmFuc2Zvcm1EYXRhIiwiZm5zIiwidHJhbnNmb3JtIiwibm9ybWFsaXplIiwiaXNDYW5jZWwiLCJfX0NBTkNFTF9fIiwiQ2FuY2VsZWRFcnJvciIsIkVSUl9DQU5DRUxFRCIsInNldHRsZSIsInJlc29sdmUiLCJyZWplY3QiLCJFUlJfQkFEX1JFUVVFU1QiLCJmbG9vciIsInN0YW5kYXJkQnJvd3NlckVudiIsIndyaXRlIiwiZXhwaXJlcyIsImRvbWFpbiIsInNlY3VyZSIsImNvb2tpZSIsIkRhdGUiLCJ0b0dNVFN0cmluZyIsInJlYWQiLCJSZWdFeHAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZW1vdmUiLCJub3ciLCJub25TdGFuZGFyZEJyb3dzZXJFbnYiLCJpc0Fic29sdXRlVVJMIiwiY29tYmluZVVSTHMiLCJiYXNlVVJMIiwicmVsYXRpdmVVUkwiLCJidWlsZEZ1bGxQYXRoIiwicmVxdWVzdGVkVVJMIiwibXNpZSIsInVzZXJBZ2VudCIsInVybFBhcnNpbmdOb2RlIiwiY3JlYXRlRWxlbWVudCIsIm9yaWdpblVSTCIsInJlc29sdmVVUkwiLCJocmVmIiwic2V0QXR0cmlidXRlIiwicHJvdG9jb2wiLCJob3N0Iiwic2VhcmNoIiwiaGFzaCIsImhvc3RuYW1lIiwicG9ydCIsInBhdGhuYW1lIiwiY2hhckF0IiwibG9jYXRpb24iLCJpc1VSTFNhbWVPcmlnaW4iLCJyZXF1ZXN0VVJMIiwicGFyc2VQcm90b2NvbCIsInNwZWVkb21ldGVyIiwic2FtcGxlc0NvdW50IiwibWluIiwiYnl0ZXMiLCJ0aW1lc3RhbXBzIiwiaGVhZCIsInRhaWwiLCJmaXJzdFNhbXBsZVRTIiwiY2h1bmtMZW5ndGgiLCJzdGFydGVkQXQiLCJieXRlc0NvdW50IiwicGFzc2VkIiwicm91bmQiLCJwcm9ncmVzc0V2ZW50UmVkdWNlciIsImxpc3RlbmVyIiwiaXNEb3dubG9hZFN0cmVhbSIsImJ5dGVzTm90aWZpZWQiLCJfc3BlZWRvbWV0ZXIiLCJsb2FkZWQiLCJ0b3RhbCIsImxlbmd0aENvbXB1dGFibGUiLCJwcm9ncmVzc0J5dGVzIiwicmF0ZSIsImluUmFuZ2UiLCJwcm9ncmVzcyIsImVzdGltYXRlZCIsImV2ZW50IiwiaXNYSFJBZGFwdGVyU3VwcG9ydGVkIiwiWE1MSHR0cFJlcXVlc3QiLCJQcm9taXNlIiwiZGlzcGF0Y2hYaHJSZXF1ZXN0IiwicmVxdWVzdERhdGEiLCJyZXF1ZXN0SGVhZGVycyIsIm9uQ2FuY2VsZWQiLCJjYW5jZWxUb2tlbiIsInVuc3Vic2NyaWJlIiwic2lnbmFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImF1dGgiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidW5lc2NhcGUiLCJidG9hIiwiZnVsbFBhdGgiLCJvcGVuIiwicGFyYW1zU2VyaWFsaXplciIsIm9ubG9hZGVuZCIsInJlc3BvbnNlSGVhZGVycyIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlRGF0YSIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJfcmVzb2x2ZSIsIl9yZWplY3QiLCJlcnIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJoYW5kbGVMb2FkIiwicmVhZHlTdGF0ZSIsInJlc3BvbnNlVVJMIiwic2V0VGltZW91dCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIkVDT05OQUJPUlRFRCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIkVSUl9ORVRXT1JLIiwib250aW1lb3V0IiwiaGFuZGxlVGltZW91dCIsInRpbWVvdXRFcnJvck1lc3NhZ2UiLCJFVElNRURPVVQiLCJ4c3JmVmFsdWUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb29raWVzIiwic2V0UmVxdWVzdEhlYWRlciIsIm9uRG93bmxvYWRQcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblVwbG9hZFByb2dyZXNzIiwidXBsb2FkIiwiY2FuY2VsIiwiYWJvcnQiLCJzdWJzY3JpYmUiLCJhYm9ydGVkIiwic2VuZCIsImtub3duQWRhcHRlcnMiLCJodHRwIiwiaHR0cEFkYXB0ZXIiLCJ4aHIiLCJ4aHJBZGFwdGVyIiwiZ2V0QWRhcHRlciIsImFkYXB0ZXJzIiwibmFtZU9yQWRhcHRlciIsInRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJ0aHJvd0lmUmVxdWVzdGVkIiwiZGlzcGF0Y2hSZXF1ZXN0IiwidGhlbiIsIm9uQWRhcHRlclJlc29sdXRpb24iLCJvbkFkYXB0ZXJSZWplY3Rpb24iLCJyZWFzb24iLCJoZWFkZXJzVG9PYmplY3QiLCJtZXJnZUNvbmZpZyIsImNvbmZpZzEiLCJjb25maWcyIiwiZ2V0TWVyZ2VkVmFsdWUiLCJtZXJnZURlZXBQcm9wZXJ0aWVzIiwidmFsdWVGcm9tQ29uZmlnMiIsImRlZmF1bHRUb0NvbmZpZzIiLCJtZXJnZURpcmVjdEtleXMiLCJtZXJnZU1hcCIsInRpbWVvdXRNZXNzYWdlIiwiZGVjb21wcmVzcyIsImJlZm9yZVJlZGlyZWN0IiwidHJhbnNwb3J0IiwiaHR0cEFnZW50IiwiaHR0cHNBZ2VudCIsInNvY2tldFBhdGgiLCJyZXNwb25zZUVuY29kaW5nIiwiY29tcHV0ZUNvbmZpZ1ZhbHVlIiwiY29uZmlnVmFsdWUiLCJWRVJTSU9OIiwidmFsaWRhdG9ycyIsInZhbGlkYXRvciIsImRlcHJlY2F0ZWRXYXJuaW5ncyIsInZlcnNpb24iLCJmb3JtYXRNZXNzYWdlIiwib3B0IiwiZGVzYyIsIm9wdHMiLCJFUlJfREVQUkVDQVRFRCIsImNvbnNvbGUiLCJ3YXJuIiwiYXNzZXJ0T3B0aW9ucyIsInNjaGVtYSIsImFsbG93VW5rbm93biIsIkVSUl9CQURfT1BUSU9OX1ZBTFVFIiwiRVJSX0JBRF9PUFRJT04iLCJBeGlvcyIsImluc3RhbmNlQ29uZmlnIiwiaW50ZXJjZXB0b3JzIiwiY29uZmlnT3JVcmwiLCJjb250ZXh0SGVhZGVycyIsInJlcXVlc3RJbnRlcmNlcHRvckNoYWluIiwic3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzIiwidW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMiLCJpbnRlcmNlcHRvciIsInVuc2hpZnQiLCJyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4iLCJwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJwcm9taXNlIiwiY2hhaW4iLCJuZXdDb25maWciLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJnZW5lcmF0ZUhUVFBNZXRob2QiLCJpc0Zvcm0iLCJodHRwTWV0aG9kIiwiQ2FuY2VsVG9rZW4iLCJleGVjdXRvciIsInJlc29sdmVQcm9taXNlIiwicHJvbWlzZUV4ZWN1dG9yIiwiX2xpc3RlbmVycyIsIm9uZnVsZmlsbGVkIiwic3BsaWNlIiwiYyIsInNwcmVhZCIsImNhbGxiYWNrIiwiaXNBeGlvc0Vycm9yIiwicGF5bG9hZCIsIkh0dHBTdGF0dXNDb2RlIiwiQ29udGludWUiLCJTd2l0Y2hpbmdQcm90b2NvbHMiLCJQcm9jZXNzaW5nIiwiRWFybHlIaW50cyIsIk9rIiwiQ3JlYXRlZCIsIkFjY2VwdGVkIiwiTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uIiwiTm9Db250ZW50IiwiUmVzZXRDb250ZW50IiwiUGFydGlhbENvbnRlbnQiLCJNdWx0aVN0YXR1cyIsIkFscmVhZHlSZXBvcnRlZCIsIkltVXNlZCIsIk11bHRpcGxlQ2hvaWNlcyIsIk1vdmVkUGVybWFuZW50bHkiLCJGb3VuZCIsIlNlZU90aGVyIiwiTm90TW9kaWZpZWQiLCJVc2VQcm94eSIsIlVudXNlZCIsIlRlbXBvcmFyeVJlZGlyZWN0IiwiUGVybWFuZW50UmVkaXJlY3QiLCJCYWRSZXF1ZXN0IiwiVW5hdXRob3JpemVkIiwiUGF5bWVudFJlcXVpcmVkIiwiRm9yYmlkZGVuIiwiTm90Rm91bmQiLCJNZXRob2ROb3RBbGxvd2VkIiwiTm90QWNjZXB0YWJsZSIsIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZCIsIlJlcXVlc3RUaW1lb3V0IiwiQ29uZmxpY3QiLCJHb25lIiwiTGVuZ3RoUmVxdWlyZWQiLCJQcmVjb25kaXRpb25GYWlsZWQiLCJQYXlsb2FkVG9vTGFyZ2UiLCJVcmlUb29Mb25nIiwiVW5zdXBwb3J0ZWRNZWRpYVR5cGUiLCJSYW5nZU5vdFNhdGlzZmlhYmxlIiwiRXhwZWN0YXRpb25GYWlsZWQiLCJJbUFUZWFwb3QiLCJNaXNkaXJlY3RlZFJlcXVlc3QiLCJVbnByb2Nlc3NhYmxlRW50aXR5IiwiTG9ja2VkIiwiRmFpbGVkRGVwZW5kZW5jeSIsIlRvb0Vhcmx5IiwiVXBncmFkZVJlcXVpcmVkIiwiUHJlY29uZGl0aW9uUmVxdWlyZWQiLCJUb29NYW55UmVxdWVzdHMiLCJSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2UiLCJVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29ucyIsIkludGVybmFsU2VydmVyRXJyb3IiLCJOb3RJbXBsZW1lbnRlZCIsIkJhZEdhdGV3YXkiLCJTZXJ2aWNlVW5hdmFpbGFibGUiLCJHYXRld2F5VGltZW91dCIsIkh0dHBWZXJzaW9uTm90U3VwcG9ydGVkIiwiVmFyaWFudEFsc29OZWdvdGlhdGVzIiwiSW5zdWZmaWNpZW50U3RvcmFnZSIsIkxvb3BEZXRlY3RlZCIsIk5vdEV4dGVuZGVkIiwiTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQiLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJpbnN0YW5jZSIsImF4aW9zIiwiQ2FuY2VsIiwiYWxsIiwicHJvbWlzZXMiLCJmb3JtVG9KU09OIl0sInNvdXJjZXMiOlsiLi4vbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uL2xpYi91dGlscy5qcyIsIi4uL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsIi4uL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCIuLi9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwiLi4vbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9saWIvaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzIiwiLi4vbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCIuLi9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vbGliL2NhbmNlbC9pc0NhbmNlbC5qcyIsIi4uL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCIuLi9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwiLi4vbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwiLi4vbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vbGliL2FkYXB0ZXJzL3hoci5qcyIsIi4uL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIi4uL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwiLi4vbGliL2Vudi9kYXRhLmpzIiwiLi4vbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwiLi4vbGliL2NvcmUvQXhpb3MuanMiLCIuLi9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi9saWIvYXhpb3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn1cblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgaWYgKHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3Rcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgfSA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7P29iamVjdH0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xuICAgICAgcGFyYW1zLnRvU3RyaW5nKCkgOlxuICAgICAgbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGxcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcydcbmltcG9ydCBGb3JtRGF0YSBmcm9tICcuL2NsYXNzZXMvRm9ybURhdGEuanMnXG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcydcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzU3RhbmRhcmRCcm93c2VyRW52ID0gKCgpID0+IHtcbiAgbGV0IHByb2R1Y3Q7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gICAgKHByb2R1Y3QgPSBuYXZpZ2F0b3IucHJvZHVjdCkgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICBwcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgIHByb2R1Y3QgPT09ICdOUycpXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufSkoKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuIGNvbnN0IGlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBpc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ11cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCBPYmplY3QuYXNzaWduKHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbih2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscy5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscy5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtRGF0YVRvSlNPTjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCB0b1VSTEVuY29kZWRGb3JtIGZyb20gJy4uL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4uL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuXG5jb25zdCBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICBpZiAoIWhhc0pTT05Db250ZW50VHlwZSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTEpIHtcbiAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSxcbiAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgIHRoaXMuZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XG4gICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGFyc2VIZWFkZXJzIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzJztcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSlcbiAgICB9IGVsc2UgaWYodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSk7XG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5pc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbi8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgbGV0IGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoYnl0ZXNDb3VudCAqIDEwMDAgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzcGVlZG9tZXRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCBjb29raWVzIGZyb20gJy4vLi4vaGVscGVycy9jb29raWVzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuLy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSAnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHNwZWVkb21ldGVyIGZyb20gJy4uL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMnO1xuXG5mdW5jdGlvbiBwcm9ncmVzc0V2ZW50UmVkdWNlcihsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSkge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiBlID0+IHtcbiAgICBjb25zdCBsb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQ7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcbiAgICBjb25zdCBpblJhbmdlID0gbG9hZGVkIDw9IHRvdGFsO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IChsb2FkZWQgLyB0b3RhbCkgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH07XG59XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBjb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkgJiYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSkge1xuICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUoZmFsc2UpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpXG4gICAgICAgICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQoY29uZmlnLnhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihjb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbiB8fCBjb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKGZ1bGxQYXRoKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXJcbn1cblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBpZigoYWRhcHRlciA9IHV0aWxzLmlzU3RyaW5nKG5hbWVPckFkYXB0ZXIpID8ga25vd25BZGFwdGVyc1tuYW1lT3JBZGFwdGVyLnRvTG93ZXJDYXNlKCldIDogbmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG4gICAgICBpZiAoYWRhcHRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgYEFkYXB0ZXIgJHtuYW1lT3JBZGFwdGVyfSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudGAsXG4gICAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICB1dGlscy5oYXNPd25Qcm9wKGtub3duQWRhcHRlcnMsIG5hbWVPckFkYXB0ZXIpID9cbiAgICAgICAgICBgQWRhcHRlciAnJHtuYW1lT3JBZGFwdGVyfScgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGRgIDpcbiAgICAgICAgICBgVW5rbm93biBhZGFwdGVyICcke25hbWVPckFkYXB0ZXJ9J2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhZGFwdGVyIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tIFwiLi4vYWRhcHRlcnMvYWRhcHRlcnMuanNcIjtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4vQXhpb3NIZWFkZXJzLmpzXCI7XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMgPyB0aGluZy50b0pTT04oKSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYikgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKE9iamVjdC5rZXlzKGNvbmZpZzEpLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgY29uc3QgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSwgcHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuMy42XCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IEludGVyY2VwdG9yTWFuYWdlciBmcm9tICcuL0ludGVyY2VwdG9yTWFuYWdlci5qcyc7XG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4vYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY29udGV4dEhlYWRlcnM7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgY29udGV4dEhlYWRlcnMgJiYgdXRpbHMuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaC5hcHBseShjaGFpbiwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9DYW5jZWxlZEVycm9yLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oY2FuY2VsID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbi8vIHRoaXMgbW9kdWxlIHNob3VsZCBvbmx5IGhhdmUgYSBkZWZhdWx0IGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgYXhpb3NcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWUsU0FBU0EsSUFBVCxDQUFjQyxFQUFkLEVBQWtCQyxPQUFsQixFQUEyQjtNQUN4QyxPQUFPLFNBQVNDLElBQVQsR0FBZ0I7UUFDckIsT0FBT0YsRUFBRSxDQUFDRyxLQUFISCxDQUFTQyxPQUFURCxFQUFrQkksU0FBbEJKLENBQVA7TUFDRCxDQUZEO0lBR0YsQyxDQ0ZBOzs7SUFFQSxJQUFPSyxRQUFRLEdBQUlDLE1BQU0sQ0FBQ0MsU0FBUEQsQ0FBWkQsUUFBUDtJQUNBLElBQU9HLGNBQWMsR0FBSUYsTUFBTSxDQUF4QkUsY0FBUDs7SUFFQSxJQUFNQyxNQUFNLEdBQUksVUFBQSxLQUFBLEVBQUs7TUFBQSxPQUFJLFVBQUEsS0FB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