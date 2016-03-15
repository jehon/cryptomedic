<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

// See https://github.com/laravel/framework/issues/5276

// TODO: restrict operations to unlocked files
class CryptomedicModel extends Model {
	protected $guarded = array('id');

	static public function getTableColumnsList() {
		// @see http://stackoverflow.com/a/19953826/1954789
		return \Schema::getColumnListing(with(new static)->getTable());
// 		return DB::getSchemaBuilder()->getColumnListing($tableName);
	}

	static public function filterData($data) {
		$columns = static::getTableColumnsList();
		// unset($data['created']);
		// unset($data['modified']);
		unset($data['created_at']);
		unset($data['updated_at']);
		unset($data['id']);
		return array_intersect_key($data, array_combine($columns, $columns));
	}

	public static function create(array $attributes = array()) {
		$attributes = static::filterData($attributes);
		// Create will call the "save"
		return parent::create($attributes);
	}

	public function save(array $options = array()) {
		if ($this->isDirty()) {
			$this->lastuser = Auth::user()->username;
			return parent::save($options);
		}
		return true;
	}

	public function delete() {
		// Track deleted elements...
		$classname = get_called_class();
		if (preg_match('@\\\\([\w]+)$@', $classname, $matches)) {
			$classname = $matches[1];
		}
		$dbname = \References::model2db($classname);
		$id = $this->id;
		$deleted = new Deleted;
		$deleted->entity_type = $dbname;
		$deleted->entity_id = $id;
		if ($dbname == "patients") {
			$deleted->patient_id = $id;
		} else {
			$deleted->patient_id = $this->patient_id;
		}
		$deleted->save();

		// Let's go delete it...
		return parent::delete();
	}

// TODO: optimistic locking of files
// 	protected function performUpdate(Builder $query, array $options = [])
// 	{
// 		// ???
// 		// $query->where('updated_at', $this->updated_at);
// 		// parent->performUpdate($query, $options);
// 		//
// 		// but in that case, we have no result???


// 		$dirty = $this->getDirty();
// 		if (count($dirty) > 0) {
// 			if ($this->fireModelEvent('updating') === false) {
// 				return false;
// 			}

// 			if ($this->timestamps) {
// 				$this->updateTimestamps();
// 			}

// 			$dirty = $this->getDirty();

// 			if (count($dirty) > 0) {
// 				$query->where('updated_at', $this->updated_at);

// 				if (!$this->setKeysForSaveQuery($query)->update($dirty)) {
// 					throw new \RuntimeException('Row is dirty');
// 				}
// 				$this->fireModelEvent('updated', false);
// 			}
// 		}

// 		return true;
// 	}
}
