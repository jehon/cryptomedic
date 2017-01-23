<?php
  // Example: 90420 (2010)
  // Example: 10018 (2011)
  // Example: 91513 (2012)
  // Example: 97573 (2014 = price 2)
  // Hack: 10010

  use App\Bill;
  use App\References;

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
        . "ng-class='{ notModeRead: !currentFile().$name }'"
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
<div class='container-fluid'>
  <div class='row'>
    <div ng-if='errors.consultPhisioAndDoctor'>
      <div class='alert alert-danger' >Error: you could not bill "physio" and "doctor" together!</div>
    </div>
    <div ng-if='errors.homeVisitAndGiveAppointment'>
      <div class='alert alert-danger'>Error: you could not bill a "home visit" with "give appointment" together!</div>
    </div>
  </div>
  <div class='row'>
    <div class="col-md-6" ng-controller="ctrl_file_bill">
      <FieldSet>
        <legend>General data</legend>
        <table>
          <?php (new t("Bill.Date"))->tr()->p(); ?>
          <?php (new t("Bill.ExaminerName", [ "list" => References::$lists['examiner']]))->tr("Examiner")->p(); ?>
          <?php (new t("Bill.Center"))->tr("Center where consultation took place")->p(); ?>
        </table>
        <div class='debug_infos'>
          price_id <?php (new t("Bill.price_id"))->read()->p(); ?><br>
        </div>
      </FieldSet>
      <?php
        foreach(Bill::$categories as $cat) {
          ?>
            <FieldSet>
              <legend><?php echo $cat; ?> items</legend>
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
            </FieldSet>
          <?php
        }
      ?>
    </div>
    <div class="col-md-6">
      <?php require(__DIR__ . "/../helpers/patient-related.php");?>
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
          <?php (new t("Bill.total_paid"))->tr("Paid by the patient")->p(); ?>
        </table>
      </FieldSet>
    </div>
  </div>
</div>
<tr>
