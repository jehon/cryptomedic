<?php

require_once("RouteReferenceTestCase.php");

class ReportActivityMonthlyTest extends ReportActivityDailyTest {

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/monthlyActivity");
    $this->type = self::$MONTHLY;
	}
}
