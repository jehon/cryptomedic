<?php
/**
 * Club Foot model.
 *
 * With a summary...
 *
 * @package test
 * @author jehon
 */

namespace App;

//use Illuminate\Database\Eloquent\Model;
// use \App\CryptomedicModel;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 *
 * This is a summary? I think so...
 *
 * @author jehon
 *
 */
class ClubFoot extends CryptomedicModel {
  public function validate() {
    if (!$this->patient_id) {
      abort(400, "No patient_id on the file");
    }
    return true;
  }
}
