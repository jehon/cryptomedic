<?php

require_once("RouteReferenceTestCase.php");

class ReportSurgicalTest extends RouteReferenceTestCase {
	static public $month = "2014-01";
	static public $year = "2014";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/surgical")
			->setParams(['period' => self::MONTHLY, 'month' => self::$month])
			->withReference();
	}

	public function testsByDay() {
		$opt = $this->opt->clone();

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);

		$this->assertEquals(2, count($json['list']));
		foreach ($json['list'] as $k => $v) {
			if ($v['date'] > "") {
				// Otherwise, we have a surgical consultation
				$this->assertEquals(substr($v['date'], 0, 7), self::$month);
			}
		}
	}

	public function testsByDayAndCenter() {
		$opt = $this->opt->clone()
			->addParam("center", "Ukhia");

		$json = $this->myRunAssertQueryForRoles($opt);

		$this->assertEquals(2, count($json['list']));
		foreach ($json['list'] as $k => $v) {
			if ($v['date'] > "") {
				// Otherwise, we have a surgical consultation
				$this->assertEquals(substr($v['date'], 0, 7), self::$month);
				$this->assertEquals($v['center'], "Ukhia");
			}
		}
	}
}
