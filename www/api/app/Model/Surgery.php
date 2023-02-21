<?php

namespace App\Model;

//use Illuminate\Database\Eloquent\Model;

class Surgery extends CryptomedicModel {
  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
