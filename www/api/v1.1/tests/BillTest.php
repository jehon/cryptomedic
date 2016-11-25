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
  	$key = $json->newKey;
  	$this->assertNotNull($json->newKey);

  	$i = $this->myAssertIsInOfflineData($json, "Bill", $key);

		// Modify it
		$response = $this->call('PUT', self::absoluteUrl("fiche/bills/" . $key), [
			'ExaminerName' => 'Ershad'
		]);
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
		$this->assertEquals($key, $json->id);
  	$i = $this->myAssertIsInOfflineData($json, "Bill", $key);
  	$this->assertEquals("Ershad", $json->_offline->data[$i]->record->ExaminerName);

		// Delete it
		$response = $this->call('DELETE', self::absoluteUrl("fiche/bills/" . $key));
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
  	$i = $this->myAssertIsInOfflineData($json, "Deleted", false, [ "entity_type" => "Bill", "entity_id" => $key ]);
	}
}
