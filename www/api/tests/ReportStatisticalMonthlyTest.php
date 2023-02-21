<?php

require_once("RouteReferenceTestCase.php");

class ReportStatisticalMonthlyTest extends RouteReferenceTestCase {
  static public $month = "2014-05";

  public function setUp(): void {
    parent::setUp();
    $this->opt = $this->getNewRequestOptionsBuilder()
      ->setUrl("reports/statistical")
      ->setParams(['period' => self::MONTHLY, 'month' => self::$month])
      ->withReference();
  }

  public function testsConsultation() {
    $opt = $this->opt->clone();

    $json = $this->myRunAssertQueryForRoles($opt);

    $this->assertArrayHasKey('params', $json);
    $this->assertArrayHasKey('list', $json);

    // TODO: assert values
  }

  public function testsConsultationByDateAndCenter() {
    $opt = $this->opt->clone()
      ->addParam("center", "Chakaria Disability Center");

    $json = $this->myRunAssertQueryForRoles($opt);

    $this->assertArrayHasKey('params', $json);
    $this->assertArrayHasKey('list', $json);

    // TODO: assert values
  }
}
