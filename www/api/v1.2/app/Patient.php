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

// http://laravel.com/docs/5.0/eloquent#model-events

//use Illuminate\Database\Eloquent\Model;
use App\CryptomedicModel;
use App\References;

/**
 * This is the Bill model, encapsulating various function used around the "Bill" concept
 *
 * This is a summary? I think so...
 *
 * @author jehon
 *
 */
class Patient extends CryptomedicModel {
  public function getDependantList() {
    $list = [];

    $dependants = References::$model2db;
    unset($dependants["Payment"]);
    unset($dependants["Patient"]);

    foreach($dependants as $m => $t) {
      $obj = "\\App\\" . $m;

      // $r = DB::select("SELECT * FROM $t WHERE patient_id = :patient_id", array('patient_id' => $id));
      $r = $obj::where("patient_id", $this->id)->get();
      foreach($r as $ri => $rv) {
        $list = array_merge($list, [ $rv->getSyncRecord() ], $rv->getDependantList());
      }
    }

    return $list;
  }
}
