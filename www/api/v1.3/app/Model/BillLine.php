<?php

namespace App\Model;

class BillLine extends CryptomedicModel {
	// TODO: should be frozen too...
  public function isLocked() {
    return false;
  }

  public function validate() {
    if (!$this->bill_id) {
      abort(400, "No bill_id on the file");
    }
    return true;
  }
}
