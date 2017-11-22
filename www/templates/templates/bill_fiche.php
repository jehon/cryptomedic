<div class='container-fluid' ng-controller="ctrl_file_bill">
  <div class='row'>
    <div ng-if='errors.consultPhisioAndDoctor'>
      <div class='alert alert-danger' >Error: you could not bill "physio" and "doctor" together!</div>
    </div>
    <div ng-if='errors.homeVisitAndGiveAppointment'>
      <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
    </div>
    <div ng-if='!currentFile().Date'>
      <div class='alert alert-danger'>Error: please select a date first!</div>
    </div>
    <div ng-if='errors.dateInTheFuture'>
      <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    </div>
  </div>
  <div class='row'>
    <div class="col-md-6">
      <FieldSet>
        <legend>General data</legend>
        <table>
          <tr ng-class='{ emptyValue: !currentFile().Date}'>
            <td>Date</td>
            <td><x-inline edit='{{getModeEdit()}}' id='Bill_Date' name='Date' type='date' value='{{ currentFile().Date }}'></x-inline></td>
          </tr>
                <tr ng-class='{ emptyValue: !currentFile().ExaminerName}'>
            <td>Examiner</td>
            <td><x-inline edit='{{getModeEdit()}}' id='Bill_ExaminerName' name='ExaminerName' type='list' value='{{ currentFile().ExaminerName }}' list-name='Examiner'></x-inline></td>
          </tr>
                <tr ng-class='{ emptyValue: !currentFile().Center}'>
            <td>Center where consultation took place</td>
            <td><x-inline edit='{{getModeEdit()}}' id='Bill_Center' name='Center' type='list' value='{{ currentFile().Center }}' list-name='Centers'></x-inline></td>
          </tr>
        </table>
        <div class='debug_infos'>
          price_id <x-inline id='Bill_price_id' name='price_id' type='numeric' value='{{ currentFile().price_id }}'></x-inline><br>
        </div>
      </FieldSet>
      <block-bill-category edit='{{getModeEdit()}}' category='consult' value='{{currentFile().bill_lines}}' price-lines='{{currentFile().getPriceLines()}}'>
      </block-bill-category>
      <block-bill-category edit='{{getModeEdit()}}' category='medecine' value='{{currentFile().bill_lines}}' price-lines='{{currentFile().getPriceLines()}}'>
      </block-bill-category>
      <block-bill-category edit='{{getModeEdit()}}' category='other' value='{{currentFile().bill_lines}}' price-lines='{{currentFile().getPriceLines()}}'>
      </block-bill-category>
      <block-bill-category edit='{{getModeEdit()}}' category='workshop' value='{{currentFile().bill_lines}}' price-lines='{{currentFile().getPriceLines()}}'>
      </block-bill-category>
      <block-bill-category edit='{{getModeEdit()}}' category='surgical' value='{{currentFile().bill_lines}}' price-lines='{{currentFile().getPriceLines()}}'>
      </block-bill-category>
    </div>
    <div class="col-md-6">
      <?php require(__DIR__ . "/../helpers/patient-related.html");?>
      <fieldset>
        <legend>Social Data</legend>
        <table>
          <?php (new t("Bill.sl_familySalary"))->tr("Family Salary in a Month")->p(); ?>
          <?php (new t("Bill.sl_numberOfHouseholdMembers"))->tr("Number of Houslehold Members")->p(); ?>
          <tr>
            <td>Salary ratio</td>
            <td><span id='salary_ratio' catch-it ng-model="folder" tryit="currentFile().ratioSalary()">{{ currentFile().ratioSalary() | number:0 }}</span></td>
          </tr>
          <?php (new t("Bill.Sociallevel"))->id("calculated_social_level")->readOnly()->tr("Calculated Social Level")->p(); ?>
        </table>
      </fieldset>
      <fieldSet>
        <legend>Summary</legend>
        <table>
          <tr>
            <td>Raw Calculated total</td>
            <td id='total_calculated_raw'>{{currentFile().calculate_total_real()}}<?php new t("Bill.total_real"); ?></td>
          </tr>
          <?php (new t("Bill.Sociallevel"))->readOnly()->tr("Social Level")->p(); ?>
                <tr>
            <td>Percentage of price to be asked</td>
            <td id='percentage'>
              <numeral-js number="{{currentFile().calculate_percentage_asked()}}" format="0%" print></numeral-js>
            </td>
          </tr>
          <tr>
            <td>Price to be asked to the patient</td>
            <td id='total_calculated_asked'>{{currentFile().total_asked | number:0 }}<?php (new t("Bill.total_asked")); ?></td>
          </tr>
        </table>
      </FieldSet>
      <fieldset ng-if='!currentFile().id'>
        <legend>Recieved payment</legend>
          <tr>
            <td>Payment already recieved</td>
            <td id='first_payment'>
              <input type='number' id='first_payment' ng-model='currentFile().first_payment'>
            </td>
          </tr>
      </fieldset>
    </div>
  </div>
  <br>
  <?php
    t::setDefaultOption("baseExpression", "paymentEditor.");
    t::setDefaultOption('writeOnly');
  ?>
  <div class='row notModeWrite'>
    <h3>Related payments</h3>
    <table class='table table-hover table-bordered tablesorter' ng-if='paymentsList().length > 0' id='paymentsList'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="p in paymentsList()">
          <td>{{p.Date}}</td>
          <td>{{p.ExaminerName}}</td>
          <td>{{p.Amount}}</td>
          <td>{{p.Notes}}</td>
          <td>
            <span id='button_edit_{{$index}}'   class="btn btn-default" ng-click="actionEditPayment(p.id)">Edit</span>
            <span id='button_delete_{{$index}}' class="btn btn-danger"  ng-click="actionDeletePayment(p.id)">Delete</span>
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
    <fieldset  id='paymentForm'>
      <legend ng-if='paymentEditor.id == null'>Add a payment</legend>
      <legend ng-if='paymentEditor.id > 0'>Modify a payment</legend>
      <form>
        <table>
          <?php (new t("Payment.Date"))->tr("Date of receipt")->p(); ?>
          <?php (new t("Payment.ExaminerName"))->tr("Receiver")->p(); ?>
          <?php (new t("Payment.Amount"))->tr("Amount")->p(); ?>
          <?php (new t("Payment.Notes"))->tr("Notes")->p(); ?>
        </table>
      </form>
      <span id='button_payment_create' class="btn btn-default" ng-click="actionAddPayment()" ng-if='paymentEditor.id == null'>
        Create
      </span>
      <span id='button_payment_save'   class="btn btn-default" ng-click="actionAddPayment()" ng-if='paymentEditor.id > 0'>
        Save
      </span>
    </fieldset>
  </div>
</div>
<tr>
