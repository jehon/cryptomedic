<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

// See https://github.com/laravel/framework/issues/5276

class LockedModel extends Model {
	static public function getTableColumnsList() {
		// https://github.com/laravel/framework/issues/1436
		return DB::getSchemaBuilder()->getColumnListing(with(new static)->getTable());
	}
	
	protected function performUpdate(Builder $query, array $options = [])
	{
		$dirty = $this->getDirty();
		if (count($dirty) > 0) {
			if ($this->fireModelEvent('updating') === false) {
				return false;
			}
	
			if ($this->timestamps) {
				$this->updateTimestamps();
			}
	
			$dirty = $this->getDirty();
	
			if (count($dirty) > 0) {
				$query->where('updated_at', $this->updated_at);
	
				if (!$this->setKeysForSaveQuery($query)->update($dirty)) {
					throw new \RuntimeException('Row is dirty');
				}
				$this->fireModelEvent('updated', false);
			}
		}
	
		return true;
	}
}
