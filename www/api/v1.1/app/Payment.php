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

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 *
 * This is a summary? I think so...
 *
 * @author jehon
 *
 */
class Payment extends CryptomedicModel {
  public function validate() {
    if (!$this->bill_id) {
      abort(400, "No bill_id on the file");
    }
    return true;
  }
}
