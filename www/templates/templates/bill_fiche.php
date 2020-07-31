<?php
  // Example: 90420 (2010)
  // Example: 10018 (2011)
  // Example: 91513 (2012)
  // Example: 97573 (2014 = price 2)
  // Hack: 10010

  use App\Model\Bill;

  t::setDefaultOption("baseExpression", "currentFile().");

  if (!function_exists("App\price")) {
    function price($item) {
      $name = explode(".", $item);
      $name = $name[1];
      $label = str_replace("_", " ", substr($item, strpos($item, '_') + 1));
      if (array_key_exists($item, Bill::$translations)) {
        $label = Bill::$translations[$item];
      }

      echo "<tr "
        . "ng-if=\"currentFile().getPriceFor('$name') > 0\" "
        . "ng-class='{ notModeRead: !currentFile()[\"$name\"] }'"
        . ">";
      echo "<td>$label</td>";
      echo "<td ng-if=\"currentFile().getPriceFor('$name')<=1\">1x</td>";
      echo "<td>";
        (new t($item, [ "inline" => "style='width: 4em' step=1 min=0" ]))->value()->p();
      echo "</td>";
      echo "<td ng-if=\"currentFile().getPriceFor('$name')>1\"><div pricefor='$item'>{{currentFile().getPriceFor('$name')}}</div></td>";
      echo "<td>{{currentFile().getTotalFor('$name')}}</td>";
      echo "</tr>";
    }
  }
?>
<div class='container-fluid' ng-controller="ctrl_file_bill">
  <div class='row'>
    <div ng-if='errors.consultPhisioAndDoctor'>
      <div class='alert alert-danger' >Error: you could not bill "physio" and "doctor" together!</div>
    </div>
    <div ng-if='errors.homeVisitAndGiveAppointment'>
      <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
    </div>
    <div ng-if='errors.dateInTheFuture'>
      <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    </div>
  </div>
  <div class='row'>
    <div class="col-md-6">
      <x-group-panel title='General data'>
        <table>
          <?php (new t("Bill.Date"))->tr()->p(); ?>
          <?php (new t("Bill.ExaminerName"))->tr("Examiner")->p(); ?>
          <?php (new t("Bill.Center"))->tr("Center where consultation took place")->p(); ?>
        </table>
        <div class='debug_infos'>
          price_id <?php (new t("Bill.price_id"))->read()->p(); ?><br>
        </div>
      </x-group-panel>
      <div ng-if='!currentFile().price'>
        <div class='alert alert-info' role="alert" id="errorNoDate">
          Please select a date first!
        </div>
      </div>
      <div ng-if='currentFile().price'>
        <?php
          foreach(Bill::$categories as $cat) {
            ?>
              <x-group-panel title='<?php echo $cat; ?> items'>
                <table  class='prices'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <?php foreach(Bill::getFieldsList($cat, t::getColumnsOfTable('bills')) as $field) {
                      price("Bill." . $field);
                    }
                  ?>
                </table>
              </x-group-panel>
            <?php
          }
        ?>
      </div>
    </div>
    <div class="col-md-6">
      <x-ff-patient-related></x-ff-patient-related>
			<x-ff-next-appointment></x-ff-next-appointment>
      <x-group-panel title='Social Data'>
        <table>
          <?php (new t("Bill.sl_familySalary"))->tr("Family Salary in a Month")->p(); ?>
          <?php (new t("Bill.sl_numberOfHouseholdMembers"))->tr("Number of Houslehold Members")->p(); ?>
          <tr>
            <td>Salary ratio</td>
            <td><x-fff-salary-ratio></x-fff-salary-ratio></td>
          </tr>
          <?php (new t("Bill.Sociallevel"))->id("calculated_social_level")->readOnly()->tr("Calculated Social Level")->p(); ?>
        </table>
      </x-group-panel>
      <x-group-panel title='Summary'>
        <table>
          <tr>
            <td>Raw Calculated total</td>
            <td id='total_calculated_raw'>{{currentFile().calculate_total_real()}}<?php new t("Bill.total_real"); ?></td>
          </tr>
          <?php (new t("Bill.Sociallevel"))->readOnly()->tr("Social Level")->p(); ?>
                <tr>
            <td>Percentage of price to be asked</td>
            <td id='percentage'>{{currentFile().calculate_percentage_asked() * 100 | number:0}}%</td>
          </tr>
          <tr>
            <td>Price to be asked to the patient</td>
            <td id='total_calculated_asked'>{{currentFile().total_asked | number:0 }}<?php (new t("Bill.total_asked")); ?></td>
          </tr>
        </table>
      </x-group-panel>
      <x-group-panel title='Recieved payment' ng-if='!currentFile().id'>
          <tr>
            <td>Payment already recieved</td>
            <td id='first_payment'>
              <input type='number' id='first_payment' ng-model='currentFile().first_payment'>
            </td>
          </tr>
      </x-group-panel>
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
    <x-group-panel  id='paymentForm' title='Add / modify a payment'>
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
    </x-group-panel>
  </div>
</div>
<tr>
