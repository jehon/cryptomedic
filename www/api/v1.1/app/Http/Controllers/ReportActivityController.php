<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Bill;
use App\References;

class ReportActivityController extends ReportController {
  public function buildData() {
    $list1 = $this->runSqlWithNamedParameter("SELECT *, NOT(" . $this->getParamAsSqlFilter('when', 'Date') . ") as complementary FROM (
      SELECT
        bills.id as bid,
        patients.id as pid,
        bills.Date as Date,
        bills.ExaminerName as ExaminerName,
        bills.Center as Center,
        CONCAT(patients.entryyear, '-', patients.entryorder) as patient_reference,
        patients.Name as patient_name,
        patients.yearofbirth,
        patients.Sex,
        bills.sl_familySalary,
        bills.sl_numberOfHouseholdMembers,
        bills.Sociallevel,
        patients.Pathology,
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
      ) AS t
      WHERE (1 = 1)
        AND ((" . $this->getParamAsSqlFilter("when", "Date") . ") OR (total_paid > 0))
        AND " . $this->getParamAsSqlFilter("center", "Center") . "
        AND " . $this->getParamAsSqlFilter("examiner", "ExaminerName") . "
        AND " . Bill::getActivityFilter($this->getParam("activity", "")) . "
      ORDER BY complementary ASC, Date ASC, bid ASC "
    );

    $this->result['list'] = $list1;
    // $this->getParamAsSqlReset();

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
        $e->price_consult   = 0;
        $e->price_medecine  = 0;
        $e->price_workshop  = 0;
        $e->price_surgical  = 0;
        $e->price_other     = 0;
        $e->total_real      = 0;
        $e->total_asked     = 0;
      }
    }

    $this->result['totals'] = array();
    foreach($this->result['list'] as $e) {
      foreach($e as $k => $v) {
        if (!array_key_exists($k, $this->result['totals'])) {
          $this->result['totals'][$k] = 0;
        }
        $this->result['totals'][$k] += $v;
      }
    }
  }
}
