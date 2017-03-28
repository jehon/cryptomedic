<?php

namespace App\Model;

// http://laravel.com/docs/5.0/eloquent#model-events

class Patient extends CryptomedicModel {
  public function getDependantsList() {
    $list = [];

    $dependants = References::$model2db;
    unset($dependants["Payment"]);
    unset($dependants["Patient"]);

    foreach($dependants as $m => $t) {
      $obj = "\\App\\Model\\" . $m;

      // $r = DB::select("SELECT * FROM $t WHERE patient_id = :patient_id", array('patient_id' => $id));
      $r = $obj::where("patient_id", $this->id)->get();
      foreach($r as $ri => $rv) {
        $list = array_merge($list, $rv->getDependantsList());
      }
    }

    return array_merge([ $this->getLineRecord() ], $list);
  }
}
