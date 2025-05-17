<?php
// Example: 90420 (2010)
// Example: 10018 (2011)
// Example: 91513 (2012)
// Example: 97573 (2014 = price 2)
// Hack: 10010

t::setDefaultOption("baseExpression", "paymentEditor.");
t::setDefaultOption("writeOnly");
?>
<div ng-controller="ctrl_file_bill">
  <div class='not-mode-write'>
    <h3>Related payments</h3>
    <x-button action='Reset' id='back' ng-click="actionBack()">Go back to bill</x-button>
    <table class='table table-hover table-bordered tablesorter' ng-if='paymentsList().length > 0' id='paymentsList'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Comments</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="p in paymentsList()">
          <td>{{p.date}}</td>
          <td>{{p.examiner}}</td>
          <td>{{p.amount}}</td>
          <td>{{p.comments}}</td>
          <td>
            <x-button action='Edit' id='button_edit_{{$index}}' ng-click="actionEditPayment(p.id)">Edit</x-button>
            <x-button action='Delete' id='button_delete_{{$index}}' ng-click="actionDeletePayment(p.id)">Delete</x-button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th>Total</th>
          <th>{{getPaymentTotal()}}</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
    <x-group-panel id='paymentForm' title='Add / modify a payment' form-boundary>
      <?php (new t("Payment.date"))->tr2("Date of receipt")->p(); ?>
      <?php (new t("Payment.examiner"))->tr2("Receiver")->p(); ?>
      <?php (new t("Payment.amount"))->tr2("Amount")->p(); ?>
      <?php (new t("Payment.comments"))->tr2("Comments")->p(); ?>
      <x-button id='button_payment_create' ng-click="actionAddPayment()" ng-if='paymentEditor.id == null'>Create</x-button>
      <x-button action='Save' id='button_payment_save' ng-click="actionAddPayment()" ng-if='paymentEditor.id > 0'>Save</x-button>
    </x-group-panel>
  </div>
  <x-button action='Reset' id='back' ng-click="actionBack()">Go back to bill</x-button>
  </div>
