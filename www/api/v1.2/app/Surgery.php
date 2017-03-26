<?php
/**
 * Bill model.
 *
 * With a summary...
 *
 * @package test
 * @author jehon
 */

namespace App;

//use Illuminate\Database\Eloquent\Model;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 *
 * This is a summary? I think so...
 *
 * @author jehon
 *
 */
class Surgery extends CryptomedicModel {
  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
