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

  	$i = $this->myAssertIsInData($json->online, "Bill", $key);

		// Modify it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill/" . $key)
          ->setMethod("PUT")
          ->setParams([ 'ExaminerName' => 'Ershad' ])
      );

		$this->assertEquals($key, $json->id);
    $this->assertCount(1, $json->online);
  	$i = $this->myAssertIsInData($json->online, "Bill", $key);
  	$this->assertEquals("Ershad", $json->online[$i]->record->ExaminerName);

		// Delete it
    $json = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/Bill/" . $key)
          ->setMethod("DELETE")
      );

    $this->assertCount(1, $json->online);
  	$i = $this->myAssertIsInData($json->online, "Deleted", false, [ "entity_type" => "Bill", "entity_id" => $key ]);
	}
}
