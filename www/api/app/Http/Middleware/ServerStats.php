<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use DB;
use Route;
use Detection\MobileDetect;

class ServerStats {
	/**
	 * Create a new filter instance.
	 *
	 * @param  Guard  $auth
	 * @return void
	 */
	public function __construct() {	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle(Request $request, Closure $next) {
		
		$detect = new MobileDetect();
		$device = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'mobile') : 'computer');

		$path = Route::getRoutes()->match($request)->uri;
		$method = $request->method();
		$paramStr = $method;
		if (!$request->isMethod('post')) {
			$params = array_keys($request->all());
			if (in_array("period", $params)) {
				$params = array_diff($params, [ 'period', 'day', 'month', 'year' ]);
				$params[] = $request->input("period");
			}

			natcasesort($params);
			$paramStr = join("|", $params);
		}	

		$res = DB::table('server_stats')->upsert(
			[
				// Insert data
				"key" => $path,
				"params" => $paramStr,
				"counter" => 1,
				"counter_$device" => 1
			],
			[
				// Key that identify the unique records - ignored for mysql
				// "device", "key", "params"
			],
			[
				// Update data
				"counter" => DB::raw("`counter` + 1"),
				"counter_$device" => DB::raw("`counter_$device` + 1")
			]
		);

		if (!$res) {
			die("Could not store stats");
		}

		return $next($request);
	}
}
