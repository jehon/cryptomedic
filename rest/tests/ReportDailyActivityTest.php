<?php

require_once("RouteReferenceTestCase.php");

class ReportDailyActivityTest extends RouteReferenceTestCase {
	static public $nday = "2014-05-20";
	static public $nmonth = "2014-05";

	protected $dateParam;

	protected function thisAssertResponse($json) {
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertObjectHasAttribute('totals', $json);
		$this->assertTrue(count($json->list) >= 1);
	}

	public function setUp($url = null, $params = array()) {
		parent::setUp("reports/dailyActivity");
	}

	public function testByDate() {
		$this->setParams(array('day' => self::$nday, 'month' => self::$nmonth, 'center' => '', 'examiner' => ''));
		$this->myAssertUnauthorized();

		$this->myAssertResponseForReference("readonly");
		$this->myAssertResponseForReference("cdc");
		$this->myAssertResponseForReference("manager");
		$this->myAssertResponseForReference("admin");

		$json = $this->myAssertJSON("admin");
		$this->thisAssertResponse($json);
		$this->assertEquals(count($json->list), 3);
	}

 	public function testsConsultationByCenter() {
		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => 'Chakaria', 'examiner' => ''));
 		$this->myAssertResponseForReference("manager");
		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json);
		foreach($json->list as $k => $v) {
			$this->assertEquals("Chakaria", $v->Center);
		}
 		$this->assertEquals(count($json->list), 2);
	}

 	public function testsConsultationByExaminer() {
 		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => '', 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
  		}
 		$this->assertEquals(count($json->list), 2);
 	}

 	public function testsConsultationByCenterAndExaminer() {
 		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => "Chakaria", 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
 		$this->thisAssertResponse($json);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
			$this->assertEquals("Chakaria", $v->Center);
 		}
	 	$this->assertEquals(count($json->list), 1);
 	}
}
