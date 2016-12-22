<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Http\Controllers\SyncController;

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
		$checkpoint = $request->header("X-SYNC-CHECKPOINT");
		$n = $request->header("X-SYNC-NBR");
		if (!is_numeric($n)) {
			$n = 1000;
		}

		$response = $next($request);

		if ($response instanceof JsonResponse)
		{
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
		}
		return $response;
	}
}
