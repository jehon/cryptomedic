<?php

require_once("RouteReferenceTestCase.php");

class ReportSurgicalSuggestedTest extends RouteReferenceTestCase {
	static public $year = "2014";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/surgical-suggested")
			->setParams(['period' => self::YEARLY, 'year' => self::$year])
			->withReference();
	}

	public function testsByDayAndCenter() {
		$opt = $this->opt->clone();

		$json = $this->myRunAssertQueryForRoles($opt);

		$this->assertEquals(1, count($json['list']));
		foreach ($json['list'] as $k => $v) {
			$this->assertEquals(substr($v['suggested_from'], 0, 4), self::$year);
		}
	}
}
