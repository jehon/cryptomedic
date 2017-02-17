<?php

namespace App\Http\Middleware;

use DB;
use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

use App\SyncComputer;
use App\References;
use App\Http\Controllers\SyncController;
use App\Http\Controllers\Auth\AuthController;

class SyncData {
  // @see http://laravel.com/docs/5.0/controllers

  var $computer = false;

  public function initializeComputer($request) {
    // What is the computer we are speaking about?
    if ($request->input("computerId", false)) {
      // Record the computer Id into database and session
      $computerId = $request->input("computerId");
      $this->computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);

      session()->put('computerId', $computerId);
    } else {
      $computerId = session()->get('computerId', 1);
    }

    $this->computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);
    $this->computer->cryptomedic_version = $request->input("appVersion", "");
    if (strpos($this->computer->user_list, Auth::user()->username) === false) {
      $this->computer->user_list .= ',' . Auth::user()->username;
    }
  }

  public function string2checkpoint($stringCP) {
    if ($stringCP == false) {
      $stringCP = "";
    }
    $cpe = explode("|", $stringCP);
    $cpo = (object) [];
    if (count($cpe) == 3) {
      $cpo->ts = $cpe[0];
      $cpo->type = $cpe[1];
      $cpo->id = $cpe[2];
    } else {
      // We initialize this one year ago

      // Thanks to: http://stackoverflow.com/a/1990322/1954789
      $time = strtotime("-1 year");
      $cpo->ts = date("Y-m-d", $time);
      $cpo->type = "A";
      $cpo->id = "0000000000";

      $this->computer->early_sync = $this->checkpoint2string($cpo);
    }
    return $cpo;
  }

  public function checkpoint2string($data) {
    return $data->ts . '|' . $data->type . '|' . $data->id;
  }

  public function getLineFrom($type, $id)
  {
    $name = "\\App\\" . $type;
    $rec = $name::findOrFail($id);
    if ($type == "Deleted") {
      $model = References::db2model($rec['entity_type']);
      if ($model) {
        $rec['entity_type'] = $model;
      }
    }
    return $rec;
  }

  public function _getUnionSQL($cp)
  {
    $cpo = $this->string2checkpoint($cp);

    $this->sqlParamsUnion = [];
    $sql = "";
    $list = References::$model2db + [ "Deleted" => "deleteds" ];
    return "SELECT ts, id, type, "
          . "IF(ts < NOW(), CONCAT(ts, '|', type, '|', LPAD(id, 10, '0')), '') as checkpoint"
        . "\n FROM ("
        . implode(" \n UNION ALL \n ",
          array_map(
              function($t, $m) use ($cpo)
              {
                $this->sqlParamsUnion["ts2_{$m}"]    = $this->sqlParamsUnion["ts1_{$m}"]      = $this->sqlParamsUnion["ts0_{$m}"] = $cpo->ts;
                $this->sqlParamsUnion["type2_{$m}"]  = $this->sqlParamsUnion["type1_{$m}"]    = $cpo->type;
                $this->sqlParamsUnion["id2_{$m}"]    = $cpo->id;
                return "("
                    . "SELECT greatest(created_at, coalesce(updated_at, 0)) AS ts, id, '$m' as type"
                    . " FROM $t "
                    . " WHERE "
                    . " ( "
                    . "  (greatest(created_at, coalesce(updated_at, 0)) > :ts0_{$m}) "
                    . "   OR ( (greatest(created_at, coalesce(updated_at, 0)) = :ts1_{$m}) AND ('${m}' > :type1_{$m}) )"
                    . "   OR ( (greatest(created_at, coalesce(updated_at, 0)) = :ts2_{$m}) AND ('${m}' = :type2_{$m}) AND (id > :id2_{$m}) )"
                    . " ) "
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
    return DB::select($sqlu . " ORDER BY ts, type, id LIMIT $n", $this->sqlParamsUnion);
  }

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next)
	{
		$response = $next($request);

		if ($response->status() != 200) {
			return $response;
		}

		if (! ($response instanceof JsonResponse)) {
			return $response;
		}

		$response->setJsonOptions(JSON_NUMERIC_CHECK);

    if (!AuthController::hasPermission("folder.read")) {
			return $response;
		}

		if (!$request->hasHeader("X-SYNC-CHECKPOINT")) {
			return $response;
		}

    // *** Ok, conditions are good, lets go !

    // *** Let's build up the response
    $offline = [
      'data' => []
    ];

    // *** Get $this->computer
    $this->initializeComputer($request);

    // *** Get $n
    $n = $request->header("X-SYNC-NBR");
    if (!is_numeric($n)) {
      $n = 10;
    }

    // *** Get $previous_checkpoint
		$previous_checkpoint = $request->header("X-SYNC-CHECKPOINT");
    if ((count(explode("|", $previous_checkpoint)) != 3) || (!$this->computer->id)) {
      $offline['reset'] = 1;
      $previous_checkpoint = $this->checkpoint2string($this->string2checkpoint(""));
    }
    $offline['checkpoint'] = $previous_checkpoint;

    // *** Get the content
    $instantRecords = 0;
    foreach($this->_getList($previous_checkpoint, $n) as $i => $d)
    {
      $offline["data"][$i] = $d;
      $offline["data"][$i]->record = $this->getLineFrom($d->type, $d->id);
      if ($d->checkpoint == '') {
        // The timestamp is 'now', so we are not sure that the 'now' related list is complete
        // So we don't use it
        $instantRecords++;
      } else {
        $offline['checkpoint'] = max($d->checkpoint, $offline['checkpoint']);
      }
    }

    // *** Get the remaining count
    $offline['remaining'] = max(0, $this->_getCount($offline['checkpoint']) - $instantRecords);

    // *** Store the information for helping understanding what is happening out there...
    $this->computer->last_sync = $offline['checkpoint'];

    // *** Send back the offline data into the responde
    // Store the informations in the data send by
    // But we don't know if the data is object or array,
    // so we treat both equally
		$data = $response->getData();
		if (is_object($data)) {
			$data->_offline = $offline;
		} else if (is_array($data)) {
			$data['_offline'] = $offline;
		}
		$response->setData($data);

    // *** Save the computer object from all we did for modifications
    $this->computer->save();

    // *** Next...
	  return $response;
	}
}
