<div class='container-fluid' ng-controller="ctrl_file_bill">
  <div class='row'>
    <div error='consultPhisioAndDoctor'>
      <div class='alert alert-danger' >Error: you could not bill "physio" and "doctor" together!</div>
    </div>
    <div error='homeVisitAndGiveAppointment'>
      <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
    </div>
    <div error='noDate'>
      <div class='alert alert-danger'>Error: please select a date first!</div>
    </div>
    <div error='dateInTheFuture'>
      <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    </div>
  </div>
  <div class='row'>
    <div class="col-md-6">
      <FieldSet>
        <legend>General data</legend>
        <table>
          <tr>
            <td>Date</td>
            <td><x-inline editable-bill name='Date' type='date'></x-inline></td>
          </tr>
          <tr>
            <td>Examiner</td>
            <td><x-inline editable-bill name='ExaminerName' type='list' list-name='Examiner'></x-inline></td>
          </tr>
          <tr>
            <td>Center where consultation took place</td>
            <td><x-inline editable-bill name='Center' type='list' list-name='Centers'></x-inline></td>
          </tr>
        </table>
        <div class='debug_infos'>
          price_id <span function='getPriceId'></span><br>
        </div>
      </FieldSet>
      <block-bill-category editable-bill category='consult'></block-bill-category>
      <block-bill-category editable-bill category='medecine'></block-bill-category>
      <block-bill-category editable-bill category='other'></block-bill-category>
      <block-bill-category editable-bill category='workshop'></block-bill-category>
      <block-bill-category editable-bill category='surgical'></block-bill-category>
    </div>
    <div class="col-md-6">
      <?php require(__DIR__ . "/../helpers/patient-related.html");?>
      <fieldset>
        <legend>Social Data</legend>
        <table>
          <tr>
            <td>Family Salary in a Month</td>
            <td><x-inline editable-bill name='sl_familySalary' type='numeric'></x-inline></td>
          </tr>
          <tr>
            <td>Number of Houslehold Members</td>
            <td><x-inline editable-bill name='sl_numberOfHouseholdMembers' type='numeric'></x-inline></td>
          </tr>
          <tr>
            <td>Salary ratio</td>
            <td><span function='getRatioSalary'></span></td>
          </tr>
          <tr>
            <td>Calculated Social Level</td>
            <td><span function='getCalculatedSocialLevel'></span></td>
          </tr>
        </table>
      </fieldset>
      <fieldSet>
        <legend>Summary</legend>
        <table>
          <tr>
            <td>Raw Calculated total</td>
            <td><span function='calculateTotalReal'></span></td>
          </tr>
          <tr>
            <td>Social Level</td>
            <td><x-inline editable-bill name='Sociallevel' type='list' list-name='SocialLevel'></x-inline></td>
          </tr>
          <tr>
            <td>Percentage of price to be asked</td>
            <td>
              <span function='getPercentageAskedAsString'></span>
            </td>
          </tr>
          <tr>
            <td>Price to be asked to the patient</td>
            <td><span function='calculateTotalAsked'></span></td>
          </tr>
        </table>
      </FieldSet>
      <fieldset ng-if='!currentFile().id'>
        <legend>Recieved payment</legend>
          <tr>
            <td>Payment already recieved</td>
            <td><x-write type='numeric' name='first_payment'></td>
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
