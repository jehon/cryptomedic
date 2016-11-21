<?php

require_once("RouteReferenceTestCase.php");

class ReportSurgicalTest extends RouteReferenceTestCase {
	static public $month = "2014-01";
	static public $year = "2014";

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/surgical", [ "period" => self::MONTHLY, "month" => self::$month ]);
	}

	public function testsAuthorizations() {
		$this->setParams([ "center" => "" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertEquals(1, count($json->list));
	}

	public function testsByDay() {
		$this->setParams([ "center" => "" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertEquals(1, count($json->list));
		foreach($json->list as $k => $v) {
			$this->assertEquals(substr($v->Date, 0, 7), self::$month);
		}
	}

	public function testsByDayAndCenter() {
		$this->setParams([ "center" => "Ukhia" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertEquals(1, count($json->list));
		foreach($json->list as $k => $v) {
			$this->assertEquals(substr($v->Date, 0, 7), self::$month);
			$this->assertEquals($v->Center, "Ukhia");
		}
	}

	// public function testsByYear() {
	// 	$this->setParams([ "year" => self::$year, "center" => "" ]);
	// 	$this->myAssertUnauthorized();

	// 	$this->myAssertResponseForReference("readonly");
	// 	$this->myAssertResponseForReference("cdc");
	// 	$this->myAssertResponseForReference("manager");
	// 	$this->myAssertResponseForReference("admin");

	// 	$json = $this->myAssertJSON("admin");
	// 	$this->assertEquals(1, count($json->list));
	// 	foreach($json->list as $k => $v) {
	// 		$this->assertEquals(substr($v->Date, 0, 7), self::$month);
	// 	}
	// }
}
