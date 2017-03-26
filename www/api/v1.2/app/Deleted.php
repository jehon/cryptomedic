<?php
// TODO-CLEAN: delete "deleted" records older than the last synced computer... (LogComputer->updated_at is a good enough estimation)

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deleted extends Model {

}
