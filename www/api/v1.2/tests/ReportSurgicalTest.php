<?php

require_once("RouteReferenceTestCase.php");

class ReportSurgicalTest extends RouteReferenceTestCase {
	static public $month = "2014-01";
	static public $year = "2014";

	public function setUp() {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/surgical")
			->setParams([ 'period' => self::MONTHLY, 'month' => self::$month ])
			->setReference()
			;
	}

	public function testsByDay() {
		$opt = $this->opt->clone()
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertEquals(1, count($json->list));

		$this->assertEquals(1, count($json->list));
		foreach($json->list as $k => $v) {
			$this->assertEquals(substr($v->Date, 0, 7), self::$month);
		}
	}

	public function testsByDayAndCenter() {
		$opt = $this->opt->clone()
			->addParam("center", "Ukhia")
			;

		$json = $this->myRunAssertQueryForRoles($opt);

		$this->assertEquals(1, count($json->list));
		foreach($json->list as $k => $v) {
			$this->assertEquals(substr($v->Date, 0, 7), self::$month);
			$this->assertEquals($v->Center, "Ukhia");
		}
	}
}
