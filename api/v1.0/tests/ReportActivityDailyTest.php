<?php

require_once("RouteReferenceTestCase.php");

class ReportActivityDailyTest extends RouteReferenceTestCase {
	static public $nday = "2014-05-20";
	static public $nmonth = "2014-05";

	protected $dateParam;
	protected $type = 0;

	protected function thisAssertResponse($json, $nbr) {
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertObjectHasAttribute('totals', $json);
		$this->assertTrue(count($json->list) >= 1);
		$this->assertEquals($nbr[$this->type], count($json->list));
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
		$this->thisAssertResponse($json, [ 3, 5 ]);
	}

 	public function testsConsultationByCenter() {
		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => 'Chakaria Disability Center', 'examiner' => ''));
 		$this->myAssertResponseForReference("manager");
		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json, [ 2, 3 ]);
		foreach($json->list as $k => $v) {
			$this->assertEquals("Chakaria Disability Center", $v->Center);
		}
	}

 	public function testsConsultationByExaminer() {
 		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => '', 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
		$this->thisAssertResponse($json, [ 2, 3 ]);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
 		}
 	}

 	public function testsConsultationByCenterAndExaminer() {
 		$this->setParams(array( 'day' => self::$nday, 'month' => self::$nmonth, 'center' => "Chakaria Disability Center", 'examiner' => 'Ershad'));
 		$this->myAssertResponseForReference("manager");
 		$json = $this->myAssertJSON("manager");
 		$this->thisAssertResponse($json, [ 1, 2 ]);
 		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
			$this->assertEquals("Chakaria Disability Center", $v->Center);
 		}
 	}
}
