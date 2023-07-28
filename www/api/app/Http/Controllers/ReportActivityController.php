<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Model\Bill;

class ReportActivityController extends ReportController {
  public function buildData() {
    $list1 = $this->runSqlWithNamedParameter("
      SELECT *, 
        NOT(" . $this->getParamAsSqlFilter('when', 'Date') . ") as complementary FROM (
        SELECT
          bills.id as bid,
          patients.id as pid,
          bills.Date as Date,
          bills.ExaminerName as ExaminerName,
          bills.Center as Center,
          CONCAT(patients.entry_year, '-', patients.entry_order) as patient_reference,
          patients.name as patient_name,
          patients.year_of_birth,
          patients.sex,
          bills.sl_familySalary,
          bills.sl_numberOfHouseholdMembers,
          bills.Sociallevel,
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
                (select sum(amount) from payments where bill_id = bills.id and " . $this->getParamAsSqlFilter("when", "payments.Date") . " ) as total_paid,
          exists(select * from bills as b2 where b2.patient_id = bills.patient_id and b2.Date < bills.Date) as oldPatient
        FROM bills
            JOIN patients ON bills.patient_id = patients.id
            JOIN prices ON bills.price_id = prices.id
        WHERE (1 = 1)
          AND " . $this->getParamAsSqlFilter("center", "Center") . "
          AND " . $this->getParamAsSqlFilter("examiner", "ExaminerName") . "
          AND " . Bill::getActivityFilter($this->getParam("activity", "")) . "
      ) AS t
      WHERE (1 = 1)
        AND ((" . $this->getParamAsSqlFilter("when", "Date") . ") OR (total_paid > 0))
      ORDER BY complementary ASC, Date ASC, bid ASC "
    );

    $this->result['list'] = $list1;
    // $list2 = $this->runSqlWithNamedParameter("SELECT
    //   payments.ExaminerName as ExaminerName,
    //   bills.Center as Center,
    //   SUM(payments.amount) as total_paid
    //   FROM
    //     payments
    //     JOIN bills ON bills.id = payments.bill_id
    //   WHERE " . $this->getParamAsSqlFilter("when", "payments.Date") . "
    //     AND NOT(" . $this->getParamAsSqlFilter("when", "bills.Date") . ")
    //     AND " . $this->getParamAsSqlFilter("center", "bills.Center") . "
    //     AND " . $this->getParamAsSqlFilter("examiner", "payments.ExaminerName") . "
    //     AND " . Bill::getActivityFilter($this->getParam("activity", "")) . "
    //     GROUP BY payments.ExaminerName, bills.Center
    //   ORDER BY ExaminerName ASC, bills.Center ASC "
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
