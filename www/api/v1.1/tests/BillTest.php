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
    $id = $this->doCreate("Bill", [ "patient_id" => '1' ])->online[0]->id;

		// Modify it
    $this->doUpdate("Bill", $id, [ "ExaminerName" => "Ershad" ]);

		// Delete it
    $this->doDelete("Bill", $id);
	}
}
