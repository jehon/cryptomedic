<?php

require_once("RouteReferenceTestCase.php");

class ReportConsultationsTest extends RouteReferenceTestCase {
	public function setUp($url = null, $params = array()) {
		parent::setUp();
		$this->setUrl("reports/consultations");
	}
	
	public function testsConsultation() {
		$this->setParams([ "day" => "2015-04-26", "center" => "" ]);
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
		
		$json = $this->myAssertJSON("admin");
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertTrue(count($json->list) >= 1);
	}
	
	public function testsConsultationByDay() {
		$this->setParams([ "day" => "2015-04-26", "center" => "" ]);
		$this->myAssertUnauthorized();
		
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertLessThanOrEqual(100, count($json));
		foreach($json->list as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, "2015-04-26");
		}
	}

	public function testsConsultationByDayAndCenter() {
		$this->setParams([ "day" => "2015-04-26", "center" => "Chakaria" ]);
		$this->myAssertUnauthorized();
	
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	
		$json = $this->myAssertJSON("admin");
		$this->assertLessThanOrEqual(100, count($json));
		foreach($json->list as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, "2015-04-26");
			$this->assertEquals($v->c_Center, "Chakaria");
		}
	}
}
