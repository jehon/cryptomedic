<?php namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;
use App\Bill;

#require_once(__DIR__ . "/../../../../php/references.php");
use App\References;

class ReportComputersController extends ReportController {
  public function index() {
    $this->result['list'] = DB::select("SELECT * FROM sync_computers WHERE
      updated_at IS NOT NULL
      AND updated_at < DATE_ADD(NOW(), INTERVAL - 6 MONTH)
    ");

    return response()->jsonOrJSONP($this->result);
  }
}
