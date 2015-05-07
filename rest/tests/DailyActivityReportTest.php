<?php

require_once("RouteReferenceTestCase.php");

class DailyActivityReportTest extends RouteReferenceTestCase {
	protected $dateParam;
	
	protected function thisAssertResponse($json) {
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertObjectHasAttribute('totals', $json);
		$this->assertTrue(count($json->list) > 2);
	}
	
	public function setUp() {
		parent::setUp("reports/dailyActivity");
	}
	
	public function testByDate() {
		$this->setParams(array( 'date' => '2014-10-01', 'month' => '2014-10' ));
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");
		
		$json = $this->myAssertJSON("admin");
		$this->thisAssertResponse($json);
	}
	
 	public function testsConsultationByCenter() {
		$this->setParams(array( 'date' => '2014-10-01', 'month' => '2014-10', 'center' => 'Chakaria'));
 		$this->myAssertResponseForReference("manager");
		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json);
		foreach($json->list as $k => $v) {
			$this->assertEquals("Chakaria", $v->Center);
		}
 	}

 	public function testsConsultationByExaminer() {
 		$this->setParams(array( 'date' => '2014-10-01', 'month' => '2014-10', 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
 		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
  		}
 	}
 	
 	public function testsConsultationByCenterAndExaminer() {
 		$this->setParams(array( 'date' => '2014-10-01', 'month' => '2014-10', 'center' => "Chakaria", 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
 		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
			$this->assertEquals("Chakaria", $v->Center);
 		}
 	}
}
