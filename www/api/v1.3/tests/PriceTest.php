<?php

require_once("RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PriceTest extends RouteReferenceTestCase {
	// Make Unit Tests are transactionals !
	// use DatabaseTransactions;

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
		return $json;
	}

	public function testCreate() {
		$list = $this->testIndex();

	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => "2000-01-01" ])
	        	->setExpected(400)
	        	->asText()
	        	// ->withReference()
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
	        	// ->withReference()
	      	);

		$limit = date('Y-m-d', mktime(0, 0, 0, date('m'), date('d') + 10, date('Y')));
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => $limit ])
	      	);

	    $this->assertTrue(property_exists($json, 'id'));
	    $this->assertEquals($json->datefrom, $limit);
	    $this->assertTrue(!property_exists($json, 'dateto'));
	    $this->assertEquals($json->consult_field_visit, -1);
	    $this->assertEquals($json->consult_home_visit, 150);
	    // $this->assertEquals($json->_editable, true);
	}
}
