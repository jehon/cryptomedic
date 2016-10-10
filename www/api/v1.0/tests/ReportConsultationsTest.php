<?php

require_once("RouteReferenceTestCase.php");

class ReportConsultationsTest extends RouteReferenceTestCase {
	static public $nday = "2015-04-28";

	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/consultations", [ "period" => self::DAILY, "day" => self::$nday ]);
	}

	public function test() {
		$this->setParams([ "center" => "" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertEquals(count($json->list), 3);
	}

	public function testByDay() {
		$this->setParams([ "center" => "" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertEquals(count($json->list), 3);
		foreach($json->list as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, self::$nday);
		}
	}

	public function testByDayAndCenter() {
		$this->setParams([ "center" => "Chakaria Disability Center" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertEquals(count($json->list), 1);
		foreach($json->list as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, self::$nday);
			$this->assertEquals($v->c_Center, "Chakaria Disability Center");
		}
	}
}
