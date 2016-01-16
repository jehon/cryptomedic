"use strict";

var application = {};
var server = {};

function formatDate(date) {
  date = date || new Date();
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  month = month.substring(month.length - 2);
  var day = "0" + date.getDate();
  day = day.substring(day.length - 2);
  return year + "-" + month + "-" + day;
}

// Inspired from http://www.2ality.com/2014/10/es6-promises-api.html
Promise.prototype.myFinallyDone = function (callback) {
  callback = callback || function(data) { return data; };
  return this
    .then(callback, callback)
    .catch(function(reason) { console.error(reason); });
};

function inherit(parent, constructor) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

  if (typeof(constructor) == "undefined")
    constructor = function() {};

  // shim for older browsers:
  var ObjectCreateShim;
  if (typeof Object.create == "function") {
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

var mainApp = angular.module("app_main", [ "ngRoute" ])
.config([ "$compileProvider", function( $compileProvider ) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
  $compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
}])
.filter("mypercentage", function() {
  return function(text, rnd) {
    text = text || "";
    rnd = rnd || 2;
    if (typeof(text) != "number") {
      if (parseFloat(text) != text) return text;
      text = parseFloat(text);
    }
    return "" + (Math.round(text * 100 * Math.pow(10, rnd)) / Math.pow(10, rnd)) + "%";
  };
})
.filter("nl2br", [ "$sce", function($sce) {
  return function(text) {
    var t = text;
    while (t.search("\n") >= 0) {
      t = t.replace("\n", "<br>");
    }
    return $sce.trustAsHtml(t);
  };
}])
.directive("catchIt", [ "$compile", function($compile) {
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    // http://stackoverflow.com/a/15298620
  return {
    restrict: "A",
    transclude: true,
    scope: {
      "tryit": "&", // executed in parent scope
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
        $element.on("$destroy", function() {
          $scope.$destroy();
        });
      } // end of link function
  };
}])
.directive("mycalendar", function() {
  return function (scope, elem, attrs) {
    jQuery(elem).datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true,
      changeYear: true,
      yearRange: "1980:+2",
      monthNamesShort: [ "1 Jan", "2 Feb", "3 Mar", "4 Apr", "5 May", "6 Jun", "7 Jul", "8 Aug", "9 Sep", "10 Oct", "11 Nov", "12 Dec" ]
    });
  };
})
.directive("codage", function() {
  return {
   restrict: "E",
   transclude: true,
   scope: {
      value: "=value"
    },
    // template: '<span data-toggle="tooltip" data-placement="bottom" title="{{value}}">{{coded}}</span>',
   template: "{{coded}}<span class=\"online\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"{{value}}\">*</span>",
   link: function($scope, element, attrs) {
      if (server && server.settings && server.settings.codes[$scope.value]) {
        $scope.isCoded = true;
        $scope.coded = server.settings.codes[$scope.value];
      } else {
        $scope.isCoded = false;
        $scope.coded = $scope.value;
      }
    }
 };
})
// .directive('hasPermission', [ '$animate', function($animate) {
//   return {
//     multiElement: true,
//     transclude: 'element',
//     priority: 600,
//     terminal: true,
//     restrict: 'A',
//     $$tlb: true,
//     link: function($scope, $element, $attr, ctrl, $transclude) {
//         var block, childScope, previousElements;
//         $scope.$watch($attr.hasPermission, function ngIfWatchAction(value) {
//           if (value) {
//             if (!childScope) {
//               $transclude(function(clone, newScope) {
//                 childScope = newScope;
//                 clone[clone.length++] = document.createComment(' end hasPermission: ' + $attr.hasPermission + ' ');
//                 // Note: We only need the first/last node of the cloned nodes.
//                 // However, we need to keep the reference to the jqlite wrapper as it might be changed later
//                 // by a directive with templateUrl when its template arrives.
//                 block = {
//                   clone: clone
//                 };
//                 $animate.enter(clone, $element.parent(), $element);
//               });
//             }
//           } else {
//             if (previousElements) {
//               previousElements.remove();
//               previousElements = null;
//             }
//             if (childScope) {
//               childScope.$destroy();
//               childScope = null;
//             }
//             if (block) {
//               previousElements = getBlockNodes(block.clone);
//               $animate.leave(previousElements).then(function() {
//                 previousElements = null;
//               });
//               block = null;
//             }
//           }
//         });
//     }
//   };
// }]);
// .directive('hide', ['$animate', function($animate) {
//   return {
//     restrict: 'A',
//     multiElement: true,
//     link: function(scope, element, attr) {
//       scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
//         // The comment inside of the ngShowDirective explains why we add and
//         // remove a temporary class for the show/hide animation
//         $animate[value ? 'addClass' : 'removeClass'](element,NG_HIDE_CLASS, {
//           tempClasses: NG_HIDE_IN_PROGRESS_CLASS
//         });
//       });
//     }
//   };
// }]);

.directive("myGo", function() {
  return {
    restrict: "E",
    transclude: true,
    // scope: true,
    replace: true,
    template: function(elem, attrs) {
      // function templateFunction() {
      if (attrs.haspermission) {
          if (!appState().store.getState()
              || !appState().store.getState().connection.settings
              || !appState().store.getState().connection.settings.authorized2[attrs.haspermission]
              ) {
            return "<span haspermission-failed=\"" + attrs.haspermission + "\"></span>";
          }
        }
      return "<a class=\"btn btn-default\" href=\"" + cryptomedic.flavor + "/app/" + attrs.to + "\""
              + (attrs.id ? " id=\"" + attrs.id + "\"" : "")
              + (attrs.class ? " class=\"" + attrs.class + "\"" : "")
              + ">"
              +   "<ng-transclude>"
              +      "<b style=\"color: red;\">Button</b>"
              +    "</ng-transclude>"
              +  "</a>";
        // }
        // return templateFunction();
        // scope.$watch('attr.haspermission', templateFunction);
    }
  };
})
.directive("preview", [ "$compile", function($compile) {
  return {
    restrict: "A",
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
            // console.log("reader loaded");
            img.src = e.target.result;

            //var canvas = document.createElement("canvas");
            img.onload = function() {
              var canvas = document.getElementById("preview");
              var ctx = canvas.getContext("2d");

              var schrink = 1;
              var h = img.naturalHeight;
              var w = img.naturalWidth;

              // Resize the image
              var MAX_SIZE = 300*1024;
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
              canvas.style.display = "block";

              var dataURI = canvas.toDataURL("image/jpeg");
              $scope.currentFile().fileContent = dataURI;
              $scope.currentFile().OriginalName = file.name;
              $scope.$emit("revalidate");
              busy();
            };
          };
          reader.readAsDataURL(file);
        };
      };
    }
  };
}])
.directive("nullToInterrogation", function() {
  // https://docs.angularjs.org/api/ng/directive/select
  // usage: <select ng-model="model.id" null-to-interrogation>
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        // From option to model
        if (val == "?") return null;
        return val;
      });
      ngModel.$formatters.push(function(val) {
        // From model to option
        if (val == null) return "?";
        return val;
      });
    }
  };
});

mainApp.controller("ctrl", [ "$scope", "$location", "$sce", function($scope, $location, $sce) {
  // @see http://stackoverflow.com/questions/14319967/angularjs-routing-without-the-hash
  // @see https://docs.angularjs.org/api/ng/provider/$locationProvider
  // $locationProvider.html5Mode(true)

  // Global variables intorduced into the scope:
  $scope.cryptomedic  = cryptomedic;
  $scope.application  = application;
  $scope.server       = server;
  $scope.calculations = calculations;


  $scope.appStateStore = appState().store.getState();
  appState().store.subscribe(function() {
    // console.log("scope appState updated", appState().store.getState());
    $scope.appStateStore = appState().store.getState();

    // ** Manual operations **

    // Are we still busy?
    if ($scope.appStateStore.state.busy > 0) {
      jQuery("#busy").modal("show");
    } else {
      jQuery("#busy").modal("hide");
    }

    $scope.safeApply();
  });

  $scope.safeApply = function (fn) {
    if (this.$root && (this.$root.$$phase == "$apply" || this.$root.$$phase == "$digest")) {
      if (fn && (typeof(fn) === "function")) {
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

  $scope.doBusy = function(msg) {
    appState().actions.state.busy(msg);
    return function() {
      appState().actions.state.ready();
    };
  };

  $scope.endBusy = appState().actions.state.ready;

  $scope.logged = false;
  $scope.username = "";
  $scope.password = "";
  $scope.hasPermission = function(transaction) {
    if (!$scope.appStateStore.connection.settings) {
      return false;
    }
    if (!$scope.appStateStore.connection.settings.authorized[transaction]) {
      return false;
    }
    return $scope.appStateStore.connection.settings.authorized[transaction];
  };

  // myEvents.on('backend_progress', function(data) {
  //   $scope.sync = data;
  //   $scope.connected = true;
  //   $scope.safeApply();
  // }, false);

  $scope.doCheckLogin = function() {
    $scope.loginError = false;
    var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
    service_backend.checkLogin()
      .then(function(data) {
        server.settings = data;
        $scope.logged = true;
        $scope.$broadcast("message", { "level": "info", "text": "Welcome " +  data.name + "!"});
        if (location.hash == "#/login") {
          $scope.go("#");
        }
        $scope.safeApply();
      })
      .myFinallyDone(function() {
        busyEnd();
      });
  };

  $scope.$on("$routeChangeError", function() { console.error("error in routes", arguments); });

  $scope.messages = [];
  var interval = 0;
  $scope.$on("message", function(event, data) {
    // data = Object.assign({}, );
    if (!data.level) {
      data.level = "success";
    }
    if (!data.text) {
      data.text = "Error!";
    }
    if (!data.seconds) {
      data.seconds = 8;
    }
    // data = jQuery.extend({}, { level: "success", text: "Error!", seconds: 8 }, data);
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



var cryptomedic = {};
{
  var path = location.pathname.split("/");
  cryptomedic.flavor = "/" + path[1];
}
cryptomedic.templateRoot = cryptomedic.flavor + "/cache/templates";
cryptomedic.settings = {};

mainApp.config([ "$routeProvider", function($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: cryptomedic.templateRoot + "/pages/home.html",
      controller: "ctrl_home"
    }).when("/login", {
      templateUrl: cryptomedic.templateRoot + "/pages/login.html",
      controller: "ctrl_login",
    }).when("/folder/:patient_id/:page?/:subtype?/:subid?/:mode?", {
      templateUrl: cryptomedic.templateRoot + "/pages/folder.php",
      controller: "ctrl_folder",
    }).when("/search", {
      templateUrl: cryptomedic.templateRoot + "/pages/search.php",
      controller: "ctrl_search",
    }).when("/reports/:report?", {
      templateUrl: cryptomedic.templateRoot + "/pages/reports.php",
      controller: "ctrl_reports",
    }).when("/users", {
      templateUrl: cryptomedic.templateRoot + "/pages/users.html",
      controller: "ctrl_users",
    }).otherwise({ "redirectTo": "/home"});
}]);

function DataMissingException(data) {
  this.message = "Missing "  + (data || "some data");
  this.data = data;
}
DataMissingException.prototype = new ApplicationException();
