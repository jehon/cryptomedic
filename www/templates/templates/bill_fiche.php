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

    echo <<<EOD
<x-fff-field label='$label'
    ng-if="currentFile().getPriceFor('$name') > 0"
    ng-class='{ "not-mode-read": !currentFile()["$name"] }'
  >
  <div ng-if="currentFile().getPriceFor('$name')<=1">1x</div>
  <div>
EOD;
    (new t($item, ["inline" => "style='width: 4em' step=1 min=0"]))->value()->p();
    echo <<<EOD
  </div>
  <div ng-if="currentFile().getPriceFor('$name')>1"><div pricefor='$item'>{{currentFile().getPriceFor('$name')}}</div></div>
  <div>{{currentFile().getTotalFor('$name')}}</div>
</x-fff-field>
EOD;
    // var_dump(t::isWriteMode());
    // <x-label label='$label'>
    //   <x-io-bill name='$name' value='{{currentFile()["$name"]}}' t='currentFile()["$name"]' <?php echo t::isWriteMode() ? 'input' : ''; ? > ></x-io-bill>
    // </x-label>

  }
}
?>
<div ng-controller="ctrl_file_bill">
  <x-folder-bill>
    <div ng-if='errors.consultPhisioAndDoctor'>
      <div class='alert alert-danger'>Error: you could not bill "physio" and "doctor" together!</div>
    </div>
    <div ng-if='errors.homeVisitAndGiveAppointment'>
      <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
    </div>
    <div ng-if='errors.dateInTheFuture'>
      <div class='alert alert-danger' id='errorDateFuture'>Error: The date can not be in the future!</div>
    </div>
    <x-two-columns>
      <div>
        <x-group-panel title='General data'>
          <?php (new t("Bill.date"))->tr2()->p(); ?>
          <?php (new t("Bill.examiner"))->tr2("Examiner")->p(); ?>
          <?php (new t("Bill.center"))->tr2("Center where consultation took place")->p(); ?>
          <div class='debug-infos'>
            price_id <?php (new t("Bill.price_id"))->read()->p(); ?>
          </div>
        </x-group-panel>
        <x-message ng-if='!currentFile().price' level='error' role="alert" id="errorNoDate">Please select a date first!</x-message>
        <div ng-if='currentFile().price'>
          <?php
          foreach (Bill::$categories as $cat) {
          ?>
            <x-group-panel title='<?php echo $cat; ?> items'>
              <x-fff-field label=''>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
              </x-fff-field>
              <?php foreach (Bill::getFieldsList($cat) as $field) {
                price("Bill." . $field);
              }
              ?>
            </x-group-panel>
          <?php
          }
          ?>
        </div>
      </div>
      <div>
        <x-ff-patient-related></x-ff-patient-related>
        <x-ff-next-appointment></x-ff-next-appointment>
        <x-group-panel title='Social Data'>
          <?php (new t("Bill.sl_family_salary"))->tr2("Family Salary in a Month")->p(); ?>
          <?php (new t("Bill.sl_number_of_household_members"))->tr2("Number of Houslehold Members")->p(); ?>
          <x-fff-field label='Salary Ratio'>
            <x-fff-salary-ratio></x-fff-salary-ratio>
          </x-fff-field>
          <x-fff-field label='Calculated Social Level'>
            <div id='social_level_calculated'>{{currentFile().social_level_calculated()}}</div>
          </x--fff-field>
        </x-group-panel>
        <x-group-panel title='Summary'>
          <x-fff-field label='Raw Calculated total'>
            <div id='total_calculated_raw'>{{currentFile().calculate_total_real()}}<?php new t("Bill.total_real"); ?></div>
          </x-fff-field>
          <?php (new t("Bill.social_level"))->readOnly()->tr2("Social Level")->p(); ?>
          <x-fff-field label='Percentage of price to be asked'>
            <div id='percentage'>{{currentFile().calculate_percentage_asked() * 100 | number:0}}%</div>
          </x-fff-field>
          <x-fff-field label='Price to be asked to the patient'>
            <div id='total_calculated_asked'>{{currentFile().total_asked | number:0 }}<?php (new t("Bill.total_asked")); ?></div>
          </x-fff-field>
        </x-group-panel>
        <x-group-panel title='Received payment' ng-if='!currentFile().id'>
          <x-label label='Payment already received'>
            <input type='number' id='first_payment' ng-model='currentFile().first_payment'>
          </x-label>
          <!--
        <x-fff-field label='Payment already recieved' ng-if='!currentFile().id'>
          <div id='first_payment'>
            <input type='number' id='first_payment' ng-model='currentFile().first_payment'>
          </div>
        </x-fff-field> -->
        </x-group-panel>
      </div>
    </x-two-columns>
  </x-folder-bill>
  <br />
  <?php
  t::setDefaultOption("baseExpression", "paymentEditor.");
  t::setDefaultOption('writeOnly');
  ?>
  <div class='not-mode-write'>
    <h3>Related payments</h3>
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
</div><!-- end of controller -->