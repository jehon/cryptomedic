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
  public function sync()
  {
    // SyncData will do the job for us...
    return response()->json([]);
  }
}
