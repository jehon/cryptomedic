<?php

require_once("RouteReferenceTestCase.php");

class BillTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("payment/1");
		$this->preAuthenticate("cdc");
	}

	public function getFolder1() {
		$this->setUrl("folder/1");
		$this->assertResponseOk("cdc");
	}

	public function findInArray($json, $type, $id) {
		$found = false;
		foreach($json->subFiles as $i => $v) {
			if (($v->_type == 'Bill')
					&& ($v->id == $id)) {
				return $i;
			}
		}
		return false;
	}

	public function testCreateBillWithoutPatientId() {
		// Bill#1 is on folder#1

		$response = $this->call('POST', self::absoluteUrl("fiche/bills/"), [
		]);
		$this->assertResponseStatus(400);
	}

	public function testCreateBill() {
		// Bill#1 is on folder#1

		// Create it
		$response = $this->call('POST', self::absoluteUrl("fiche/bills/"), [
			"patient_id" => '1'
		]);
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
		$this->assertObjectHasAttribute('newKey', $json);
  	$this->assertNotNull($json->newKey);
		$this->assertObjectHasAttribute('id', $json);
		$this->assertEquals($json->id, 1);

  	$key = $json->newKey;

  	$i = $this->findInArray($json, "Bill", $key);
		$this->assertNotFalse($i, "Found the Bill in result");

		// Modify it
		$response = $this->call('PUT', self::absoluteUrl("fiche/bills/" . $key), [
			'ExaminerName' => 'Ershad'
		]);
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
		$this->assertEquals($json->id, 1);
  	$i = $this->findInArray($json, "Bill", $key);
  	$this->assertEquals("Ershad", $json->subFiles[$i]->ExaminerName);

		// Delete it
		$response = $this->call('DELETE', self::absoluteUrl("fiche/bills/" . $key));
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
		$this->assertEquals($json->id, 1);

  	$i = $this->findInArray($json, "Bill", $key);
		$this->assertFalse($i, "Found the Bill in result");
	}
}
