var module = {
  exports: {}
};
var exports = module.exports;
(function () {
  /*!
   * Platform.js v1.3.6
   * Copyright 2014-2020 Benjamin Tan
   * Copyright 2011-2013 John-David Dalton
   * Available under MIT license
   */
  ;
  (function () {
    'use strict';
    /** Used to determine if values are of the language type `Object`. */

    var objectTypes = {
      'function': true,
      'object': true
    };
    /** Used as a reference to the global object. */

    var root = objectTypes[typeof window] && window || this;
    /** Backup possible global object. */

    var oldRoot = root;
    /** Detect free variable `exports`. */

    var freeExports = objectTypes[typeof exports] && exports;
    /** Detect free variable `module`. */

    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */

    var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
      root = freeGlobal;
    }
    /**
     * Used as the maximum length of an array-like object.
     * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
     * for more details.
     */


    var maxSafeInteger = Math.pow(2, 53) - 1;
    /** Regular expression to detect Opera. */

    var reOpera = /\bOpera/;
    /** Possible global object. */

    var thisBinding = this;
    /** Used for native method references. */

    var objectProto = Object.prototype;
    /** Used to check for own properties of an object. */

    var hasOwnProperty = objectProto.hasOwnProperty;
    /** Used to resolve the internal `[[Class]]` of values. */

    var toString = objectProto.toString;
    /*--------------------------------------------------------------------------*/

    /**
     * Capitalizes a string value.
     *
     * @private
     * @param {string} string The string to capitalize.
     * @returns {string} The capitalized string.
     */

    function capitalize(string) {
      string = String(string);
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    /**
     * A utility function to clean up the OS name.
     *
     * @private
     * @param {string} os The OS name to clean up.
     * @param {string} [pattern] A `RegExp` pattern matching the OS name.
     * @param {string} [label] A label for the OS.
     */


    function cleanupOS(os, pattern, label) {
      // Platform tokens are defined at:
      // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
      // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
      var data = {
        '10.0': '10',
        '6.4': '10 Technical Preview',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': 'Server 2008 R2 / 7',
        '6.0': 'Server 2008 / Vista',
        '5.2': 'Server 2003 / XP 64-bit',
        '5.1': 'XP',
        '5.01': '2000 SP1',
        '5.0': '2000',
        '4.0': 'NT',
        '4.90': 'ME'
      }; // Detect Windows version from platform tokens.

      if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) && (data = data[/[\d.]+$/.exec(os)])) {
        os = 'Windows ' + data;
      } // Correct character case and cleanup string.


      os = String(os);

      if (pattern && label) {
        os = os.replace(RegExp(pattern, 'i'), label);
      }

      os = format(os.replace(/ ce$/i, ' CE').replace(/\bhpw/i, 'web').replace(/\bMacintosh\b/, 'Mac OS').replace(/_PowerPC\b/i, ' OS').replace(/\b(OS X) [^ \d]+/i, '$1').replace(/\bMac (OS X)\b/, '$1').replace(/\/(\d)/, ' $1').replace(/_/g, '.').replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '').replace(/\bx86\.64\b/gi, 'x86_64').replace(/\b(Windows Phone) OS\b/, '$1').replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1').split(' on ')[0]);
      return os;
    }
    /**
     * An iteration utility for arrays and objects.
     *
     * @private
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} callback The function called per iteration.
     */


    function each(object, callback) {
      var index = -1,
          length = object ? object.length : 0;

      if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
        while (++index < length) {
          callback(object[index], index, object);
        }
      } else {
        forOwn(object, callback);
      }
    }
    /**
     * Trim and conditionally capitalize string values.
     *
     * @private
     * @param {string} string The string to format.
     * @returns {string} The formatted string.
     */


    function format(string) {
      string = trim(string);
      return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
    }
    /**
     * Iterates over an object's own properties, executing the `callback` for each.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} callback The function executed per own property.
     */


    function forOwn(object, callback) {
      for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
          callback(object[key], key, object);
        }
      }
    }
    /**
     * Gets the internal `[[Class]]` of a value.
     *
     * @private
     * @param {*} value The value.
     * @returns {string} The `[[Class]]`.
     */


    function getClassOf(value) {
      return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
    }
    /**
     * Host objects can return type values that are different from their actual
     * data type. The objects we are concerned with usually return non-primitive
     * types of "object", "function", or "unknown".
     *
     * @private
     * @param {*} object The owner of the property.
     * @param {string} property The property to check.
     * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
     */


    function isHostType(object, property) {
      var type = object != null ? typeof object[property] : 'number';
      return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == 'object' ? !!object[property] : true);
    }
    /**
     * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
     *
     * @private
     * @param {string} string The string to qualify.
     * @returns {string} The qualified string.
     */


    function qualify(string) {
      return String(string).replace(/([ -])(?!$)/g, '$1?');
    }
    /**
     * A bare-bones `Array#reduce` like utility function.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function called per iteration.
     * @returns {*} The accumulated result.
     */


    function reduce(array, callback) {
      var accumulator = null;
      each(array, function (value, index) {
        accumulator = callback(accumulator, value, index, array);
      });
      return accumulator;
    }
    /**
     * Removes leading and trailing whitespace from a string.
     *
     * @private
     * @param {string} string The string to trim.
     * @returns {string} The trimmed string.
     */


    function trim(string) {
      return String(string).replace(/^ +| +$/g, '');
    }
    /*--------------------------------------------------------------------------*/

    /**
     * Creates a new platform object.
     *
     * @memberOf platform
     * @param {Object|string} [ua=navigator.userAgent] The user agent string or
     *  context object.
     * @returns {Object} A platform object.
     */


    function parse(ua) {
      /** The environment context object. */
      var context = root;
      /** Used to flag when a custom context is provided. */

      var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String'; // Juggle arguments.

      if (isCustomContext) {
        context = ua;
        ua = null;
      }
      /** Browser navigator object. */


      var nav = context.navigator || {};
      /** Browser user agent string. */

      var userAgent = nav.userAgent || '';
      ua || (ua = userAgent);
      /** Used to flag when `thisBinding` is the [ModuleScope]. */

      var isModuleScope = isCustomContext || thisBinding == oldRoot;
      /** Used to detect if browser is like Chrome. */

      var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
      /** Internal `[[Class]]` value shortcuts. */

      var objectClass = 'Object',
          airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
          enviroClass = isCustomContext ? objectClass : 'Environment',
          javaClass = isCustomContext && context.java ? 'JavaPackage' : getClassOf(context.java),
          phantomClass = isCustomContext ? objectClass : 'RuntimeObject';
      /** Detect Java environments. */

      var java = /\bJava/.test(javaClass) && context.java;
      /** Detect Rhino. */

      var rhino = java && getClassOf(context.environment) == enviroClass;
      /** A character to represent alpha. */

      var alpha = java ? 'a' : '\u03b1';
      /** A character to represent beta. */

      var beta = java ? 'b' : '\u03b2';
      /** Browser document object. */

      var doc = context.document || {};
      /**
       * Detect Opera browser (Presto-based).
       * http://www.howtocreate.co.uk/operaStuff/operaObject.html
       * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
       */

      var opera = context.operamini || context.opera;
      /** Opera `[[Class]]`. */

      var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera['[[Class]]'] : getClassOf(opera)) ? operaClass : opera = null;
      /*------------------------------------------------------------------------*/

      /** Temporary variable used over the script's lifetime. */

      var data;
      /** The CPU architecture. */

      var arch = ua;
      /** Platform description array. */

      var description = [];
      /** Platform alpha/beta indicator. */

      var prerelease = null;
      /** A flag to indicate that environment features should be used to resolve the platform. */

      var useFeatures = ua == userAgent;
      /** The browser/environment version. */

      var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();
      /** A flag to indicate if the OS ends with "/ Version" */

      var isSpecialCasedOS;
      /* Detectable layout engines (order is important). */

      var layout = getLayout([{
        'label': 'EdgeHTML',
        'pattern': 'Edge'
      }, 'Trident', {
        'label': 'WebKit',
        'pattern': 'AppleWebKit'
      }, 'iCab', 'Presto', 'NetFront', 'Tasman', 'KHTML', 'Gecko']);
      /* Detectable browser names (order is important). */

      var name = getName(['Adobe AIR', 'Arora', 'Avant Browser', 'Breach', 'Camino', 'Electron', 'Epiphany', 'Fennec', 'Flock', 'Galeon', 'GreenBrowser', 'iCab', 'Iceweasel', 'K-Meleon', 'Konqueror', 'Lunascape', 'Maxthon', {
        'label': 'Microsoft Edge',
        'pattern': '(?:Edge|Edg|EdgA|EdgiOS)'
      }, 'Midori', 'Nook Browser', 'PaleMoon', 'PhantomJS', 'Raven', 'Rekonq', 'RockMelt', {
        'label': 'Samsung Internet',
        'pattern': 'SamsungBrowser'
      }, 'SeaMonkey', {
        'label': 'Silk',
        'pattern': '(?:Cloud9|Silk-Accelerated)'
      }, 'Sleipnir', 'SlimBrowser', {
        'label': 'SRWare Iron',
        'pattern': 'Iron'
      }, 'Sunrise', 'Swiftfox', 'Vivaldi', 'Waterfox', 'WebPositive', {
        'label': 'Yandex Browser',
        'pattern': 'YaBrowser'
      }, {
        'label': 'UC Browser',
        'pattern': 'UCBrowser'
      }, 'Opera Mini', {
        'label': 'Opera Mini',
        'pattern': 'OPiOS'
      }, 'Opera', {
        'label': 'Opera',
        'pattern': 'OPR'
      }, 'Chromium', 'Chrome', {
        'label': 'Chrome',
        'pattern': '(?:HeadlessChrome)'
      }, {
        'label': 'Chrome Mobile',
        'pattern': '(?:CriOS|CrMo)'
      }, {
        'label': 'Firefox',
        'pattern': '(?:Firefox|Minefield)'
      }, {
        'label': 'Firefox for iOS',
        'pattern': 'FxiOS'
      }, {
        'label': 'IE',
        'pattern': 'IEMobile'
      }, {
        'label': 'IE',
        'pattern': 'MSIE'
      }, 'Safari']);
      /* Detectable products (order is important). */

      var product = getProduct([{
        'label': 'BlackBerry',
        'pattern': 'BB10'
      }, 'BlackBerry', {
        'label': 'Galaxy S',
        'pattern': 'GT-I9000'
      }, {
        'label': 'Galaxy S2',
        'pattern': 'GT-I9100'
      }, {
        'label': 'Galaxy S3',
        'pattern': 'GT-I9300'
      }, {
        'label': 'Galaxy S4',
        'pattern': 'GT-I9500'
      }, {
        'label': 'Galaxy S5',
        'pattern': 'SM-G900'
      }, {
        'label': 'Galaxy S6',
        'pattern': 'SM-G920'
      }, {
        'label': 'Galaxy S6 Edge',
        'pattern': 'SM-G925'
      }, {
        'label': 'Galaxy S7',
        'pattern': 'SM-G930'
      }, {
        'label': 'Galaxy S7 Edge',
        'pattern': 'SM-G935'
      }, 'Google TV', 'Lumia', 'iPad', 'iPod', 'iPhone', 'Kindle', {
        'label': 'Kindle Fire',
        'pattern': '(?:Cloud9|Silk-Accelerated)'
      }, 'Nexus', 'Nook', 'PlayBook', 'PlayStation Vita', 'PlayStation', 'TouchPad', 'Transformer', {
        'label': 'Wii U',
        'pattern': 'WiiU'
      }, 'Wii', 'Xbox One', {
        'label': 'Xbox 360',
        'pattern': 'Xbox'
      }, 'Xoom']);
      /* Detectable manufacturers. */

      var manufacturer = getManufacturer({
        'Apple': {
          'iPad': 1,
          'iPhone': 1,
          'iPod': 1
        },
        'Alcatel': {},
        'Archos': {},
        'Amazon': {
          'Kindle': 1,
          'Kindle Fire': 1
        },
        'Asus': {
          'Transformer': 1
        },
        'Barnes & Noble': {
          'Nook': 1
        },
        'BlackBerry': {
          'PlayBook': 1
        },
        'Google': {
          'Google TV': 1,
          'Nexus': 1
        },
        'HP': {
          'TouchPad': 1
        },
        'HTC': {},
        'Huawei': {},
        'Lenovo': {},
        'LG': {},
        'Microsoft': {
          'Xbox': 1,
          'Xbox One': 1
        },
        'Motorola': {
          'Xoom': 1
        },
        'Nintendo': {
          'Wii U': 1,
          'Wii': 1
        },
        'Nokia': {
          'Lumia': 1
        },
        'Oppo': {},
        'Samsung': {
          'Galaxy S': 1,
          'Galaxy S2': 1,
          'Galaxy S3': 1,
          'Galaxy S4': 1
        },
        'Sony': {
          'PlayStation': 1,
          'PlayStation Vita': 1
        },
        'Xiaomi': {
          'Mi': 1,
          'Redmi': 1
        }
      });
      /* Detectable operating systems (order is important). */

      var os = getOS(['Windows Phone', 'KaiOS', 'Android', 'CentOS', {
        'label': 'Chrome OS',
        'pattern': 'CrOS'
      }, 'Debian', {
        'label': 'DragonFly BSD',
        'pattern': 'DragonFly'
      }, 'Fedora', 'FreeBSD', 'Gentoo', 'Haiku', 'Kubuntu', 'Linux Mint', 'OpenBSD', 'Red Hat', 'SuSE', 'Ubuntu', 'Xubuntu', 'Cygwin', 'Symbian OS', 'hpwOS', 'webOS ', 'webOS', 'Tablet OS', 'Tizen', 'Linux', 'Mac OS X', 'Macintosh', 'Mac', 'Windows 98;', 'Windows ']);
      /*------------------------------------------------------------------------*/

      /**
       * Picks the layout engine from an array of guesses.
       *
       * @private
       * @param {Array} guesses An array of guesses.
       * @returns {null|string} The detected layout engine.
       */

      function getLayout(guesses) {
        return reduce(guesses, function (result, guess) {
          return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
        });
      }
      /**
       * Picks the manufacturer from an array of guesses.
       *
       * @private
       * @param {Array} guesses An object of guesses.
       * @returns {null|string} The detected manufacturer.
       */


      function getManufacturer(guesses) {
        return reduce(guesses, function (result, value, key) {
          // Lookup the manufacturer by product or scan the UA for the manufacturer.
          return result || (value[product] || value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] || RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)) && key;
        });
      }
      /**
       * Picks the browser name from an array of guesses.
       *
       * @private
       * @param {Array} guesses An array of guesses.
       * @returns {null|string} The detected browser name.
       */


      function getName(guesses) {
        return reduce(guesses, function (result, guess) {
          return result || RegExp('\\b' + (guess.pattern || qualify(guess)) + '\\b', 'i').exec(ua) && (guess.label || guess);
        });
      }
      /**
       * Picks the OS name from an array of guesses.
       *
       * @private
       * @param {Array} guesses An array of guesses.
       * @returns {null|string} The detected OS name.
       */


      function getOS(guesses) {
        return reduce(guesses, function (result, guess) {
          var pattern = guess.pattern || qualify(guess);

          if (!result && (result = RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua))) {
            result = cleanupOS(result, pattern, guess.label || guess);
          }

          return result;
        });
      }
      /**
       * Picks the product name from an array of guesses.
       *
       * @private
       * @param {Array} guesses An array of guesses.
       * @returns {null|string} The detected product name.
       */


      function getProduct(guesses) {
        return reduce(guesses, function (result, guess) {
          var pattern = guess.pattern || qualify(guess);

          if (!result && (result = RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) || RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) || RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua))) {
            // Split by forward slash and append product version if needed.
            if ((result = String(guess.label && !RegExp(pattern, 'i').test(guess.label) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
              result[0] += ' ' + result[1];
            } // Correct character case and cleanup string.


            guess = guess.label || guess;
            result = format(result[0].replace(RegExp(pattern, 'i'), guess).replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ').replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
          }

          return result;
        });
      }
      /**
       * Resolves the version using an array of UA patterns.
       *
       * @private
       * @param {Array} patterns An array of UA patterns.
       * @returns {null|string} The detected version.
       */


      function getVersion(patterns) {
        return reduce(patterns, function (result, pattern) {
          return result || (RegExp(pattern + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
        });
      }
      /**
       * Returns `platform.description` when the platform object is coerced to a string.
       *
       * @name toString
       * @memberOf platform
       * @returns {string} Returns `platform.description` if available, else an empty string.
       */


      function toStringPlatform() {
        return this.description || '';
      }
      /*------------------------------------------------------------------------*/
      // Convert layout to an array so we can add extra details.


      layout && (layout = [layout]); // Detect Android products.
      // Browsers on Android devices typically provide their product IDS after "Android;"
      // up to "Build" or ") AppleWebKit".
      // Example:
      // "Mozilla/5.0 (Linux; Android 8.1.0; Moto G (5) Plus) AppleWebKit/537.36
      // (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36"

      if (/\bAndroid\b/.test(os) && !product && (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
        product = trim(data[1]) // Replace any language codes (eg. "en-US").
        .replace(/^[a-z]{2}-[a-z]{2};\s*/i, '') || null;
      } // Detect product names that contain their manufacturer's name.


      if (manufacturer && !product) {
        product = getProduct([manufacturer]);
      } else if (manufacturer && product) {
        product = product.replace(RegExp('^(' + qualify(manufacturer) + ')[-_.\\s]', 'i'), manufacturer + ' ').replace(RegExp('^(' + qualify(manufacturer) + ')[-_.]?(\\w)', 'i'), manufacturer + ' $2');
      } // Clean up Google TV.


      if (data = /\bGoogle TV\b/.exec(product)) {
        product = data[0];
      } // Detect simulators.


      if (/\bSimulator\b/i.test(ua)) {
        product = (product ? product + ' ' : '') + 'Simulator';
      } // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.


      if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
        description.push('running in Turbo/Uncompressed mode');
      } // Detect IE Mobile 11.


      if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
        data = parse(ua.replace(/like iPhone OS/, ''));
        manufacturer = data.manufacturer;
        product = data.product;
      } // Detect iOS.
      else if (/^iP/.test(product)) {
        name || (name = 'Safari');
        os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua)) ? ' ' + data[1].replace(/_/g, '.') : '');
      } // Detect Kubuntu.
      else if (name == 'Konqueror' && /^Linux\b/i.test(os)) {
        os = 'Kubuntu';
      } // Detect Android browsers.
      else if (manufacturer && manufacturer != 'Google' && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product)) || /\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua)) {
        name = 'Android Browser';
        os = /\bAndroid\b/.test(os) ? os : 'Android';
      } // Detect Silk desktop/accelerated modes.
      else if (name == 'Silk') {
        if (!/\bMobi/i.test(ua)) {
          os = 'Android';
          description.unshift('desktop mode');
        }

        if (/Accelerated *= *true/i.test(ua)) {
          description.unshift('accelerated');
        }
      } // Detect UC Browser speed mode.
      else if (name == 'UC Browser' && /\bUCWEB\b/.test(ua)) {
        description.push('speed mode');
      } // Detect PaleMoon identifying as Firefox.
      else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
        description.push('identifying as Firefox ' + data[1]);
      } // Detect Firefox OS and products running Firefox.
      else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
        os || (os = 'Firefox OS');
        product || (product = data[1]);
      } // Detect false positives for Firefox/Safari.
      else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
        // Escape the `/` for Firefox 1.
        if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
          // Clear name of false positives.
          name = null;
        } // Reassign a generic name.


        if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
          name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
        }
      } // Add Chrome version to description for Electron.
      else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
        description.push('Chromium ' + data);
      } // Detect non-Opera (Presto-based) versions (order is important).


      if (!version) {
        version = getVersion(['(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)', 'Version', qualify(name), '(?:Firefox|Minefield|NetFront)']);
      } // Detect stubborn layout engines.


      if (data = layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' || /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' || !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') || layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront') {
        layout = [data];
      } // Detect Windows Phone 7 desktop mode.


      if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
        name += ' Mobile';
        os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
        description.unshift('desktop mode');
      } // Detect Windows Phone 8.x desktop mode.
      else if (/\bWPDesktop\b/i.test(ua)) {
        name = 'IE Mobile';
        os = 'Windows Phone 8.x';
        description.unshift('desktop mode');
        version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
      } // Detect IE 11 identifying as other browsers.
      else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
        if (name) {
          description.push('identifying as ' + name + (version ? ' ' + version : ''));
        }

        name = 'IE';
        version = data[1];
      } // Leverage environment features.


      if (useFeatures) {
        // Detect server-side environments.
        // Rhino has a global function while others have a global object.
        if (isHostType(context, 'global')) {
          if (java) {
            data = java.lang.System;
            arch = data.getProperty('os.arch');
            os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
          }

          if (rhino) {
            try {
              version = context.require('ringo/engine').version.join('.');
              name = 'RingoJS';
            } catch (e) {
              if ((data = context.system) && data.global.system == context.system) {
                name = 'Narwhal';
                os || (os = data[0].os || null);
              }
            }

            if (!name) {
              name = 'Rhino';
            }
          } else if (typeof context.process == 'object' && !context.process.browser && (data = context.process)) {
            if (typeof data.versions == 'object') {
              if (typeof data.versions.electron == 'string') {
                description.push('Node ' + data.versions.node);
                name = 'Electron';
                version = data.versions.electron;
              } else if (typeof data.versions.nw == 'string') {
                description.push('Chromium ' + version, 'Node ' + data.versions.node);
                name = 'NW.js';
                version = data.versions.nw;
              }
            }

            if (!name) {
              name = 'Node.js';
              arch = data.arch;
              os = data.platform;
              version = /[\d.]+/.exec(data.version);
              version = version ? version[0] : null;
            }
          }
        } // Detect Adobe AIR.
        else if (getClassOf(data = context.runtime) == airRuntimeClass) {
          name = 'Adobe AIR';
          os = data.flash.system.Capabilities.os;
        } // Detect PhantomJS.
        else if (getClassOf(data = context.phantom) == phantomClass) {
          name = 'PhantomJS';
          version = (data = data.version || null) && data.major + '.' + data.minor + '.' + data.patch;
        } // Detect IE compatibility modes.
        else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
          // We're in compatibility mode when the Trident version + 4 doesn't
          // equal the document mode.
          version = [version, doc.documentMode];

          if ((data = +data[1] + 4) != version[1]) {
            description.push('IE ' + version[1] + ' mode');
            layout && (layout[1] = '');
            version[1] = data;
          }

          version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
        } // Detect IE 11 masking as other browsers.
        else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
          description.push('masking as ' + name + ' ' + version);
          name = 'IE';
          version = '11.0';
          layout = ['Trident'];
          os = 'Windows';
        }

        os = os && format(os);
      } // Detect prerelease phases.


      if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && 'a')) {
        prerelease = /b/i.test(data) ? 'beta' : 'alpha';
        version = version.replace(RegExp(data + '\\+?$'), '') + (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
      } // Detect Firefox Mobile.


      if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
        name = 'Firefox Mobile';
      } // Obscure Maxthon's unreliable version.
      else if (name == 'Maxthon' && version) {
        version = version.replace(/\.[\d.]+/, '.x');
      } // Detect Xbox 360 and Xbox One.
      else if (/\bXbox\b/i.test(product)) {
        if (product == 'Xbox 360') {
          os = null;
        }

        if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
          description.unshift('mobile mode');
        }
      } // Add mobile postfix.
      else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == 'Windows CE' || /Mobi/i.test(ua))) {
        name += ' Mobile';
      } // Detect IE platform preview.
      else if (name == 'IE' && useFeatures) {
        try {
          if (context.external === null) {
            description.unshift('platform preview');
          }
        } catch (e) {
          description.unshift('embedded');
        }
      } // Detect BlackBerry OS version.
      // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
      else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] || version)) {
        data = [data, /BB10/.test(ua)];
        os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
        version = null;
      } // Detect Opera identifying/masking itself as another browser.
      // http://www.opera.com/support/kb/view/843/
      else if (this != forOwn && product != 'Wii' && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os) || name == 'IE' && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, '') + ';')) && data.name) {
        // When "identifying", the UA contains both Opera and the other browser's name.
        data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');

        if (reOpera.test(name)) {
          if (/\bIE\b/.test(data) && os == 'Mac OS') {
            os = null;
          }

          data = 'identify' + data;
        } // When "masking", the UA contains only the other browser's name.
        else {
          data = 'mask' + data;

          if (operaClass) {
            name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
          } else {
            name = 'Opera';
          }

          if (/\bIE\b/.test(data)) {
            os = null;
          }

          if (!useFeatures) {
            version = null;
          }
        }

        layout = ['Presto'];
        description.push(data);
      } // Detect WebKit Nightly and approximate Chrome/Safari versions.


      if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
        // Correct build number for numeric comparison.
        // (e.g. "532.5" becomes "532.05")
        data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data]; // Nightly builds are postfixed with a "+".

        if (name == 'Safari' && data[1].slice(-1) == '+') {
          name = 'WebKit Nightly';
          prerelease = 'alpha';
          version = data[1].slice(0, -1);
        } // Clear incorrect browser versions.
        else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
          version = null;
        } // Use the full Chrome version when available.


        data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1]; // Detect Blink layout engine.

        if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
          layout = ['Blink'];
        } // Detect JavaScriptCore.
        // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi


        if (!useFeatures || !likeChrome && !data[1]) {
          layout && (layout[1] = 'like Safari');
          data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : '12');
        } else {
          layout && (layout[1] = 'like Chrome');
          data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
        } // Add the postfix of ".x" or "+" for approximate versions.


        layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+')); // Obscure version for some Safari 1-2 releases.

        if (name == 'Safari' && (!version || parseInt(version) > 45)) {
          version = data;
        } else if (name == 'Chrome' && /\bHeadlessChrome/i.test(ua)) {
          description.unshift('headless');
        }
      } // Detect Opera desktop modes.


      if (name == 'Opera' && (data = /\bzbov|zvav$/.exec(os))) {
        name += ' ';
        description.unshift('desktop mode');

        if (data == 'zvav') {
          name += 'Mini';
          version = null;
        } else {
          name += 'Mobile';
        }

        os = os.replace(RegExp(' *' + data + '$'), '');
      } // Detect Chrome desktop mode.
      else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
        description.unshift('desktop mode');
        name = 'Chrome Mobile';
        version = null;

        if (/\bOS X\b/.test(os)) {
          manufacturer = 'Apple';
          os = 'iOS 4.3+';
        } else {
          os = null;
        }
      } // Newer versions of SRWare Iron uses the Chrome tag to indicate its version number.
      else if (/\bSRWare Iron\b/.test(name) && !version) {
        version = getVersion('Chrome');
      } // Strip incorrect OS versions.


      if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf('/' + data + '-') > -1) {
        os = trim(os.replace(data, ''));
      } // Ensure OS does not include the browser name.


      if (os && os.indexOf(name) != -1 && !RegExp(name + ' OS').test(os)) {
        os = os.replace(RegExp(' *' + qualify(name) + ' *'), '');
      } // Add layout engine.


      if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
        // Don't add layout details to description if they are falsey.
        (data = layout[layout.length - 1]) && description.push(data);
      } // Combine contextual information.


      if (description.length) {
        description = ['(' + description.join('; ') + ')'];
      } // Append manufacturer to description.


      if (manufacturer && product && product.indexOf(manufacturer) < 0) {
        description.push('on ' + manufacturer);
      } // Append product to description.


      if (product) {
        description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
      } // Parse the OS into an object.


      if (os) {
        data = / ([\d.+]+)$/.exec(os);
        isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
        os = {
          'architecture': 32,
          'family': data && !isSpecialCasedOS ? os.replace(data[0], '') : os,
          'version': data ? data[1] : null,
          'toString': function () {
            var version = this.version;
            return this.family + (version && !isSpecialCasedOS ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
          }
        };
      } // Add browser/OS architecture.


      if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
        if (os) {
          os.architecture = 64;
          os.family = os.family.replace(RegExp(' *' + data), '');
        }

        if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
          description.unshift('32-bit');
        }
      } // Chrome 39 and above on OS X is always 64-bit.
      else if (os && /^OS X/.test(os.family) && name == 'Chrome' && parseFloat(version) >= 39) {
        os.architecture = 64;
      }

      ua || (ua = null);
      /*------------------------------------------------------------------------*/

      /**
       * The platform object.
       *
       * @name platform
       * @type Object
       */

      var platform = {};
      /**
       * The platform description.
       *
       * @memberOf platform
       * @type string|null
       */

      platform.description = ua;
      /**
       * The name of the browser's layout engine.
       *
       * The list of common layout engines include:
       * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
       *
       * @memberOf platform
       * @type string|null
       */

      platform.layout = layout && layout[0];
      /**
       * The name of the product's manufacturer.
       *
       * The list of manufacturers include:
       * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
       * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
       * "Nokia", "Samsung" and "Sony"
       *
       * @memberOf platform
       * @type string|null
       */

      platform.manufacturer = manufacturer;
      /**
       * The name of the browser/environment.
       *
       * The list of common browser names include:
       * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
       * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
       * "Opera Mini" and "Opera"
       *
       * Mobile versions of some browsers have "Mobile" appended to their name:
       * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
       *
       * @memberOf platform
       * @type string|null
       */

      platform.name = name;
      /**
       * The alpha/beta release indicator.
       *
       * @memberOf platform
       * @type string|null
       */

      platform.prerelease = prerelease;
      /**
       * The name of the product hosting the browser.
       *
       * The list of common products include:
       *
       * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
       * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
       *
       * @memberOf platform
       * @type string|null
       */

      platform.product = product;
      /**
       * The browser's user agent string.
       *
       * @memberOf platform
       * @type string|null
       */

      platform.ua = ua;
      /**
       * The browser/environment version.
       *
       * @memberOf platform
       * @type string|null
       */

      platform.version = name && version;
      /**
       * The name of the operating system.
       *
       * @memberOf platform
       * @type Object
       */

      platform.os = os || {
        /**
         * The CPU architecture the OS is built for.
         *
         * @memberOf platform.os
         * @type number|null
         */
        'architecture': null,

        /**
         * The family of the OS.
         *
         * Common values include:
         * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
         * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
         * "SuSE", "Android", "iOS" and "Windows Phone"
         *
         * @memberOf platform.os
         * @type string|null
         */
        'family': null,

        /**
         * The version of the OS.
         *
         * @memberOf platform.os
         * @type string|null
         */
        'version': null,

        /**
         * Returns the OS string.
         *
         * @memberOf platform.os
         * @returns {string} The OS string.
         */
        'toString': function () {
          return 'null';
        }
      };
      platform.parse = parse;
      platform.toString = toStringPlatform;

      if (platform.version) {
        description.unshift(version);
      }

      if (platform.name) {
        description.unshift(name);
      }

      if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
        description.push(product ? '(' + os + ')' : 'on ' + os);
      }

      if (description.length) {
        platform.description = description.join(' ');
      }

      return platform;
    }
    /*--------------------------------------------------------------------------*/
    // Export platform.


    var platform = parse(); // Some AMD build optimizers, like r.js, check for condition patterns like the following:

    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      // Expose platform on the global object to prevent errors when platform is
      // loaded by a script tag in the presence of an AMD loader.
      // See http://requirejs.org/docs/errors.html#mismatch for more details.
      root.platform = platform; // Define as an anonymous module so platform can be aliased through path mapping.

      define(function () {
        return platform;
      });
    } // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    else if (freeExports && freeModule) {
      // Export for CommonJS support.
      forOwn(platform, function (value, key) {
        freeExports[key] = value;
      });
    } else {
      // Export to the global object.
      root.platform = platform;
    }
  }).call(this);
}).call(module.exports);
export default module.exports;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJuYW1lcyI6WyJvYmplY3RUeXBlcyIsInJvb3QiLCJ3aW5kb3ciLCJvbGRSb290IiwiZnJlZUV4cG9ydHMiLCJleHBvcnRzIiwiZnJlZU1vZHVsZSIsIm1vZHVsZSIsIm5vZGVUeXBlIiwiZnJlZUdsb2JhbCIsImdsb2JhbCIsInNlbGYiLCJtYXhTYWZlSW50ZWdlciIsIk1hdGgiLCJwb3ciLCJyZU9wZXJhIiwidGhpc0JpbmRpbmciLCJvYmplY3RQcm90byIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwidG9TdHJpbmciLCJjYXBpdGFsaXplIiwic3RyaW5nIiwiU3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImNsZWFudXBPUyIsIm9zIiwicGF0dGVybiIsImxhYmVsIiwiZGF0YSIsInRlc3QiLCJleGVjIiwicmVwbGFjZSIsIlJlZ0V4cCIsImZvcm1hdCIsInNwbGl0IiwiZWFjaCIsIm9iamVjdCIsImNhbGxiYWNrIiwiaW5kZXgiLCJsZW5ndGgiLCJmb3JPd24iLCJ0cmltIiwia2V5IiwiY2FsbCIsImdldENsYXNzT2YiLCJ2YWx1ZSIsImlzSG9zdFR5cGUiLCJwcm9wZXJ0eSIsInR5cGUiLCJxdWFsaWZ5IiwicmVkdWNlIiwiYXJyYXkiLCJhY2N1bXVsYXRvciIsInBhcnNlIiwidWEiLCJjb250ZXh0IiwiaXNDdXN0b21Db250ZXh0IiwibmF2IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaXNNb2R1bGVTY29wZSIsImxpa2VDaHJvbWUiLCJvYmplY3RDbGFzcyIsImFpclJ1bnRpbWVDbGFzcyIsImVudmlyb0NsYXNzIiwiamF2YUNsYXNzIiwiamF2YSIsInBoYW50b21DbGFzcyIsInJoaW5vIiwiZW52aXJvbm1lbnQiLCJhbHBoYSIsImJldGEiLCJkb2MiLCJkb2N1bWVudCIsIm9wZXJhIiwib3BlcmFtaW5pIiwib3BlcmFDbGFzcyIsImFyY2giLCJkZXNjcmlwdGlvbiIsInByZXJlbGVhc2UiLCJ1c2VGZWF0dXJlcyIsInZlcnNpb24iLCJpc1NwZWNpYWxDYXNlZE9TIiwibGF5b3V0IiwiZ2V0TGF5b3V0IiwibmFtZSIsImdldE5hbWUiLCJwcm9kdWN0IiwiZ2V0UHJvZHVjdCIsIm1hbnVmYWN0dXJlciIsImdldE1hbnVmYWN0dXJlciIsImdldE9TIiwiZ3Vlc3NlcyIsInJlc3VsdCIsImd1ZXNzIiwiZ2V0VmVyc2lvbiIsInBhdHRlcm5zIiwidG9TdHJpbmdQbGF0Zm9ybSIsInB1c2giLCJ1bnNoaWZ0IiwiaW5kZXhPZiIsInBhcnNlRmxvYXQiLCJsYW5nIiwiU3lzdGVtIiwiZ2V0UHJvcGVydHkiLCJyZXF1aXJlIiwiam9pbiIsImUiLCJzeXN0ZW0iLCJwcm9jZXNzIiwiYnJvd3NlciIsInZlcnNpb25zIiwiZWxlY3Ryb24iLCJub2RlIiwibnciLCJwbGF0Zm9ybSIsInJ1bnRpbWUiLCJmbGFzaCIsIkNhcGFiaWxpdGllcyIsInBoYW50b20iLCJtYWpvciIsIm1pbm9yIiwicGF0Y2giLCJkb2N1bWVudE1vZGUiLCJ0b0ZpeGVkIiwiYXBwTWlub3JWZXJzaW9uIiwiZXh0ZXJuYWwiLCJwYXJzZUludCIsImZhbWlseSIsImFyY2hpdGVjdHVyZSIsImNwdUNsYXNzIiwiZGVmaW5lIiwiYW1kIl0sInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL3BsYXRmb3JtL3BsYXRmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogUGxhdGZvcm0uanMgdjEuMy42XG4gKiBDb3B5cmlnaHQgMjAxNC0yMDIwIEJlbmphbWluIFRhblxuICogQ29weXJpZ2h0IDIwMTEtMjAxMyBKb2huLURhdmlkIERhbHRvblxuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKiogVXNlZCB0byBkZXRlcm1pbmUgaWYgdmFsdWVzIGFyZSBvZiB0aGUgbGFuZ3VhZ2UgdHlwZSBgT2JqZWN0YC4gKi9cbiAgdmFyIG9iamVjdFR5cGVzID0ge1xuICAgICdmdW5jdGlvbic6IHRydWUsXG4gICAgJ29iamVjdCc6IHRydWVcbiAgfTtcblxuICAvKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgdmFyIHJvb3QgPSAob2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93KSB8fCB0aGlzO1xuXG4gIC8qKiBCYWNrdXAgcG9zc2libGUgZ2xvYmFsIG9iamVjdC4gKi9cbiAgdmFyIG9sZFJvb3QgPSByb290O1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzO1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSBvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSBhbmQgdXNlIGl0IGFzIGByb290YC4gKi9cbiAgdmFyIGZyZWVHbG9iYWwgPSBmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlICYmIHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuICBpZiAoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsKSkge1xuICAgIHJvb3QgPSBmcmVlR2xvYmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICAgKiBTZWUgdGhlIFtFUzYgc3BlY10oaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gICAqIGZvciBtb3JlIGRldGFpbHMuXG4gICAqL1xuICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4gIC8qKiBSZWd1bGFyIGV4cHJlc3Npb24gdG8gZGV0ZWN0IE9wZXJhLiAqL1xuICB2YXIgcmVPcGVyYSA9IC9cXGJPcGVyYS87XG5cbiAgLyoqIFBvc3NpYmxlIGdsb2JhbCBvYmplY3QuICovXG4gIHZhciB0aGlzQmluZGluZyA9IHRoaXM7XG5cbiAgLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbiAgdmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuICAvKiogVXNlZCB0byBjaGVjayBmb3Igb3duIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0LiAqL1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuICAvKiogVXNlZCB0byByZXNvbHZlIHRoZSBpbnRlcm5hbCBgW1tDbGFzc11dYCBvZiB2YWx1ZXMuICovXG4gIHZhciB0b1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDYXBpdGFsaXplcyBhIHN0cmluZyB2YWx1ZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNhcGl0YWxpemUuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjYXBpdGFsaXplZCBzdHJpbmcuXG4gICAqL1xuICBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpO1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG4gIH1cblxuICAvKipcbiAgICogQSB1dGlsaXR5IGZ1bmN0aW9uIHRvIGNsZWFuIHVwIHRoZSBPUyBuYW1lLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3MgVGhlIE9TIG5hbWUgdG8gY2xlYW4gdXAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGF0dGVybl0gQSBgUmVnRXhwYCBwYXR0ZXJuIG1hdGNoaW5nIHRoZSBPUyBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2xhYmVsXSBBIGxhYmVsIGZvciB0aGUgT1MuXG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbnVwT1Mob3MsIHBhdHRlcm4sIGxhYmVsKSB7XG4gICAgLy8gUGxhdGZvcm0gdG9rZW5zIGFyZSBkZWZpbmVkIGF0OlxuICAgIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNzUwMyhWUy44NSkuYXNweFxuICAgIC8vIGh0dHA6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLzIwMDgxMTIyMDUzOTUwL2h0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzNzUwMyhWUy44NSkuYXNweFxuICAgIHZhciBkYXRhID0ge1xuICAgICAgJzEwLjAnOiAnMTAnLFxuICAgICAgJzYuNCc6ICAnMTAgVGVjaG5pY2FsIFByZXZpZXcnLFxuICAgICAgJzYuMyc6ICAnOC4xJyxcbiAgICAgICc2LjInOiAgJzgnLFxuICAgICAgJzYuMSc6ICAnU2VydmVyIDIwMDggUjIgLyA3JyxcbiAgICAgICc2LjAnOiAgJ1NlcnZlciAyMDA4IC8gVmlzdGEnLFxuICAgICAgJzUuMic6ICAnU2VydmVyIDIwMDMgLyBYUCA2NC1iaXQnLFxuICAgICAgJzUuMSc6ICAnWFAnLFxuICAgICAgJzUuMDEnOiAnMjAwMCBTUDEnLFxuICAgICAgJzUuMCc6ICAnMjAwMCcsXG4gICAgICAnNC4wJzogICdOVCcsXG4gICAgICAnNC45MCc6ICdNRSdcbiAgICB9O1xuICAgIC8vIERldGVjdCBXaW5kb3dzIHZlcnNpb24gZnJvbSBwbGF0Zm9ybSB0b2tlbnMuXG4gICAgaWYgKHBhdHRlcm4gJiYgbGFiZWwgJiYgL15XaW4vaS50ZXN0KG9zKSAmJiAhL15XaW5kb3dzIFBob25lIC9pLnRlc3Qob3MpICYmXG4gICAgICAgIChkYXRhID0gZGF0YVsvW1xcZC5dKyQvLmV4ZWMob3MpXSkpIHtcbiAgICAgIG9zID0gJ1dpbmRvd3MgJyArIGRhdGE7XG4gICAgfVxuICAgIC8vIENvcnJlY3QgY2hhcmFjdGVyIGNhc2UgYW5kIGNsZWFudXAgc3RyaW5nLlxuICAgIG9zID0gU3RyaW5nKG9zKTtcblxuICAgIGlmIChwYXR0ZXJuICYmIGxhYmVsKSB7XG4gICAgICBvcyA9IG9zLnJlcGxhY2UoUmVnRXhwKHBhdHRlcm4sICdpJyksIGxhYmVsKTtcbiAgICB9XG5cbiAgICBvcyA9IGZvcm1hdChcbiAgICAgIG9zLnJlcGxhY2UoLyBjZSQvaSwgJyBDRScpXG4gICAgICAgIC5yZXBsYWNlKC9cXGJocHcvaSwgJ3dlYicpXG4gICAgICAgIC5yZXBsYWNlKC9cXGJNYWNpbnRvc2hcXGIvLCAnTWFjIE9TJylcbiAgICAgICAgLnJlcGxhY2UoL19Qb3dlclBDXFxiL2ksICcgT1MnKVxuICAgICAgICAucmVwbGFjZSgvXFxiKE9TIFgpIFteIFxcZF0rL2ksICckMScpXG4gICAgICAgIC5yZXBsYWNlKC9cXGJNYWMgKE9TIFgpXFxiLywgJyQxJylcbiAgICAgICAgLnJlcGxhY2UoL1xcLyhcXGQpLywgJyAkMScpXG4gICAgICAgIC5yZXBsYWNlKC9fL2csICcuJylcbiAgICAgICAgLnJlcGxhY2UoLyg/OiBCZVBDfFsgLl0qZmNbIFxcZC5dKykkL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvXFxieDg2XFwuNjRcXGIvZ2ksICd4ODZfNjQnKVxuICAgICAgICAucmVwbGFjZSgvXFxiKFdpbmRvd3MgUGhvbmUpIE9TXFxiLywgJyQxJylcbiAgICAgICAgLnJlcGxhY2UoL1xcYihDaHJvbWUgT1MgXFx3KykgW1xcZC5dK1xcYi8sICckMScpXG4gICAgICAgIC5zcGxpdCgnIG9uICcpWzBdXG4gICAgKTtcblxuICAgIHJldHVybiBvcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBpdGVyYXRpb24gdXRpbGl0eSBmb3IgYXJyYXlzIGFuZCBvYmplY3RzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBlYWNoKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IDA7XG5cbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyAmJiBsZW5ndGggPiAtMSAmJiBsZW5ndGggPD0gbWF4U2FmZUludGVnZXIpIHtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGNhbGxiYWNrKG9iamVjdFtpbmRleF0sIGluZGV4LCBvYmplY3QpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JPd24ob2JqZWN0LCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaW0gYW5kIGNvbmRpdGlvbmFsbHkgY2FwaXRhbGl6ZSBzdHJpbmcgdmFsdWVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZm9ybWF0LlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHN0cmluZy5cbiAgICovXG4gIGZ1bmN0aW9uIGZvcm1hdChzdHJpbmcpIHtcbiAgICBzdHJpbmcgPSB0cmltKHN0cmluZyk7XG4gICAgcmV0dXJuIC9eKD86d2ViT1N8aSg/Ok9TfFApKS8udGVzdChzdHJpbmcpXG4gICAgICA/IHN0cmluZ1xuICAgICAgOiBjYXBpdGFsaXplKHN0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcywgZXhlY3V0aW5nIHRoZSBgY2FsbGJhY2tgIGZvciBlYWNoLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gZXhlY3V0ZWQgcGVyIG93biBwcm9wZXJ0eS5cbiAgICovXG4gIGZ1bmN0aW9uIGZvck93bihvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICAgIGNhbGxiYWNrKG9iamVjdFtrZXldLCBrZXksIG9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGludGVybmFsIGBbW0NsYXNzXV1gIG9mIGEgdmFsdWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgYFtbQ2xhc3NdXWAuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDbGFzc09mKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGxcbiAgICAgID8gY2FwaXRhbGl6ZSh2YWx1ZSlcbiAgICAgIDogdG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhvc3Qgb2JqZWN0cyBjYW4gcmV0dXJuIHR5cGUgdmFsdWVzIHRoYXQgYXJlIGRpZmZlcmVudCBmcm9tIHRoZWlyIGFjdHVhbFxuICAgKiBkYXRhIHR5cGUuIFRoZSBvYmplY3RzIHdlIGFyZSBjb25jZXJuZWQgd2l0aCB1c3VhbGx5IHJldHVybiBub24tcHJpbWl0aXZlXG4gICAqIHR5cGVzIG9mIFwib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgb3IgXCJ1bmtub3duXCIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBvd25lciBvZiB0aGUgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgcHJvcGVydHkgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgcHJvcGVydHkgdmFsdWUgaXMgYSBub24tcHJpbWl0aXZlLCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBpc0hvc3RUeXBlKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICB2YXIgdHlwZSA9IG9iamVjdCAhPSBudWxsID8gdHlwZW9mIG9iamVjdFtwcm9wZXJ0eV0gOiAnbnVtYmVyJztcbiAgICByZXR1cm4gIS9eKD86Ym9vbGVhbnxudW1iZXJ8c3RyaW5nfHVuZGVmaW5lZCkkLy50ZXN0KHR5cGUpICYmXG4gICAgICAodHlwZSA9PSAnb2JqZWN0JyA/ICEhb2JqZWN0W3Byb3BlcnR5XSA6IHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmVzIGEgc3RyaW5nIGZvciB1c2UgaW4gYSBgUmVnRXhwYCBieSBtYWtpbmcgaHlwaGVucyBhbmQgc3BhY2VzIG9wdGlvbmFsLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcXVhbGlmeS5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHF1YWxpZmllZCBzdHJpbmcuXG4gICAqL1xuICBmdW5jdGlvbiBxdWFsaWZ5KHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC8oWyAtXSkoPyEkKS9nLCAnJDE/Jyk7XG4gIH1cblxuICAvKipcbiAgICogQSBiYXJlLWJvbmVzIGBBcnJheSNyZWR1Y2VgIGxpa2UgdXRpbGl0eSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcmV0dXJucyB7Kn0gVGhlIGFjY3VtdWxhdGVkIHJlc3VsdC5cbiAgICovXG4gIGZ1bmN0aW9uIHJlZHVjZShhcnJheSwgY2FsbGJhY2spIHtcbiAgICB2YXIgYWNjdW11bGF0b3IgPSBudWxsO1xuICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgYWNjdW11bGF0b3IgPSBjYWxsYmFjayhhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBhcnJheSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSBmcm9tIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gdHJpbS5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRyaW1tZWQgc3RyaW5nLlxuICAgKi9cbiAgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXiArfCArJC9nLCAnJyk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBwbGF0Zm9ybSBvYmplY3QuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IFt1YT1uYXZpZ2F0b3IudXNlckFnZW50XSBUaGUgdXNlciBhZ2VudCBzdHJpbmcgb3JcbiAgICogIGNvbnRleHQgb2JqZWN0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIHBsYXRmb3JtIG9iamVjdC5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlKHVhKSB7XG5cbiAgICAvKiogVGhlIGVudmlyb25tZW50IGNvbnRleHQgb2JqZWN0LiAqL1xuICAgIHZhciBjb250ZXh0ID0gcm9vdDtcblxuICAgIC8qKiBVc2VkIHRvIGZsYWcgd2hlbiBhIGN1c3RvbSBjb250ZXh0IGlzIHByb3ZpZGVkLiAqL1xuICAgIHZhciBpc0N1c3RvbUNvbnRleHQgPSB1YSAmJiB0eXBlb2YgdWEgPT0gJ29iamVjdCcgJiYgZ2V0Q2xhc3NPZih1YSkgIT0gJ1N0cmluZyc7XG5cbiAgICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICAgIGlmIChpc0N1c3RvbUNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSB1YTtcbiAgICAgIHVhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKiogQnJvd3NlciBuYXZpZ2F0b3Igb2JqZWN0LiAqL1xuICAgIHZhciBuYXYgPSBjb250ZXh0Lm5hdmlnYXRvciB8fCB7fTtcblxuICAgIC8qKiBCcm93c2VyIHVzZXIgYWdlbnQgc3RyaW5nLiAqL1xuICAgIHZhciB1c2VyQWdlbnQgPSBuYXYudXNlckFnZW50IHx8ICcnO1xuXG4gICAgdWEgfHwgKHVhID0gdXNlckFnZW50KTtcblxuICAgIC8qKiBVc2VkIHRvIGZsYWcgd2hlbiBgdGhpc0JpbmRpbmdgIGlzIHRoZSBbTW9kdWxlU2NvcGVdLiAqL1xuICAgIHZhciBpc01vZHVsZVNjb3BlID0gaXNDdXN0b21Db250ZXh0IHx8IHRoaXNCaW5kaW5nID09IG9sZFJvb3Q7XG5cbiAgICAvKiogVXNlZCB0byBkZXRlY3QgaWYgYnJvd3NlciBpcyBsaWtlIENocm9tZS4gKi9cbiAgICB2YXIgbGlrZUNocm9tZSA9IGlzQ3VzdG9tQ29udGV4dFxuICAgICAgPyAhIW5hdi5saWtlQ2hyb21lXG4gICAgICA6IC9cXGJDaHJvbWVcXGIvLnRlc3QodWEpICYmICEvaW50ZXJuYWx8XFxuL2kudGVzdCh0b1N0cmluZy50b1N0cmluZygpKTtcblxuICAgIC8qKiBJbnRlcm5hbCBgW1tDbGFzc11dYCB2YWx1ZSBzaG9ydGN1dHMuICovXG4gICAgdmFyIG9iamVjdENsYXNzID0gJ09iamVjdCcsXG4gICAgICAgIGFpclJ1bnRpbWVDbGFzcyA9IGlzQ3VzdG9tQ29udGV4dCA/IG9iamVjdENsYXNzIDogJ1NjcmlwdEJyaWRnaW5nUHJveHlPYmplY3QnLFxuICAgICAgICBlbnZpcm9DbGFzcyA9IGlzQ3VzdG9tQ29udGV4dCA/IG9iamVjdENsYXNzIDogJ0Vudmlyb25tZW50JyxcbiAgICAgICAgamF2YUNsYXNzID0gKGlzQ3VzdG9tQ29udGV4dCAmJiBjb250ZXh0LmphdmEpID8gJ0phdmFQYWNrYWdlJyA6IGdldENsYXNzT2YoY29udGV4dC5qYXZhKSxcbiAgICAgICAgcGhhbnRvbUNsYXNzID0gaXNDdXN0b21Db250ZXh0ID8gb2JqZWN0Q2xhc3MgOiAnUnVudGltZU9iamVjdCc7XG5cbiAgICAvKiogRGV0ZWN0IEphdmEgZW52aXJvbm1lbnRzLiAqL1xuICAgIHZhciBqYXZhID0gL1xcYkphdmEvLnRlc3QoamF2YUNsYXNzKSAmJiBjb250ZXh0LmphdmE7XG5cbiAgICAvKiogRGV0ZWN0IFJoaW5vLiAqL1xuICAgIHZhciByaGlubyA9IGphdmEgJiYgZ2V0Q2xhc3NPZihjb250ZXh0LmVudmlyb25tZW50KSA9PSBlbnZpcm9DbGFzcztcblxuICAgIC8qKiBBIGNoYXJhY3RlciB0byByZXByZXNlbnQgYWxwaGEuICovXG4gICAgdmFyIGFscGhhID0gamF2YSA/ICdhJyA6ICdcXHUwM2IxJztcblxuICAgIC8qKiBBIGNoYXJhY3RlciB0byByZXByZXNlbnQgYmV0YS4gKi9cbiAgICB2YXIgYmV0YSA9IGphdmEgPyAnYicgOiAnXFx1MDNiMic7XG5cbiAgICAvKiogQnJvd3NlciBkb2N1bWVudCBvYmplY3QuICovXG4gICAgdmFyIGRvYyA9IGNvbnRleHQuZG9jdW1lbnQgfHwge307XG5cbiAgICAvKipcbiAgICAgKiBEZXRlY3QgT3BlcmEgYnJvd3NlciAoUHJlc3RvLWJhc2VkKS5cbiAgICAgKiBodHRwOi8vd3d3Lmhvd3RvY3JlYXRlLmNvLnVrL29wZXJhU3R1ZmYvb3BlcmFPYmplY3QuaHRtbFxuICAgICAqIGh0dHA6Ly9kZXYub3BlcmEuY29tL2FydGljbGVzL3ZpZXcvb3BlcmEtbWluaS13ZWItY29udGVudC1hdXRob3JpbmctZ3VpZGVsaW5lcy8jb3BlcmFtaW5pXG4gICAgICovXG4gICAgdmFyIG9wZXJhID0gY29udGV4dC5vcGVyYW1pbmkgfHwgY29udGV4dC5vcGVyYTtcblxuICAgIC8qKiBPcGVyYSBgW1tDbGFzc11dYC4gKi9cbiAgICB2YXIgb3BlcmFDbGFzcyA9IHJlT3BlcmEudGVzdChvcGVyYUNsYXNzID0gKGlzQ3VzdG9tQ29udGV4dCAmJiBvcGVyYSkgPyBvcGVyYVsnW1tDbGFzc11dJ10gOiBnZXRDbGFzc09mKG9wZXJhKSlcbiAgICAgID8gb3BlcmFDbGFzc1xuICAgICAgOiAob3BlcmEgPSBudWxsKTtcblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgdXNlZCBvdmVyIHRoZSBzY3JpcHQncyBsaWZldGltZS4gKi9cbiAgICB2YXIgZGF0YTtcblxuICAgIC8qKiBUaGUgQ1BVIGFyY2hpdGVjdHVyZS4gKi9cbiAgICB2YXIgYXJjaCA9IHVhO1xuXG4gICAgLyoqIFBsYXRmb3JtIGRlc2NyaXB0aW9uIGFycmF5LiAqL1xuICAgIHZhciBkZXNjcmlwdGlvbiA9IFtdO1xuXG4gICAgLyoqIFBsYXRmb3JtIGFscGhhL2JldGEgaW5kaWNhdG9yLiAqL1xuICAgIHZhciBwcmVyZWxlYXNlID0gbnVsbDtcblxuICAgIC8qKiBBIGZsYWcgdG8gaW5kaWNhdGUgdGhhdCBlbnZpcm9ubWVudCBmZWF0dXJlcyBzaG91bGQgYmUgdXNlZCB0byByZXNvbHZlIHRoZSBwbGF0Zm9ybS4gKi9cbiAgICB2YXIgdXNlRmVhdHVyZXMgPSB1YSA9PSB1c2VyQWdlbnQ7XG5cbiAgICAvKiogVGhlIGJyb3dzZXIvZW52aXJvbm1lbnQgdmVyc2lvbi4gKi9cbiAgICB2YXIgdmVyc2lvbiA9IHVzZUZlYXR1cmVzICYmIG9wZXJhICYmIHR5cGVvZiBvcGVyYS52ZXJzaW9uID09ICdmdW5jdGlvbicgJiYgb3BlcmEudmVyc2lvbigpO1xuXG4gICAgLyoqIEEgZmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgT1MgZW5kcyB3aXRoIFwiLyBWZXJzaW9uXCIgKi9cbiAgICB2YXIgaXNTcGVjaWFsQ2FzZWRPUztcblxuICAgIC8qIERldGVjdGFibGUgbGF5b3V0IGVuZ2luZXMgKG9yZGVyIGlzIGltcG9ydGFudCkuICovXG4gICAgdmFyIGxheW91dCA9IGdldExheW91dChbXG4gICAgICB7ICdsYWJlbCc6ICdFZGdlSFRNTCcsICdwYXR0ZXJuJzogJ0VkZ2UnIH0sXG4gICAgICAnVHJpZGVudCcsXG4gICAgICB7ICdsYWJlbCc6ICdXZWJLaXQnLCAncGF0dGVybic6ICdBcHBsZVdlYktpdCcgfSxcbiAgICAgICdpQ2FiJyxcbiAgICAgICdQcmVzdG8nLFxuICAgICAgJ05ldEZyb250JyxcbiAgICAgICdUYXNtYW4nLFxuICAgICAgJ0tIVE1MJyxcbiAgICAgICdHZWNrbydcbiAgICBdKTtcblxuICAgIC8qIERldGVjdGFibGUgYnJvd3NlciBuYW1lcyAob3JkZXIgaXMgaW1wb3J0YW50KS4gKi9cbiAgICB2YXIgbmFtZSA9IGdldE5hbWUoW1xuICAgICAgJ0Fkb2JlIEFJUicsXG4gICAgICAnQXJvcmEnLFxuICAgICAgJ0F2YW50IEJyb3dzZXInLFxuICAgICAgJ0JyZWFjaCcsXG4gICAgICAnQ2FtaW5vJyxcbiAgICAgICdFbGVjdHJvbicsXG4gICAgICAnRXBpcGhhbnknLFxuICAgICAgJ0Zlbm5lYycsXG4gICAgICAnRmxvY2snLFxuICAgICAgJ0dhbGVvbicsXG4gICAgICAnR3JlZW5Ccm93c2VyJyxcbiAgICAgICdpQ2FiJyxcbiAgICAgICdJY2V3ZWFzZWwnLFxuICAgICAgJ0stTWVsZW9uJyxcbiAgICAgICdLb25xdWVyb3InLFxuICAgICAgJ0x1bmFzY2FwZScsXG4gICAgICAnTWF4dGhvbicsXG4gICAgICB7ICdsYWJlbCc6ICdNaWNyb3NvZnQgRWRnZScsICdwYXR0ZXJuJzogJyg/OkVkZ2V8RWRnfEVkZ0F8RWRnaU9TKScgfSxcbiAgICAgICdNaWRvcmknLFxuICAgICAgJ05vb2sgQnJvd3NlcicsXG4gICAgICAnUGFsZU1vb24nLFxuICAgICAgJ1BoYW50b21KUycsXG4gICAgICAnUmF2ZW4nLFxuICAgICAgJ1Jla29ucScsXG4gICAgICAnUm9ja01lbHQnLFxuICAgICAgeyAnbGFiZWwnOiAnU2Ftc3VuZyBJbnRlcm5ldCcsICdwYXR0ZXJuJzogJ1NhbXN1bmdCcm93c2VyJyB9LFxuICAgICAgJ1NlYU1vbmtleScsXG4gICAgICB7ICdsYWJlbCc6ICdTaWxrJywgJ3BhdHRlcm4nOiAnKD86Q2xvdWQ5fFNpbGstQWNjZWxlcmF0ZWQpJyB9LFxuICAgICAgJ1NsZWlwbmlyJyxcbiAgICAgICdTbGltQnJvd3NlcicsXG4gICAgICB7ICdsYWJlbCc6ICdTUldhcmUgSXJvbicsICdwYXR0ZXJuJzogJ0lyb24nIH0sXG4gICAgICAnU3VucmlzZScsXG4gICAgICAnU3dpZnRmb3gnLFxuICAgICAgJ1ZpdmFsZGknLFxuICAgICAgJ1dhdGVyZm94JyxcbiAgICAgICdXZWJQb3NpdGl2ZScsXG4gICAgICB7ICdsYWJlbCc6ICdZYW5kZXggQnJvd3NlcicsICdwYXR0ZXJuJzogJ1lhQnJvd3NlcicgfSxcbiAgICAgIHsgJ2xhYmVsJzogJ1VDIEJyb3dzZXInLCAncGF0dGVybic6ICdVQ0Jyb3dzZXInIH0sXG4gICAgICAnT3BlcmEgTWluaScsXG4gICAgICB7ICdsYWJlbCc6ICdPcGVyYSBNaW5pJywgJ3BhdHRlcm4nOiAnT1BpT1MnIH0sXG4gICAgICAnT3BlcmEnLFxuICAgICAgeyAnbGFiZWwnOiAnT3BlcmEnLCAncGF0dGVybic6ICdPUFInIH0sXG4gICAgICAnQ2hyb21pdW0nLFxuICAgICAgJ0Nocm9tZScsXG4gICAgICB7ICdsYWJlbCc6ICdDaHJvbWUnLCAncGF0dGVybic6ICcoPzpIZWFkbGVzc0Nocm9tZSknIH0sXG4gICAgICB7ICdsYWJlbCc6ICdDaHJvbWUgTW9iaWxlJywgJ3BhdHRlcm4nOiAnKD86Q3JpT1N8Q3JNbyknIH0sXG4gICAgICB7ICdsYWJlbCc6ICdGaXJlZm94JywgJ3BhdHRlcm4nOiAnKD86RmlyZWZveHxNaW5lZmllbGQpJyB9LFxuICAgICAgeyAnbGFiZWwnOiAnRmlyZWZveCBmb3IgaU9TJywgJ3BhdHRlcm4nOiAnRnhpT1MnIH0sXG4gICAgICB7ICdsYWJlbCc6ICdJRScsICdwYXR0ZXJuJzogJ0lFTW9iaWxlJyB9LFxuICAgICAgeyAnbGFiZWwnOiAnSUUnLCAncGF0dGVybic6ICdNU0lFJyB9LFxuICAgICAgJ1NhZmFyaSdcbiAgICBdKTtcblxuICAgIC8qIERldGVjdGFibGUgcHJvZHVjdHMgKG9yZGVyIGlzIGltcG9ydGFudCkuICovXG4gICAgdmFyIHByb2R1Y3QgPSBnZXRQcm9kdWN0KFtcbiAgICAgIHsgJ2xhYmVsJzogJ0JsYWNrQmVycnknLCAncGF0dGVybic6ICdCQjEwJyB9LFxuICAgICAgJ0JsYWNrQmVycnknLFxuICAgICAgeyAnbGFiZWwnOiAnR2FsYXh5IFMnLCAncGF0dGVybic6ICdHVC1JOTAwMCcgfSxcbiAgICAgIHsgJ2xhYmVsJzogJ0dhbGF4eSBTMicsICdwYXR0ZXJuJzogJ0dULUk5MTAwJyB9LFxuICAgICAgeyAnbGFiZWwnOiAnR2FsYXh5IFMzJywgJ3BhdHRlcm4nOiAnR1QtSTkzMDAnIH0sXG4gICAgICB7ICdsYWJlbCc6ICdHYWxheHkgUzQnLCAncGF0dGVybic6ICdHVC1JOTUwMCcgfSxcbiAgICAgIHsgJ2xhYmVsJzogJ0dhbGF4eSBTNScsICdwYXR0ZXJuJzogJ1NNLUc5MDAnIH0sXG4gICAgICB7ICdsYWJlbCc6ICdHYWxheHkgUzYnLCAncGF0dGVybic6ICdTTS1HOTIwJyB9LFxuICAgICAgeyAnbGFiZWwnOiAnR2FsYXh5IFM2IEVkZ2UnLCAncGF0dGVybic6ICdTTS1HOTI1JyB9LFxuICAgICAgeyAnbGFiZWwnOiAnR2FsYXh5IFM3JywgJ3BhdHRlcm4nOiAnU00tRzkzMCcgfSxcbiAgICAgIHsgJ2xhYmVsJzogJ0dhbGF4eSBTNyBFZGdlJywgJ3BhdHRlcm4nOiAnU00tRzkzNScgfSxcbiAgICAgICdHb29nbGUgVFYnLFxuICAgICAgJ0x1bWlhJyxcbiAgICAgICdpUGFkJyxcbiAgICAgICdpUG9kJyxcbiAgICAgICdpUGhvbmUnLFxuICAgICAgJ0tpbmRsZScsXG4gICAgICB7ICdsYWJlbCc6ICdLaW5kbGUgRmlyZScsICdwYXR0ZXJuJzogJyg/OkNsb3VkOXxTaWxrLUFjY2VsZXJhdGVkKScgfSxcbiAgICAgICdOZXh1cycsXG4gICAgICAnTm9vaycsXG4gICAgICAnUGxheUJvb2snLFxuICAgICAgJ1BsYXlTdGF0aW9uIFZpdGEnLFxuICAgICAgJ1BsYXlTdGF0aW9uJyxcbiAgICAgICdUb3VjaFBhZCcsXG4gICAgICAnVHJhbnNmb3JtZXInLFxuICAgICAgeyAnbGFiZWwnOiAnV2lpIFUnLCAncGF0dGVybic6ICdXaWlVJyB9LFxuICAgICAgJ1dpaScsXG4gICAgICAnWGJveCBPbmUnLFxuICAgICAgeyAnbGFiZWwnOiAnWGJveCAzNjAnLCAncGF0dGVybic6ICdYYm94JyB9LFxuICAgICAgJ1hvb20nXG4gICAgXSk7XG5cbiAgICAvKiBEZXRlY3RhYmxlIG1hbnVmYWN0dXJlcnMuICovXG4gICAgdmFyIG1hbnVmYWN0dXJlciA9IGdldE1hbnVmYWN0dXJlcih7XG4gICAgICAnQXBwbGUnOiB7ICdpUGFkJzogMSwgJ2lQaG9uZSc6IDEsICdpUG9kJzogMSB9LFxuICAgICAgJ0FsY2F0ZWwnOiB7fSxcbiAgICAgICdBcmNob3MnOiB7fSxcbiAgICAgICdBbWF6b24nOiB7ICdLaW5kbGUnOiAxLCAnS2luZGxlIEZpcmUnOiAxIH0sXG4gICAgICAnQXN1cyc6IHsgJ1RyYW5zZm9ybWVyJzogMSB9LFxuICAgICAgJ0Jhcm5lcyAmIE5vYmxlJzogeyAnTm9vayc6IDEgfSxcbiAgICAgICdCbGFja0JlcnJ5JzogeyAnUGxheUJvb2snOiAxIH0sXG4gICAgICAnR29vZ2xlJzogeyAnR29vZ2xlIFRWJzogMSwgJ05leHVzJzogMSB9LFxuICAgICAgJ0hQJzogeyAnVG91Y2hQYWQnOiAxIH0sXG4gICAgICAnSFRDJzoge30sXG4gICAgICAnSHVhd2VpJzoge30sXG4gICAgICAnTGVub3ZvJzoge30sXG4gICAgICAnTEcnOiB7fSxcbiAgICAgICdNaWNyb3NvZnQnOiB7ICdYYm94JzogMSwgJ1hib3ggT25lJzogMSB9LFxuICAgICAgJ01vdG9yb2xhJzogeyAnWG9vbSc6IDEgfSxcbiAgICAgICdOaW50ZW5kbyc6IHsgJ1dpaSBVJzogMSwgICdXaWknOiAxIH0sXG4gICAgICAnTm9raWEnOiB7ICdMdW1pYSc6IDEgfSxcbiAgICAgICdPcHBvJzoge30sXG4gICAgICAnU2Ftc3VuZyc6IHsgJ0dhbGF4eSBTJzogMSwgJ0dhbGF4eSBTMic6IDEsICdHYWxheHkgUzMnOiAxLCAnR2FsYXh5IFM0JzogMSB9LFxuICAgICAgJ1NvbnknOiB7ICdQbGF5U3RhdGlvbic6IDEsICdQbGF5U3RhdGlvbiBWaXRhJzogMSB9LFxuICAgICAgJ1hpYW9taSc6IHsgJ01pJzogMSwgJ1JlZG1pJzogMSB9XG4gICAgfSk7XG5cbiAgICAvKiBEZXRlY3RhYmxlIG9wZXJhdGluZyBzeXN0ZW1zIChvcmRlciBpcyBpbXBvcnRhbnQpLiAqL1xuICAgIHZhciBvcyA9IGdldE9TKFtcbiAgICAgICdXaW5kb3dzIFBob25lJyxcbiAgICAgICdLYWlPUycsXG4gICAgICAnQW5kcm9pZCcsXG4gICAgICAnQ2VudE9TJyxcbiAgICAgIHsgJ2xhYmVsJzogJ0Nocm9tZSBPUycsICdwYXR0ZXJuJzogJ0NyT1MnIH0sXG4gICAgICAnRGViaWFuJyxcbiAgICAgIHsgJ2xhYmVsJzogJ0RyYWdvbkZseSBCU0QnLCAncGF0dGVybic6ICdEcmFnb25GbHknIH0sXG4gICAgICAnRmVkb3JhJyxcbiAgICAgICdGcmVlQlNEJyxcbiAgICAgICdHZW50b28nLFxuICAgICAgJ0hhaWt1JyxcbiAgICAgICdLdWJ1bnR1JyxcbiAgICAgICdMaW51eCBNaW50JyxcbiAgICAgICdPcGVuQlNEJyxcbiAgICAgICdSZWQgSGF0JyxcbiAgICAgICdTdVNFJyxcbiAgICAgICdVYnVudHUnLFxuICAgICAgJ1h1YnVudHUnLFxuICAgICAgJ0N5Z3dpbicsXG4gICAgICAnU3ltYmlhbiBPUycsXG4gICAgICAnaHB3T1MnLFxuICAgICAgJ3dlYk9TICcsXG4gICAgICAnd2ViT1MnLFxuICAgICAgJ1RhYmxldCBPUycsXG4gICAgICAnVGl6ZW4nLFxuICAgICAgJ0xpbnV4JyxcbiAgICAgICdNYWMgT1MgWCcsXG4gICAgICAnTWFjaW50b3NoJyxcbiAgICAgICdNYWMnLFxuICAgICAgJ1dpbmRvd3MgOTg7JyxcbiAgICAgICdXaW5kb3dzICdcbiAgICBdKTtcblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIC8qKlxuICAgICAqIFBpY2tzIHRoZSBsYXlvdXQgZW5naW5lIGZyb20gYW4gYXJyYXkgb2YgZ3Vlc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZ3Vlc3NlcyBBbiBhcnJheSBvZiBndWVzc2VzLlxuICAgICAqIEByZXR1cm5zIHtudWxsfHN0cmluZ30gVGhlIGRldGVjdGVkIGxheW91dCBlbmdpbmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0TGF5b3V0KGd1ZXNzZXMpIHtcbiAgICAgIHJldHVybiByZWR1Y2UoZ3Vlc3NlcywgZnVuY3Rpb24ocmVzdWx0LCBndWVzcykge1xuICAgICAgICByZXR1cm4gcmVzdWx0IHx8IFJlZ0V4cCgnXFxcXGInICsgKFxuICAgICAgICAgIGd1ZXNzLnBhdHRlcm4gfHwgcXVhbGlmeShndWVzcylcbiAgICAgICAgKSArICdcXFxcYicsICdpJykuZXhlYyh1YSkgJiYgKGd1ZXNzLmxhYmVsIHx8IGd1ZXNzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2tzIHRoZSBtYW51ZmFjdHVyZXIgZnJvbSBhbiBhcnJheSBvZiBndWVzc2VzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBndWVzc2VzIEFuIG9iamVjdCBvZiBndWVzc2VzLlxuICAgICAqIEByZXR1cm5zIHtudWxsfHN0cmluZ30gVGhlIGRldGVjdGVkIG1hbnVmYWN0dXJlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRNYW51ZmFjdHVyZXIoZ3Vlc3Nlcykge1xuICAgICAgcmV0dXJuIHJlZHVjZShndWVzc2VzLCBmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICAgICAgLy8gTG9va3VwIHRoZSBtYW51ZmFjdHVyZXIgYnkgcHJvZHVjdCBvciBzY2FuIHRoZSBVQSBmb3IgdGhlIG1hbnVmYWN0dXJlci5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCAoXG4gICAgICAgICAgdmFsdWVbcHJvZHVjdF0gfHxcbiAgICAgICAgICB2YWx1ZVsvXlthLXpdKyg/OiArW2Etel0rXFxiKSovaS5leGVjKHByb2R1Y3QpXSB8fFxuICAgICAgICAgIFJlZ0V4cCgnXFxcXGInICsgcXVhbGlmeShrZXkpICsgJyg/OlxcXFxifFxcXFx3KlxcXFxkKScsICdpJykuZXhlYyh1YSlcbiAgICAgICAgKSAmJiBrZXk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQaWNrcyB0aGUgYnJvd3NlciBuYW1lIGZyb20gYW4gYXJyYXkgb2YgZ3Vlc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZ3Vlc3NlcyBBbiBhcnJheSBvZiBndWVzc2VzLlxuICAgICAqIEByZXR1cm5zIHtudWxsfHN0cmluZ30gVGhlIGRldGVjdGVkIGJyb3dzZXIgbmFtZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXROYW1lKGd1ZXNzZXMpIHtcbiAgICAgIHJldHVybiByZWR1Y2UoZ3Vlc3NlcywgZnVuY3Rpb24ocmVzdWx0LCBndWVzcykge1xuICAgICAgICByZXR1cm4gcmVzdWx0IHx8IFJlZ0V4cCgnXFxcXGInICsgKFxuICAgICAgICAgIGd1ZXNzLnBhdHRlcm4gfHwgcXVhbGlmeShndWVzcylcbiAgICAgICAgKSArICdcXFxcYicsICdpJykuZXhlYyh1YSkgJiYgKGd1ZXNzLmxhYmVsIHx8IGd1ZXNzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2tzIHRoZSBPUyBuYW1lIGZyb20gYW4gYXJyYXkgb2YgZ3Vlc3Nlcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZ3Vlc3NlcyBBbiBhcnJheSBvZiBndWVzc2VzLlxuICAgICAqIEByZXR1cm5zIHtudWxsfHN0cmluZ30gVGhlIGRldGVjdGVkIE9TIG5hbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0T1MoZ3Vlc3Nlcykge1xuICAgICAgcmV0dXJuIHJlZHVjZShndWVzc2VzLCBmdW5jdGlvbihyZXN1bHQsIGd1ZXNzKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gZ3Vlc3MucGF0dGVybiB8fCBxdWFsaWZ5KGd1ZXNzKTtcbiAgICAgICAgaWYgKCFyZXN1bHQgJiYgKHJlc3VsdCA9XG4gICAgICAgICAgICAgIFJlZ0V4cCgnXFxcXGInICsgcGF0dGVybiArICcoPzovW1xcXFxkLl0rfFsgXFxcXHcuXSopJywgJ2knKS5leGVjKHVhKVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgIHJlc3VsdCA9IGNsZWFudXBPUyhyZXN1bHQsIHBhdHRlcm4sIGd1ZXNzLmxhYmVsIHx8IGd1ZXNzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlja3MgdGhlIHByb2R1Y3QgbmFtZSBmcm9tIGFuIGFycmF5IG9mIGd1ZXNzZXMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGd1ZXNzZXMgQW4gYXJyYXkgb2YgZ3Vlc3Nlcy5cbiAgICAgKiBAcmV0dXJucyB7bnVsbHxzdHJpbmd9IFRoZSBkZXRlY3RlZCBwcm9kdWN0IG5hbWUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UHJvZHVjdChndWVzc2VzKSB7XG4gICAgICByZXR1cm4gcmVkdWNlKGd1ZXNzZXMsIGZ1bmN0aW9uKHJlc3VsdCwgZ3Vlc3MpIHtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSBndWVzcy5wYXR0ZXJuIHx8IHF1YWxpZnkoZ3Vlc3MpO1xuICAgICAgICBpZiAoIXJlc3VsdCAmJiAocmVzdWx0ID1cbiAgICAgICAgICAgICAgUmVnRXhwKCdcXFxcYicgKyBwYXR0ZXJuICsgJyAqXFxcXGQrWy5cXFxcd19dKicsICdpJykuZXhlYyh1YSkgfHxcbiAgICAgICAgICAgICAgUmVnRXhwKCdcXFxcYicgKyBwYXR0ZXJuICsgJyAqXFxcXHcrLVtcXFxcd10qJywgJ2knKS5leGVjKHVhKSB8fFxuICAgICAgICAgICAgICBSZWdFeHAoJ1xcXFxiJyArIHBhdHRlcm4gKyAnKD86OyAqKD86W2Etel0rW18tXSk/W2Etel0rXFxcXGQrfFteICgpOy1dKiknLCAnaScpLmV4ZWModWEpXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgLy8gU3BsaXQgYnkgZm9yd2FyZCBzbGFzaCBhbmQgYXBwZW5kIHByb2R1Y3QgdmVyc2lvbiBpZiBuZWVkZWQuXG4gICAgICAgICAgaWYgKChyZXN1bHQgPSBTdHJpbmcoKGd1ZXNzLmxhYmVsICYmICFSZWdFeHAocGF0dGVybiwgJ2knKS50ZXN0KGd1ZXNzLmxhYmVsKSkgPyBndWVzcy5sYWJlbCA6IHJlc3VsdCkuc3BsaXQoJy8nKSlbMV0gJiYgIS9bXFxkLl0rLy50ZXN0KHJlc3VsdFswXSkpIHtcbiAgICAgICAgICAgIHJlc3VsdFswXSArPSAnICcgKyByZXN1bHRbMV07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIENvcnJlY3QgY2hhcmFjdGVyIGNhc2UgYW5kIGNsZWFudXAgc3RyaW5nLlxuICAgICAgICAgIGd1ZXNzID0gZ3Vlc3MubGFiZWwgfHwgZ3Vlc3M7XG4gICAgICAgICAgcmVzdWx0ID0gZm9ybWF0KHJlc3VsdFswXVxuICAgICAgICAgICAgLnJlcGxhY2UoUmVnRXhwKHBhdHRlcm4sICdpJyksIGd1ZXNzKVxuICAgICAgICAgICAgLnJlcGxhY2UoUmVnRXhwKCc7ICooPzonICsgZ3Vlc3MgKyAnW18tXSk/JywgJ2knKSwgJyAnKVxuICAgICAgICAgICAgLnJlcGxhY2UoUmVnRXhwKCcoJyArIGd1ZXNzICsgJylbLV8uXT8oXFxcXHcpJywgJ2knKSwgJyQxICQyJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyB0aGUgdmVyc2lvbiB1c2luZyBhbiBhcnJheSBvZiBVQSBwYXR0ZXJucy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0dGVybnMgQW4gYXJyYXkgb2YgVUEgcGF0dGVybnMuXG4gICAgICogQHJldHVybnMge251bGx8c3RyaW5nfSBUaGUgZGV0ZWN0ZWQgdmVyc2lvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRWZXJzaW9uKHBhdHRlcm5zKSB7XG4gICAgICByZXR1cm4gcmVkdWNlKHBhdHRlcm5zLCBmdW5jdGlvbihyZXN1bHQsIHBhdHRlcm4pIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCAoUmVnRXhwKHBhdHRlcm4gK1xuICAgICAgICAgICcoPzotW1xcXFxkLl0rL3woPzogZm9yIFtcXFxcdy1dKyk/WyAvLV0pKFtcXFxcZC5dK1teICgpOy9fLV0qKScsICdpJykuZXhlYyh1YSkgfHwgMClbMV0gfHwgbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHBsYXRmb3JtLmRlc2NyaXB0aW9uYCB3aGVuIHRoZSBwbGF0Zm9ybSBvYmplY3QgaXMgY29lcmNlZCB0byBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBuYW1lIHRvU3RyaW5nXG4gICAgICogQG1lbWJlck9mIHBsYXRmb3JtXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyBgcGxhdGZvcm0uZGVzY3JpcHRpb25gIGlmIGF2YWlsYWJsZSwgZWxzZSBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9TdHJpbmdQbGF0Zm9ybSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgIH1cblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgIC8vIENvbnZlcnQgbGF5b3V0IHRvIGFuIGFycmF5IHNvIHdlIGNhbiBhZGQgZXh0cmEgZGV0YWlscy5cbiAgICBsYXlvdXQgJiYgKGxheW91dCA9IFtsYXlvdXRdKTtcblxuICAgIC8vIERldGVjdCBBbmRyb2lkIHByb2R1Y3RzLlxuICAgIC8vIEJyb3dzZXJzIG9uIEFuZHJvaWQgZGV2aWNlcyB0eXBpY2FsbHkgcHJvdmlkZSB0aGVpciBwcm9kdWN0IElEUyBhZnRlciBcIkFuZHJvaWQ7XCJcbiAgICAvLyB1cCB0byBcIkJ1aWxkXCIgb3IgXCIpIEFwcGxlV2ViS2l0XCIuXG4gICAgLy8gRXhhbXBsZTpcbiAgICAvLyBcIk1vemlsbGEvNS4wIChMaW51eDsgQW5kcm9pZCA4LjEuMDsgTW90byBHICg1KSBQbHVzKSBBcHBsZVdlYktpdC81MzcuMzZcbiAgICAvLyAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83MC4wLjM1MzguODAgTW9iaWxlIFNhZmFyaS81MzcuMzZcIlxuICAgIGlmICgvXFxiQW5kcm9pZFxcYi8udGVzdChvcykgJiYgIXByb2R1Y3QgJiZcbiAgICAgICAgKGRhdGEgPSAvXFxiQW5kcm9pZFteO10qOyguKj8pKD86QnVpbGR8XFwpIEFwcGxlV2ViS2l0KVxcYi9pLmV4ZWModWEpKSkge1xuICAgICAgcHJvZHVjdCA9IHRyaW0oZGF0YVsxXSlcbiAgICAgICAgLy8gUmVwbGFjZSBhbnkgbGFuZ3VhZ2UgY29kZXMgKGVnLiBcImVuLVVTXCIpLlxuICAgICAgICAucmVwbGFjZSgvXlthLXpdezJ9LVthLXpdezJ9O1xccyovaSwgJycpXG4gICAgICAgIHx8IG51bGw7XG4gICAgfVxuICAgIC8vIERldGVjdCBwcm9kdWN0IG5hbWVzIHRoYXQgY29udGFpbiB0aGVpciBtYW51ZmFjdHVyZXIncyBuYW1lLlxuICAgIGlmIChtYW51ZmFjdHVyZXIgJiYgIXByb2R1Y3QpIHtcbiAgICAgIHByb2R1Y3QgPSBnZXRQcm9kdWN0KFttYW51ZmFjdHVyZXJdKTtcbiAgICB9IGVsc2UgaWYgKG1hbnVmYWN0dXJlciAmJiBwcm9kdWN0KSB7XG4gICAgICBwcm9kdWN0ID0gcHJvZHVjdFxuICAgICAgICAucmVwbGFjZShSZWdFeHAoJ14oJyArIHF1YWxpZnkobWFudWZhY3R1cmVyKSArICcpWy1fLlxcXFxzXScsICdpJyksIG1hbnVmYWN0dXJlciArICcgJylcbiAgICAgICAgLnJlcGxhY2UoUmVnRXhwKCdeKCcgKyBxdWFsaWZ5KG1hbnVmYWN0dXJlcikgKyAnKVstXy5dPyhcXFxcdyknLCAnaScpLCBtYW51ZmFjdHVyZXIgKyAnICQyJyk7XG4gICAgfVxuICAgIC8vIENsZWFuIHVwIEdvb2dsZSBUVi5cbiAgICBpZiAoKGRhdGEgPSAvXFxiR29vZ2xlIFRWXFxiLy5leGVjKHByb2R1Y3QpKSkge1xuICAgICAgcHJvZHVjdCA9IGRhdGFbMF07XG4gICAgfVxuICAgIC8vIERldGVjdCBzaW11bGF0b3JzLlxuICAgIGlmICgvXFxiU2ltdWxhdG9yXFxiL2kudGVzdCh1YSkpIHtcbiAgICAgIHByb2R1Y3QgPSAocHJvZHVjdCA/IHByb2R1Y3QgKyAnICcgOiAnJykgKyAnU2ltdWxhdG9yJztcbiAgICB9XG4gICAgLy8gRGV0ZWN0IE9wZXJhIE1pbmkgOCsgcnVubmluZyBpbiBUdXJiby9VbmNvbXByZXNzZWQgbW9kZSBvbiBpT1MuXG4gICAgaWYgKG5hbWUgPT0gJ09wZXJhIE1pbmknICYmIC9cXGJPUGlPU1xcYi8udGVzdCh1YSkpIHtcbiAgICAgIGRlc2NyaXB0aW9uLnB1c2goJ3J1bm5pbmcgaW4gVHVyYm8vVW5jb21wcmVzc2VkIG1vZGUnKTtcbiAgICB9XG4gICAgLy8gRGV0ZWN0IElFIE1vYmlsZSAxMS5cbiAgICBpZiAobmFtZSA9PSAnSUUnICYmIC9cXGJsaWtlIGlQaG9uZSBPU1xcYi8udGVzdCh1YSkpIHtcbiAgICAgIGRhdGEgPSBwYXJzZSh1YS5yZXBsYWNlKC9saWtlIGlQaG9uZSBPUy8sICcnKSk7XG4gICAgICBtYW51ZmFjdHVyZXIgPSBkYXRhLm1hbnVmYWN0dXJlcjtcbiAgICAgIHByb2R1Y3QgPSBkYXRhLnByb2R1Y3Q7XG4gICAgfVxuICAgIC8vIERldGVjdCBpT1MuXG4gICAgZWxzZSBpZiAoL15pUC8udGVzdChwcm9kdWN0KSkge1xuICAgICAgbmFtZSB8fCAobmFtZSA9ICdTYWZhcmknKTtcbiAgICAgIG9zID0gJ2lPUycgKyAoKGRhdGEgPSAvIE9TIChbXFxkX10rKS9pLmV4ZWModWEpKVxuICAgICAgICA/ICcgJyArIGRhdGFbMV0ucmVwbGFjZSgvXy9nLCAnLicpXG4gICAgICAgIDogJycpO1xuICAgIH1cbiAgICAvLyBEZXRlY3QgS3VidW50dS5cbiAgICBlbHNlIGlmIChuYW1lID09ICdLb25xdWVyb3InICYmIC9eTGludXhcXGIvaS50ZXN0KG9zKSkge1xuICAgICAgb3MgPSAnS3VidW50dSc7XG4gICAgfVxuICAgIC8vIERldGVjdCBBbmRyb2lkIGJyb3dzZXJzLlxuICAgIGVsc2UgaWYgKChtYW51ZmFjdHVyZXIgJiYgbWFudWZhY3R1cmVyICE9ICdHb29nbGUnICYmXG4gICAgICAgICgoL0Nocm9tZS8udGVzdChuYW1lKSAmJiAhL1xcYk1vYmlsZSBTYWZhcmlcXGIvaS50ZXN0KHVhKSkgfHwgL1xcYlZpdGFcXGIvLnRlc3QocHJvZHVjdCkpKSB8fFxuICAgICAgICAoL1xcYkFuZHJvaWRcXGIvLnRlc3Qob3MpICYmIC9eQ2hyb21lLy50ZXN0KG5hbWUpICYmIC9cXGJWZXJzaW9uXFwvL2kudGVzdCh1YSkpKSB7XG4gICAgICBuYW1lID0gJ0FuZHJvaWQgQnJvd3Nlcic7XG4gICAgICBvcyA9IC9cXGJBbmRyb2lkXFxiLy50ZXN0KG9zKSA/IG9zIDogJ0FuZHJvaWQnO1xuICAgIH1cbiAgICAvLyBEZXRlY3QgU2lsayBkZXNrdG9wL2FjY2VsZXJhdGVkIG1vZGVzLlxuICAgIGVsc2UgaWYgKG5hbWUgPT0gJ1NpbGsnKSB7XG4gICAgICBpZiAoIS9cXGJNb2JpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgb3MgPSAnQW5kcm9pZCc7XG4gICAgICAgIGRlc2NyaXB0aW9uLnVuc2hpZnQoJ2Rlc2t0b3AgbW9kZScpO1xuICAgICAgfVxuICAgICAgaWYgKC9BY2NlbGVyYXRlZCAqPSAqdHJ1ZS9pLnRlc3QodWEpKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLnVuc2hpZnQoJ2FjY2VsZXJhdGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIERldGVjdCBVQyBCcm93c2VyIHNwZWVkIG1vZGUuXG4gICAgZWxzZSBpZiAobmFtZSA9PSAnVUMgQnJvd3NlcicgJiYgL1xcYlVDV0VCXFxiLy50ZXN0KHVhKSkge1xuICAgICAgZGVzY3JpcHRpb24ucHVzaCgnc3BlZWQgbW9kZScpO1xuICAgIH1cbiAgICAvLyBEZXRlY3QgUGFsZU1vb24gaWRlbnRpZnlpbmcgYXMgRmlyZWZveC5cbiAgICBlbHNlIGlmIChuYW1lID09ICdQYWxlTW9vbicgJiYgKGRhdGEgPSAvXFxiRmlyZWZveFxcLyhbXFxkLl0rKVxcYi8uZXhlYyh1YSkpKSB7XG4gICAgICBkZXNjcmlwdGlvbi5wdXNoKCdpZGVudGlmeWluZyBhcyBGaXJlZm94ICcgKyBkYXRhWzFdKTtcbiAgICB9XG4gICAgLy8gRGV0ZWN0IEZpcmVmb3ggT1MgYW5kIHByb2R1Y3RzIHJ1bm5pbmcgRmlyZWZveC5cbiAgICBlbHNlIGlmIChuYW1lID09ICdGaXJlZm94JyAmJiAoZGF0YSA9IC9cXGIoTW9iaWxlfFRhYmxldHxUVilcXGIvaS5leGVjKHVhKSkpIHtcbiAgICAgIG9zIHx8IChvcyA9ICdGaXJlZm94IE9TJyk7XG4gICAgICBwcm9kdWN0IHx8IChwcm9kdWN0ID0gZGF0YVsxXSk7XG4gICAgfVxuICAgIC8vIERldGVjdCBmYWxzZSBwb3NpdGl2ZXMgZm9yIEZpcmVmb3gvU2FmYXJpLlxuICAgIGVsc2UgaWYgKCFuYW1lIHx8IChkYXRhID0gIS9cXGJNaW5lZmllbGRcXGIvaS50ZXN0KHVhKSAmJiAvXFxiKD86RmlyZWZveHxTYWZhcmkpXFxiLy5leGVjKG5hbWUpKSkge1xuICAgICAgLy8gRXNjYXBlIHRoZSBgL2AgZm9yIEZpcmVmb3ggMS5cbiAgICAgIGlmIChuYW1lICYmICFwcm9kdWN0ICYmIC9bXFwvLF18XlteKF0rP1xcKS8udGVzdCh1YS5zbGljZSh1YS5pbmRleE9mKGRhdGEgKyAnLycpICsgOCkpKSB7XG4gICAgICAgIC8vIENsZWFyIG5hbWUgb2YgZmFsc2UgcG9zaXRpdmVzLlxuICAgICAgICBuYW1lID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIFJlYXNzaWduIGEgZ2VuZXJpYyBuYW1lLlxuICAgICAgaWYgKChkYXRhID0gcHJvZHVjdCB8fCBtYW51ZmFjdHVyZXIgfHwgb3MpICYmXG4gICAgICAgICAgKHByb2R1Y3QgfHwgbWFudWZhY3R1cmVyIHx8IC9cXGIoPzpBbmRyb2lkfFN5bWJpYW4gT1N8VGFibGV0IE9TfHdlYk9TKVxcYi8udGVzdChvcykpKSB7XG4gICAgICAgIG5hbWUgPSAvW2Etel0rKD86IEhhdCk/L2kuZXhlYygvXFxiQW5kcm9pZFxcYi8udGVzdChvcykgPyBvcyA6IGRhdGEpICsgJyBCcm93c2VyJztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkIENocm9tZSB2ZXJzaW9uIHRvIGRlc2NyaXB0aW9uIGZvciBFbGVjdHJvbi5cbiAgICBlbHNlIGlmIChuYW1lID09ICdFbGVjdHJvbicgJiYgKGRhdGEgPSAoL1xcYkNocm9tZVxcLyhbXFxkLl0rKVxcYi8uZXhlYyh1YSkgfHwgMClbMV0pKSB7XG4gICAgICBkZXNjcmlwdGlvbi5wdXNoKCdDaHJvbWl1bSAnICsgZGF0YSk7XG4gICAgfVxuICAgIC8vIERldGVjdCBub24tT3BlcmEgKFByZXN0by1iYXNlZCkgdmVyc2lvbnMgKG9yZGVyIGlzIGltcG9ydGFudCkuXG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICB2ZXJzaW9uID0gZ2V0VmVyc2lvbihbXG4gICAgICAgICcoPzpDbG91ZDl8Q3JpT1N8Q3JNb3xFZGdlfEVkZ3xFZGdBfEVkZ2lPU3xGeGlPU3xIZWFkbGVzc0Nocm9tZXxJRU1vYmlsZXxJcm9ufE9wZXJhID9NaW5pfE9QaU9TfE9QUnxSYXZlbnxTYW1zdW5nQnJvd3NlcnxTaWxrKD8hL1tcXFxcZC5dKyQpfFVDQnJvd3NlcnxZYUJyb3dzZXIpJyxcbiAgICAgICAgJ1ZlcnNpb24nLFxuICAgICAgICBxdWFsaWZ5KG5hbWUpLFxuICAgICAgICAnKD86RmlyZWZveHxNaW5lZmllbGR8TmV0RnJvbnQpJ1xuICAgICAgXSk7XG4gICAgfVxuICAgIC8vIERldGVjdCBzdHViYm9ybiBsYXlvdXQgZW5naW5lcy5cbiAgICBpZiAoKGRhdGEgPVxuICAgICAgICAgIGxheW91dCA9PSAnaUNhYicgJiYgcGFyc2VGbG9hdCh2ZXJzaW9uKSA+IDMgJiYgJ1dlYktpdCcgfHxcbiAgICAgICAgICAvXFxiT3BlcmFcXGIvLnRlc3QobmFtZSkgJiYgKC9cXGJPUFJcXGIvLnRlc3QodWEpID8gJ0JsaW5rJyA6ICdQcmVzdG8nKSB8fFxuICAgICAgICAgIC9cXGIoPzpNaWRvcml8Tm9va3xTYWZhcmkpXFxiL2kudGVzdCh1YSkgJiYgIS9eKD86VHJpZGVudHxFZGdlSFRNTCkkLy50ZXN0KGxheW91dCkgJiYgJ1dlYktpdCcgfHxcbiAgICAgICAgICAhbGF5b3V0ICYmIC9cXGJNU0lFXFxiL2kudGVzdCh1YSkgJiYgKG9zID09ICdNYWMgT1MnID8gJ1Rhc21hbicgOiAnVHJpZGVudCcpIHx8XG4gICAgICAgICAgbGF5b3V0ID09ICdXZWJLaXQnICYmIC9cXGJQbGF5U3RhdGlvblxcYig/ISBWaXRhXFxiKS9pLnRlc3QobmFtZSkgJiYgJ05ldEZyb250J1xuICAgICAgICApKSB7XG4gICAgICBsYXlvdXQgPSBbZGF0YV07XG4gICAgfVxuICAgIC8vIERldGVjdCBXaW5kb3dzIFBob25lIDcgZGVza3RvcCBtb2RlLlxuICAgIGlmIChuYW1lID09ICdJRScgJiYgKGRhdGEgPSAoLzsgKig/OlhCTFdQfFp1bmVXUCkoXFxkKykvaS5leGVjKHVhKSB8fCAwKVsxXSkpIHtcbiAgICAgIG5hbWUgKz0gJyBNb2JpbGUnO1xuICAgICAgb3MgPSAnV2luZG93cyBQaG9uZSAnICsgKC9cXCskLy50ZXN0KGRhdGEpID8gZGF0YSA6IGRhdGEgKyAnLngnKTtcbiAgICAgIGRlc2NyaXB0aW9uLnVuc2hpZnQoJ2Rlc2t0b3AgbW9kZScpO1xuICAgIH1cbiAgICAvLyBEZXRlY3QgV2luZG93cyBQaG9uZSA4LnggZGVza3RvcCBtb2RlLlxuICAgIGVsc2UgaWYgKC9cXGJXUERlc2t0b3BcXGIvaS50ZXN0KHVhKSkge1xuICAgICAgbmFtZSA9ICdJRSBNb2JpbGUnO1xuICAgICAgb3MgPSAnV2luZG93cyBQaG9uZSA4LngnO1xuICAgICAgZGVzY3JpcHRpb24udW5zaGlmdCgnZGVza3RvcCBtb2RlJyk7XG4gICAgICB2ZXJzaW9uIHx8ICh2ZXJzaW9uID0gKC9cXGJydjooW1xcZC5dKykvLmV4ZWModWEpIHx8IDApWzFdKTtcbiAgICB9XG4gICAgLy8gRGV0ZWN0IElFIDExIGlkZW50aWZ5aW5nIGFzIG90aGVyIGJyb3dzZXJzLlxuICAgIGVsc2UgaWYgKG5hbWUgIT0gJ0lFJyAmJiBsYXlvdXQgPT0gJ1RyaWRlbnQnICYmIChkYXRhID0gL1xcYnJ2OihbXFxkLl0rKS8uZXhlYyh1YSkpKSB7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBkZXNjcmlwdGlvbi5wdXNoKCdpZGVudGlmeWluZyBhcyAnICsgbmFtZSArICh2ZXJzaW9uID8gJyAnICsgdmVyc2lvbiA6ICcnKSk7XG4gICAgICB9XG4gICAgICBuYW1lID0gJ0lFJztcbiAgICAgIHZlcnNpb24gPSBkYXRhWzFdO1xuICAgIH1cbiAgICAvLyBMZXZlcmFnZSBlbnZpcm9ubWVudCBmZWF0dXJlcy5cbiAgICBpZiAodXNlRmVhdHVyZXMpIHtcbiAgICAgIC8vIERldGVjdCBzZXJ2ZXItc2lkZSBlbnZpcm9ubWVudHMuXG4gICAgICAvLyBSaGlubyBoYXMgYSBnbG9iYWwgZnVuY3Rpb24gd2hpbGUgb3RoZXJzIGhhdmUgYSBnbG9iYWwgb2JqZWN0LlxuICAgICAgaWYgKGlzSG9zdFR5cGUoY29udGV4dCwgJ2dsb2JhbCcpKSB7XG4gICAgICAgIGlmIChqYXZhKSB7XG4gICAgICAgICAgZGF0YSA9IGphdmEubGFuZy5TeXN0ZW07XG4gICAgICAgICAgYXJjaCA9IGRhdGEuZ2V0UHJvcGVydHkoJ29zLmFyY2gnKTtcbiAgICAgICAgICBvcyA9IG9zIHx8IGRhdGEuZ2V0UHJvcGVydHkoJ29zLm5hbWUnKSArICcgJyArIGRhdGEuZ2V0UHJvcGVydHkoJ29zLnZlcnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmhpbm8pIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IGNvbnRleHQucmVxdWlyZSgncmluZ28vZW5naW5lJykudmVyc2lvbi5qb2luKCcuJyk7XG4gICAgICAgICAgICBuYW1lID0gJ1JpbmdvSlMnO1xuICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgaWYgKChkYXRhID0gY29udGV4dC5zeXN0ZW0pICYmIGRhdGEuZ2xvYmFsLnN5c3RlbSA9PSBjb250ZXh0LnN5c3RlbSkge1xuICAgICAgICAgICAgICBuYW1lID0gJ05hcndoYWwnO1xuICAgICAgICAgICAgICBvcyB8fCAob3MgPSBkYXRhWzBdLm9zIHx8IG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSAnUmhpbm8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICB0eXBlb2YgY29udGV4dC5wcm9jZXNzID09ICdvYmplY3QnICYmICFjb250ZXh0LnByb2Nlc3MuYnJvd3NlciAmJlxuICAgICAgICAgIChkYXRhID0gY29udGV4dC5wcm9jZXNzKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEudmVyc2lvbnMgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS52ZXJzaW9ucy5lbGVjdHJvbiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5wdXNoKCdOb2RlICcgKyBkYXRhLnZlcnNpb25zLm5vZGUpO1xuICAgICAgICAgICAgICBuYW1lID0gJ0VsZWN0cm9uJztcbiAgICAgICAgICAgICAgdmVyc2lvbiA9IGRhdGEudmVyc2lvbnMuZWxlY3Ryb247XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhLnZlcnNpb25zLm53ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnB1c2goJ0Nocm9taXVtICcgKyB2ZXJzaW9uLCAnTm9kZSAnICsgZGF0YS52ZXJzaW9ucy5ub2RlKTtcbiAgICAgICAgICAgICAgbmFtZSA9ICdOVy5qcyc7XG4gICAgICAgICAgICAgIHZlcnNpb24gPSBkYXRhLnZlcnNpb25zLm53O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIG5hbWUgPSAnTm9kZS5qcyc7XG4gICAgICAgICAgICBhcmNoID0gZGF0YS5hcmNoO1xuICAgICAgICAgICAgb3MgPSBkYXRhLnBsYXRmb3JtO1xuICAgICAgICAgICAgdmVyc2lvbiA9IC9bXFxkLl0rLy5leGVjKGRhdGEudmVyc2lvbik7XG4gICAgICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbiA/IHZlcnNpb25bMF0gOiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gRGV0ZWN0IEFkb2JlIEFJUi5cbiAgICAgIGVsc2UgaWYgKGdldENsYXNzT2YoKGRhdGEgPSBjb250ZXh0LnJ1bnRpbWUpKSA9PSBhaXJSdW50aW1lQ2xhc3MpIHtcbiAgICAgICAgbmFtZSA9ICdBZG9iZSBBSVInO1xuICAgICAgICBvcyA9IGRhdGEuZmxhc2guc3lzdGVtLkNhcGFiaWxpdGllcy5vcztcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCBQaGFudG9tSlMuXG4gICAgICBlbHNlIGlmIChnZXRDbGFzc09mKChkYXRhID0gY29udGV4dC5waGFudG9tKSkgPT0gcGhhbnRvbUNsYXNzKSB7XG4gICAgICAgIG5hbWUgPSAnUGhhbnRvbUpTJztcbiAgICAgICAgdmVyc2lvbiA9IChkYXRhID0gZGF0YS52ZXJzaW9uIHx8IG51bGwpICYmIChkYXRhLm1ham9yICsgJy4nICsgZGF0YS5taW5vciArICcuJyArIGRhdGEucGF0Y2gpO1xuICAgICAgfVxuICAgICAgLy8gRGV0ZWN0IElFIGNvbXBhdGliaWxpdHkgbW9kZXMuXG4gICAgICBlbHNlIGlmICh0eXBlb2YgZG9jLmRvY3VtZW50TW9kZSA9PSAnbnVtYmVyJyAmJiAoZGF0YSA9IC9cXGJUcmlkZW50XFwvKFxcZCspL2kuZXhlYyh1YSkpKSB7XG4gICAgICAgIC8vIFdlJ3JlIGluIGNvbXBhdGliaWxpdHkgbW9kZSB3aGVuIHRoZSBUcmlkZW50IHZlcnNpb24gKyA0IGRvZXNuJ3RcbiAgICAgICAgLy8gZXF1YWwgdGhlIGRvY3VtZW50IG1vZGUuXG4gICAgICAgIHZlcnNpb24gPSBbdmVyc2lvbiwgZG9jLmRvY3VtZW50TW9kZV07XG4gICAgICAgIGlmICgoZGF0YSA9ICtkYXRhWzFdICsgNCkgIT0gdmVyc2lvblsxXSkge1xuICAgICAgICAgIGRlc2NyaXB0aW9uLnB1c2goJ0lFICcgKyB2ZXJzaW9uWzFdICsgJyBtb2RlJyk7XG4gICAgICAgICAgbGF5b3V0ICYmIChsYXlvdXRbMV0gPSAnJyk7XG4gICAgICAgICAgdmVyc2lvblsxXSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdmVyc2lvbiA9IG5hbWUgPT0gJ0lFJyA/IFN0cmluZyh2ZXJzaW9uWzFdLnRvRml4ZWQoMSkpIDogdmVyc2lvblswXTtcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCBJRSAxMSBtYXNraW5nIGFzIG90aGVyIGJyb3dzZXJzLlxuICAgICAgZWxzZSBpZiAodHlwZW9mIGRvYy5kb2N1bWVudE1vZGUgPT0gJ251bWJlcicgJiYgL14oPzpDaHJvbWV8RmlyZWZveClcXGIvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgZGVzY3JpcHRpb24ucHVzaCgnbWFza2luZyBhcyAnICsgbmFtZSArICcgJyArIHZlcnNpb24pO1xuICAgICAgICBuYW1lID0gJ0lFJztcbiAgICAgICAgdmVyc2lvbiA9ICcxMS4wJztcbiAgICAgICAgbGF5b3V0ID0gWydUcmlkZW50J107XG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgICAgfVxuICAgICAgb3MgPSBvcyAmJiBmb3JtYXQob3MpO1xuICAgIH1cbiAgICAvLyBEZXRlY3QgcHJlcmVsZWFzZSBwaGFzZXMuXG4gICAgaWYgKHZlcnNpb24gJiYgKGRhdGEgPVxuICAgICAgICAgIC8oPzpbYWJdfGRwfHByZXxbYWJdXFxkK3ByZSkoPzpcXGQrXFwrPyk/JC9pLmV4ZWModmVyc2lvbikgfHxcbiAgICAgICAgICAvKD86YWxwaGF8YmV0YSkoPzogP1xcZCk/L2kuZXhlYyh1YSArICc7JyArICh1c2VGZWF0dXJlcyAmJiBuYXYuYXBwTWlub3JWZXJzaW9uKSkgfHxcbiAgICAgICAgICAvXFxiTWluZWZpZWxkXFxiL2kudGVzdCh1YSkgJiYgJ2EnXG4gICAgICAgICkpIHtcbiAgICAgIHByZXJlbGVhc2UgPSAvYi9pLnRlc3QoZGF0YSkgPyAnYmV0YScgOiAnYWxwaGEnO1xuICAgICAgdmVyc2lvbiA9IHZlcnNpb24ucmVwbGFjZShSZWdFeHAoZGF0YSArICdcXFxcKz8kJyksICcnKSArXG4gICAgICAgIChwcmVyZWxlYXNlID09ICdiZXRhJyA/IGJldGEgOiBhbHBoYSkgKyAoL1xcZCtcXCs/Ly5leGVjKGRhdGEpIHx8ICcnKTtcbiAgICB9XG4gICAgLy8gRGV0ZWN0IEZpcmVmb3ggTW9iaWxlLlxuICAgIGlmIChuYW1lID09ICdGZW5uZWMnIHx8IG5hbWUgPT0gJ0ZpcmVmb3gnICYmIC9cXGIoPzpBbmRyb2lkfEZpcmVmb3ggT1N8S2FpT1MpXFxiLy50ZXN0KG9zKSkge1xuICAgICAgbmFtZSA9ICdGaXJlZm94IE1vYmlsZSc7XG4gICAgfVxuICAgIC8vIE9ic2N1cmUgTWF4dGhvbidzIHVucmVsaWFibGUgdmVyc2lvbi5cbiAgICBlbHNlIGlmIChuYW1lID09ICdNYXh0aG9uJyAmJiB2ZXJzaW9uKSB7XG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi5yZXBsYWNlKC9cXC5bXFxkLl0rLywgJy54Jyk7XG4gICAgfVxuICAgIC8vIERldGVjdCBYYm94IDM2MCBhbmQgWGJveCBPbmUuXG4gICAgZWxzZSBpZiAoL1xcYlhib3hcXGIvaS50ZXN0KHByb2R1Y3QpKSB7XG4gICAgICBpZiAocHJvZHVjdCA9PSAnWGJveCAzNjAnKSB7XG4gICAgICAgIG9zID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9kdWN0ID09ICdYYm94IDM2MCcgJiYgL1xcYklFTW9iaWxlXFxiLy50ZXN0KHVhKSkge1xuICAgICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCdtb2JpbGUgbW9kZScpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBZGQgbW9iaWxlIHBvc3RmaXguXG4gICAgZWxzZSBpZiAoKC9eKD86Q2hyb21lfElFfE9wZXJhKSQvLnRlc3QobmFtZSkgfHwgbmFtZSAmJiAhcHJvZHVjdCAmJiAhL0Jyb3dzZXJ8TW9iaS8udGVzdChuYW1lKSkgJiZcbiAgICAgICAgKG9zID09ICdXaW5kb3dzIENFJyB8fCAvTW9iaS9pLnRlc3QodWEpKSkge1xuICAgICAgbmFtZSArPSAnIE1vYmlsZSc7XG4gICAgfVxuICAgIC8vIERldGVjdCBJRSBwbGF0Zm9ybSBwcmV2aWV3LlxuICAgIGVsc2UgaWYgKG5hbWUgPT0gJ0lFJyAmJiB1c2VGZWF0dXJlcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGNvbnRleHQuZXh0ZXJuYWwgPT09IG51bGwpIHtcbiAgICAgICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCdwbGF0Zm9ybSBwcmV2aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCdlbWJlZGRlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBEZXRlY3QgQmxhY2tCZXJyeSBPUyB2ZXJzaW9uLlxuICAgIC8vIGh0dHA6Ly9kb2NzLmJsYWNrYmVycnkuY29tL2VuL2RldmVsb3BlcnMvZGVsaXZlcmFibGVzLzE4MTY5L0hUVFBfaGVhZGVyc19zZW50X2J5X0JCX0Jyb3dzZXJfMTIzNDkxMV8xMS5qc3BcbiAgICBlbHNlIGlmICgoL1xcYkJsYWNrQmVycnlcXGIvLnRlc3QocHJvZHVjdCkgfHwgL1xcYkJCMTBcXGIvLnRlc3QodWEpKSAmJiAoZGF0YSA9XG4gICAgICAgICAgKFJlZ0V4cChwcm9kdWN0LnJlcGxhY2UoLyArL2csICcgKicpICsgJy8oWy5cXFxcZF0rKScsICdpJykuZXhlYyh1YSkgfHwgMClbMV0gfHxcbiAgICAgICAgICB2ZXJzaW9uXG4gICAgICAgICkpIHtcbiAgICAgIGRhdGEgPSBbZGF0YSwgL0JCMTAvLnRlc3QodWEpXTtcbiAgICAgIG9zID0gKGRhdGFbMV0gPyAocHJvZHVjdCA9IG51bGwsIG1hbnVmYWN0dXJlciA9ICdCbGFja0JlcnJ5JykgOiAnRGV2aWNlIFNvZnR3YXJlJykgKyAnICcgKyBkYXRhWzBdO1xuICAgICAgdmVyc2lvbiA9IG51bGw7XG4gICAgfVxuICAgIC8vIERldGVjdCBPcGVyYSBpZGVudGlmeWluZy9tYXNraW5nIGl0c2VsZiBhcyBhbm90aGVyIGJyb3dzZXIuXG4gICAgLy8gaHR0cDovL3d3dy5vcGVyYS5jb20vc3VwcG9ydC9rYi92aWV3Lzg0My9cbiAgICBlbHNlIGlmICh0aGlzICE9IGZvck93biAmJiBwcm9kdWN0ICE9ICdXaWknICYmIChcbiAgICAgICAgICAodXNlRmVhdHVyZXMgJiYgb3BlcmEpIHx8XG4gICAgICAgICAgKC9PcGVyYS8udGVzdChuYW1lKSAmJiAvXFxiKD86TVNJRXxGaXJlZm94KVxcYi9pLnRlc3QodWEpKSB8fFxuICAgICAgICAgIChuYW1lID09ICdGaXJlZm94JyAmJiAvXFxiT1MgWCAoPzpcXGQrXFwuKXsyLH0vLnRlc3Qob3MpKSB8fFxuICAgICAgICAgIChuYW1lID09ICdJRScgJiYgKFxuICAgICAgICAgICAgKG9zICYmICEvXldpbi8udGVzdChvcykgJiYgdmVyc2lvbiA+IDUuNSkgfHxcbiAgICAgICAgICAgIC9cXGJXaW5kb3dzIFhQXFxiLy50ZXN0KG9zKSAmJiB2ZXJzaW9uID4gOCB8fFxuICAgICAgICAgICAgdmVyc2lvbiA9PSA4ICYmICEvXFxiVHJpZGVudFxcYi8udGVzdCh1YSlcbiAgICAgICAgICApKVxuICAgICAgICApICYmICFyZU9wZXJhLnRlc3QoKGRhdGEgPSBwYXJzZS5jYWxsKGZvck93biwgdWEucmVwbGFjZShyZU9wZXJhLCAnJykgKyAnOycpKSkgJiYgZGF0YS5uYW1lKSB7XG4gICAgICAvLyBXaGVuIFwiaWRlbnRpZnlpbmdcIiwgdGhlIFVBIGNvbnRhaW5zIGJvdGggT3BlcmEgYW5kIHRoZSBvdGhlciBicm93c2VyJ3MgbmFtZS5cbiAgICAgIGRhdGEgPSAnaW5nIGFzICcgKyBkYXRhLm5hbWUgKyAoKGRhdGEgPSBkYXRhLnZlcnNpb24pID8gJyAnICsgZGF0YSA6ICcnKTtcbiAgICAgIGlmIChyZU9wZXJhLnRlc3QobmFtZSkpIHtcbiAgICAgICAgaWYgKC9cXGJJRVxcYi8udGVzdChkYXRhKSAmJiBvcyA9PSAnTWFjIE9TJykge1xuICAgICAgICAgIG9zID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gJ2lkZW50aWZ5JyArIGRhdGE7XG4gICAgICB9XG4gICAgICAvLyBXaGVuIFwibWFza2luZ1wiLCB0aGUgVUEgY29udGFpbnMgb25seSB0aGUgb3RoZXIgYnJvd3NlcidzIG5hbWUuXG4gICAgICBlbHNlIHtcbiAgICAgICAgZGF0YSA9ICdtYXNrJyArIGRhdGE7XG4gICAgICAgIGlmIChvcGVyYUNsYXNzKSB7XG4gICAgICAgICAgbmFtZSA9IGZvcm1hdChvcGVyYUNsYXNzLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuYW1lID0gJ09wZXJhJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xcYklFXFxiLy50ZXN0KGRhdGEpKSB7XG4gICAgICAgICAgb3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXNlRmVhdHVyZXMpIHtcbiAgICAgICAgICB2ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGF5b3V0ID0gWydQcmVzdG8nXTtcbiAgICAgIGRlc2NyaXB0aW9uLnB1c2goZGF0YSk7XG4gICAgfVxuICAgIC8vIERldGVjdCBXZWJLaXQgTmlnaHRseSBhbmQgYXBwcm94aW1hdGUgQ2hyb21lL1NhZmFyaSB2ZXJzaW9ucy5cbiAgICBpZiAoKGRhdGEgPSAoL1xcYkFwcGxlV2ViS2l0XFwvKFtcXGQuXStcXCs/KS9pLmV4ZWModWEpIHx8IDApWzFdKSkge1xuICAgICAgLy8gQ29ycmVjdCBidWlsZCBudW1iZXIgZm9yIG51bWVyaWMgY29tcGFyaXNvbi5cbiAgICAgIC8vIChlLmcuIFwiNTMyLjVcIiBiZWNvbWVzIFwiNTMyLjA1XCIpXG4gICAgICBkYXRhID0gW3BhcnNlRmxvYXQoZGF0YS5yZXBsYWNlKC9cXC4oXFxkKSQvLCAnLjAkMScpKSwgZGF0YV07XG4gICAgICAvLyBOaWdodGx5IGJ1aWxkcyBhcmUgcG9zdGZpeGVkIHdpdGggYSBcIitcIi5cbiAgICAgIGlmIChuYW1lID09ICdTYWZhcmknICYmIGRhdGFbMV0uc2xpY2UoLTEpID09ICcrJykge1xuICAgICAgICBuYW1lID0gJ1dlYktpdCBOaWdodGx5JztcbiAgICAgICAgcHJlcmVsZWFzZSA9ICdhbHBoYSc7XG4gICAgICAgIHZlcnNpb24gPSBkYXRhWzFdLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIGluY29ycmVjdCBicm93c2VyIHZlcnNpb25zLlxuICAgICAgZWxzZSBpZiAodmVyc2lvbiA9PSBkYXRhWzFdIHx8XG4gICAgICAgICAgdmVyc2lvbiA9PSAoZGF0YVsyXSA9ICgvXFxiU2FmYXJpXFwvKFtcXGQuXStcXCs/KS9pLmV4ZWModWEpIHx8IDApWzFdKSkge1xuICAgICAgICB2ZXJzaW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vIFVzZSB0aGUgZnVsbCBDaHJvbWUgdmVyc2lvbiB3aGVuIGF2YWlsYWJsZS5cbiAgICAgIGRhdGFbMV0gPSAoL1xcYig/OkhlYWRsZXNzKT9DaHJvbWVcXC8oW1xcZC5dKykvaS5leGVjKHVhKSB8fCAwKVsxXTtcbiAgICAgIC8vIERldGVjdCBCbGluayBsYXlvdXQgZW5naW5lLlxuICAgICAgaWYgKGRhdGFbMF0gPT0gNTM3LjM2ICYmIGRhdGFbMl0gPT0gNTM3LjM2ICYmIHBhcnNlRmxvYXQoZGF0YVsxXSkgPj0gMjggJiYgbGF5b3V0ID09ICdXZWJLaXQnKSB7XG4gICAgICAgIGxheW91dCA9IFsnQmxpbmsnXTtcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCBKYXZhU2NyaXB0Q29yZS5cbiAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjc2ODQ3NC9ob3ctY2FuLWktZGV0ZWN0LXdoaWNoLWphdmFzY3JpcHQtZW5naW5lLXY4LW9yLWpzYy1pcy11c2VkLWF0LXJ1bnRpbWUtaW4tYW5kcm9pXG4gICAgICBpZiAoIXVzZUZlYXR1cmVzIHx8ICghbGlrZUNocm9tZSAmJiAhZGF0YVsxXSkpIHtcbiAgICAgICAgbGF5b3V0ICYmIChsYXlvdXRbMV0gPSAnbGlrZSBTYWZhcmknKTtcbiAgICAgICAgZGF0YSA9IChkYXRhID0gZGF0YVswXSwgZGF0YSA8IDQwMCA/IDEgOiBkYXRhIDwgNTAwID8gMiA6IGRhdGEgPCA1MjYgPyAzIDogZGF0YSA8IDUzMyA/IDQgOiBkYXRhIDwgNTM0ID8gJzQrJyA6IGRhdGEgPCA1MzUgPyA1IDogZGF0YSA8IDUzNyA/IDYgOiBkYXRhIDwgNTM4ID8gNyA6IGRhdGEgPCA2MDEgPyA4IDogZGF0YSA8IDYwMiA/IDkgOiBkYXRhIDwgNjA0ID8gMTAgOiBkYXRhIDwgNjA2ID8gMTEgOiBkYXRhIDwgNjA4ID8gMTIgOiAnMTInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dCAmJiAobGF5b3V0WzFdID0gJ2xpa2UgQ2hyb21lJyk7XG4gICAgICAgIGRhdGEgPSBkYXRhWzFdIHx8IChkYXRhID0gZGF0YVswXSwgZGF0YSA8IDUzMCA/IDEgOiBkYXRhIDwgNTMyID8gMiA6IGRhdGEgPCA1MzIuMDUgPyAzIDogZGF0YSA8IDUzMyA/IDQgOiBkYXRhIDwgNTM0LjAzID8gNSA6IGRhdGEgPCA1MzQuMDcgPyA2IDogZGF0YSA8IDUzNC4xMCA/IDcgOiBkYXRhIDwgNTM0LjEzID8gOCA6IGRhdGEgPCA1MzQuMTYgPyA5IDogZGF0YSA8IDUzNC4yNCA/IDEwIDogZGF0YSA8IDUzNC4zMCA/IDExIDogZGF0YSA8IDUzNS4wMSA/IDEyIDogZGF0YSA8IDUzNS4wMiA/ICcxMysnIDogZGF0YSA8IDUzNS4wNyA/IDE1IDogZGF0YSA8IDUzNS4xMSA/IDE2IDogZGF0YSA8IDUzNS4xOSA/IDE3IDogZGF0YSA8IDUzNi4wNSA/IDE4IDogZGF0YSA8IDUzNi4xMCA/IDE5IDogZGF0YSA8IDUzNy4wMSA/IDIwIDogZGF0YSA8IDUzNy4xMSA/ICcyMSsnIDogZGF0YSA8IDUzNy4xMyA/IDIzIDogZGF0YSA8IDUzNy4xOCA/IDI0IDogZGF0YSA8IDUzNy4yNCA/IDI1IDogZGF0YSA8IDUzNy4zNiA/IDI2IDogbGF5b3V0ICE9ICdCbGluaycgPyAnMjcnIDogJzI4Jyk7XG4gICAgICB9XG4gICAgICAvLyBBZGQgdGhlIHBvc3RmaXggb2YgXCIueFwiIG9yIFwiK1wiIGZvciBhcHByb3hpbWF0ZSB2ZXJzaW9ucy5cbiAgICAgIGxheW91dCAmJiAobGF5b3V0WzFdICs9ICcgJyArIChkYXRhICs9IHR5cGVvZiBkYXRhID09ICdudW1iZXInID8gJy54JyA6IC9bLitdLy50ZXN0KGRhdGEpID8gJycgOiAnKycpKTtcbiAgICAgIC8vIE9ic2N1cmUgdmVyc2lvbiBmb3Igc29tZSBTYWZhcmkgMS0yIHJlbGVhc2VzLlxuICAgICAgaWYgKG5hbWUgPT0gJ1NhZmFyaScgJiYgKCF2ZXJzaW9uIHx8IHBhcnNlSW50KHZlcnNpb24pID4gNDUpKSB7XG4gICAgICAgIHZlcnNpb24gPSBkYXRhO1xuICAgICAgfSBlbHNlIGlmIChuYW1lID09ICdDaHJvbWUnICYmIC9cXGJIZWFkbGVzc0Nocm9tZS9pLnRlc3QodWEpKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLnVuc2hpZnQoJ2hlYWRsZXNzJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIERldGVjdCBPcGVyYSBkZXNrdG9wIG1vZGVzLlxuICAgIGlmIChuYW1lID09ICdPcGVyYScgJiYgIChkYXRhID0gL1xcYnpib3Z8enZhdiQvLmV4ZWMob3MpKSkge1xuICAgICAgbmFtZSArPSAnICc7XG4gICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCdkZXNrdG9wIG1vZGUnKTtcbiAgICAgIGlmIChkYXRhID09ICd6dmF2Jykge1xuICAgICAgICBuYW1lICs9ICdNaW5pJztcbiAgICAgICAgdmVyc2lvbiA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lICs9ICdNb2JpbGUnO1xuICAgICAgfVxuICAgICAgb3MgPSBvcy5yZXBsYWNlKFJlZ0V4cCgnIConICsgZGF0YSArICckJyksICcnKTtcbiAgICB9XG4gICAgLy8gRGV0ZWN0IENocm9tZSBkZXNrdG9wIG1vZGUuXG4gICAgZWxzZSBpZiAobmFtZSA9PSAnU2FmYXJpJyAmJiAvXFxiQ2hyb21lXFxiLy5leGVjKGxheW91dCAmJiBsYXlvdXRbMV0pKSB7XG4gICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCdkZXNrdG9wIG1vZGUnKTtcbiAgICAgIG5hbWUgPSAnQ2hyb21lIE1vYmlsZSc7XG4gICAgICB2ZXJzaW9uID0gbnVsbDtcblxuICAgICAgaWYgKC9cXGJPUyBYXFxiLy50ZXN0KG9zKSkge1xuICAgICAgICBtYW51ZmFjdHVyZXIgPSAnQXBwbGUnO1xuICAgICAgICBvcyA9ICdpT1MgNC4zKyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5ld2VyIHZlcnNpb25zIG9mIFNSV2FyZSBJcm9uIHVzZXMgdGhlIENocm9tZSB0YWcgdG8gaW5kaWNhdGUgaXRzIHZlcnNpb24gbnVtYmVyLlxuICAgIGVsc2UgaWYgKC9cXGJTUldhcmUgSXJvblxcYi8udGVzdChuYW1lKSAmJiAhdmVyc2lvbikge1xuICAgICAgdmVyc2lvbiA9IGdldFZlcnNpb24oJ0Nocm9tZScpO1xuICAgIH1cbiAgICAvLyBTdHJpcCBpbmNvcnJlY3QgT1MgdmVyc2lvbnMuXG4gICAgaWYgKHZlcnNpb24gJiYgdmVyc2lvbi5pbmRleE9mKChkYXRhID0gL1tcXGQuXSskLy5leGVjKG9zKSkpID09IDAgJiZcbiAgICAgICAgdWEuaW5kZXhPZignLycgKyBkYXRhICsgJy0nKSA+IC0xKSB7XG4gICAgICBvcyA9IHRyaW0ob3MucmVwbGFjZShkYXRhLCAnJykpO1xuICAgIH1cbiAgICAvLyBFbnN1cmUgT1MgZG9lcyBub3QgaW5jbHVkZSB0aGUgYnJvd3NlciBuYW1lLlxuICAgIGlmIChvcyAmJiBvcy5pbmRleE9mKG5hbWUpICE9IC0xICYmICFSZWdFeHAobmFtZSArICcgT1MnKS50ZXN0KG9zKSkge1xuICAgICAgb3MgPSBvcy5yZXBsYWNlKFJlZ0V4cCgnIConICsgcXVhbGlmeShuYW1lKSArICcgKicpLCAnJyk7XG4gICAgfVxuICAgIC8vIEFkZCBsYXlvdXQgZW5naW5lLlxuICAgIGlmIChsYXlvdXQgJiYgIS9cXGIoPzpBdmFudHxOb29rKVxcYi8udGVzdChuYW1lKSAmJiAoXG4gICAgICAgIC9Ccm93c2VyfEx1bmFzY2FwZXxNYXh0aG9uLy50ZXN0KG5hbWUpIHx8XG4gICAgICAgIG5hbWUgIT0gJ1NhZmFyaScgJiYgL15pT1MvLnRlc3Qob3MpICYmIC9cXGJTYWZhcmlcXGIvLnRlc3QobGF5b3V0WzFdKSB8fFxuICAgICAgICAvXig/OkFkb2JlfEFyb3JhfEJyZWFjaHxNaWRvcml8T3BlcmF8UGhhbnRvbXxSZWtvbnF8Um9ja3xTYW1zdW5nIEludGVybmV0fFNsZWlwbmlyfFNSV2FyZSBJcm9ufFZpdmFsZGl8V2ViKS8udGVzdChuYW1lKSAmJiBsYXlvdXRbMV0pKSB7XG4gICAgICAvLyBEb24ndCBhZGQgbGF5b3V0IGRldGFpbHMgdG8gZGVzY3JpcHRpb24gaWYgdGhleSBhcmUgZmFsc2V5LlxuICAgICAgKGRhdGEgPSBsYXlvdXRbbGF5b3V0Lmxlbmd0aCAtIDFdKSAmJiBkZXNjcmlwdGlvbi5wdXNoKGRhdGEpO1xuICAgIH1cbiAgICAvLyBDb21iaW5lIGNvbnRleHR1YWwgaW5mb3JtYXRpb24uXG4gICAgaWYgKGRlc2NyaXB0aW9uLmxlbmd0aCkge1xuICAgICAgZGVzY3JpcHRpb24gPSBbJygnICsgZGVzY3JpcHRpb24uam9pbignOyAnKSArICcpJ107XG4gICAgfVxuICAgIC8vIEFwcGVuZCBtYW51ZmFjdHVyZXIgdG8gZGVzY3JpcHRpb24uXG4gICAgaWYgKG1hbnVmYWN0dXJlciAmJiBwcm9kdWN0ICYmIHByb2R1Y3QuaW5kZXhPZihtYW51ZmFjdHVyZXIpIDwgMCkge1xuICAgICAgZGVzY3JpcHRpb24ucHVzaCgnb24gJyArIG1hbnVmYWN0dXJlcik7XG4gICAgfVxuICAgIC8vIEFwcGVuZCBwcm9kdWN0IHRvIGRlc2NyaXB0aW9uLlxuICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICBkZXNjcmlwdGlvbi5wdXNoKCgvXm9uIC8udGVzdChkZXNjcmlwdGlvbltkZXNjcmlwdGlvbi5sZW5ndGggLSAxXSkgPyAnJyA6ICdvbiAnKSArIHByb2R1Y3QpO1xuICAgIH1cbiAgICAvLyBQYXJzZSB0aGUgT1MgaW50byBhbiBvYmplY3QuXG4gICAgaWYgKG9zKSB7XG4gICAgICBkYXRhID0gLyAoW1xcZC4rXSspJC8uZXhlYyhvcyk7XG4gICAgICBpc1NwZWNpYWxDYXNlZE9TID0gZGF0YSAmJiBvcy5jaGFyQXQob3MubGVuZ3RoIC0gZGF0YVswXS5sZW5ndGggLSAxKSA9PSAnLyc7XG4gICAgICBvcyA9IHtcbiAgICAgICAgJ2FyY2hpdGVjdHVyZSc6IDMyLFxuICAgICAgICAnZmFtaWx5JzogKGRhdGEgJiYgIWlzU3BlY2lhbENhc2VkT1MpID8gb3MucmVwbGFjZShkYXRhWzBdLCAnJykgOiBvcyxcbiAgICAgICAgJ3ZlcnNpb24nOiBkYXRhID8gZGF0YVsxXSA6IG51bGwsXG4gICAgICAgICd0b1N0cmluZyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB2ZXJzaW9uID0gdGhpcy52ZXJzaW9uO1xuICAgICAgICAgIHJldHVybiB0aGlzLmZhbWlseSArICgodmVyc2lvbiAmJiAhaXNTcGVjaWFsQ2FzZWRPUykgPyAnICcgKyB2ZXJzaW9uIDogJycpICsgKHRoaXMuYXJjaGl0ZWN0dXJlID09IDY0ID8gJyA2NC1iaXQnIDogJycpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBBZGQgYnJvd3Nlci9PUyBhcmNoaXRlY3R1cmUuXG4gICAgaWYgKChkYXRhID0gL1xcYig/OkFNRHxJQXxXaW58V09XfHg4Nl98eCk2NFxcYi9pLmV4ZWMoYXJjaCkpICYmICEvXFxiaTY4NlxcYi9pLnRlc3QoYXJjaCkpIHtcbiAgICAgIGlmIChvcykge1xuICAgICAgICBvcy5hcmNoaXRlY3R1cmUgPSA2NDtcbiAgICAgICAgb3MuZmFtaWx5ID0gb3MuZmFtaWx5LnJlcGxhY2UoUmVnRXhwKCcgKicgKyBkYXRhKSwgJycpO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAgIG5hbWUgJiYgKC9cXGJXT1c2NFxcYi9pLnRlc3QodWEpIHx8XG4gICAgICAgICAgKHVzZUZlYXR1cmVzICYmIC9cXHcoPzo4NnwzMikkLy50ZXN0KG5hdi5jcHVDbGFzcyB8fCBuYXYucGxhdGZvcm0pICYmICEvXFxiV2luNjQ7IHg2NFxcYi9pLnRlc3QodWEpKSlcbiAgICAgICkge1xuICAgICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KCczMi1iaXQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2hyb21lIDM5IGFuZCBhYm92ZSBvbiBPUyBYIGlzIGFsd2F5cyA2NC1iaXQuXG4gICAgZWxzZSBpZiAoXG4gICAgICAgIG9zICYmIC9eT1MgWC8udGVzdChvcy5mYW1pbHkpICYmXG4gICAgICAgIG5hbWUgPT0gJ0Nocm9tZScgJiYgcGFyc2VGbG9hdCh2ZXJzaW9uKSA+PSAzOVxuICAgICkge1xuICAgICAgb3MuYXJjaGl0ZWN0dXJlID0gNjQ7XG4gICAgfVxuXG4gICAgdWEgfHwgKHVhID0gbnVsbCk7XG5cbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGxhdGZvcm0gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG5hbWUgcGxhdGZvcm1cbiAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgKi9cbiAgICB2YXIgcGxhdGZvcm0gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBwbGF0Zm9ybSBkZXNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgICAqIEB0eXBlIHN0cmluZ3xudWxsXG4gICAgICovXG4gICAgcGxhdGZvcm0uZGVzY3JpcHRpb24gPSB1YTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBicm93c2VyJ3MgbGF5b3V0IGVuZ2luZS5cbiAgICAgKlxuICAgICAqIFRoZSBsaXN0IG9mIGNvbW1vbiBsYXlvdXQgZW5naW5lcyBpbmNsdWRlOlxuICAgICAqIFwiQmxpbmtcIiwgXCJFZGdlSFRNTFwiLCBcIkdlY2tvXCIsIFwiVHJpZGVudFwiIGFuZCBcIldlYktpdFwiXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgcGxhdGZvcm1cbiAgICAgKiBAdHlwZSBzdHJpbmd8bnVsbFxuICAgICAqL1xuICAgIHBsYXRmb3JtLmxheW91dCA9IGxheW91dCAmJiBsYXlvdXRbMF07XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvZHVjdCdzIG1hbnVmYWN0dXJlci5cbiAgICAgKlxuICAgICAqIFRoZSBsaXN0IG9mIG1hbnVmYWN0dXJlcnMgaW5jbHVkZTpcbiAgICAgKiBcIkFwcGxlXCIsIFwiQXJjaG9zXCIsIFwiQW1hem9uXCIsIFwiQXN1c1wiLCBcIkJhcm5lcyAmIE5vYmxlXCIsIFwiQmxhY2tCZXJyeVwiLFxuICAgICAqIFwiR29vZ2xlXCIsIFwiSFBcIiwgXCJIVENcIiwgXCJMR1wiLCBcIk1pY3Jvc29mdFwiLCBcIk1vdG9yb2xhXCIsIFwiTmludGVuZG9cIixcbiAgICAgKiBcIk5va2lhXCIsIFwiU2Ftc3VuZ1wiIGFuZCBcIlNvbnlcIlxuICAgICAqXG4gICAgICogQG1lbWJlck9mIHBsYXRmb3JtXG4gICAgICogQHR5cGUgc3RyaW5nfG51bGxcbiAgICAgKi9cbiAgICBwbGF0Zm9ybS5tYW51ZmFjdHVyZXIgPSBtYW51ZmFjdHVyZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYnJvd3Nlci9lbnZpcm9ubWVudC5cbiAgICAgKlxuICAgICAqIFRoZSBsaXN0IG9mIGNvbW1vbiBicm93c2VyIG5hbWVzIGluY2x1ZGU6XG4gICAgICogXCJDaHJvbWVcIiwgXCJFbGVjdHJvblwiLCBcIkZpcmVmb3hcIiwgXCJGaXJlZm94IGZvciBpT1NcIiwgXCJJRVwiLFxuICAgICAqIFwiTWljcm9zb2Z0IEVkZ2VcIiwgXCJQaGFudG9tSlNcIiwgXCJTYWZhcmlcIiwgXCJTZWFNb25rZXlcIiwgXCJTaWxrXCIsXG4gICAgICogXCJPcGVyYSBNaW5pXCIgYW5kIFwiT3BlcmFcIlxuICAgICAqXG4gICAgICogTW9iaWxlIHZlcnNpb25zIG9mIHNvbWUgYnJvd3NlcnMgaGF2ZSBcIk1vYmlsZVwiIGFwcGVuZGVkIHRvIHRoZWlyIG5hbWU6XG4gICAgICogZWcuIFwiQ2hyb21lIE1vYmlsZVwiLCBcIkZpcmVmb3ggTW9iaWxlXCIsIFwiSUUgTW9iaWxlXCIgYW5kIFwiT3BlcmEgTW9iaWxlXCJcbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgICAqIEB0eXBlIHN0cmluZ3xudWxsXG4gICAgICovXG4gICAgcGxhdGZvcm0ubmFtZSA9IG5hbWU7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYWxwaGEvYmV0YSByZWxlYXNlIGluZGljYXRvci5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgICAqIEB0eXBlIHN0cmluZ3xudWxsXG4gICAgICovXG4gICAgcGxhdGZvcm0ucHJlcmVsZWFzZSA9IHByZXJlbGVhc2U7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvZHVjdCBob3N0aW5nIHRoZSBicm93c2VyLlxuICAgICAqXG4gICAgICogVGhlIGxpc3Qgb2YgY29tbW9uIHByb2R1Y3RzIGluY2x1ZGU6XG4gICAgICpcbiAgICAgKiBcIkJsYWNrQmVycnlcIiwgXCJHYWxheHkgUzRcIiwgXCJMdW1pYVwiLCBcImlQYWRcIiwgXCJpUG9kXCIsIFwiaVBob25lXCIsIFwiS2luZGxlXCIsXG4gICAgICogXCJLaW5kbGUgRmlyZVwiLCBcIk5leHVzXCIsIFwiTm9va1wiLCBcIlBsYXlCb29rXCIsIFwiVG91Y2hQYWRcIiBhbmQgXCJUcmFuc2Zvcm1lclwiXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgcGxhdGZvcm1cbiAgICAgKiBAdHlwZSBzdHJpbmd8bnVsbFxuICAgICAqL1xuICAgIHBsYXRmb3JtLnByb2R1Y3QgPSBwcm9kdWN0O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGJyb3dzZXIncyB1c2VyIGFnZW50IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgICAqIEB0eXBlIHN0cmluZ3xudWxsXG4gICAgICovXG4gICAgcGxhdGZvcm0udWEgPSB1YTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBicm93c2VyL2Vudmlyb25tZW50IHZlcnNpb24uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgcGxhdGZvcm1cbiAgICAgKiBAdHlwZSBzdHJpbmd8bnVsbFxuICAgICAqL1xuICAgIHBsYXRmb3JtLnZlcnNpb24gPSBuYW1lICYmIHZlcnNpb247XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgb3BlcmF0aW5nIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybVxuICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAqL1xuICAgIHBsYXRmb3JtLm9zID0gb3MgfHwge1xuXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBDUFUgYXJjaGl0ZWN0dXJlIHRoZSBPUyBpcyBidWlsdCBmb3IuXG4gICAgICAgKlxuICAgICAgICogQG1lbWJlck9mIHBsYXRmb3JtLm9zXG4gICAgICAgKiBAdHlwZSBudW1iZXJ8bnVsbFxuICAgICAgICovXG4gICAgICAnYXJjaGl0ZWN0dXJlJzogbnVsbCxcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgZmFtaWx5IG9mIHRoZSBPUy5cbiAgICAgICAqXG4gICAgICAgKiBDb21tb24gdmFsdWVzIGluY2x1ZGU6XG4gICAgICAgKiBcIldpbmRvd3NcIiwgXCJXaW5kb3dzIFNlcnZlciAyMDA4IFIyIC8gN1wiLCBcIldpbmRvd3MgU2VydmVyIDIwMDggLyBWaXN0YVwiLFxuICAgICAgICogXCJXaW5kb3dzIFhQXCIsIFwiT1MgWFwiLCBcIkxpbnV4XCIsIFwiVWJ1bnR1XCIsIFwiRGViaWFuXCIsIFwiRmVkb3JhXCIsIFwiUmVkIEhhdFwiLFxuICAgICAgICogXCJTdVNFXCIsIFwiQW5kcm9pZFwiLCBcImlPU1wiIGFuZCBcIldpbmRvd3MgUGhvbmVcIlxuICAgICAgICpcbiAgICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybS5vc1xuICAgICAgICogQHR5cGUgc3RyaW5nfG51bGxcbiAgICAgICAqL1xuICAgICAgJ2ZhbWlseSc6IG51bGwsXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhlIHZlcnNpb24gb2YgdGhlIE9TLlxuICAgICAgICpcbiAgICAgICAqIEBtZW1iZXJPZiBwbGF0Zm9ybS5vc1xuICAgICAgICogQHR5cGUgc3RyaW5nfG51bGxcbiAgICAgICAqL1xuICAgICAgJ3ZlcnNpb24nOiBudWxsLFxuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIE9TIHN0cmluZy5cbiAgICAgICAqXG4gICAgICAgKiBAbWVtYmVyT2YgcGxhdGZvcm0ub3NcbiAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBPUyBzdHJpbmcuXG4gICAgICAgKi9cbiAgICAgICd0b1N0cmluZyc6IGZ1bmN0aW9uKCkgeyByZXR1cm4gJ251bGwnOyB9XG4gICAgfTtcblxuICAgIHBsYXRmb3JtLnBhcnNlID0gcGFyc2U7XG4gICAgcGxhdGZvcm0udG9TdHJpbmcgPSB0b1N0cmluZ1BsYXRmb3JtO1xuXG4gICAgaWYgKHBsYXRmb3JtLnZlcnNpb24pIHtcbiAgICAgIGRlc2NyaXB0aW9uLnVuc2hpZnQodmVyc2lvbik7XG4gICAgfVxuICAgIGlmIChwbGF0Zm9ybS5uYW1lKSB7XG4gICAgICBkZXNjcmlwdGlvbi51bnNoaWZ0KG5hbWUpO1xuICAgIH1cbiAgICBpZiAob3MgJiYgbmFtZSAmJiAhKG9zID09IFN0cmluZyhvcykuc3BsaXQoJyAnKVswXSAmJiAob3MgPT0gbmFtZS5zcGxpdCgnICcpWzBdIHx8IHByb2R1Y3QpKSkge1xuICAgICAgZGVzY3JpcHRpb24ucHVzaChwcm9kdWN0ID8gJygnICsgb3MgKyAnKScgOiAnb24gJyArIG9zKTtcbiAgICB9XG4gICAgaWYgKGRlc2NyaXB0aW9uLmxlbmd0aCkge1xuICAgICAgcGxhdGZvcm0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbi5qb2luKCcgJyk7XG4gICAgfVxuICAgIHJldHVybiBwbGF0Zm9ybTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8vIEV4cG9ydCBwbGF0Zm9ybS5cbiAgdmFyIHBsYXRmb3JtID0gcGFyc2UoKTtcblxuICAvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBjb25kaXRpb24gcGF0dGVybnMgbGlrZSB0aGUgZm9sbG93aW5nOlxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBFeHBvc2UgcGxhdGZvcm0gb24gdGhlIGdsb2JhbCBvYmplY3QgdG8gcHJldmVudCBlcnJvcnMgd2hlbiBwbGF0Zm9ybSBpc1xuICAgIC8vIGxvYWRlZCBieSBhIHNjcmlwdCB0YWcgaW4gdGhlIHByZXNlbmNlIG9mIGFuIEFNRCBsb2FkZXIuXG4gICAgLy8gU2VlIGh0dHA6Ly9yZXF1aXJlanMub3JnL2RvY3MvZXJyb3JzLmh0bWwjbWlzbWF0Y2ggZm9yIG1vcmUgZGV0YWlscy5cbiAgICByb290LnBsYXRmb3JtID0gcGxhdGZvcm07XG5cbiAgICAvLyBEZWZpbmUgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSBzbyBwbGF0Zm9ybSBjYW4gYmUgYWxpYXNlZCB0aHJvdWdoIHBhdGggbWFwcGluZy5cbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcGxhdGZvcm07XG4gICAgfSk7XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGBleHBvcnRzYCBhZnRlciBgZGVmaW5lYCBpbiBjYXNlIGEgYnVpbGQgb3B0aW1pemVyIGFkZHMgYW4gYGV4cG9ydHNgIG9iamVjdC5cbiAgZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuICAgIC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgc3VwcG9ydC5cbiAgICBmb3JPd24ocGxhdGZvcm0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgIGZyZWVFeHBvcnRzW2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBFeHBvcnQgdG8gdGhlIGdsb2JhbCBvYmplY3QuXG4gICAgcm9vdC5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICB9XG59LmNhbGwodGhpcykpO1xuIl0sIm1hcHBpbmdz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