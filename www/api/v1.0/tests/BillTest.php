<?php

require_once("RouteReferenceTestCase.php");

class BillTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("payment/1");
	}

	public function getFolder1() {
		$this->setUrl("folder/1");
		$this->assertResponseOk("cdc");
	}

	public function testCreateBillWithoutPatientId() {
		// Bill#1 is on folder#1

		$this->setUrl("bills");
		$this->preAuthenticate("cdc");
		$response = $this->call('POST', self::absoluteUrl("fiche/bills/"), [
		]);
		$this->assertResponseStatus(400);
	}

	public function testCreateBill() {
		// Bill#1 is on folder#1

		$this->setUrl("bills");
		$this->preAuthenticate("cdc");
		$response = $this->call('POST', self::absoluteUrl("fiche/bills/"), [
			"patient_id" => '1'
		]);
		$this->assertResponseStatus(200);
  	$json = json_decode($response->getContent());
		var_dump($json);
	}
}
