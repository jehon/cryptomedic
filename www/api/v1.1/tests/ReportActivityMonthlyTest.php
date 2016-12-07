<?php

require_once("RouteReferenceTestCase.php");
require_once("ReportActivityDailyTest.php");

class ReportActivityMonthlyTest extends ReportActivityDailyTest {

	public function setUp($url = null, $params = array()) {
		parent::setUp();
    $this->opt->addParam('period', self::MONTHLY);
    // $this->baseParams['period'] = self::MONTHLY;
    $this->type = 1;
	}
}
