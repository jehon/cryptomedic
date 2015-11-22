<?php

require_once("RouteReferenceTestCase.php");

class ReportStatisticalMonthlyTest extends RouteReferenceTestCase {
  static public $nmonth = "2014-05";

  public function setUp($url = null, $params = array()) {
    parent::setUp();
    $this->setUrl("reports/statistical/month");
  }

  public function testsConsultation() {
    $this->setParams([ "month" => self::$nmonth, "center" => "" ]);
    $this->myAssertUnauthorized();

    $this->myAssertResponseForReference("readonly");
    $this->myAssertResponseForReference("cdc");
    $this->myAssertResponseForReference("manager");
    $this->myAssertResponseForReference("admin");

    $json = $this->myAssertJSON("admin");
    $this->assertObjectHasAttribute('params', $json);
    $this->assertObjectHasAttribute('summary', $json);

    // TODO: assert values
  }

  public function testsConsultationByDate() {
    $this->setParams([ "month" => self::$nmonth, "center" => "" ]);
    $this->myAssertUnauthorized();

    $this->myAssertResponseForReference("readonly");
    $this->myAssertResponseForReference("cdc");
    $this->myAssertResponseForReference("manager");
    $this->myAssertResponseForReference("admin");

    $json = $this->myAssertJSON("admin");
    $this->assertObjectHasAttribute('params', $json);
    $this->assertObjectHasAttribute('summary', $json);

    // TODO: assert values
  }

  public function testsConsultationByDateAndCenter() {
    $this->setParams([ "month" => self::$nmonth, "center" => "Chakaria" ]);
    $this->myAssertUnauthorized();

    $this->myAssertResponseForReference("readonly");
    $this->myAssertResponseForReference("cdc");
    $this->myAssertResponseForReference("manager");
    $this->myAssertResponseForReference("admin");

    $json = $this->myAssertJSON("admin");
    $this->assertObjectHasAttribute('params', $json);
    $this->assertObjectHasAttribute('summary', $json);

    // TODO: assert values
  }
}
