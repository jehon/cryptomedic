'use strict';

import angular                  from 'angular';
import                               'angular-route';
import { ApplicationException } from 'helpers/exceptions';
import store                    from 'reducers/store';
import dispatch                 from 'reducers/dispatch';
import catalog                  from 'reducers/catalog';
import calculations             from 'helpers/calculations';
import template                 from 'helpers/template';
import goThere                  from 'helpers/goThere';

import ctrl_allgraphics         from 'controllers/ctrl_allgraphics';
import ctrl_file_appointment    from 'controllers/ctrl_file_appointment';
import ctrl_file_bill           from 'controllers/ctrl_file_bill';
import ctrl_folder              from 'controllers/ctrl_folder';
import ctrl_graphic             from 'controllers/ctrl_graphic';
import ctrl_home                from 'controllers/ctrl_home';
import ctrl_login               from 'controllers/ctrl_login';
import ctrl_reports             from 'controllers/ctrl_reports';
import ctrl_search              from 'controllers/ctrl_search';
import ctrl_users               from 'controllers/ctrl_users';

import { loginCheck }           from 'actions/authentication';

var application = {};
var path = location.pathname.split('/');
var flavor = '/' + path[1];

// function formatDate(date) {
//   date = date || new Date();
//   var year = date.getFullYear();
//   var month = '0' + (date.getMonth() + 1);
//   month = month.substring(month.length - 2);
//   var day = '0' + date.getDate();
//   day = day.substring(day.length - 2);
//   return year + '-' + month + '-' + day;
// }

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
.directive('catchIt', [ '$compile', function($compile) {
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
      function($scope, $element, $attrs, ctrl, $transclude) {
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
}])
.directive('mycalendar', function() {
  return function (scope, elem, attrs) {
    jQuery(elem).datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      changeYear: true,
      yearRange: '1980:+2',
      monthNamesShort: [ '1 Jan', '2 Feb', '3 Mar', '4 Apr', '5 May', '6 Jun', '7 Jul', '8 Aug', '9 Sep', '10 Oct', '11 Nov', '12 Dec' ]
    });
  };
})
.directive('codage', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      value: '=value'
    },
    // template: '<span data-toggle='tooltip' data-placement='bottom' title='{{value}}'>{{coded}}</span>',
    template: '{{coded}}<span class=\'online\' data-toggle=\'tooltip\' data-placement=\'bottom\' title=\'{{value}}\'>*</span>',
    link: function($scope, element, attrs) {

      let settings = store.getState().connection.setting;

      if (settings.codes[$scope.value]) {
        $scope.isCoded = true;
        $scope.coded = settings.codes[$scope.value];
      } else {
        $scope.isCoded = false;
        $scope.coded = $scope.value;
      }
    }
  };
})
.directive('myGo', function() {
  return {
    restrict: 'E',
    transclude: true,
    // scope: true,
    replace: true,
    template: function(elem, attrs) {
      // function templateFunction() {
      if (attrs.haspermission) {
        if (!store.getState()
              || !store.getState().connection.settings
              || !store.getState().connection.settings.authorized2[attrs.haspermission]
              ) {
          return '<span haspermission-failed=\'' + attrs.haspermission + '\'></span>';
        }
      }
      return '<a class=\'btn btn-default\' href=\'' + flavor + '/app/' + attrs.to + '\''
              + (attrs.id ? ' id=\'' + attrs.id + '\'' : '')
              + (attrs.class ? ' class=\'' + attrs.class + '\'' : '')
              + '>'
              +   '<ng-transclude>'
              +      '<b style=\'color: red;\'>Button</b>'
              +    '</ng-transclude>'
              +  '</a>';
    }
  };
})
.directive('preview', [ '$compile', function($compile) {
  return {
    restrict: 'A',
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    compile: function(cElement, cAttrs, cTransclude) {
      return function($scope, $element, $attrs, ctrl, $transclude) {
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
            // console.log('reader loaded');
            img.src = e.target.result;

            //var canvas = document.createElement('canvas');
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
}])
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

mainApp.controller('ctrl', [ '$scope', '$location', '$sce', function($scope, $location, $sce) {
  // @see http://stackoverflow.com/questions/14319967/angularjs-routing-without-the-hash
  // @see https://docs.angularjs.org/api/ng/provider/$locationProvider
  // $locationProvider.html5Mode(true)

  // Global variables intorduced into the scope:
  // $scope.cryptomedic  = cryptomedic;
  $scope.application  = application;
  $scope.calculations = calculations;
  $scope.template     = template;


  $scope.appStateStore = store.getState();
  store.subscribe(function() {
    console.log('scope appState updated', store.getState());
    $scope.appStateStore = store.getState();

    // ** Manual operations **

    // Are we still busy?
    if ($scope.appStateStore.state.busy > 0) {
      jQuery('#busy').modal('show');
    } else {
      jQuery('#busy').modal('hide');
    }

    if ($scope.appStateStore.connection.connected && !$scope.appStateStore.connection.authenticated) {
      goThere("#/login");
      $scope.safeApply();
    }

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
    dispatch(catalog.STATE_BUSY, msg);
    return function() {
      dispatch(catalog.STATE_READY);
    };
  };

  $scope.endBusy = dispatch.bind(this, catalog.STATE_BUSY);

  $scope.username = '';
  $scope.password = '';
  $scope.hasPermission = function(transaction) {
    if (!$scope.appStateStore.connection.settings) {
      return false;
    }
    if (!$scope.appStateStore.connection.settings.authorized[transaction]) {
      return false;
    }
    return $scope.appStateStore.connection.settings.authorized[transaction];
  };

  $scope.doCheckLogin = function() {
    loginCheck();
  };

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
    // data = jQuery.extend({}, { level: 'success', text: 'Error!', seconds: 8 }, data);
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

mainApp.controller('ctrl_allgraphics',      ctrl_allgraphics);
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

export default mainApp;
