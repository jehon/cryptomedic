<?php

require_once("RouteReferenceTestCase.php");

class ReportTest extends RouteReferenceTestCase {

	public function testsConsultation() {
		$this->setUrl("reports/consultations");
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
		
		$json = $this->myAssertJSON("admin");
		$this->assertEquals(100, count($json));
	}
	
	public function testsConsultationByDay() {
		$this->setUrl("reports/consultations?day=2015-04-26");
		$this->myAssertUnauthorized();
		
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->assertLessThanOrEqual(100, count($json));
		foreach($json as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, "2015-04-26");
		}
	}

	public function testsConsultationByCenter() {
		$this->setUrl("reports/consultations?center=Chakaria");
		$this->myAssertUnauthorized();
	
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	
		$json = $this->myAssertJSON("admin");
		$this->assertLessThanOrEqual(100, count($json));
		foreach($json as $k => $v) {
			$this->assertEquals($v->c_Center, "Chakaria");
		}
	}

	public function testsConsultationByDayAndCenter() {
		$this->setUrl("reports/consultations?day=2015-04-26&center=Chakaria");
		$this->myAssertUnauthorized();
	
		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
	
		$json = $this->myAssertJSON("admin");
		$this->assertLessThanOrEqual(100, count($json));
		foreach($json as $k => $v) {
			$this->assertEquals($v->c_nextAppointment, "2015-04-26");
			$this->assertEquals($v->c_Center, "Chakaria");
		}
	}
}
