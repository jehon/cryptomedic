<?php

namespace App\Model;

class Appointment extends CryptomedicModel {
  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
