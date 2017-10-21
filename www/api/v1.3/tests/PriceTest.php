<?php

require_once("RouteReferenceTestCase.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Flow\JSONPath\JSONPath;

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

		foreach($json as $j) {
			$this->assertEquals($j['_editable'], false);
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

	    $this->assertArrayHasKey('id', $json);
	    $this->assertEquals($json['datefrom'], $limit);

	    $this->assertEquals($json['dateto'], null);
	    $this->assertEquals($json['_editable'], true);

        // https://packagist.org/packages/flow/jsonpath
	    $this->assertEquals(0, count((new JSONPath($json))->find('$.price_lines.[?(@.title=\'consult_field_visit\')]')->data()));
	    $this->assertEquals(1, count((new JSONPath($json))->find('$.price_lines')->data()));

	    $this->assertEquals(3, count((new JSONPath($json))->find('$.price_lines.[?(@.Amount=150)]')->data()));

	    $hvisit = (new JSONPath($json))->find('$.price_lines.[?(@.title=\'consult_home_visit\')]')->data()[0];
	    $this->assertEquals(150, $hvisit['Amount']);
	    // $this->assertEquals(1, count((new JSONPath($json))->find('$.price_lines.[?(@.title=\'consult_home_visit\')][?(@.Amount=150)]')->data()));

	    // Creating a second one would fail
	    $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager", "jehon")
	         	->setUrl("admin/prices")
	        	->setMethod("POST")
	        	->addParams([ "pivot" => $limit ])
	        	->asText()
	        	->setExpected(403)
	      	);

	    // Update some data
	    foreach($json['price_lines'] as $i => $v) {
	    	if ($v['title'] == 'consult_home_visit') {
	    		$json['price_lines'][$i]['Amount'] = 250;
	    	}
	    	if ($v['title'] == 'workshop_wheel_chair_china') {
	    		unset($json['price_lines'][$i]['id']);
	    		$json['price_lines'][$i]['title'] = 'workshop_wheel_chair_china_new';
	    	}
	    }

	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . $json['id'])
	        	->setMethod("PUT")
	        	->addParams((array) $json)
	      	);

	    $this->assertArrayHasKey('id', $json);
	    $this->assertEquals($json['datefrom'], $limit);
	    $this->assertEquals($json['dateto'], null);

	    $hvisit = (new JSONPath($json))->find('$.price_lines.[?(@.title=\'consult_home_visit\')]')->data()[0];
	    $this->assertEquals(250, $hvisit['Amount']);

	    $this->assertEquals(0, count((new JSONPath($json))->find('$.price_lines.[?(@.title=\'workshop_wheel_chair_china\')]')->data()));

	    $this->assertEquals(1, count((new JSONPath($json))->find('$.price_lines.[?(@.title=\'workshop_wheel_chair_china_new\')]')->data()));
	    $this->assertEquals(6600, $wnew['Amount']);

	    $this->assertEquals($json['_editable'], true);

	    // Delete some data
	    $json = $this->myRunAssertQuery(
	        $this->getNewRequestOptionsBuilder()
	        	->setRole("manager")
	         	->setUrl("admin/prices/" . $json['id'])
	        	->setMethod("DELETE")
	      	);

	    // Check that we are back to normal
	    $this->testIndex();
	}
}
