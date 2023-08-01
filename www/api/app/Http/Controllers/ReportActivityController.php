<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\Bill;

class ReportActivityController extends ReportController {
  public function buildData() {
    $list1 = $this->runSqlWithNamedParameter("
      SELECT *, 
        NOT(" . $this->getParamAsSqlFilter('when', 'date') . ") as complementary FROM (
        SELECT
          bills.id as bid,
          patients.id as pid,
          bills.date as date,
          bills.examiner as examiner,
          bills.center as center,
          CONCAT(patients.entry_year, '-', patients.entry_order) as patient_reference,
          patients.name as patient_name,
          patients.year_of_birth,
          patients.sex,
          bills.sl_family_salary,
          bills.sl_number_of_household_members,
          bills.social_level,
          patients.pathology,
          " . Bill::getSQLAct() . " as act,
          " . Bill::getSQLTreatment() . " as treatment,
          " . Bill::getSQLFieldsSum(Bill::CAT_CONSULT) . " AS price_consult,
                " . Bill::getSQLFieldsSum(Bill::CAT_MEDECINE) . " AS price_medecine,
          " . Bill::getSQLFieldsSum(Bill::CAT_WORKSHOP) . " AS price_workshop,
                " . Bill::getSQLFieldsSum(Bill::CAT_SURGICAL) . " AS price_surgical,
                " . Bill::getSQLFieldsSum(Bill::CAT_OTHER) . " AS price_other,
                bills.total_real as total_real,
                bills.total_asked as total_asked,
                (select sum(amount) from payments where bill_id = bills.id and " . $this->getParamAsSqlFilter("when", "payments.date") . " ) as total_paid,
          exists(select * from bills as b2 where b2.patient_id = bills.patient_id and b2.date < bills.date) as oldPatient
        FROM bills
            JOIN patients ON bills.patient_id = patients.id
            JOIN prices ON bills.price_id = prices.id
        WHERE (1 = 1)
          AND " . $this->getParamAsSqlFilter("center", "center") . "
          AND " . $this->getParamAsSqlFilter("examiner", "examiner") . "
          AND " . Bill::getActivityFilter($this->getParam("activity", "")) . "
      ) AS t
      WHERE (1 = 1)
        AND ((" . $this->getParamAsSqlFilter("when", "date") . ") OR (total_paid > 0))
      ORDER BY complementary ASC, date ASC, bid ASC "
    );

    $this->result['list'] = $list1;
    // $list2 = $this->runSqlWithNamedParameter("SELECT
    //   payments.examiner as examiner,
    //   bills.center as center,
    //   SUM(payments.amount) as total_paid
    //   FROM
    //     payments
    //     JOIN bills ON bills.id = payments.bill_id
    //   WHERE " . $this->getParamAsSqlFilter("when", "payments.date") . "
    //     AND NOT(" . $this->getParamAsSqlFilter("when", "bills.date") . ")
    //     AND " . $this->getParamAsSqlFilter("center", "bills.center") . "
    //     AND " . $this->getParamAsSqlFilter("examiner", "payments.examiner") . "
    //     AND " . Bill::getActivityFilter($this->getParam("activity", "")) . "
    //     GROUP BY payments.examiner, bills.center
    //   ORDER BY examiner ASC, bills.center ASC "
    // );

    // $this->result['list'] = array_merge($list1, $list2);

    // If we are a complementary payment, remove all details
    foreach($this->result['list'] as $e) {
      if ($e->complementary) {
        unset($e->price_consult);
        unset($e->price_medecine);
        unset($e->price_workshop);
        unset($e->price_surgical);
        unset($e->price_other);
        unset($e->total_real);
        unset($e->total_asked);
      }
    }
  }
}
