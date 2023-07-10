<?php

require_once("RouteReferenceTestCase.php");

class ReportCashRegisterTest extends RouteReferenceTestCase {
	static public $year = "2014";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/cash-register")
			->setParams(['period' => self::YEARLY, 'year' => self::$year])
			->withReference();
	}

	public function testsByYear() {
		$opt = $this->opt->clone();

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);

		$this->assertEquals(2, count($json['list']));
		foreach ($json['list'] as $k => $v) {
			$this->assertEquals($v['year'], self::$year);
		}
	}
}
