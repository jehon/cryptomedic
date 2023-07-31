<?php

require_once("FicheTestHelper.php");

use Illuminate\Foundation\Testing\DatabaseTransactions;

class FichePaymentTest extends FicheTestHelper {
  // Make Unit Tests are transactionals !
  use DatabaseTransactions;

  protected $model = "Payment";
  protected $collection = "payments";

  public function testCreateWithoutBillId() {
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
    $id = $this->doCreate([ "bill_id" => '1', 'amount' => 1 ])['id'];

    // Modify it
    $this->doUpdate($id, [ "amount" => 3 ]);

    // Delete it
    $this->doDelete($id);
  }
}
