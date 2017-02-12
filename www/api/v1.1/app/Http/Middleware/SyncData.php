<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Http\Controllers\SyncController;
use App\Http\Controllers\Auth\AuthController;

class SyncData {
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

		if (! ($response instanceof JsonResponse)) {
			return $response;
		}

		$checkpoint = $request->header("X-SYNC-CHECKPOINT");
		$n = $request->header("X-SYNC-NBR");
		if (!is_numeric($n)) {
			$n = 10;
		}

    if (!AuthController::hasPermission("folder.read")) {
			return $response;
		}
		// Let's build up the response
    $offline = [];

    // What is the computer we are speaking about?
    if (Request::input("computerId", false)) {
      // Record the computer Id into database and session
      $computerId = Request::input("computerId");
      $computer = SyncComputer::firstOrNew([ "computer_id" => $computerId ]);
      $computer->useragent = $_SERVER['HTTP_USER_AGENT'];
      $computer->cryptomedic_version = Request::input("appVersion", "");
      if (strpos($computer->user_list, Auth::user()->username) === false) {
        $computer->user_list .= ',' . Auth::user()->username;
      }

		$response->setJsonOptions(JSON_NUMERIC_CHECK);
		if ($response->status() == 200)
		{
			$data = $response->getData();
			$offline = (new SyncController())->getOfflineStructuredData($checkpoint, $n);
			if (is_object($data))
			{
				$data->_offline = $offline;
			}
				else if (is_array($data))
			{
				$data['_offline'] = $offline;
			}
			$response->setData($data);
		}
		return $response;
	}
}
