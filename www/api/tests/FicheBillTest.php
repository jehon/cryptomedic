<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;
use PHPUnit\Framework\Attributes\Depends;

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
    $file = $this->doCreate(["patient_id" => '1']);
    return $file;
  }

	#[Depends("testCreate")]
  public function testUpdate1($file) {
    // Modify it
    $json = $this->doUpdate($file['id'], [
      "examiner" => "Ershad",
      "date" => "2017-01-20"
    ], false);
  }

	#[Depends("testCreate")]
	#[Depends("testUpdate1")]
  public function testDelete($file, $res) {
    // Delete it
    $this->doDelete($file['id']);
  }
}
