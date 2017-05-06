<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

// See https://github.com/laravel/framework/issues/5276

// TODO: restrict operations to unlocked files
// TODO: optimistic locking
class CryptomedicModel extends Model {
	protected $guarded = array('id');

	static public function myCleanValue($c) {
  	return str_replace(["'", " ", "\""], "", $c);
	}

	static public function getTableColumnsList() {
		// @see http://stackoverflow.com/a/19953826/1954789
		return \Schema::getColumnListing(with(new static)->getTable());
	}

	static public function filterData($data) {
		$columns = static::getTableColumnsList();
		unset($data['created_at']);
		unset($data['updated_at']);
		unset($data['id']);
		$result = array_intersect_key($data, array_combine($columns, $columns));
		foreach($result as $k => $v) {
			if ($result[$k] == "" || $result[$k] == "undefined") {
				unset($result[$k]);
			}
		}
		return $result;
	}

	public static function create(array $attributes = array()) {
		$attributes = static::filterData($attributes);
		$m = new static($attributes);
		$m->validate();
		if ($m->save()) {
			return $m;
		}
		abort(500, "Could not create the object");
	}

	public function validate() {
		return true;
	}

	public function isLocked() {
		if (!$this->updated_at) {
			return false;
		}
		// if ($this->update_at < new \DateTime('36 days ago')) {
		//  // Too old, locked
		// 	return true;
		// }
		return false;
	}

	public function getDependantsList() {
		return [ $this->getLineRecord() ];
	}

	public function getLineRecord() {
    $classname = get_class($this);
		if ($pos = strrpos($classname, '\\')) {
			$classname = substr($classname, $pos + 1);
		}

    $rec = [];
    $rec["type"]   = $classname;
    $rec["id"]     = $this->id;
    $rec["record"] = $this;
    return $rec;
	}

	public function getRoot() {
		if ($this->patient_id !== null) {
			return Patient::findOrFail($this->patient_id)->getRoot();
		}
		if ($this->bill_id !== null) {
			return Bill::findOrFail($this->bill_id)->getRoot();
		}
		return $this;
	}

	public function getReadOnlyField() {
		return [ "patient_id", "bill_id" ];
	}

	public function save(array $attributes = array()) {
		$attributes = static::filterData($attributes);
		if ($this->isDirty()) {
			$this->validate();
			$this->lastuser = Auth::user()->username;
			return parent::save($attributes);
		}
		return true;
	}
}
