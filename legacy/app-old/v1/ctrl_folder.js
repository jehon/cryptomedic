/* istanbul ignore file */
/* eslint-disable */

import Folder from "../../../src/business/folder.js";
import { extractPrefsFile } from "../../../src/utils/prefs.js";
import date2CanonicString from "../v2/js/date2CanonicString.js";
import { formGetContent } from "../v2/js/form.js";
import getDataService from "../v2/js/getDataService.js";
import goThere from "../v2/js/goThere.js";
import setPropertyOn from "../v2/js/set-property.js";
import template from "../v2/js/template.js";
import { fromBirthDate } from "../v2/widgets/file/x-fff-age.js";

import "../v2/pages/x-page-folder.js";

import { registryGet } from "../../../src/business/registry.js";
import "../v2/pages/blocks/x-folder-graphics.js";
import "../v2/widgets/file/x-fff-bmi-sd.js";
import "../v2/widgets/file/x-fff-bmi.js";
import "../v2/widgets/file/x-fff-height-sd.js";
import "../v2/widgets/file/x-fff-weight-sd.js";
import "../v2/widgets/file/x-fff-wh-sd.js";
import "../v2/widgets/file/x-fff-wh.js";
import "../v2/widgets/folder/x-ff-next-appointment.js";
import "../v2/widgets/folder/x-ff-patient-related.js";
import "../v2/widgets/style/x-button.js";

/**
 * @param {object} folder the folder to be dispatched, false or null otherwise
 * @param {object} file the uid of the file currently selected
 */
function newRefresh(folder = null, file = null) {
  const mc = document.querySelector("#main_content");
  if (mc) {
    mc.setAttribute("x-top", "x-top");
    setPropertyOn(mc, "folder", folder);
    setPropertyOn(mc, "file", file);
  }
}

/**
 * @param $scope
 * @param $routeParams
 */
export default function ctrl_folder($scope, $routeParams) {
  /*
   * '/folder/:patient_id/:page?/:subtype?/:subid?/:mode?'
   *
   *  '/folder/123                      view the patient file
   *  '/folder/123/edit                 edit the patient  (page ~> mode)
   *  '/folder/                         add a patient     (page ~> mode)
   *  '/folder/123/file/Bills/456       view the sub file
   *  '/folder/123/file/Bills/456/edit  edit the sub file
   *  '/folder/123/file/Bills           add a bill
   *  '/folder/123/summary/*            REACT
   *  '/folder/123/graphics
   *  '/folder/123/addfile
   *
   */

  // *** ROUTING ***
  /*
    generic:
      patient_id:  (-1 => add patient)
      mode: read / edit / add
      page: null (patient), file (clubfoot, ...), summary / ...

    if page == file:
      subtype: ClubFoot / Bill / ...
      subid: (-1 => add)

   */

  let t = function (val, def = false) {
    if (typeof val == "undefined") return def;
    if (val === null) return def;
    return val;
  };

  $scope.patient_id = t($routeParams["patient_id"]);
  $scope.page = t($routeParams["page"]);
  $scope.subtype = t($routeParams["subtype"]);
  $scope.subid = t($routeParams["subid"]);
  $scope.mode = t($routeParams["mode"]);

  // PATIENT ROUTE VIEW
  // ex: folder/123
  if (!$scope.page) {
    $scope.mode = "read";
    $scope.page = false;
  }

  // PATIENT ROUTE EDIT / ADD
  // ex: folder/123/edit
  if ($scope.page == "edit") {
    // Map page to the mode (see ~>) in case of patient (short url, but wrong parameters)
    $scope.mode = $scope.page;
    $scope.page = false;
    if ($scope.patient_id < 0) {
      $scope.mode = "add";
    }
  }

  // FICHE ROUTE VIEW / EDIT / ADD
  // ex: folder/123/file/Bill/456
  // ex: folder/123/file/Bill/456/edit
  if ($scope.page == "file") {
    if (!$scope.mode) {
      $scope.mode = "read";
    }
    if ($scope.subid === false) {
      // Adding a file
      $scope.mode = "add";
    }
  }

  var cachedCurrentFile = null;
  $scope.folder = null;
  newRefresh($scope.folder, null);

  $scope.age = {};

  //----------------------
  //   Get data from the server
  //----------------------
  // By default, wait for the html element to be ready:
  let getFileThen = getDataService();

  if ($scope.patient_id < 0) {
    getFileThen = getFileThen.then(() => Promise.resolve(new Folder()));
  } else {
    getFileThen = getFileThen.then((dataService) =>
      dataService.getFolder($scope.patient_id)
    );
  }
  getFileThen.then(function (folder) {
    if (!folder) {
      $scope.$broadcast("refresh");
      return;
    }

    // Build up data
    if ($scope.page == "file") {
      // File
      if ($scope.mode == "add") {
        cachedCurrentFile = Folder.create(folder, $scope.subtype);
        if (cachedCurrentFile.initFromCachedPreferences) {
          cachedCurrentFile.initFromCachedPreferences();
        }
      } else {
        cachedCurrentFile = folder.getByTypeAndId(
          registryGet($scope.subtype),
          $scope.subid
        );
      }
    } else {
      // Patient
      cachedCurrentFile = folder.getPatient();
    }
    $scope.folder = folder;
    newRefresh($scope.folder, cachedCurrentFile);

    // Layout
    if ($scope.mode == "edit" || $scope.mode == "add") {
      document.querySelectorAll(".mode-read").forEach((e) => {
        e.classList.remove("mode-read");
        e.classList.add("mode-write");
      });
    } else {
      document.querySelectorAll(".mode-write").forEach((e) => {
        e.classList.remove("mode-write");
        e.classList.add("mode-read");
      });
    }

    // Date
    $scope.age = {};
    if (cachedCurrentFile && cachedCurrentFile.year_of_birth) {
      var age = fromBirthDate(cachedCurrentFile.year_of_birth);
      var r = RegExp("([0-9]+) ?y(ears)? ?([0-9]+) ?m(onths)?").exec(age);
      if (r != null && r.length > 3) {
        $scope.age.years = parseInt(r[1]);
        $scope.age.months = parseInt(r[3]);
      }
    }

    $scope.$broadcast("refresh");
    $scope.safeApply();
  });

  // ------------------------
  //  Display helpers
  // ------------------------
  $scope.getTemplateForMe = function () {
    if ($scope.folder === null) {
      return template("waiting");
    }

    if ($scope.page === false) {
      return template("patient", $scope.mode == "read" ? "fiche" : "write");
    }

    if ($scope.page == "file") {
      return template(
        $scope.subtype.toLowerCase(),
        $scope.mode == "read" ? "fiche" : "write"
      );
    }

    return template("folder", $scope.page);
  };

  $scope.currentFile = function () {
    return cachedCurrentFile;
  };

  $scope.setCurrentFile = function (v) {
    cachedCurrentFile = v;
    return cachedCurrentFile;
  };

  $scope.getModeEdit = function () {
    switch (this.mode) {
      case "edit":
      case "add":
        return "true";
    }
    return "false";
  };

  $scope.reinject = function () {
    // https://docs.angularjs.org/api/ng/directive/ngInclude
    // To fill in the new objects
    newRefresh($scope.folder, cachedCurrentFile);
  };

  $scope.rebuildData = function () {
    cachedCurrentFile = formGetContent("#fileForm", $scope.currentFile());
    return cachedCurrentFile;
  };

  //----------------------
  //   Actions
  //----------------------
  $scope.errors = {};
  $scope.actionValidate = function (form = "#fileForm") {
    // TODO: jserror should have an icon before (danger)
    // TODO: hide action button if form is not ok
    $scope.valide = true;

    let updatedData = $scope.rebuildData();

    const myform = document.querySelector(form);

    myform.querySelectorAll("input[type=number][required]").forEach((e) => {
      if (e.value == "") {
        e.value = 0;
      }
    });

    if (!myform.checkValidity()) {
      document.querySelector("#fileFormSubmit").click();
      $scope.valide = false;
    }

    $scope.errors = updatedData.validate();

    if (Object.keys($scope.errors).length > 0) {
      $scope.valide = false;
    }

    $scope.safeApply();
    return $scope.valide;
  };
  $scope.$on("revalidate", () => $scope.actionValidate());

  $scope.actionCancel = function () {
    // By rerouting, the controller is initialized back
    $scope.folder = null;
    newRefresh();

    if ($scope.subid) {
      goThere(
        "/folder/" +
          $scope.patient_id +
          "/file/" +
          $scope.subtype +
          "/" +
          $scope.subid
      );
    } else {
      goThere("/folder/" + $scope.patient_id);
    }
  };

  $scope.actionSave = function () {
    $scope.rebuildData();

    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return;
    }

    $scope.safeApply();

    extractPrefsFile(cachedCurrentFile);

    getDataService()
      .then((dataService) =>
        dataService.saveFile(cachedCurrentFile, $scope.patient_id)
      )
      .then(function (data) {
        // The data is refreshed by navigating away...
        $scope.$emit("message", {
          level: "success",
          text: "The " + $scope.subtype + " has been saved."
        });
        goThere(
          "/folder/" +
            $scope.patient_id +
            "/file/" +
            $scope.subtype +
            "/" +
            $scope.subid
        );
        $scope.folder = data;
        newRefresh($scope.folder, cachedCurrentFile);
        $scope.safeApply();
      });
  };

  $scope.actionUnlock = function () {
    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);
    $scope.safeApply();

    getDataService()
      .then((dataService) => dataService.unlockFile($scope.currentFile()))
      .then(function (data) {
        $scope.$emit("message", {
          level: "success",
          text:
            "The " +
            $scope.subtype +
            " #" +
            $scope.subid +
            " has been unlocked."
        });
        // Let's refresh the data
        $scope.folder = data;
        newRefresh($scope.folder, cachedCurrentFile);

        goThere(
          "/folder/" +
            $scope.patient_id +
            "/file/" +
            $scope.subtype +
            "/" +
            $scope.subid +
            "/edit"
        );
        $scope.safeApply();
      });
  };

  $scope.actionCreate = function () {
    // Save transversal data for further use later...
    $scope.rebuildData();

    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return;
    }

    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);

    extractPrefsFile(cachedCurrentFile);

    getDataService()
      .then((dataService) => dataService.createFile(cachedCurrentFile))
      .then(function (folder) {
        $scope.$emit("message", {
          level: "success",
          text: "The " + cachedCurrentFile.getModel() + " has been created."
        });
        // The data is refreshed by navigating away...
        // Let's refresh the data
        $scope.folder = folder;
        newRefresh($scope.folder, cachedCurrentFile);

        goThere(
          "/folder/" +
            $scope.patient_id +
            "/file/" +
            $scope.subtype +
            "/" +
            folder.getHeader("newKey")
        );
        $scope.safeApply();
      });
  };

  $scope.actionDelete = function () {
    if (!confirm("Are you sure you want to delete this file?")) {
      return;
    }
    let file = $scope.currentFile();
    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);

    $scope.safeApply();

    getDataService()
      .then((dataService) => dataService.deleteFile(file))
      .then(function (data) {
        $scope.$emit("message", {
          level: "success",
          text:
            "The " +
            $scope.currentFile().getModel() +
            " of " +
            $scope.currentFile().date +
            " has been deleted"
        });

        // Let's refresh the data
        $scope.folder = data;
        newRefresh($scope.folder, cachedCurrentFile);

        goThere("/folder/" + $scope.patient_id);
        $scope.safeApply();
      });
  };

  $scope.actionCreatePatient = function () {
    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);

    $scope.safeApply();

    getDataService()
      .then((dataService) => dataService.createFile(updatedData))
      .then(function (folder) {
        $scope.$emit("message", {
          level: "success",
          text: "The patient has been created."
        });

        // Let's refresh the data
        $scope.folder = folder;
        newRefresh($scope.folder, cachedCurrentFile);

        goThere("/folder/" + folder.getId());
        $scope.safeApply();
      });
  };

  $scope.actionSavePatient = function () {
    if (!$scope.actionValidate()) {
      alert("You have errors in your data. Please correct them and try again");
      return;
    }

    let updatedData = formGetContent("#fileForm", $scope.currentFile());
    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);

    $scope.safeApply();

    getDataService()
      .then((dataService) =>
        dataService.saveFile(updatedData, $scope.patient_id)
      )
      .then(function (folder) {
        // The data is refreshed by navigating away...

        // Let's refresh the data
        $scope.folder = folder;
        newRefresh($scope.folder, cachedCurrentFile);

        $scope.$emit("message", {
          level: "success",
          text: "The patient has been saved."
        });
        goThere("/folder/" + folder.getId());
      });
  };

  $scope.actionDeletePatient = function () {
    if (!confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    let file = $scope.currentFile();
    $scope.folder = null;
    newRefresh($scope.folder, cachedCurrentFile);

    $scope.safeApply();

    getDataService()
      .then((dataService) => dataService.deleteFile(file))
      .then(function () {
        $scope.$emit("message", {
          level: "success",
          text:
            "The patient " +
            $scope.currentFile().entry_year +
            "-" +
            $scope.currentFile().entry_order +
            " has been deleted"
        });

        // Let's refresh the data
        $scope.folder = null;
        newRefresh($scope.folder, cachedCurrentFile);

        goThere();
        $scope.safeApply();
      });
  };

  /**
   *
   */
  function updateYearOfBirth() {
    if ($scope.folder) {
      var d = new Date();
      var d2 = new Date(
        d.getFullYear() - $scope.age.years,
        d.getMonth() - $scope.age.months,
        10
      );
      $scope.folder.getPatient().year_of_birth = date2CanonicString(
        d2
      ).substring(0, 7);
    }
  }

  $scope.$watch("age.years", function () {
    updateYearOfBirth();
  });

  $scope.$watch("age.months", function () {
    while ($scope.age.months >= 12) {
      $scope.age.months -= 12;
      $scope.age.years++;
    }
    while ($scope.age.months < 0) {
      $scope.age.months += 12;
      $scope.age.years--;
    }
    updateYearOfBirth();
  });
}

ctrl_folder.$inject = ["$scope", "$routeParams"];
