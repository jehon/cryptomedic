<?php

namespace App\Model;

use Cryptomedic\Lib\Database;
use Cryptomedic\Lib\DatabaseStructure;

class Patient extends CryptomedicModel {
  public function isLocked() {
    return false;
  }

  public function getDependantsRecords() {
    $list = [];

    foreach (DatabaseStructure::getDependantsOfTable(DatabaseStructure::getTableForModel('Patient')) as $table => $field) {
      $obj = "\\App\\Model\\" . DatabaseStructure::getModelForTable($table);

      $r = $obj::where($field, $this->id)->get();
      foreach ($r as $ri => $rv) {
        $list = array_merge($list, $rv->getDependantsRecords());
      }
    }

    return array_merge([$this->getLineRecord()], $list);
  }
}
