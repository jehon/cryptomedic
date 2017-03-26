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

	public function getDependantList() {
		return [];
	}

	public function getSyncRecord() {
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

	public function delete() {
		// Track deleted elements...
		$classname = get_called_class();
		if (preg_match('@\\\\([\w]+)$@', $classname, $matches)) {
			$classname = $matches[1];
		}
		// $dbname = References::model2db($classname);
		$id = $this->id;
		$deleted = new Deleted();
		$deleted->created_at = new \DateTime();
		$deleted->entity_type = $classname;
		$deleted->entity_id = $id;
		$deleted->save();

		// Let's go delete it...
		$res = parent::delete();
		if (!$res) {
			return false;
		}
		return $deleted;
	}
}
