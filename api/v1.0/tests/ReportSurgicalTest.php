<?php

require_once("RouteReferenceTestCase.php");

class ReportSurgicalTest extends RouteReferenceTestCase {
	static public $month = "2014-01";

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/surgical/month");
	}

	public function testsAuthorizations() {
		$this->setParams([ "month" => self::$month, "center" => "" ]);
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
		$this->setParams([ "month" => self::$month, "center" => "" ]);
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
		$this->setParams([ "month" => self::$month, "center" => "Ukhia" ]);
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
}
