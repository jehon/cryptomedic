<?php

require_once("RouteReferenceTestCase.php");

class ReportFinanicialTest extends RouteReferenceTestCase {
	static public $year = "2014";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/activity")
			->setParams(['period' => self::YEARLY, 'year' => self::$year])
			->withReference();

		$this->type = 0;
	}

	public function testYear() {
		$opt = $this->opt->clone();

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);
		$this->assertArrayHasKey('totals', $json);
		$this->assertTrue(count($json['list']) >= 0);
	}
}
