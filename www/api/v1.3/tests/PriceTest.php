<?php

require_once("RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PriceTest extends RouteReferenceTestCase {
	// Make Unit Tests are transactionals !
	use DatabaseTransactions;

	protected $model = "Price";
	protected $collection = "admin/prices";


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


	public function testIndex() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	         	->setUrl("admin/prices")
	        	->setRole("manager")
	        	->withReference()
	      	);

		$this->assertEquals(count($json), 3);

		foreach($json as $j) {
			$this->assertEquals($j->_editable, false);
		}
		return $json;
	}

	public function testCreateInvalid() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => "2000-01-01" ])
	        	->setExpected(400)
	        	->asText()
	      	);

		$limit = date('Y-m-d', mktime(0, 0, 0, date('m'), date('d') + 4, date('Y')));
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => $limit ])
	        	->setExpected(400)
	        	->asText()
	      	);
	    $this->testIndex();
	}

	public function testInvalidDelete() {
	    // Delete some data
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . 1)
	        	->setMethod("DELETE")
	        	->setExpected(403)
	        	->asText()
	      	);
	    $this->testIndex();
	}

	public function testUpdateInvalid() {
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . 1)
	        	->setMethod("PUT")
	        	->addParams([])
	        	->setExpected(403)
	        	->asText()
	      	);
	    $this->testIndex();
	}
	
	public function testCreate() {
	    // Really update it
		$limit = date('Y-m-d', mktime(0, 0, 0, date('m'), date('d') + 10, date('Y')));
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager", "jehon")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => $limit ])
	      	);

	    $this->assertTrue(property_exists($json, 'id'));
	    $this->assertEquals($json->datefrom, $limit);
	    $this->assertTrue(!property_exists($json, 'dateto'));
	    $this->assertEquals($json->consult_field_visit, -1);
	    $this->assertEquals($json->consult_home_visit, 150);
	    $this->assertEquals($json->_editable, true);

	    // Update some data

	    $json->consult_home_visit = 250;
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . $json->id)
	        	->setMethod("PUT")
	        	->addParams((array) $json)
	      	);

	    $this->assertTrue(property_exists($json, 'id'));
	    $this->assertEquals($json->datefrom, $limit);
	    $this->assertEquals($json->dateto, null);
	    $this->assertEquals($json->consult_field_visit, -1);
	    $this->assertEquals($json->consult_home_visit, 250);
	    $this->assertEquals($json->_editable, true);

	    // Delete some data
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . $json->id)
	        	->setMethod("DELETE")
	      	);

	    $this->testIndex();
	}
}
