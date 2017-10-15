<?php

namespace App\Model;

class PriceLine extends CryptomedicModel {
	// TODO: should be frozen too...
  public function isLocked() {
    return false;
  }

  public function validate() {
    if (!$this->price_id) {
      abort(400, "No price_id on the file");
    }
    return true;
  }
}
