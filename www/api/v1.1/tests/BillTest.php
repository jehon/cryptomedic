<?php

require_once("SyncableTestCase.php");

class BillTest extends SyncableTestCase {

	public function testCreateWithoutPatientId() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill")
          ->setMethod("POST")
          ->setExpected(400)
          ->asText()
      );
	}

	public function testCreate() {
		// Create it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill")
          ->setMethod("POST")
          ->setParams([ "patient_id" => '1' ])
      );

		$this->assertObjectHasAttribute('newKey', $json);
    $this->assertNotNull($json->newKey);

  	$key = $json->newKey;

  	$i = $this->myAssertIsInOfflineData($json->_offline, "Bill", $key);

		// Modify it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill/" . $key)
          ->setMethod("PUT")
          ->setParams([ 'ExaminerName' => 'Ershad' ])
      );

		$this->assertEquals($key, $json->id);
    $this->assertCount(1, $json->_offline->data);
  	$i = $this->myAssertIsInOfflineData($json->_offline, "Bill", $key);
  	$this->assertEquals("Ershad", $json->_offline->data[$i]->record->ExaminerName);

		// Delete it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill/" . $key)
          ->setMethod("DELETE")
      );

    $this->assertCount(1, $json->_offline->data);
  	$i = $this->myAssertIsInOfflineData($json->_offline, "Deleted", false, [ "entity_type" => "Bill", "entity_id" => $key ]);
	}
}
