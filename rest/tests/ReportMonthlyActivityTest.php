<?php

require_once("RouteReferenceTestCase.php");

class ReportMonthlyActivityTest extends ReportDailyActivityTest {

	public function setUp() {
		parent::setUp();
		$this->setUrl("reports/monthlyActivity");
	}
}
