<?php

namespace App\Model;

// Note: Unit Tests are transactionals ! -- > see RouteReferenceTestCase and each tests

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

// See https://github.com/laravel/framework/issues/5276

// TODO: restrict operations to unlocked files
// TODO: optimistic locking
class CryptomedicModel extends Model {
	protected $guarded = array('id');

	public static function getReadOnlyField() {
		return [ "patient_id", "bill_id", "price_id" ];
	}

	static public function myCleanValue($c) {
		return str_replace(["'", " ", "\""], "", $c);
	}

	static  public function cannonize($data) {
		if (is_array($data)) {
			foreach($data as $k => $v) {
				$res = static::cannonize($v);
				if ($res !== null) {
					$data[$k] = $res;
				}
			}
		}
		if ($data === "null" || $data === "undefined" || $data === "") {
			return null;
		}
		return $data;
	}

	static public function getTableColumnsList() {
		// @see http://stackoverflow.com/a/19953826/1954789
		return \Schema::getColumnListing(with(new static)->getTable());
	}

	static public function filterData($data, $forUpdate = true) {
		unset($data['_type']);
		unset($data['created_at']);
		unset($data['updated_at']);
		unset($data['id']);
		unset($data[(new self())->getUpdatedAtColumn()]);
		unset($data[(new self())->getCreatedAtColumn()]);

		$columns = self::getTableColumnsList();
		$result = array_intersect_key($data, array_combine($columns, $columns));

		if ($forUpdate) {
			foreach($result as $k => $v) {
				if (in_array($k, self::getReadOnlyField())) {
			      	unset($result[$k]);
		      		continue;
		    	}
			}
		}
		return $result;
	}

	static public function create(array $attributes = array()) {
	    $attributes = self::cannonize($attributes);
		$attributes = self::filterData($attributes, false);

		$m = new static($attributes);
		$m->validate();
		if ($m->save()) {
			return $m;
		}
		abort(500, "Could not create the object");
	}

	static public function updateWithArray($id, $data) {
	    $obj = self::findOrFail($id);

	    foreach($data as $k => $v) {
	      // Set existing fields
	      if (array_key_exists($k, $obj->getAttributes()) && ($obj->getAttribute($k) != $v)) {
	        $obj->{$k} = $v;
	      }
	    }

	    $obj->save();
	    return $obj;
	}

	public function syncSubItems($class, $relation, $list) {		
		$oids = [];

		$original = $relation->get();
		foreach($original as $o) {
			$oids[] = $o->id;
		}

		foreach($list as $n) {
			if (in_array("id", $n)) {
				$class::updateWithArray($n['id'], $n);
				$oids = array_filter($oid, function($v) { return $v != $n['id']; });
			} else {
				if (!in_array('Date', $n)) {
					$n['Date'] = $this->Date;
				}
				if (!in_array('ExaminerName', $n)) {
					$n['ExaminerName'] = $this->ExaminerName;
				}
				$relation->create($n);
			}
		}

		foreach($oids as $oid) {
			var_dump("Remove oid: $oid");
		}

		return $this;
	}

	public function validate() {
		return true;
	}

	public function isLocked() {
		if (!$this->updated_at) {
			return false;
		}
		// TODO: test locking in backend here....
		// TODO: put the number of days into configuration ! And push it to the frontend
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

	public function save(array $attributes = array()) {
	    if ($this->isLocked()) {
	     	abort(403, "File is frozen");
	    }

	    $attributes = self::cannonize($attributes);
		$attributes = self::filterData($attributes, true);
		if ($this->isDirty()) {
			$this->validate();
			$this->lastuser = Auth::user()->username;
			return parent::save($attributes);
		}
		return true;
	}

	public function delete() {
	    if ($this->isLocked()) {
			abort(403, "File is frozen");
	    }

		return parent::delete();
	}
}
