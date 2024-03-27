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

  public function bill(): HasMany {
    return $this->hasMany(Bill::class);
  }

  public function club_foot(): HasMany {
    return $this->hasMany(ClubFoot::class);
  }

  public function other_consult(): HasMany {
    return $this->hasMany(OtherConsult::class);
  }

  public function picture(): HasMany {
    return $this->hasMany(Picture::class);
  }

  public function ricket_consult(): HasMany {
    return $this->hasMany(RicketConsult::class);
  }

  public function surgery(): HasMany {
    return $this->hasMany(Surgery::class);
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
