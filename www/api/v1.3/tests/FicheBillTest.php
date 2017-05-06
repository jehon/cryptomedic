<?php

require_once("FicheTestHelper.php");

class FicheBillTest extends FicheTestHelper {
  protected $model = "Bill";


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
    $id = $this->doCreate($this->model, [ "patient_id" => '1' ])->id;

		// Modify it
    $this->doUpdate($this->model, $id, [ "ExaminerName" => "Ershad" ]);

		// Delete it
    $this->doDelete($this->model, $id);
	}
}
