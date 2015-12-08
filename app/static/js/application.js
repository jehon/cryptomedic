"use strict";

var application = {};
application.models = {};
var server = {};

// Inspired from http://www.2ality.com/2014/10/es6-promises-api.html
Promise.prototype.myFinallyDone = function (callback) {
  callback = callback || function(data) { return data; };
  return this
    .then(callback, callback)
    .catch(function(reason) { console.error(reason); });
};

window.myEvents = function() {
  return {
   /**
    * Trigger a custom event
    *
    * @param name: name of the event to be triggered
    * @param params: additionnal cusom parameters
    *
    */
    'trigger': function(name, params) {
      params = params || {};
      document.dispatchEvent(new CustomEvent(name, { 'detail' : params }));
    },
  /**
   * Listen to a specific event
   *
   * @param string name: name of the event
   * @param function callback: callback will be called fn(params);
   *
   */
    'on': function(name, callback) {
      document.addEventListener(name, function (e) {
      callback(e.detail);
      });
    }
  }
}();

function inherit(parent, constructor) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

  if (typeof(constructor) == "undefined")
    constructor = function() {};

  // shim for older browsers:
  var ObjectCreateShim;
  if (typeof Object.create == 'function') {
    ObjectCreateShim = Object.create;
  } else {
    ObjectCreateShim = function(proto) {
          function ctor() { }
          ctor.prototype = proto;
          return new ctor();
    };
  }

  // Create a Student.prototype object that inherits from Person.prototype.
  // Note: A common error here is to use "new Person()" to create the Student.prototype.
  // That's incorrect for several reasons, not least that we don't have anything to
  // give Person for the "firstName" argument. The correct place to call Person is
  // above, where we call it from Student.
  constructor.prototype = ObjectCreateShim(parent.prototype);

  // Set the "constructor" property to refer to Student
  constructor.prototype.constructor = constructor;

  // Add a custom parent field to refer to the inherited parent
  constructor.prototype._parent = parent.prototype;
}

function ApplicationException(msg) {
  this.message = msg;
}

inherit(Error, ApplicationException);
ApplicationException.prototype.getMessage = function() { return this.message; };

var mainApp = angular.module('app_main', [ 'ngRoute' ])
.config([ '$compileProvider', function( $compileProvider ) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
  $compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
}])
.filter('mypercentage', function() {
  return function(text, rnd) {
    text = text || '';
    rnd = rnd || 2;
    if (typeof(text) != 'number') {
      if (parseFloat(text) != text) return text;
      text = parseFloat(text);
    }
    return "" + (Math.round(text * 100 * Math.pow(10, rnd)) / Math.pow(10, rnd)) + "%";
  };
})
.directive('catchIt', [ "$compile", function($compile) {
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    // http://stackoverflow.com/a/15298620
  return {
    restrict: 'A',
    transclude: true,
    scope: {
        'tryit': '&', // executed in parent scope
    },
    template: "<span ng-if='error' class='catchedError'>{{errorMsg}}</span><span ng-if='!error' ng-transclude></span>",
    link:
      function($scope, $element, $attrs, ctrl, $transclude) {
        function testIt() {
          try {
            $scope.error = false;
            $scope.result = "";
            $scope.errorMSg = "";
            $scope.result = $scope.tryit();
          } catch (e) {
            $scope.error = true;
            if (e instanceof ApplicationException) {
              $scope.errorMsg = e.getMessage();
            } else {
              $scope.errorMsg = "Uncatchable error";
              console.warn(e);
              throw e;
            }
          }
        }
        $scope.$watch(function() {
          try  {
            return $scope.tryit();
          } catch (e) {
            return e.toString();
          }
        }, function() {
          testIt();
        });
        testIt();

        // Destroy of the element
        $element.on('$destroy', function() {
            $scope.$destroy();
        });
      } // end of link function
  };
}])
.directive('mycalendar', function() {
  return function (scope, elem, attrs) {
    jQuery(elem).datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true
    });
  }
})
.directive('codage', function() {
 return {
    restrict: 'E',
    transclude: true,
    scope: {
      value: '=value'
    },
    template: '<span data-toggle="tooltip" data-placement="bottom" title="{{value}}">{{coded}}</span>',
    link: function($scope, element, attrs) {
      if (server.settings.codes[$scope.value]) {
        $scope.isCoded = true;
        $scope.coded = server.settings.codes[$scope.value];
      } else {
        $scope.isCoded = false;
        $scope.coded = $scope.value;
      }
    }
  };
})
.directive('preview', [ "$compile", function($compile) {
  return {
    restrict: 'A',
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    compile: function(cElement, cAttrs, cTransclude) {
      return function($scope, $element, $attrs, ctrl, $transclude) {
        // var canvas = document.getElementById($attrs.preview);
        // var transcludeScope = $scope.$parent.$new();

        $element[0].onchange = function() {
          var busy = $scope.doBusy("Reducing the picture");

          // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
          var file = $element[0].files[0];
          if (!file.type.match(/image.*/)) {
            console.error("Not a picture?");
            alert("Are you sure it is a picture? If it is a picture, please send it by email to marielineet.jean@gmail.com to debug the application. Thank you");
            busy();
          }

          var img = document.createElement("img");
          var reader = new FileReader();
          reader.onerror = function(e) {
            console.error(e);
            busy();
          };

          reader.onload = function(e) {
            console.log("reader loaded");
            img.src = e.target.result;

            //var canvas = document.createElement("canvas");
            img.onload = function() {
              var canvas = document.getElementById("preview");
              var ctx = canvas.getContext("2d");

              var schrink = 1;
              var h = img.naturalHeight;
              var w = img.naturalWidth;

              // Resize the image
              var MAX_SIZE = 200*1024;
              if (h * w > MAX_SIZE) {
                schrink = Math.sqrt(h * w / MAX_SIZE);
                w = w / schrink;
                h = h / schrink;
              }

              // Adapt the canvas
              canvas.width = w;
              canvas.height = h;
              canvas.style.width = w;
              canvas.style.height = h;

              // Add the image to the canvas
              ctx.drawImage(img, 0, 0, w, h);
              canvas.style.display = 'block';

              var dataURI = canvas.toDataURL("image/jpeg");
              $scope.currentFile().fileContent = dataURI;
              $scope.currentFile().OriginalName = file.name;
              $scope.$emit("revalidate");
              busy();
            };
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }
}]);

mainApp.controller('ctrl', [ '$scope', '$location', '$sce', function($scope, $location, $sce) {
  appState().store.subscribe(function() {
    $scope.state = bundle().store.getState();
  });

  $scope.cryptomedic = cryptomedic;
  $scope.application = application;
  $scope.server = server;

  $scope.safeApply = function (fn) {
    if (this.$root && (this.$root.$$phase == '$apply' || this.$root.$$phase == '$digest')) {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  $scope.go = function(path) {
    $location.path( path );
  };

  $scope.sync = false;
  $scope.connected = false;

  $scope.busy = [];
  $scope.busy.messages = [ ];
  $scope.busy.done = false;
  $scope.busy.isVisible = false;
  $scope.doBusy = function(msg, wait) {
    // TODO LOW GUI: auto hide the message box after 500ms if anything is pending ?
    if (typeof(wait) == 'undefined') {
      wait = false;
    }
    var c = $scope.busy.messages.push({ 'message': msg, 'done': false }) - 1;
    $scope.busy.done = false;
    if (!$scope.busy.isVisible) {
      jQuery("#busy").modal('show');
      $scope.busy.isVisible = true;
    }
    $scope.safeApply();
    function allOk() {
      var ok = true;
      for(var m in $scope.busy.messages) {
        ok = ok && $scope.busy.messages[m].status;
      }
      return ok;
    }

    function endBusy() {
      if (allOk()) {
        jQuery("#busy").modal('hide');
        $scope.busy.done = true;
        $scope.busy.isVisible = false;
        $scope.busy.messages = [];
        // See http://stackoverflow.com/a/11544860
        jQuery('body').removeClass('modal-open');
        jQuery(".modal-backdrop").remove();
      } else {
        console.warn("end busy with not allOk");
      }
    }
    $scope.endBusy = endBusy;

    return function() {
      $scope.busy.messages[c].status = true;
      $scope.safeApply();
      // If all messages are ok, then hide it
      if (allOk()) {
        $scope.busy.done = true;
        setTimeout(endBusy, (wait ? 2000 : 1));
      }
    };
  };

  $scope.endBusy = function() {};

  $scope.logged = false;
  $scope.username = "";
  $scope.password = "";
  $scope.hasPermission = function(transaction) {
    if (typeof(server) == "undefined" || !server) return false;
    if (typeof(server.settings) == "undefined" || !server.settings) return false;
    if (typeof(server.settings.authorized) == "undefined" || !server.settings.authorized) return false;
    return (server.settings.authorized.indexOf(transaction) >= 0);
  };

  myEvents.on('backend_progress', function(data) {
    $scope.sync = data;
    $scope.connected = true;
    $scope.safeApply();
  }, false);

  myEvents.on('disconnected', function(msg) {
    if (msg == 401) {
      $scope.logged = false;
    }
    $scope.connected = false;
    $scope.safeApply();
  });

  myEvents.on('connected', function(msg) {
    $scope.connected = true;
    $scope.safeApply();
  });

  $scope.doCheckLogin = function() {
    $scope.loginError = false;
    var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
    service_backend.checkLogin()
      .then(function(data) {
        server.settings = data;
        $scope.logged = true;
        $scope.$broadcast("message", { "level": "info", "text": "Welcome " +  data.name + "!"});
        if (location.hash == '#/login') {
          $scope.go('#');
        }
        $scope.safeApply();
      })
      .myFinallyDone(function() {
        busyEnd();
      });
  };

  // Events from the service_*
  // $scope.$on("backend_logged_out", function(msg) {
  //   $scope.logged = false;
  // });

  $scope.$on("$routeChangeError", function() { console.log("error in routes"); console.log(arguments); });

  $scope.messages = [];
  var interval = 0;
  $scope.$on("message", function(event, data) {
    data = jQuery.extend({}, { level: "success", text: "Error!", seconds: 8 }, data);
    var t = new Date();
    data.timeout = t.setSeconds(t.getSeconds() + data.seconds);
    $scope.messages.push(data);
    if (interval == 0) {
      interval = setInterval(function() {
        var now = new Date();
        $scope.messages = $scope.messages.filter(function(value, index) {
          return (value.timeout >= now);
        });
        if ($scope.messages.length == 0) {
          clearInterval(interval);
          interval = 0;
        }
        $scope.safeApply();
      }, 1000);
    }
  });

  $scope.doCheckLogin();
}]);

server.setSettings = function(data) {
  server.settings = objectify(data);
}
