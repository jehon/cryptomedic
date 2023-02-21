<?php

namespace App\Model;

class RicketConsult extends CryptomedicModel {
  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
