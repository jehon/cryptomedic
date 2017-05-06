<?php

require_once("FicheTestHelper.php");

class FichePaymentTest extends FicheTestHelper {
  protected $model = "Payment";
  protected $collection = "payments";

  public function testCreateWithoutBillId() {
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
    $id = $this->doCreate([ "bill_id" => '1', 'Amount' => 1 ])->id;

    // Modify it
    $this->doUpdate($id, [ "Amount" => 3 ]);

    // Delete it
    $this->doDelete($id);
  }
}
