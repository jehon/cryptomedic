<?php

require_once("RouteReferenceTestCase.php");

class ReportConsultationsTest extends RouteReferenceTestCase {
	static public $day = "2015-04-28";

	public function setUp(): void {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/consultations")
			->setParams(['period' => self::DAILY, 'day' => self::$day])
			->withReference();
	}

	public function testByDay() {
		$opt = $this->opt->clone();
		$json = $this->myRunAssertQueryForRoles($opt);

		$this->assertEquals(count($json['list']), 3);
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);
		$this->assertEquals(count($json['list']), 3);
		foreach ($json['list'] as $k => $v) {
			$this->assertEquals($v['c_date'], self::$day);
		}
	}

	public function testByDayAndCenter() {
		$opt = $this->opt->clone()
			->addParam("center", "Chakaria Disability Center");

		$json = $this->myRunAssertQueryForRoles($opt);

		$this->assertEquals(count($json['list']), 1);
		foreach ($json['list'] as $k => $v) {
			$this->assertEquals($v['c_date'], self::$day);
			$this->assertEquals($v['c_center'], "Chakaria Disability Center");
		}
	}
}
