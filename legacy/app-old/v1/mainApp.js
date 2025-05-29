// *** Legacy ***

// AngularJS
import jQuery from "jquery/src/jquery.js";
window.jQuery = jQuery;

import angular from "angular";
import "angular-route";

import goThere from "../v2/js/goThere.js";
import template from "../v2/js/template.js";

import "./elements/cryptomedic-data-service.js";
import JHElement from "./elements/jh-element.js";
import "./elements/jh-script.js";
import "./elements/x-input-date.js";
import "./elements/x-o-overlay.js";
import "./elements/x-read-boolean.js";
import "./elements/x-read.js";
import "./elements/x-write-list.js";
import "./elements/x-write.js";
window.JHElement = JHElement;

let mainApp = angular.module("app_main", ["ngRoute"]).config([
  "$locationProvider",
  function ($locationProvider) {
    $locationProvider.hashPrefix("");
  }
]);

mainApp.controller("ctrl", [
  "$scope",
  function ($scope) {
    // Global variables intorduced into the scope:
    $scope.template = template;

    $scope.safeApply = function (fn) {
      if (
        this.$root &&
        (this.$root.$$phase == "$apply" || this.$root.$$phase == "$digest")
      ) {
        if (fn && typeof fn === "function") {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.go = function (path) {
      goThere(path);
    };

    $scope.$on("$routeChangeError", function () {
      console.error("error in routes", arguments);
    });
  }
]);

import ctrl_folder from "./ctrl_folder.js";
mainApp.controller("ctrl_folder", ctrl_folder);

// *** Legacy End ***

// Routing
import { createElementWithObject } from "../v2/js/custom-element.js";
import XPageHome from "../v2/pages/x-page-home.js";
import XPageLogin from "../v2/pages/x-page-login.js";
import XPagePrices from "../v2/pages/x-page-prices.js";
import XPageReports from "../v2/pages/x-page-reports.js";
import XPageSearch from "../v2/pages/x-page-search.js";
import XPageUserEdit from "../v2/pages/x-page-user-edit.js";
import XPageUserPassword from "../v2/pages/x-page-user-password.js";
import XPageUsersList from "../v2/pages/x-page-users-list.js";

// template: function (_params) {
//     // Thanks to https://stackoverflow.com/a/34217927/1954789
//     return `<x-page-login redirect=${parseRouteLogin().redirect}></x-page-login>`;
// }

// template: function (_params) {
//     // Thanks to https://stackoverflow.com/a/34217927/1954789
//     window.location.href = redirect;
// }

function goToElement(el, params = {}) {
  return createElementWithObject(el, params);
}

mainApp.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/login/:redirect*?", {
        template: (params) => goToElement(XPageLogin, params)
      })
      .when("/folder/:patient_id/:page?/:subtype?/:subid?/:mode?", {
        templateUrl: template("folder"),
        controller: "ctrl_folder"
      })
      .when("/home", {
        template: () => goToElement(XPageHome)
      })
      .when("/search", {
        template: () => goToElement(XPageSearch)
      })
      .when("/reports/:report", {
        template: (params) => goToElement(XPageReports, params)
      })
      .when("/users/:uid/password", {
        template: (params) => goToElement(XPageUserPassword, params)
      })
      .when("/users/:uid", {
        template: (params) => goToElement(XPageUserEdit, params)
      })
      .when("/users", {
        template: () => goToElement(XPageUsersList)
      })
      .when("/prices", {
        template: () => goToElement(XPagePrices)
      })
      .when("/home.new", {
        template: "<x-react-router></x-react-router>"
      })
      .when("/patient/:folderId?/:uid?/:mode?", {
        template: "<x-react-router></x-react-router>"
      })

      .otherwise({ redirectTo: "/home" });
    // .otherwise({
    //   template: "<x-react-router></x-react-router>"
    // })
  }
]);
