<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$req = parent::handle($request, $next);
		// TODO OFFLINE: add offline data to request
		// Question: what is the format of the request -> how to get the original data and not the JSON formatted data?
		
// 		$sql = "";
// 		foreach(References::$model2db as $m => $t) {
// 			if ($sql) {
// 				$sql .= " UNION ";
// 			}
// 			$sql .= "(SELECT lastmodified, '$t' as t, id FROM $t)";
// 		}
		
// 		trace($sql);
// 		global $server;
// 		$res = $server->getDatabase()->query("$sql ORDER BY modified, t, id LIMIT 10");
// 		return $res;
		return $req;
	}

}
