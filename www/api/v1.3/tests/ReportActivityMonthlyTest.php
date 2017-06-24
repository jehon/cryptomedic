<?php

require_once("RouteReferenceTestCase.php");
require_once("ReportActivityDailyTest.php");

class ReportActivityMonthlyTest extends ReportActivityDailyTest {
	public function setUp() {
		parent::setUp();
    	$this->opt->addParam('period', self::MONTHLY);
    	$this->type = 1;
	}
}
