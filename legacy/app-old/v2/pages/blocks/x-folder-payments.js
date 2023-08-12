import { createElementWithTag } from "../../js/custom-element.js";
import XFolderFile from "./x-folder-file.js";

export default class XFolderPayments extends XFolderFile {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(createElementWithTag("slot"));
  }

  // $scope.paymentEditor = new Payment();

  // $scope.paymentsList = function () {
  //     if ($scope.folder) {
  //         return $scope.folder.getFilesRelatedToBill($scope.subid);
  //     }
  //     return [];
  // };

  // $scope.getPaymentTotal = function () {
  //     if (!$scope.folder) {
  //         return '?';
  //     }
  //     return $scope.folder.getFilesRelatedToBill($scope.subid).reduce((acc, file) => {
  //         return acc + (file.amount ? parseInt(file.amount, 10) : 0);
  //     }, 0);
  // };

  // $scope.actionAddPayment = function () {
  //     if (!$scope.actionValidate('#paymentForm')) {
  //         alert('You have errors in your data. Please correct them and try again');
  //         return;
  //     }

  //     let updatedData = formGetContent('#paymentForm', new Payment());

  //     updatedData.id = $scope.paymentEditor.id;
  //     updatedData.bill_id = $scope.subid;
  //     $scope.safeApply();

  //     extractPrefsFile(updatedData);

  //     getDataService()
  //         .then(dataService => dataService.createOrSaveFile(updatedData))
  //         .then(function (folder) {
  //             // The data is refreshed by navigating away...
  //             $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been saved.' });
  //             $scope.folder = folder;
  //             $scope.paymentEditor = new Payment();
  //             $scope.safeApply();
  //         });
  // };

  // $scope.actionDeletePayment = function (id) {
  //     getDataService()
  //         .then(dataService => dataService.deleteFile($scope.folder.getByTypeAndId(Payment, id)))
  //         .then(function (folder) {
  //             // The data is refreshed by navigating away...
  //             $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been deleted.' });
  //             $scope.folder = folder;
  //             $scope.paymentEditor = new Payment();
  //             $scope.safeApply();
  //         });
  // };

  // $scope.actionEditPayment = function (id) {
  //     $scope.paymentEditor = new Payment($scope.folder.getByTypeAndId(Payment, id));
  // };
}

customElements.define("x-folder-payments", XFolderPayments);
