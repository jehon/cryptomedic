<?php

require_once("RouteReferenceTestCase.php");

class MonthlyActivityReportTest extends DailyActivityReportTest {

	public function setUp() {
		parent::setUp();
		$this->setUrl("reports/monthlyActivity");
	}
}
