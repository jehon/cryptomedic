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
			->withReference()
			;

		$this->type = 0;
	}

	protected function thisAssertResponse($json, $nbr) {
		$this->assertArrayHasKey('params', $json);
		$this->assertArrayHasKey('list', $json);
		$this->assertArrayHasKey('totals', $json);
		$this->assertTrue(count($json['list']) >= 1);
		$this->assertEquals($nbr[$this->type], count($json['list']));
	}

	public function testByDate() {
		$opt = $this->opt->clone()
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		$this->thisAssertResponse($json, [ 4, 7 ]);
	}

 	public function testByCenter() {
		$opt = $this->opt->clone()
			->addParam('center', 'Chakaria Disability Center')
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		foreach($json['list'] as $k => $v) {
			$this->assertEquals("Chakaria Disability Center", $v['Center']);
		}
		$this->thisAssertResponse($json, [ 3, 5 ]);

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
		foreach($json['list'] as $k => $v) {
 			$this->assertEquals("Ershad", $v['ExaminerName']);
		}
		$this->thisAssertResponse($json, [ 4, 5 ]);

 	}

 	public function testByCenterAndExaminer() {
		$opt = $this->opt->clone()
			->addParam('examiner', 'Ershad')
			->addParam('center', 'Chakaria Disability Center')
			;

		$json = $this->myRunAssertQueryForRoles($opt);
		foreach($json['list'] as $k => $v) {
 			$this->assertEquals("Ershad", $v['ExaminerName']);
			$this->assertEquals("Chakaria Disability Center", $v['Center']);
		}
		$this->thisAssertResponse($json, [ 3, 4 ]);
 	}
}
