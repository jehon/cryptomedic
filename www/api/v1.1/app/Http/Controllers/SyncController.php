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

class SyncController extends ModelController
{
  // @see http://laravel.com/docs/5.0/controllers

  public function getComputerFromSession()
  {
    $computerId = session()->get('computerId', false);
    if (!$computerId)
    {
      return false;
    }
    $computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);
    return $computer;
  }

  public function parseCheckPoint($cp)
  {
    if ($cp == false)
    {
      $cp = "";
    }
    $cpe = explode("|", $cp);
    $cpo = (object) [];
    if (count($cpe) == 3)
    {
      $cpo->ts = $cpe[0];
      $cpo->type = $cpe[1];
      $cpo->id = $cpe[2];
    } else {
      $cpo->ts = "";
      $cpo->type = "";
      $cpo->id = -1;
    }
    return $cpo;
  }

  public function getLineFrom($type, $id)
  {
    return ("\\App\\" . $type)::findOrFail($id);
  }

  public function _getUnionSQL($cp)
  {
    $cpo = $this->parseCheckPoint($cp);

    $this->sqlParamsUnion = [];
    $sql = "";
    $list = References::$model2db + [ "Deleted" => "deleteds" ];
    return "SELECT ts, id, type, "
          . "IF(ts < NOW(), CONCAT(ts, '|', type, '|', id), '') as checkpoint"
        . "\n FROM ("
        . implode(" \n UNION ALL \n ",
          array_map(
              function($t, $m) use ($cpo)
              {
                $patient_id = ($t == "patients" ? "id" : "patient_id");
                $this->sqlParamsUnion["ts2_{$m}"]    = $this->sqlParamsUnion["ts1_{$m}"]      = $this->sqlParamsUnion["ts0_{$m}"] = $cpo->ts;
                $this->sqlParamsUnion["type2_{$m}"]  = $this->sqlParamsUnion["type1_{$m}"]    = $cpo->type;
                $this->sqlParamsUnion["id2_{$m}"]    = $cpo->id;
                return "("
                    . "SELECT greatest(created_at, updated_at) AS ts, id, '$m' as type"
                    . " FROM $t "
                    . " WHERE (greatest(created_at, updated_at) > :ts0_{$m}) "
                    . "   OR ((greatest(created_at, updated_at) = :ts1_{$m}) AND ('{$cpo->type}' > :type1_{$m}))"
                    . "   OR ((greatest(created_at, updated_at) = :ts2_{$m}) AND ('{$cpo->type}' = :type2_{$m}) AND (id > :id2_{$m}))"
                    .") \n";
              }, $list, array_keys($list)
          )
        )
      . ")\n as p "
      ;
  }

  // Send back incorrect result...
  public function _getCount($cp)
  {
    $sqlu = $this->_getUnionSQL($cp);
    $res = DB::select("SELECT count(*) as c FROM ($sqlu) as p", $this->sqlParamsUnion);
    return $res[0]->c;
  }

  public function _getList($cp, $n)
  {
    $sqlu = $this->_getUnionSQL($cp);
    return DB::select($sqlu . "ORDER BY ts, type, id LIMIT $n", $this->sqlParamsUnion);
  }

  public function getOfflineStructuredData($old_cp = false)
  {
    $n = Request::Input("n", constant("sync_packet_size"));
    $computer = $this->getComputerFromSession();

    $offline = [];

    if (!$old_cp && $computer)
    {
      // Get it from storage if not given explicitely
      $old_cp = $computer->last_sync;
    }

    if ($old_cp == "" || count(explode("|", $old_cp)) != 3)
    {
      $old_cp = "";
      $offline['reset'] = 1;
    }

    $offline['data'] = [];

    $offline['new_checkpoint'] = $old_cp;
    foreach($this->_getList($old_cp, $n) as $i => $d)
    {
      $offline["data"][$i] = $d;
      $offline["data"][$i]->data = $this->getLineFrom($d->type, $d->id);
      $offline['new_checkpoint'] = max($d->checkpoint, $offline['new_checkpoint']);
    }

    // Get the remaining count
    $offline['remaining'] = $this->_getCount($offline['new_checkpoint']);

    // Store the information for helping understanding what is happening out there...
    if ($computer)
    {
      // In unit tests, we don't have a computerId...
      $computer->last_sync       = $offline['new_checkpoint'];
      $computer->save();
    }

    return $offline;
  }

  public function sync()
  {
    $old_cp = Request::input("cp", false);
    $data = array("_offline" => $this->getOfflineStructuredData($old_cp));
    return Response($data);
  }
}
