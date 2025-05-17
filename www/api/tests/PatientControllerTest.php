<?php

require_once(__DIR__ . "/RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PatientControllerTest extends RouteReferenceTestCase {
	// Make Unit Tests are transactionals !
	use DatabaseTransactions;

	public function testsUnauthenticated() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          	->setUrl("patient/1")
        		->asUnauthenticated()
          	->setExpected(401)
          	->asText()
      );
	}

	public function test1() {
		$opt = $this->getNewRequestOptionsBuilder()
			->withReference()
			->setUrl("patient/1");
		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertEquals(1, $json['id']);
	}

	public function test6() {
		$opt = $this->getNewRequestOptionsBuilder()
				->withReference()
				->setUrl("patient/6");
		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertEquals(6, $json['id']);
	}

	public function testCreateRef() {
		$json = $this->myRunAssertQuery($this->getNewRequestOptionsBuilder()
			->withReference([ "id", "newKey", "entry_order"])
			->setRole("cdc")
			->setUrl("fiche/patient")
			->setMethod("POST")
			->setParams([
				"entry_year" => 2025
		]));
		$this->assertEquals(2025, $json["folder"][0]["record"]["entry_year"]);
		$this->assertGreaterThanOrEqual(1000, $json["folder"][0]["record"]["entry_order"]);
	}

	public function testCreateRefWithEntryNumber() {
		$json = $this->myRunAssertQuery($this->getNewRequestOptionsBuilder()
			->withReference([ "id", "newKey"])
			->setRole("cdc")
			->setUrl("fiche/patient")
			->setMethod("POST")
			->setParams([
				"entry_year" => 2025,
				"entry_order" => 500
		]));
		$this->assertEquals(2025, $json["folder"][0]["record"]["entry_year"]);
		$this->assertEquals(500, $json["folder"][0]["record"]["entry_order"]);
	}
}
