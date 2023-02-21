<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

// See https://github.com/laravel/framework/blob/5.3/src/Illuminate/Database/Eloquent/Model.php#L1448

trait OptimisticLockingTrait {
    protected function performUpdate(Builder $query) {
		if (!array_key_exists($this->getUpdatedAtColumn(), $this->attributes)) {
			return parent::performUpdate($query);
		}
		$query->where($this->getUpdatedAtColumn(), '=', $this[$this->getUpdatedAtColumn()]);

		// Original code from https://github.com/illuminate/database/blob/master/Eloquent/Model.php

		// If the updating event returns false, we will cancel the update operation so
		// developers can hook Validation systems into their models and cancel this
		// operation if the model does not pass validation. Otherwise, we update.
		if ($this->fireModelEvent('updating') === false) {
			return false;
		}
		// First we need to create a fresh query instance and touch the creation and
		// update timestamp on the model which are maintained by us for developer
		// convenience. Then we will just continue saving the model instances.
		if ($this->usesTimestamps()) {
			$this->updateTimestamps();
		}
		// Once we have run the update operation, we will fire the "updated" event for
		// this model instance. This will allow developers to hook into these after
		// models are updated, giving them a chance to do any special processing.
		$dirty = $this->getDirty();
		if (count($dirty) > 0) {
			$res = $this->setKeysForSaveQuery($query)->update($dirty);
			$this->fireModelEvent('updated', false);
			$this->syncChanges();

			if ($res != 1) {
				abort(409);
			}

			return $res;
		}
		return true;
	}
}
