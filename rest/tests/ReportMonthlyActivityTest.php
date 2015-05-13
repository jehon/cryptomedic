<?php

require_once("RouteReferenceTestCase.php");

class ReportMonthlyActivityTest extends ReportDailyTest {

	public function setUp() {
		parent::setUp();
		$this->setUrl("reports/monthlyActivity");
	}
}
