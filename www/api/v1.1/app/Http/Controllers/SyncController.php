<?php

namespace App\Http\Controllers;

use App\Patient;
use App\SyncComputer;
use App\References;
use App\Http\Controllers\Controller;

use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

define("sync_packet_size", 150);

class SyncController extends ModelController {
  // @see http://laravel.com/docs/5.0/controllers

  public function _getUnionSQL($cp) {
    $this->sqlParamsUnion = [];
    $sql = "";

    $cpe = explode("|", $cp);
    $ts = $cpe[0];
    $type = $cpe[1];
    $id = $cpe[2];

    $list = References::$model2db + [ "Deleted" => "deleteds" ];
    return "SELECT ts, id, type, "
          . "IF(ts < NOW(), CONCAT(ts, '|', type, '|', id), '') as checkpoint"
        . "\n FROM ("
        . implode(" \n UNION ALL \n ",
          array_map(
              function($t, $m) use ($ts, $type, $id) {
                $patient_id = ($t == "patients" ? "id" : "patient_id");
                $this->sqlParamsUnion["ts2_{$m}"]    = $this->sqlParamsUnion["ts1_{$m}"]      = $this->sqlParamsUnion["ts0_{$m}"] = $ts;
                $this->sqlParamsUnion["type2_{$m}"]  = $this->sqlParamsUnion["type1_{$m}"]    = $type;
                $this->sqlParamsUnion["id2_{$m}"]    = $id;
                return "("
                    . "SELECT greatest(created_at, updated_at) AS ts, id, '$m' as type"
                    . " FROM $t "
                    . " WHERE (greatest(created_at, updated_at) > :ts0_{$m}) "
                    . "   OR ((greatest(created_at, updated_at) = :ts1_{$m}) AND ('$type' > :type1_{$m}))"
                    . "   OR ((greatest(created_at, updated_at) = :ts2_{$m}) AND ('$type' = :type2_{$m}) AND (id > :id2_{$m}))"
                    .") \n";
              }, $list, array_keys($list)
          )
        )
      . ")\n as p "
      ;
  }

  // Send back incorrect result...
  public function _getCount($cp) {
    $sqlu = $this->_getUnionSQL($cp);
    $res = DB::select("SELECT count(*) as c FROM ($sqlu) as p", $this->sqlParamsUnion);
    return $res[0]->c;
  }

  public function _getList($cp, $n) {
    $sqlu = $this->_getUnionSQL($cp);
    return DB::select($sqlu . "ORDER BY ts, type, id LIMIT $n", $this->sqlParamsUnion);
  }

  public function _syncData($old_cp) {
    $n = Request::Input("n", constant("sync_packet_size"));
    $computerId = session()->get('computerId');
    if ($computerId) {
      // In unit tests, we don't have a computerId...
      $computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);
      if (!$computer->last_sync) {
        // If computer not known (anymore?) from the system, then resync
        $old_cp = "";
      }
      // TODO: do we store the last old_cp ???
    } else {
      $computer = false;
    }

    $offline = [];

    if ($old_cp == "" || count(explode("|", $old_cp)) != 3) {
      $old_cp = "||-1";
      $offline['reset'] = 1;
    }

    $offline['data'] = $this->_getList($old_cp, $n);

    if (count($offline['data']) < $n) {
      $offline["isfinal"] = true;
    } else {
      $offline["isfinal"] = false;
    }

    $new_checkpoint = "";
    foreach($offline["data"] as $i => $d) {
      $offline["data"][$i]->data = ("\\App\\" . $d->type)::findOrFail($d->id);

      if (property_exists($d, "checkpoint")) {
        $new_checkpoint = max($d->checkpoint, $new_checkpoint);
      }
    }

    // Get the remaining count
    if ($new_checkpoint > "") {
      $offline['remaining'] = $this->_getCount($new_checkpoint);
      $offline['new_checkpoint'] = $new_checkpoint;
    }

    // Store the information for helping understanding what is happening out there...
    if ($computer) {
      // In unit tests, we don't have a computerId...
      if ($new_checkpoint) {
        $computer->last_sync        = $new_checkpoint;
      }
      $computer->last_sync_final = $offline['isfinal'];
      $computer->save();
    }

    return $offline;
  }

  public function sync() {
    $old_cp = Request::input("cp", false);
    if ($old_cp === false) {
      abort(412);
    }
    $data = array("_offline" => $this->_syncData($old_cp));

    return Response($data);
  }
}
