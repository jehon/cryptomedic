<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Flow\JSONPath\JSONPath;

class FicheBillTest extends FicheTestHelper {
  // Make Unit Tests are transactionals !
  // use DatabaseTransactions;

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
    return $file;
  }

  /**
   * @depends testCreate
   */
  public function testUpdate1($file) {
		// Modify it
    $json = $this->doUpdate($file['id'], [ 
      "ExaminerName" => "Ershad",
      "Date" => "2017-01-20"
    ], false);
  }

  /**
   * @depends testCreate
   * @depends testUpdate1
   * @ depends testUpdate2
   */
  public function testDelete($file, $res) {
		// Delete it
    $this->doDelete($file['id']);
	}
}
