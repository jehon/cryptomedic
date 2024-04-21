<?php

require_once(__DIR__ . "/RouteReferenceTestCase.php");

class PatientControllerTest extends RouteReferenceTestCase {

	public function testsUnauthenticated() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          	->setUrl("patients/1")
        	->asUnauthenticated()
          	->setExpected(401)
          	->asText()
      );
	}

	public function test1() {
		$opt = $this->getNewRequestOptionsBuilder()
			->withReference()
			->setUrl("patients/1");
		$json = $this->myRunAssertQueryForRoles($opt);
		$this->assertEquals(1, $json['id']);
	}

  	public function test6() {
	    $opt = $this->getNewRequestOptionsBuilder()
    	  	->withReference()
	      	->setUrl("patients/6");
    	$json = $this->myRunAssertQueryForRoles($opt);
    	$this->assertEquals(6, $json['id']);
  	}
}
