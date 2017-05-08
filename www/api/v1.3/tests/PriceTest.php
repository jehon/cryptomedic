<?php

require_once("RouteReferenceTestCase.php");

class PriceTest extends RouteReferenceTestCase {
	public function testsUnauthenticated() {
	    $response = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("admin/prices")
	        	->asUnauthenticated()
	         	->setExpected(401)
	         	->asText()
	      );
	}

	public function testsReadonly() {
	    $response = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("admin/prices")
	        	->asReadOnly()
	         	->setExpected(401)
	         	->asText()
	      );
	}


	public function testsIndex() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("admin/prices")
	        	->setRole("manager")
	        	->withReference()
	      	);

		$this->assertEquals(count($json), 3);
	}
}
