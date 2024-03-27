<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends CryptomedicModel {
  public function isLocked() {
    return false;
  }

  public function appointment(): HasMany {
      return $this->hasMany(Appointment::class);
  }

  public function getDependantsRecords() {
    $list = [];

    foreach (self::getDependantsTables() as $model => $field) {
      $obj = "\\App\\Model\\" . $model;

      $r = $obj::where($field, $this->id)->get();
      foreach ($r as $ri => $rv) {
        $list = array_merge($list, $rv->getDependantsRecords());
      }
    }

    return array_merge([$this->getLineRecord()], $list);
  }
}
