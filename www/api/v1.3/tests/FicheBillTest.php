<?php

require_once("FicheTestHelper.php");

class FicheBillTest extends FicheTestHelper {
  protected $model = "Bill";
  protected $collection = "bills";


	public function testCreateWithoutPatientId() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/" . $this->model)
          ->setMethod("POST")
          ->setExpected(400)
          ->asText()
      );
	}

	public function testCreate() {
		// Create it
    $id = $this->doCreate([ "patient_id" => '1' ])->id;

		// Modify it
    $this->doUpdate($id, [ "ExaminerName" => "Ershad" ]);

		// Delete it
    $this->doDelete($id);
	}
}
