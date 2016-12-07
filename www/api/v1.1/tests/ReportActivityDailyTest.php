<?php

require_once("RouteReferenceTestCase.php");

class ReportActivityDailyTest extends RouteReferenceTestCase {
	static public $day = "2014-05-20";
	static public $month = "2014-05";

	public function setUp() {
		parent::setUp();
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/activity")
			->setParams([ 'period' => self::DAILY, 'day' => self::$day, 'month' => self::$month ])
			->setReference()
			;

		$this->type = 0;
	}

	protected function thisAssertResponse($json, $nbr) {
		$this->assertObjectHasAttribute('params', $json);
		$this->assertObjectHasAttribute('list', $json);
		$this->assertObjectHasAttribute('totals', $json);
		$this->assertTrue(count($json->list) >= 1);
		$this->assertEquals($nbr[$this->type], count($json->list));
	}

	public function testByDate() {
		$opt = $this->opt->clone()
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->thisAssertResponse($json, [ 2, 5 ]);
	}

 	public function testByCenter() {
		$opt = $this->opt->clone()
			->addParam('center', 'Chakaria Disability Center')
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		foreach($json->list as $k => $v) {
			$this->assertEquals("Chakaria Disability Center", $v->Center);
		}
		$this->thisAssertResponse($json, [ 1, 3 ]);

		$this->myRunAssertQuery($opt
			->asUnauthenticated()
			->setExpected(401)
			->asText()
		);
	}

 	public function testByExaminer() {
		$opt = $this->opt->clone()
			->addParam('examiner', 'Ershad')
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
		}
		$this->thisAssertResponse($json, [ 2, 3 ]);

 	}

 	public function testByCenterAndExaminer() {
		$opt = $this->opt->clone()
			->addParam('examiner', 'Ershad')
			->addParam('center', 'Chakaria Disability Center')
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		foreach($json->list as $k => $v) {
 			$this->assertEquals("Ershad", $v->ExaminerName);
			$this->assertEquals("Chakaria Disability Center", $v->Center);
		}
		$this->thisAssertResponse($json, [ 1, 2 ]);
 	}
}
