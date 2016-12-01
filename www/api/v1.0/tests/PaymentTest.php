<?php

require_once("RouteReferenceTestCase.php");

class PaymentTest extends RouteReferenceTestCase {

	public function setUp($url = null, $params = array()) {
		parent::setUp("Payment/1");
		$this->preAuthenticate("cdc");
	}

	public function getFolder1() {
		$this->setUrl("folder/1");
		$this->assertResponseOk("cdc");
	}

	public function findInArray($json, $type, $id) {
		$found = false;
		foreach($json->subFiles as $i => $v) {
			if (($v->_type == $type)
					&& ($v->id == $id)) {
				return $i;
			}
		}
		return false;
	}

	public function testCreateWithoutPatientId() {
		$response = $this->call('POST', self::absoluteUrl("fiche/Payment/"), [
		]);
		$this->assertResponseStatus(400);
	}

	// public function testCreate() {
	// 	// Create it
	// 	$response = $this->call('POST', self::absoluteUrl("fiche/payments/"), [
	// 		"bill_id" => '1'
	// 	]);
	// 	$this->assertResponseStatus(200);
 //  	$json = json_decode($response->getContent());
	// 	$this->assertObjectHasAttribute('newKey', $json);
 //  	$this->assertNotNull($json->newKey);
	// 	$this->assertObjectHasAttribute('id', $json);
	// 	$this->assertEquals($json->id, 1);

 //  	$key = $json->newKey;

 //  	$i = $this->findInArray($json, "Payment", $key);
	// 	$this->assertNotFalse($i, "Found in result");

	// 	// Modify it
	// 	$response = $this->call('PUT', self::absoluteUrl("fiche/payments/" . $key), [
	// 		'Amount' => '3'
	// 	]);
	// 	$this->assertResponseStatus(200);
 //  	$json = json_decode($response->getContent());
	// 	$this->assertEquals($json->id, 1);
 //  	$i = $this->findInArray($json, "Payment", $key);
 //  	$this->assertEquals($json->subFiles[$i]->Amount, 3);

	// 	// Delete it
	// 	$response = $this->call('DELETE', self::absoluteUrl("fiche/payments/" . $key));
	// 	$this->assertResponseStatus(200);
 //  	$json = json_decode($response->getContent());
	// 	$this->assertEquals($json->id, 1);

 //  	$i = $this->findInArray($json, "Payment", $key);
	// 	$this->assertFalse($i, "Found in result");
	// }
}
