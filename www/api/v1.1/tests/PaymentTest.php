<?php

require_once("SyncableTestCase.php");

class PaymentTest extends SyncableTestCase {
  protected $model = "Payment";


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
    $id = $this->doCreate($this->model, [ "bill_id" => '1' ])->online[0]->id;

    // Modify it
    $this->doUpdate($this->model, $id, [ "Amount" => 3 ]);

    // Delete it
    $this->doDelete($this->model, $id);
  }
}
