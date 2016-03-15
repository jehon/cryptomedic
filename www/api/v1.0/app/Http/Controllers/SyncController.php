<?php

namespace App\Http\Controllers;

use App\Patient;
use App\SyncComputer;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;

use \References;

define("sync_packet_size", 100);

class SyncController extends Controller {
  // @see http://laravel.com/docs/5.0/controllers

  public function _getUnionSQL($cp) {
    $this->sqlParamsUnion = [];
    $sql = "";

    $cpe = explode("|", $cp);
    $ts = $cpe[0];
    $id = $cpe[1];

    $list = References::$model2db + [ "Deleted" => "deleteds" ];
    return "SELECT MAX(ts) as ts, "
          . "patient_id, "
          . "IF(MAX(ts) < NOW(), CONCAT(MAX(ts), '|', patient_id), '') as checkpoint"
        . "\n FROM ("
        . implode(" \n UNION \n ",
          array_map(
              function($t, $m) use ($ts, $id) {
                $patient_id = ($t == "patients" ? "id" : "patient_id");
                $this->sqlParamsUnion["ts0_{$m}"]    = $this->sqlParamsUnion["ts1_{$m}"]    = $ts;
                $this->sqlParamsUnion["id1_{$m}"]    = $id;
                return "("
                    . "SELECT greatest(created_at, updated_at) AS ts, $patient_id AS patient_id"
                    . " FROM $t "
                    . " WHERE (greatest(created_at, updated_at) > :ts0_{$m}) "
                    . "   OR (greatest(created_at, updated_at) = NOW())"
                    . "   OR ((greatest(created_at, updated_at) = :ts1_{$m}) AND ($patient_id > :id1_{$m}))"
                    .")";
              }, $list, array_keys($list)
          )
        )
      . ")\n as p GROUP BY patient_id ";
  }

  // Send back incorrect result...
  public function _getCount($cp) {
    $sqlu = $this->_getUnionSQL($cp);
    $res = DB::select("SELECT count(*) as c FROM ($sqlu) as p", $this->sqlParamsUnion);
    return $res[0]->c;
  }

  public function _getList($cp, $n) {
    $sqlu = $this->_getUnionSQL($cp);
    // echo $sqlu;
    // var_dump($this->sqlParamsUnion);

    $res = DB::select($sqlu . "ORDER BY MAX(ts), patient_id LIMIT $n", $this->sqlParamsUnion);
    //$res = DB::select("SELECT * FROM ($sqlu) as p ORDER BY MAX(ts), patient_id LIMIT $n", $this->sqlParamsUnion);
    $data = [];

    foreach($res as $i => $r) {
      $pat = FolderController::getFolder($r->patient_id);
      if ($pat) {
        $data[$i]['record'] = $pat;
      } else {
        $data[$i] = [ 'id' => $r->patient_id, '_deleted' => true ];
      }
      $data[$i]['checkpoint'] = $r->checkpoint;
    }
    return $data;
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
    } else {
      $computer = false;
    }

    $offline = [];

    if ($old_cp == "" || count(explode("|", $old_cp)) != 2) {
      $old_cp = "|-1";
      $offline['reset'] = 1;
    }

    $offline['data'] = $this->_getList($old_cp, $n);

    if (count($offline['data']) < $n) {
      $offline["isfinal"] = true;
    } else {
      $offline["isfinal"] = false;
    }

    $new_checkpoint = "";
    foreach($offline["data"] as $d) {
      if (array_key_exists("checkpoint", $d)) {
        $new_checkpoint = $d["checkpoint"];
      }
    }

    // Get the remaining count
    if ($new_checkpoint > "") {
      $offline['remaining'] = $this->_getCount($new_checkpoint);
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
