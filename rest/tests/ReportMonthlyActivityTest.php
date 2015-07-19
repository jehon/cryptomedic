<?php

require_once("RouteReferenceTestCase.php");

class ReportMonthlyActivityTest extends ReportDailyActivityTest {

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/monthlyActivity");
	}
}
