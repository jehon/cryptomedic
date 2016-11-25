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


	public function testCreateWithoutPatientId() {
		$response = $this->call('POST', self::absoluteUrl("fiche/bills/"), [
		]);
		$this->assertResponseStatus(400);
	}

	public function testCreate() {
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
		$this->assertNotFalse($i, "Found in result");

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
		$this->assertFalse($i, "Found in result");
	}
}
