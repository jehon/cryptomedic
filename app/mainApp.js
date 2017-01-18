'use strict';

import angular                  from 'angular';
import                               'angular-route';
import store                    from 'reducers/store';
import dispatch                 from 'reducers/dispatch';
import catalog                  from 'reducers/catalog';

import ctrl_allGraphics         from 'controllers/ctrl_allgraphics';
import ctrl_file_appointment    from 'controllers/ctrl_file_appointment';
import ctrl_folder              from 'controllers/ctrl_folder';
import ctrl_graphic             from 'controllers/ctrl_graphic';
import ctrl_home                from 'controllers/ctrl_home';

var application = {};

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
      return '' + (Math.round(text * 100 * Math.pow(10, rnd)) / Math.pow(10, rnd)) + '%';
    };
  })
  .filter('nl2br', [ '$sce', function($sce) {
    return function(text) {
      var t = text;
      while (t.search('\n') >= 0) {
        t = t.replace('\n', '<br>');
      }
      return $sce.trustAsHtml(t);
    };
  }])
  .directive('catchIt', function() {
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    // http://stackoverflow.com/a/15298620
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        'tryit': '&', // executed in parent scope
      },
      template: '<span ng-if="error" class="catchedError">{{errorMsg}}</span><span ng-if="!error" ng-transclude></span>',
      link:
      function($scope, $element) {
        function testIt() {
          try {
            $scope.error = false;
            $scope.result = '';
            $scope.errorMSg = '';
            $scope.result = $scope.tryit();
          } catch (e) {
            $scope.error = true;
            if (e instanceof ApplicationException) {
              $scope.errorMsg = e.getMessage();
            } else {
              $scope.errorMsg = 'Uncatchable error';
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
  })
  .directive('mycalendar', function() {
    return function (scope, elem) {
      jQuery(elem).datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        yearRange: '1980:+2',
        monthNamesShort: [ '1 Jan', '2 Feb', '3 Mar', '4 Apr', '5 May', '6 Jun', '7 Jul', '8 Aug', '9 Sep', '10 Oct', '11 Nov', '12 Dec' ]
      });
    };
  })
  .directive('preview', function() {
    return {
      restrict: 'A',
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
      compile: function() {
        return function($scope, $element) {
        // var canvas = document.getElementById($attrs.preview);
        // var transcludeScope = $scope.$parent.$new();

          $element[0].onchange = function() {
            var busy = $scope.doBusy('Reducing the picture');

          // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
            var file = $element[0].files[0];
            if (!file.type.match(/image.*/)) {
              console.error('Not a picture?');
              alert('Are you sure it is a picture? If it is a picture, please send it by email to marielineet.jean@gmail.com to debug the application. Thank you');
              busy();
            }

            var img = document.createElement('img');
            var reader = new FileReader();
            reader.onerror = function(e) {
              console.error(e);
              busy();
            };

            reader.onload = function(e) {
              img.src = e.target.result;

              img.onload = function() {
                var canvas = document.getElementById('preview');
                var ctx = canvas.getContext('2d');

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
                canvas.style.display = 'block';

                var dataURI = canvas.toDataURL('image/jpeg');
                $scope.currentFile().fileContent = dataURI;
                $scope.currentFile().OriginalName = file.name;
                $scope.$emit('revalidate');
                busy();
              };
            };
            reader.readAsDataURL(file);
          };
        };
      }
    };
  })
  .directive('nullToInterrogation', function() {
  // https://docs.angularjs.org/api/ng/directive/select
  // usage: <select ng-model='model.id' null-to-interrogation>
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
        // From option to model
          if (val == '?') return null;
          return val;
        });
        ngModel.$formatters.push(function(val) {
        // From model to option
          if (val == null) return '?';
          return val;
        });
      }
    };
  });

mainApp.controller('ctrl', [ '$scope', function($scope) {
  // Global variables intorduced into the scope:
  $scope.application  = application;
  $scope.calculations = calculations;
  $scope.template     = template;


  $scope.appStateStore = store.getState();
  store.subscribe(function() {
    console.log('scope appState updated', store.getState());
    $scope.appStateStore = store.getState();

    $scope.safeApply();
  });

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
    goThere(path);
  };

  $scope.sync = false;
  $scope.connected = false;

  $scope.doBusy = function(msg) {
    // TODO: remove this...
    dispatch(catalog.STATE_BUSY, msg);
    return function() {
      dispatch(catalog.STATE_READY);
    };
  };

  $scope.endBusy = dispatch.bind(this, catalog.STATE_BUSY);

  $scope.username = '';
  $scope.password = '';

  $scope.$on('$routeChangeError', function() { console.error('error in routes', arguments); });

  $scope.messages = [];
  var interval = 0;
  $scope.$on('message', function(event, data) {
    if (!data.level) {
      data.level = 'success';
    }
    if (!data.text) {
      data.text = 'Error!';
    }
    if (!data.seconds) {
      data.seconds = 8;
    }
    var t = new Date();
    data.timeout = t.setSeconds(t.getSeconds() + data.seconds);
    $scope.messages.push(data);
    if (interval == 0) {
      interval = setInterval(function() {
        var now = new Date();
        $scope.messages = $scope.messages.filter(function(value) {
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
}]);

mainApp.controller('ctrl_allGraphics',      ctrl_allGraphics);
mainApp.controller('ctrl_file_appointment', ctrl_file_appointment);
mainApp.controller('ctrl_file_bill',        ctrl_file_bill);
mainApp.controller('ctrl_folder',           ctrl_folder);
mainApp.controller('ctrl_graphic',          ctrl_graphic);
mainApp.controller('ctrl_home',             ctrl_home);
mainApp.controller('ctrl_login',            ctrl_login);
mainApp.controller('ctrl_reports',          ctrl_reports);
mainApp.controller('ctrl_search',           ctrl_search);
mainApp.controller('ctrl_users',            ctrl_users);

mainApp.config([ '$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: template('page', 'home'),
      controller: 'ctrl_home'
    }).when('/login', {
      templateUrl: template('page', 'login'),
      controller: 'ctrl_login',
    }).when('/folder/:patient_id/:page?/:subtype?/:subid?/:mode?', {
      templateUrl: template('folder'),
      controller: 'ctrl_folder',
    }).when('/search', {
      templateUrl: template('page', 'search'),
      controller: 'ctrl_search',
    }).when('/reports/:report?', {
      templateUrl: template('reports'),
      controller: 'ctrl_reports',
    }).when('/users', {
      templateUrl: template('page', 'users'),
      controller: 'ctrl_users',
    }).otherwise({ 'redirectTo': '/home'});
}]);


window.cryptomedic = {
  serverSettings: {}
}

export default mainApp;
