<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class FicheBillTest extends FicheTestHelper {
  // Make Unit Tests are transactionals !
  use DatabaseTransactions;

  protected $model = "Bill";
  protected $collection = "bills";

	public function testCreateWithoutPatientId() {
    $response = $this->myRunAssertQuery(
        $this->getNewRequestOptionsBuilder()
          ->setUrl("fiche/" . $this->collection)
          ->setMethod("POST")
          ->setExpected(400)
          ->asText()
      );
	}

	public function testCreate() {
		// Create it
    $file = $this->doCreate([ "patient_id" => '1' ]);

		// Modify it
    $res = $this->doUpdate($file->id, [ 
      "ExaminerName" => "Ershad",
      "consult_CDC_consultation_Bengali_Doctor" => 2
    ]);

		// Delete it
    $this->doDelete($file->id);
	}
}
