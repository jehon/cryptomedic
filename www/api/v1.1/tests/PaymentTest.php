<?php

require_once("SyncableTestCase.php");

class PaymentTest extends SyncableTestCase {

	public function testCreateWithoutPatientId() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Payment")
          ->setMethod("POST")
          ->setExpected(400)
          ->asText()
      );
	}

	public function testCreate() {
		// Create it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Payment")
          ->setMethod("POST")
          ->setParams([ "bill_id" => '1' ])
      );

		$this->assertObjectHasAttribute('newKey', $json);
  	$this->assertNotNull($json->newKey);

  	$key = $json->newKey;

  	$i = $this->myAssertIsInData($json->_offline, "Payment", $key);

		// Modify it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Payment/" . $key)
          ->setMethod("PUT")
          ->setParams([ 'Amount' => '3' ])
      );

		$this->assertEquals($key, $json->id);
    $this->assertCount(1, $json->_offline->data);
  	$i = $this->myAssertIsInData($json->_offline, "Payment", $key);
  	$this->assertEquals("3", $json->_offline->data[$i]->record->Amount);

		// Delete it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Payment/" . $key)
          ->setMethod("DELETE")
      );

    $this->assertCount(1, $json->_offline->data);
  	$i = $this->myAssertIsInData($json->_offline, "Deleted", false, [ "entity_type" => "Payment", "entity_id" => $key ]);
	}
}
