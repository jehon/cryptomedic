/* istanbul ignore file */
/* eslint-disable */

import Payment from "../v2/models/Payment.js";
import { formGetContent } from "../v2/js/form.js";
import { extractPrefsFile } from "../v2/js/prefs.js";
import getDataService from "../v2/js/getDataService.js";
import { getSession, onSession } from "../v2/js/session.js";
import XFffSalaryRatio from "../v2/widgets/file/x-fff-salary-ratio.js";

import XFolderBill from "../v2/pages/blocks/x-folder-bill.js";

/**
 * @param $scope
 * @param $element
 */
export default function ctrl_file_bill($scope, $element) {
  /*
      Prices are at
          getSession().prices
    */

  /**
   * @returns {XFolderBill|Object}
   */
  const getXFolderBill = function () {
    // We return {} in case we are not installed in the "bill_fiche"
    //   => feature switch :-)

    return (
      /** @type {XFolderBill} */ (document.querySelector("x-folder-bill")) ?? {}
    );
  };
  getXFolderBill().currentFile = $scope.currentFile();

  const getPrices = function () {
    const definitions = getSession();
    if (definitions == false) {
      return false;
    }
    return definitions.prices;
  };

  onSession(() => {
    if ($scope.currentFile()) {
      $scope.currentFile().calculatePriceId(getPrices());
      try {
        $scope.currentFile().ratioSalary();
      } catch (e) {}
    }
    $scope.safeApply();
    getXFolderBill().allPrices = getPrices();
  });

  const dateElement = $element[0].querySelector("[name=date]");
  dateElement.addEventListener("blur", () => {
    $scope.currentFile().date = dateElement.value;
    if ($scope.currentFile() && $scope.currentFile().calculatePriceId) {
      $scope.currentFile().calculatePriceId(getPrices());
    }
    $scope.safeApply();
  });
  if ($scope.currentFile()) {
    $scope.currentFile().calculatePriceId(getPrices());
  }
  document
    .querySelectorAll("x-fff-salary-ratio")
    .forEach((/** @type {XFffSalaryRatio} */ el) => el.refresh());

  $scope.$watch("currentFile().sl_number_of_household_members", function () {
    try {
      $scope.currentFile().ratioSalary();
      document
        .querySelectorAll("x-fff-salary-ratio")
        .forEach((/** @type {XFffSalaryRatio} */ el) => el.refresh());
    } catch (e) {}
  });

  $scope.$watch("currentFile().sl_family_salary", function () {
    try {
      $scope.currentFile().ratioSalary();
      document
        .querySelectorAll("x-fff-salary-ratio")
        .forEach((/** @type {XFffSalaryRatio} */ el) => el.refresh());
    } catch (e) {}
  });

  $scope.$watch("currentFile().social_level_calculated()", function (newValue) {
    if ($scope.mode != "read") {
      $scope.currentFile().social_level = $scope
        .currentFile()
        .social_level_calculated();
    }
  });

  // Used in bill_summary
  $scope.isEmpty = function (value) {
    if (
      value == "" ||
      value == "0" ||
      value == 0 ||
      value == "-1" ||
      value == -1 ||
      value == null
    ) {
      return "empty-value";
    }
    return "";
  };

  if ($scope.mode != "read") {
    $scope.currentFile().social_level = $scope
      .currentFile()
      .social_level_calculated();
  }

  /**********************/
  /* Payment management */
  /**********************/

  $scope.paymentEditor = new Payment();

  $scope.paymentsList = function () {
    if ($scope.folder) {
      return $scope.folder.getFilesRelatedToBill($scope.subid);
    }
    return [];
  };

  $scope.getPaymentTotal = function () {
    if (!$scope.folder) {
      return "?";
    }
    return $scope.folder
      .getFilesRelatedToBill($scope.subid)
      .reduce((acc, file) => {
        return acc + (file.amount ? parseInt(file.amount, 10) : 0);
      }, 0);
  };

  $scope.actionAddPayment = function () {
    if (!$scope.actionValidate("#paymentForm")) {
      alert("You have errors in your data. Please correct them and try again");
      return;
    }

    let updatedData = formGetContent("#paymentForm", new Payment());

    updatedData.id = $scope.paymentEditor.id;
    updatedData.bill_id = $scope.subid;
    $scope.safeApply();

    extractPrefsFile(updatedData);

    getDataService()
      .then((dataService) => dataService.createOrSaveFile(updatedData))
      .then(function (folder) {
        // The data is refreshed by navigating away...
        $scope.$emit("message", {
          level: "success",
          text: "The Payment has been saved."
        });
        $scope.folder = folder;
        $scope.paymentEditor = new Payment();
        $scope.safeApply();
      });
  };

  $scope.actionDeletePayment = function (id) {
    getDataService()
      .then((dataService) =>
        dataService.deleteFile($scope.folder.getByTypeAndId(Payment, id))
      )
      .then(function (folder) {
        // The data is refreshed by navigating away...
        $scope.$emit("message", {
          level: "success",
          text: "The Payment has been deleted."
        });
        $scope.folder = folder;
        $scope.paymentEditor = new Payment();
        $scope.safeApply();
      });
  };

  $scope.actionEditPayment = function (id) {
    $scope.paymentEditor = new Payment(
      $scope.folder.getByTypeAndId(Payment, id)
    );
  };
}

ctrl_file_bill.$inject = ["$scope", "$element"];
