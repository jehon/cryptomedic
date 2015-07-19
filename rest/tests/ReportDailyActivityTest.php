<?php

require_once("RouteReferenceTestCase.php");

class ReportDailyActivityTest extends RouteReferenceTestCase {
	protected $dateParam;

	protected function thisAssertResponse($json) {
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertObjectHasAttribute('totals', $json);
		$this->assertTrue(count($json->list) > 2);
	}
	
	public function setUp($url = null, $params = array()) {
		parent::setUp("reports/dailyActivity");
	}
	
	public function testByDate() {
		$this->setParams(array( 'day' => '2014-10-01', 'month' => '2014-10', 'center' => 'Chakaria', 'examiner' => ''));
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
		
		$json = $this->myAssertJSON("admin");
		$this->thisAssertResponse($json);
	}
	
 	public function testsConsultationByCenter() {
		$this->setParams(array( 'day' => '2014-10-01', 'month' => '2014-10', 'center' => 'Chakaria', 'examiner' => ''));
 		$this->myAssertResponseForReference("manager");
		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json);
		foreach($json->list as $k => $v) {
			$this->assertEquals("Chakaria", $v->Center);
		}
 	}

 	public function testsConsultationByExaminer() {
 		$this->setParams(array( 'day' => '2014-10-01', 'month' => '2014-10', 'center' => '', 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
  		}
 	}
 	
 	public function testsConsultationByCenterAndExaminer() {
 		$this->setParams(array( 'day' => '2014-10-01', 'month' => '2014-10', 'center' => "Chakaria", 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
 		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
			$this->assertEquals("Chakaria", $v->Center);
 		}
 	}
}
