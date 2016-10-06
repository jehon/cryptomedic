<?php

require_once("RouteReferenceTestCase.php");
require_once("ReportActivityDailyTest.php");

class ReportActivityMonthlyTest extends ReportActivityDailyTest {

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/activity/month");
    $this->timingParam = [ 'month' => self::$nmonth ];
    $this->type = self::$MONTHLY;
	}
}
