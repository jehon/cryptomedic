<?php
// TODO-CLEAN: How to "forget" a computer? -> delete it from the database. But what if he reconnect later??? -> force a resync !

namespace App;

use Illuminate\Database\Eloquent\Model;

class SyncComputer extends Model {
	protected $guarded = array('id');
}
