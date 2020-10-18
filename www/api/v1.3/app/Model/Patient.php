<?php

namespace App\Model;

use Cryptomedic\Lib\Database;

class Patient extends CryptomedicModel {
  public function isLocked() {
    return false;
  }

  public function getDependantsList() {
    $list = [];

    foreach (Database::getDependantsOfTable(Database::getTableForModel('Patient')) as $table => $field) {
      $obj = "\\App\\Model\\" . Database::getModelForTable($table);

      $r = $obj::where($field, $this->id)->get();
      foreach ($r as $ri => $rv) {
        $list = array_merge($list, $rv->getDependantsList());
      }
    }

    return array_merge([$this->getLineRecord()], $list);
  }
}
