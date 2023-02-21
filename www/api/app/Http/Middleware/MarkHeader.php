<?php

namespace App\Http\Middleware;

use Closure;

class MarkHeader
{
	public function handle($request, Closure $next)
	{
		$response = $next($request);
		if (method_exists($response, 'header')) {
			$response->header('X-Source', 'The rest');
		}
		return $response;
  	}
}
