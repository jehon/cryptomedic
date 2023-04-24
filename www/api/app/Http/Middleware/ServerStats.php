<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use DB;

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
		$path = $request->path();
		$method = $request->method();
		$paramStr = $method;
		if ($method != 'POST') {
			$param = array_keys($request->all());
			sort($param);
			$paramStr = join("|", $param);
		}

		$res = DB::table('server_stats')->upsert(
			[
				"key" => $path,
				"params" => $paramStr
			],
			[
				"key", "params"
			],
			[
				"counter" => DB::raw('counter + 1')
			]
		);

		if (!$res) {
			die("Could not store stats");
		}

		return $next($request);
	}
}
