<?php

require_once("RouteReferenceTestCase.php");

class ReportActivityDailyTest extends RouteReferenceTestCase {
	static public $nday = "2014-05-20";
	static public $nmonth = "2014-05";

	public function setUp($url = null, $params = array()) {
		parent::setUp($url, $params);
		$this->opt = $this->getNewRequestOptionsBuilder()
			->setUrl("reports/activity")
			->setParams([ 'period' => self::DAILY, 'day' => self::$nday, 'month' => self::$nmonth ])
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

		$json = $this->myRunAssertQuery($opt
			->asUnauthenticated()
			->setExpected(401)
			->asText()
		);
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

		$json = $this->myRunAssertQuery($opt
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

		$json = $this->myRunAssertQuery($opt
			->asUnauthenticated()
			->setExpected(401)
			->asText()
		);
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

		$json = $this->myRunAssertQuery($opt
			->asUnauthenticated()
			->setExpected(401)
			->asText()
		);
 	}
}
