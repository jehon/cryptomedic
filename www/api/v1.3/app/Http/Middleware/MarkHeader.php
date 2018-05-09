<?php

namespace App\Http\Middleware;

use Closure;

class MarkHeader
{
	public function handle($request, Closure $next)
	{
		$response = $next($request);
		$response->header('X-Source', 'The rest');
		return $response;
  	}
}
