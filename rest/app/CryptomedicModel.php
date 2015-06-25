<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

// See https://github.com/laravel/framework/issues/5276

class CryptomedicModel extends Model {
	protected $guarded = array('id', 'modified', 'created');
	
	static public function getTableColumnsList() {
		// @see http://stackoverflow.com/a/19953826/1954789
		return \Schema::getColumnListing(with(new static)->getTable());
// 		return DB::getSchemaBuilder()->getColumnListing($tableName);
	}
	
	static public function filterData($data) {
		$columns = self::getTableColumnsList();
		unset($data['created']);
		unset($data['modified']);
		unset($data['created_at']);
		unset($data['updated_at']);
		unset($data['id']);
		return array_intersect_key($data, array_combine($columns, $columns));
	}
	
	public static function create(array $attributes) {
		$attributes['lastuser'] = 'moi-create';
		$attributes = $m::filterData($attributes);
		return parent::create($attributes);
	}
	
	public function save(array $options = Array()) {
		if ($this->isDirty()) {
			$this->lastuser = "moi-save";
			// TODO: re-enable optimistic lock -> get the updated_at from request !!!
// 			if ($updated != $this->{$this->getUpdatedAtColumn()}) {
				// 			var_dump("optimistic locking exception");
// 			}
// 			$affectedRows = $this::where("id", "=", $this->id)
// 	// 			->where($this->getUpdatedAtColumn(), '=', $updated)
// 				->update($attributes);
// 			// TODO: optimistic locking - detect if a change is needed otherwise it will always fail
// 			if ($affectedRows != 1) {
// 	// 			abort(409, "Concurrent access exception to $model@$id#" . $obj[$obj->getUpdatedAtColumn()] . " <> " . $obj[$obj->getUpdatedAtColumn()]);
// 			}
			return parent::save($options);
		}
		return true;
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
	