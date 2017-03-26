<?php

namespace App\Model;

class Payment extends CryptomedicModel {
  public function validate() {
    if (!$this->bill_id) {
      abort(400, "No bill_id on the file");
    }
    return true;
  }
}
